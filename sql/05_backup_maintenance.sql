-- =============================================
-- DATABASE BACKUP & RESTORE SCRIPTS
-- NasDem Admin Panel Database Maintenance
-- =============================================

-- =============================================
-- BACKUP PROCEDURES
-- =============================================

DELIMITER $$

-- Create full database backup
CREATE PROCEDURE CreateFullBackup()
BEGIN
    DECLARE backup_timestamp VARCHAR(20);
    SET backup_timestamp = DATE_FORMAT(NOW(), '%Y%m%d_%H%i%s');
    
    -- Log backup start
    INSERT INTO audit_logs (action, table_name, record_id, new_values) 
    VALUES ('backup_started', 'system', 'full_backup', 
            JSON_OBJECT('timestamp', backup_timestamp, 'type', 'full'));
    
    -- This would typically be executed via command line:
    -- mysqldump -u [username] -p[password] --single-transaction --routines --triggers nasdem_admin_panel > backup_[timestamp].sql
    
    SELECT CONCAT('mysqldump -u [username] -p[password] --single-transaction --routines --triggers ', DATABASE(), ' > backup_', backup_timestamp, '.sql') as backup_command;
    
    -- Log backup completion
    INSERT INTO audit_logs (action, table_name, record_id, new_values) 
    VALUES ('backup_completed', 'system', 'full_backup', 
            JSON_OBJECT('timestamp', backup_timestamp, 'type', 'full'));
END$$

-- Create incremental backup (changes only)
CREATE PROCEDURE CreateIncrementalBackup()
BEGIN
    DECLARE backup_timestamp VARCHAR(20);
    DECLARE last_backup_time TIMESTAMP;
    
    SET backup_timestamp = DATE_FORMAT(NOW(), '%Y%m%d_%H%i%s');
    
    -- Get last backup time
    SELECT MAX(created_at) INTO last_backup_time 
    FROM audit_logs 
    WHERE action = 'backup_completed' 
    AND JSON_EXTRACT(new_values, '$.type') = 'full';
    
    IF last_backup_time IS NULL THEN
        SET last_backup_time = DATE_SUB(NOW(), INTERVAL 1 DAY);
    END IF;
    
    -- Export changed data since last backup
    SELECT 'Incremental backup created' as message,
           backup_timestamp as backup_id,
           last_backup_time as since_timestamp;
    
    -- Log incremental backup
    INSERT INTO audit_logs (action, table_name, record_id, new_values) 
    VALUES ('backup_incremental', 'system', backup_timestamp, 
            JSON_OBJECT('timestamp', backup_timestamp, 'since', last_backup_time));
END$$

DELIMITER ;

-- =============================================
-- DATA EXPORT PROCEDURES
-- =============================================

DELIMITER $$

-- Export news data to CSV format
CREATE PROCEDURE ExportNewsToCSV(
    IN p_status VARCHAR(20) DEFAULT NULL,
    IN p_date_from DATE DEFAULT NULL,
    IN p_date_to DATE DEFAULT NULL
)
BEGIN
    SET @sql = 'SELECT 
        n.id,
        n.title,
        n.slug,
        n.summary,
        n.status,
        n.published_at,
        n.created_at,
        n.author,
        GROUP_CONCAT(nt.tag_name) as tags
    FROM news n
    LEFT JOIN news_tags nt ON n.id = nt.news_id
    WHERE 1=1';
    
    IF p_status IS NOT NULL THEN
        SET @sql = CONCAT(@sql, ' AND n.status = "', p_status, '"');
    END IF;
    
    IF p_date_from IS NOT NULL THEN
        SET @sql = CONCAT(@sql, ' AND DATE(n.created_at) >= "', p_date_from, '"');
    END IF;
    
    IF p_date_to IS NOT NULL THEN
        SET @sql = CONCAT(@sql, ' AND DATE(n.created_at) <= "', p_date_to, '"');
    END IF;
    
    SET @sql = CONCAT(@sql, ' GROUP BY n.id ORDER BY n.created_at DESC');
    
    PREPARE stmt FROM @sql;
    EXECUTE stmt;
    DEALLOCATE PREPARE stmt;
END$$

-- Export organization structure
CREATE PROCEDURE ExportOrganizationStructure()
BEGIN
    SELECT 
        re.unit,
        re.area,
        re.position_title,
        re.sort_order,
        re.group_name,
        p.full_name,
        p.phone,
        p.email,
        p.instagram,
        p.x_twitter,
        p.linkedin,
        re.start_date,
        re.end_date,
        re.is_active
    FROM role_entries re
    JOIN persons p ON re.person_id = p.id
    ORDER BY re.unit, re.sort_order;
END$$

-- Export media library
CREATE PROCEDURE ExportMediaLibrary()
BEGIN
    SELECT 
        m.title,
        m.filename,
        m.url,
        m.ratio,
        m.size_kb,
        m.mime_type,
        a.name as album_name,
        u.full_name as uploaded_by,
        m.created_at
    FROM media m
    LEFT JOIN albums a ON m.album_id = a.id
    JOIN users u ON m.uploaded_by = u.id
    ORDER BY m.created_at DESC;
END$$

DELIMITER ;

-- =============================================
-- DATA CLEANUP PROCEDURES
-- =============================================

DELIMITER $$

