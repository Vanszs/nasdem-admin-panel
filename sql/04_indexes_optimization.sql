-- =============================================
-- INDEXES & OPTIMIZATION
-- Performance optimization for NasDem Admin Panel
-- =============================================

-- =============================================
-- ADDITIONAL PERFORMANCE INDEXES
-- =============================================

-- News table indexes for common queries
CREATE INDEX idx_news_author_status ON news(author_id, status);
CREATE INDEX idx_news_created_status ON news(created_at DESC, status);
CREATE INDEX idx_news_published_desc ON news(published_at DESC) WHERE status = 'PUBLISHED';
CREATE INDEX idx_news_scheduled_time ON news(scheduled_at) WHERE status = 'SCHEDULED';
CREATE INDEX idx_news_title_search ON news(title(50));

-- News tags indexes for tag searching
CREATE INDEX idx_news_tags_tag_name ON news_tags(tag_name);
CREATE INDEX idx_news_tags_composite ON news_tags(news_id, tag_name);

-- Media table indexes
CREATE INDEX idx_media_filename ON media(filename);
CREATE INDEX idx_media_created_desc ON media(created_at DESC);
CREATE INDEX idx_media_album_created ON media(album_id, created_at DESC);
CREATE INDEX idx_media_size ON media(size_kb);
CREATE INDEX idx_media_uploaded_by ON media(uploaded_by);

-- Albums indexes
CREATE INDEX idx_albums_name ON albums(name);
CREATE INDEX idx_albums_active_order ON albums(is_active, sort_order);

-- Persons indexes for searching
CREATE INDEX idx_persons_name_search ON persons(full_name);
CREATE INDEX idx_persons_email ON persons(email);
CREATE INDEX idx_persons_phone ON persons(phone);
CREATE INDEX idx_persons_active ON persons(is_active);

-- Role entries indexes for organization queries
CREATE INDEX idx_role_unit_active ON role_entries(unit, is_active);
CREATE INDEX idx_role_area_active ON role_entries(area, is_active);
CREATE INDEX idx_role_person_unit ON role_entries(person_id, unit);
CREATE INDEX idx_role_group_order ON role_entries(group_name, sort_order);

-- Audit logs indexes for reporting
CREATE INDEX idx_audit_user_name ON audit_logs(user_name);
CREATE INDEX idx_audit_user_date ON audit_logs(user_name, created_at DESC);
CREATE INDEX idx_audit_table_date ON audit_logs(table_name, created_at DESC);
CREATE INDEX idx_audit_action_date ON audit_logs(action, created_at DESC);
CREATE INDEX idx_audit_record ON audit_logs(table_name, record_id);

-- Dapils indexes
CREATE INDEX idx_dapils_active ON dapils(is_active);
CREATE INDEX idx_dapils_pic ON dapils(pic_person_id);

-- =============================================
-- FULL-TEXT SEARCH INDEXES (if using MySQL)
-- =============================================

-- News full-text search
ALTER TABLE news ADD FULLTEXT(title, summary, content);

-- Persons full-text search
ALTER TABLE persons ADD FULLTEXT(full_name, bio);

-- =============================================
-- PARTITIONING (if using large datasets)
-- =============================================

-- Partition audit_logs by month for better performance
-- ALTER TABLE audit_logs 
-- PARTITION BY RANGE (YEAR(created_at) * 100 + MONTH(created_at)) (
--     PARTITION p202401 VALUES LESS THAN (202402),
--     PARTITION p202402 VALUES LESS THAN (202403),
--     PARTITION p202403 VALUES LESS THAN (202404),
--     PARTITION p202404 VALUES LESS THAN (202405),
--     PARTITION p202405 VALUES LESS THAN (202406),
--     PARTITION p202406 VALUES LESS THAN (202407),
--     PARTITION p202407 VALUES LESS THAN (202408),
--     PARTITION p202408 VALUES LESS THAN (202409),
--     PARTITION p202409 VALUES LESS THAN (202410),
--     PARTITION p202410 VALUES LESS THAN (202411),
--     PARTITION p202411 VALUES LESS THAN (202412),
--     PARTITION p202412 VALUES LESS THAN (202501),
--     PARTITION p_future VALUES LESS THAN MAXVALUE
-- );

-- =============================================
-- QUERY OPTIMIZATION HINTS
-- =============================================

-- Common optimized queries for dashboard
DELIMITER $$

-- Get dashboard statistics (optimized)
CREATE PROCEDURE GetDashboardStats()
BEGIN
    SELECT 
        (SELECT COUNT(*) FROM news WHERE status = 'PUBLISHED') as published_news,
        (SELECT COUNT(*) FROM news WHERE status = 'DRAFT') as draft_news,
        (SELECT COUNT(*) FROM news WHERE status = 'SCHEDULED') as scheduled_news,
        (SELECT COUNT(*) FROM news WHERE pinned = TRUE) as pinned_news,
        (SELECT COUNT(*) FROM media) as total_media,
        (SELECT COUNT(*) FROM albums WHERE is_active = TRUE) as active_albums,
        (SELECT COUNT(*) FROM persons WHERE is_active = TRUE) as active_persons,
        (SELECT COUNT(*) FROM role_entries WHERE is_active = TRUE) as active_roles,
        (SELECT ROUND(SUM(size_kb)/1024, 2) FROM media) as total_media_mb;
