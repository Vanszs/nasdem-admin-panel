-- =============================================
-- STORED PROCEDURES & FUNCTIONS
-- NasDem Admin Panel - Helper Functions
-- =============================================

DELIMITER $$

-- =============================================
-- FUNCTION: Get News Statistics
-- =============================================
CREATE FUNCTION GetNewsStats()
RETURNS JSON
READS SQL DATA
DETERMINISTIC
BEGIN
    DECLARE result JSON;
    
    SELECT JSON_OBJECT(
        'total', (SELECT COUNT(*) FROM news),
        'published', (SELECT COUNT(*) FROM news WHERE status = 'PUBLISHED'),
        'draft', (SELECT COUNT(*) FROM news WHERE status = 'DRAFT'),
        'scheduled', (SELECT COUNT(*) FROM news WHERE status = 'SCHEDULED'),
        'archived', (SELECT COUNT(*) FROM news WHERE status = 'ARCHIVED'),
        'pinned', (SELECT COUNT(*) FROM news WHERE pinned = TRUE),
        'this_month', (SELECT COUNT(*) FROM news WHERE MONTH(created_at) = MONTH(CURRENT_DATE()) AND YEAR(created_at) = YEAR(CURRENT_DATE()))
    ) INTO result;
    
    RETURN result;
END$$

-- =============================================
-- FUNCTION: Get Media Statistics
-- =============================================
CREATE FUNCTION GetMediaStats()
RETURNS JSON
READS SQL DATA
DETERMINISTIC
BEGIN
    DECLARE result JSON;
    
    SELECT JSON_OBJECT(
        'total', (SELECT COUNT(*) FROM media),
        'total_size_mb', (SELECT ROUND(SUM(size_kb)/1024, 2) FROM media),
        'albums', (SELECT COUNT(*) FROM albums WHERE is_active = TRUE),
        'this_month', (SELECT COUNT(*) FROM media WHERE MONTH(created_at) = MONTH(CURRENT_DATE()) AND YEAR(created_at) = YEAR(CURRENT_DATE()))
    ) INTO result;
    
    RETURN result;
END$$

-- =============================================
-- FUNCTION: Get Organization Statistics
-- =============================================
CREATE FUNCTION GetOrganizationStats()
RETURNS JSON
READS SQL DATA
DETERMINISTIC
BEGIN
    DECLARE result JSON;
    
    SELECT JSON_OBJECT(
        'total_persons', (SELECT COUNT(*) FROM persons WHERE is_active = TRUE),
        'total_roles', (SELECT COUNT(*) FROM role_entries WHERE is_active = TRUE),
        'dpd_members', (SELECT COUNT(*) FROM role_entries WHERE unit = 'DPD' AND is_active = TRUE),
        'sayap_members', (SELECT COUNT(*) FROM role_entries WHERE unit = 'SAYAP' AND is_active = TRUE),
        'dpc_members', (SELECT COUNT(*) FROM role_entries WHERE unit = 'DPC' AND is_active = TRUE),
        'dprt_members', (SELECT COUNT(*) FROM role_entries WHERE unit = 'DPRT' AND is_active = TRUE)
    ) INTO result;
    
    RETURN result;
END$$

-- =============================================
-- PROCEDURE: Pin News (with automatic unpin previous)
-- =============================================
CREATE PROCEDURE PinNews(
    IN p_news_id VARCHAR(36),
    IN p_user_name VARCHAR(100) DEFAULT 'Admin'
)
BEGIN
    DECLARE v_old_pinned_id VARCHAR(36);
    DECLARE v_old_pinned_title VARCHAR(255);
    DECLARE v_new_title VARCHAR(255);
    
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        RESIGNAL;
    END;
    
    START TRANSACTION;
    
    -- Get currently pinned news
    SELECT id, title INTO v_old_pinned_id, v_old_pinned_title 
    FROM news WHERE pinned = TRUE LIMIT 1;
    
    -- Get new news title
    SELECT title INTO v_new_title FROM news WHERE id = p_news_id;
    
    -- Unpin all news first
    UPDATE news SET pinned = FALSE WHERE pinned = TRUE;
    
    -- Pin the selected news
    UPDATE news SET pinned = TRUE WHERE id = p_news_id;
    
    -- Log the action
    IF v_old_pinned_id IS NOT NULL THEN
        INSERT INTO audit_logs (user_name, action, table_name, record_id, old_values, new_values)
        VALUES (p_user_name, 'unpinned', 'news', v_old_pinned_id, 
                JSON_OBJECT('pinned', TRUE), JSON_OBJECT('pinned', FALSE));
    END IF;
    
    INSERT INTO audit_logs (user_name, action, table_name, record_id, old_values, new_values)
    VALUES (p_user_name, 'pinned', 'news', p_news_id,
            JSON_OBJECT('pinned', FALSE), JSON_OBJECT('pinned', TRUE));
    
    COMMIT;
END$$

-- =============================================
-- PROCEDURE: Publish Scheduled News
-- =============================================
CREATE PROCEDURE PublishScheduledNews()
BEGIN
    DECLARE done INT DEFAULT FALSE;
    DECLARE v_news_id VARCHAR(36);
    DECLARE cur CURSOR FOR 
        SELECT id FROM news 
        WHERE status = 'SCHEDULED' 
        AND scheduled_at <= NOW();
    
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = TRUE;
    
    OPEN cur;
    
    read_loop: LOOP
        FETCH cur INTO v_news_id;
        IF done THEN
            LEAVE read_loop;
        END IF;
        
        UPDATE news 
        SET status = 'PUBLISHED', 
            published_at = NOW() 
        WHERE id = v_news_id;
        
        INSERT INTO audit_logs (action, table_name, record_id, new_values)
        VALUES ('auto_published', 'news', v_news_id, 
                JSON_OBJECT('status', 'PUBLISHED', 'published_at', NOW()));
    END LOOP;
    
    CLOSE cur;