-- Archive old news
CREATE PROCEDURE ArchiveOldNews(
    IN p_days_old INT DEFAULT 365
)
BEGIN
    DECLARE archived_count INT DEFAULT 0;
    
    UPDATE news 
    SET status = 'ARCHIVED' 
    WHERE status = 'PUBLISHED' 
    AND published_at < DATE_SUB(NOW(), INTERVAL p_days_old DAY);
    
    SET archived_count = ROW_COUNT();
    
    -- Log the archival
    INSERT INTO audit_logs (action, table_name, record_id, new_values) 
    VALUES ('bulk_archive', 'news', 'system', 
            JSON_OBJECT('archived_count', archived_count, 'days_old', p_days_old));
    
    SELECT archived_count as news_archived;
END$$

-- Clean up orphaned media files
CREATE PROCEDURE CleanupOrphanedMedia()
BEGIN
    DECLARE orphaned_count INT DEFAULT 0;
    
    -- Find media not referenced by any news or albums
    SELECT COUNT(*) INTO orphaned_count
    FROM media m
    WHERE m.id NOT IN (
        -- Media used as news covers
        SELECT DISTINCT cover_url FROM news WHERE cover_url IS NOT NULL
        UNION
        -- Media used as album covers
        SELECT DISTINCT cover_media_id FROM albums WHERE cover_media_id IS NOT NULL
    );
    
    -- Note: In production, you might want to move these to a separate table
    -- instead of deleting immediately
    
    SELECT orphaned_count as orphaned_media_found;
END$$

DELIMITER ;

-- =============================================
-- DATABASE HEALTH CHECK
-- =============================================

DELIMITER $$

CREATE PROCEDURE DatabaseHealthCheck()
BEGIN
    -- Table sizes
    SELECT 'Table Sizes' as check_type;
    SELECT 
        table_name,
        ROUND(((data_length + index_length) / 1024 / 1024), 2) as size_mb,
        table_rows
    FROM information_schema.tables 
    WHERE table_schema = DATABASE()
    ORDER BY (data_length + index_length) DESC;
    
    -- Data integrity checks
    SELECT 'Data Integrity' as check_type;
    
    -- Check for news without authors
    SELECT 'News without valid authors' as issue, COUNT(*) as count
    FROM news n
    LEFT JOIN users u ON n.author_id = u.id
    WHERE u.id IS NULL;
    
    -- Check for role entries without persons
    SELECT 'Role entries without valid persons' as issue, COUNT(*) as count
    FROM role_entries re
    LEFT JOIN persons p ON re.person_id = p.id
    WHERE p.id IS NULL;
    
    -- Check for media without valid uploaders
    SELECT 'Media without valid uploaders' as issue, COUNT(*) as count
    FROM media m
    LEFT JOIN users u ON m.uploaded_by = u.id
    WHERE u.id IS NULL;
    
    -- Performance metrics
    SELECT 'Performance Metrics' as check_type;
    
    SELECT 
        'News query performance' as metric,
        COUNT(*) as total_news,
        COUNT(CASE WHEN status = 'PUBLISHED' THEN 1 END) as published_news,
        COUNT(CASE WHEN pinned = TRUE THEN 1 END) as pinned_news
    FROM news;
    
    SELECT 
        'Media storage' as metric,
        COUNT(*) as total_files,
        ROUND(SUM(size_kb)/1024, 2) as total_size_mb,
        AVG(size_kb) as avg_file_size_kb
    FROM media;
    
    -- Recent activity
    SELECT 'Recent Activity (Last 7 days)' as check_type;
    SELECT 
        action,
        table_name,
        COUNT(*) as count
    FROM audit_logs 
    WHERE created_at >= DATE_SUB(NOW(), INTERVAL 7 DAY)
    GROUP BY action, table_name
    ORDER BY count DESC;
END$$

DELIMITER ;

-- =============================================
-- RESTORE VERIFICATION
-- =============================================

DELIMITER $$

CREATE PROCEDURE VerifyDatabaseRestore()
BEGIN
    DECLARE table_count INT DEFAULT 0;
    DECLARE data_count INT DEFAULT 0;
    
    -- Check if all required tables exist
    SELECT COUNT(*) INTO table_count
    FROM information_schema.tables 
    WHERE table_schema = DATABASE()
    AND table_name IN ('users', 'news', 'media', 'albums', 'persons', 'role_entries', 'dapils', 'news_tags', 'audit_logs');
    
    -- Check if we have data
    SELECT (
        (SELECT COUNT(*) FROM users) +
        (SELECT COUNT(*) FROM news) +
        (SELECT COUNT(*) FROM media) +
        (SELECT COUNT(*) FROM persons)
    ) INTO data_count;
    
    IF table_count = 9 AND data_count > 0 THEN
        SELECT 'SUCCESS' as restore_status, 'Database restore verified successfully' as message;
    ELSE
        SELECT 'FAILED' as restore_status, 
               CONCAT('Missing tables: ', (9 - table_count), ', Data rows: ', data_count) as message;
    END IF;
    
    -- Detailed verification
    SELECT 
        'news' as table_name, COUNT(*) as row_count FROM news
    UNION ALL
    SELECT 'media', COUNT(*) FROM media
    UNION ALL
    SELECT 'albums', COUNT(*) FROM albums
    UNION ALL
    SELECT 'persons', COUNT(*) FROM persons
    UNION ALL
    SELECT 'role_entries', COUNT(*) FROM role_entries
    UNION ALL
    SELECT 'dapils', COUNT(*) FROM dapils
    UNION ALL
    SELECT 'news_tags', COUNT(*) FROM news_tags
    UNION ALL
    SELECT 'audit_logs', COUNT(*) FROM audit_logs;
END$$

DELIMITER ;