END$$

-- Get recent published news (optimized)
CREATE PROCEDURE GetRecentNews(IN p_limit INT DEFAULT 5)
BEGIN
    SELECT 
        n.id,
        n.title,
        n.slug,
        n.summary,
        n.cover_url,
        n.published_at,
        n.view_count,
        n.author as author_name,
        GROUP_CONCAT(nt.tag_name ORDER BY nt.tag_name SEPARATOR ',') as tags
    FROM news n
    USE INDEX (idx_news_published_desc)
    LEFT JOIN news_tags nt ON n.id = nt.news_id
    WHERE n.status = 'PUBLISHED'
    GROUP BY n.id
    ORDER BY n.published_at DESC
    LIMIT p_limit;
END$$

-- Search news with full-text (optimized)
CREATE PROCEDURE SearchNews(
    IN p_search_term VARCHAR(255),
    IN p_status VARCHAR(20) DEFAULT NULL,
    IN p_limit INT DEFAULT 10,
    IN p_offset INT DEFAULT 0
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
        n.author as author_name,
        MATCH(n.title, n.summary, n.content) AGAINST(? IN NATURAL LANGUAGE MODE) as relevance
    FROM news n
    WHERE 1=1';
    
    IF p_search_term IS NOT NULL AND p_search_term != '' THEN
        SET @sql = CONCAT(@sql, ' AND MATCH(n.title, n.summary, n.content) AGAINST(? IN NATURAL LANGUAGE MODE)');
    END IF;
    
    IF p_status IS NOT NULL AND p_status != 'all' THEN
        SET @sql = CONCAT(@sql, ' AND n.status = ?');
    END IF;
    
    SET @sql = CONCAT(@sql, ' ORDER BY relevance DESC, n.created_at DESC LIMIT ? OFFSET ?');
    
    PREPARE stmt FROM @sql;
    
    IF p_search_term IS NOT NULL AND p_status IS NOT NULL AND p_status != 'all' THEN
        EXECUTE stmt USING p_search_term, p_search_term, p_status, p_limit, p_offset;
    ELSEIF p_search_term IS NOT NULL THEN
        EXECUTE stmt USING p_search_term, p_search_term, p_limit, p_offset;
    ELSEIF p_status IS NOT NULL AND p_status != 'all' THEN
        EXECUTE stmt USING p_status, p_limit, p_offset;
    ELSE
        EXECUTE stmt USING p_limit, p_offset;
    END IF;
    
    DEALLOCATE PREPARE stmt;
END$$

DELIMITER ;

-- =============================================
-- MAINTENANCE PROCEDURES
-- =============================================

DELIMITER $$

-- Analyze table statistics
CREATE PROCEDURE AnalyzeTableStats()
BEGIN
    ANALYZE TABLE news;
    ANALYZE TABLE media;
    ANALYZE TABLE persons;
    ANALYZE TABLE role_entries;
    ANALYZE TABLE audit_logs;
    ANALYZE TABLE albums;
    ANALYZE TABLE dapils;
    ANALYZE TABLE news_tags;
END$$

-- Optimize tables
CREATE PROCEDURE OptimizeTables()
BEGIN
    OPTIMIZE TABLE news;
    OPTIMIZE TABLE media;
    OPTIMIZE TABLE persons;
    OPTIMIZE TABLE role_entries;
    OPTIMIZE TABLE audit_logs;
    OPTIMIZE TABLE albums;
    OPTIMIZE TABLE dapils;
    OPTIMIZE TABLE news_tags;
END$$

-- Check table integrity
CREATE PROCEDURE CheckTableIntegrity()
BEGIN
    CHECK TABLE news;
    CHECK TABLE media;
    CHECK TABLE persons;
    CHECK TABLE role_entries;
    CHECK TABLE audit_logs;
    CHECK TABLE albums;
    CHECK TABLE dapils;
    CHECK TABLE news_tags;
END$$

DELIMITER ;

-- =============================================
-- PERFORMANCE MONITORING VIEWS
-- =============================================

-- View for slow queries monitoring
CREATE VIEW slow_query_summary AS
SELECT 
    table_name,
    COUNT(*) as query_count,
    AVG(CASE WHEN table_name = 'news' THEN 
        (SELECT COUNT(*) FROM news) * 0.001 ELSE 0.001 END) as avg_response_time
FROM information_schema.tables 
WHERE table_schema = DATABASE()
GROUP BY table_name;

-- View for storage usage
CREATE VIEW storage_usage AS
SELECT 
    table_name,
    ROUND(((data_length + index_length) / 1024 / 1024), 2) as size_mb,
    table_rows,
    ROUND((index_length / 1024 / 1024), 2) as index_size_mb
FROM information_schema.tables 
WHERE table_schema = DATABASE()
ORDER BY (data_length + index_length) DESC;