END$$

-- =============================================
-- PROCEDURE: Get Recent Activity
-- =============================================
CREATE PROCEDURE GetRecentActivity(
    IN p_limit INT DEFAULT 10
)
BEGIN
    SELECT 
        al.id,
        al.action,
        al.table_name,
        al.record_id,
        al.created_at,
        al.user_name,
        CASE 
            WHEN al.table_name = 'news' THEN n.title
            WHEN al.table_name = 'media' THEN m.title
            WHEN al.table_name = 'persons' THEN p.full_name
            ELSE 'Unknown'
        END as item_title
    FROM audit_logs al
    LEFT JOIN news n ON al.table_name = 'news' AND al.record_id = n.id
    LEFT JOIN media m ON al.table_name = 'media' AND al.record_id = m.id
    LEFT JOIN persons p ON al.table_name = 'persons' AND al.record_id = p.id
    ORDER BY al.created_at DESC
    LIMIT p_limit;
END$$

-- =============================================
-- PROCEDURE: Cleanup Old Audit Logs
-- =============================================
CREATE PROCEDURE CleanupOldAuditLogs(
    IN p_days_to_keep INT DEFAULT 90
)
BEGIN
    DELETE FROM audit_logs 
    WHERE created_at < DATE_SUB(NOW(), INTERVAL p_days_to_keep DAY);
    
    SELECT ROW_COUNT() as deleted_rows;
END$$

-- =============================================
-- PROCEDURE: Get Organization Structure by Unit
-- =============================================
CREATE PROCEDURE GetOrganizationByUnit(
    IN p_unit ENUM('DPD', 'SAYAP', 'DPC', 'DPRT'),
    IN p_area VARCHAR(100) DEFAULT NULL
)
BEGIN
    SELECT 
        re.id,
        re.unit,
        re.area,
        re.position_title,
        re.sort_order,
        re.group_name,
        re.start_date,
        re.end_date,
        p.id as person_id,
        p.full_name,
        p.photo_url,
        p.phone,
        p.email,
        p.instagram,
        p.x_twitter,
        p.linkedin,
        p.facebook
    FROM role_entries re
    JOIN persons p ON re.person_id = p.id
    WHERE re.unit = p_unit 
    AND re.is_active = TRUE 
    AND p.is_active = TRUE
    AND (p_area IS NULL OR re.area = p_area)
    ORDER BY re.sort_order;
END$$

-- =============================================
-- FUNCTION: Generate Unique Slug
-- =============================================
CREATE FUNCTION GenerateUniqueSlug(
    p_title VARCHAR(255),
    p_table VARCHAR(50)
)
RETURNS VARCHAR(255)
READS SQL DATA
DETERMINISTIC
BEGIN
    DECLARE v_base_slug VARCHAR(255);
    DECLARE v_slug VARCHAR(255);
    DECLARE v_counter INT DEFAULT 0;
    DECLARE v_exists INT DEFAULT 1;
    
    -- Create base slug from title
    SET v_base_slug = LOWER(TRIM(p_title));
    SET v_base_slug = REPLACE(v_base_slug, ' ', '-');
    SET v_base_slug = REGEXP_REPLACE(v_base_slug, '[^a-z0-9\\-]', '');
    SET v_base_slug = REGEXP_REPLACE(v_base_slug, '\\-+', '-');
    SET v_base_slug = TRIM(BOTH '-' FROM v_base_slug);
    
    SET v_slug = v_base_slug;
    
    -- Check if slug exists and increment if needed
    WHILE v_exists > 0 DO
        IF p_table = 'news' THEN
            SELECT COUNT(*) INTO v_exists FROM news WHERE slug = v_slug;
        END IF;
        
        IF v_exists > 0 THEN
            SET v_counter = v_counter + 1;
            SET v_slug = CONCAT(v_base_slug, '-', v_counter);
        END IF;
    END WHILE;
    
    RETURN v_slug;
END$$

DELIMITER ;

-- =============================================
-- CREATE TRIGGERS
-- =============================================

-- Trigger to auto-update timestamps
DELIMITER $$

CREATE TRIGGER tr_news_updated_at 
    BEFORE UPDATE ON news 
    FOR EACH ROW 
BEGIN
    SET NEW.updated_at = CURRENT_TIMESTAMP;
END$$

CREATE TRIGGER tr_persons_updated_at 
    BEFORE UPDATE ON persons 
    FOR EACH ROW 
BEGIN
    SET NEW.updated_at = CURRENT_TIMESTAMP;
END$$

CREATE TRIGGER tr_role_entries_updated_at 
    BEFORE UPDATE ON role_entries 
    FOR EACH ROW 
BEGIN
    SET NEW.updated_at = CURRENT_TIMESTAMP;
END$$

CREATE TRIGGER tr_albums_updated_at 
    BEFORE UPDATE ON albums 
    FOR EACH ROW 
BEGIN
    SET NEW.updated_at = CURRENT_TIMESTAMP;
END$$

-- Trigger to ensure only one pinned news
CREATE TRIGGER tr_news_pin_constraint 
    BEFORE UPDATE ON news 
    FOR EACH ROW 
BEGIN
    IF NEW.pinned = TRUE AND OLD.pinned = FALSE THEN
        UPDATE news SET pinned = FALSE WHERE pinned = TRUE AND id != NEW.id;
    END IF;
END$$

DELIMITER ;
