-- =============================================
-- NasDem Admin Panel Database Schema
-- DPD Partai NasDem Kabupaten Sidoarjo
-- =============================================

-- Create database (uncomment if needed)
-- CREATE DATABASE nasdem_admin_panel;
-- USE nasdem_admin_panel;

-- Enable UUID extension for PostgreSQL (if using PostgreSQL)
-- CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Drop tables if they exist (for fresh installation)
DROP TABLE IF EXISTS audit_logs CASCADE;
DROP TABLE IF EXISTS role_entries CASCADE;
DROP TABLE IF EXISTS persons CASCADE;
DROP TABLE IF EXISTS dapils CASCADE;
DROP TABLE IF EXISTS media CASCADE;
DROP TABLE IF EXISTS albums CASCADE;
DROP TABLE IF EXISTS news_tags CASCADE;
DROP TABLE IF EXISTS news CASCADE;

-- =============================================
-- NEWS TABLE
-- =============================================
CREATE TABLE news (
    id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    summary TEXT,
    content LONGTEXT NOT NULL,
    cover_url TEXT,
    status ENUM('DRAFT', 'SCHEDULED', 'PUBLISHED', 'ARCHIVED') DEFAULT 'DRAFT',
    scheduled_at TIMESTAMP NULL,
    published_at TIMESTAMP NULL,
    author VARCHAR(100) NOT NULL DEFAULT 'Admin',
    pinned BOOLEAN DEFAULT FALSE,
    view_count INT DEFAULT 0,
    meta_title VARCHAR(255),
    meta_description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_news_status (status),
    INDEX idx_news_slug (slug),
    INDEX idx_news_pinned (pinned),
    INDEX idx_news_published_at (published_at),
    
    -- Constraint: Only one news can be pinned at a time
    CONSTRAINT chk_single_pinned CHECK (
        pinned = FALSE OR 
        (SELECT COUNT(*) FROM news WHERE pinned = TRUE) <= 1
    )
);

-- =============================================
-- NEWS TAGS TABLE (Many-to-Many relationship)
-- =============================================
CREATE TABLE news_tags (
    id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
    news_id VARCHAR(36) NOT NULL,
    tag_name VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (news_id) REFERENCES news(id) ON DELETE CASCADE,
    UNIQUE KEY unique_news_tag (news_id, tag_name),
    INDEX idx_tag_name (tag_name)
);

-- =============================================
-- ALBUMS TABLE
-- =============================================
CREATE TABLE albums (
    id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
    name VARCHAR(100) NOT NULL,
    description TEXT,
    cover_media_id VARCHAR(36),
    sort_order INT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_album_order (sort_order),
    INDEX idx_album_active (is_active)
);

-- =============================================
-- MEDIA TABLE
-- =============================================
CREATE TABLE media (
    id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
    title VARCHAR(255) NOT NULL,
    alt_text VARCHAR(255),
    filename VARCHAR(255) NOT NULL,
    original_filename VARCHAR(255) NOT NULL,
    url TEXT NOT NULL,
    ratio ENUM('1:1', '16:9', 'original') DEFAULT 'original',
    size_kb INT NOT NULL,
    mime_type VARCHAR(100) NOT NULL,
    width INT,
    height INT,
    album_id VARCHAR(36),
    uploaded_by VARCHAR(100) DEFAULT 'Admin',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (album_id) REFERENCES albums(id) ON DELETE SET NULL,
    INDEX idx_media_album (album_id),
    INDEX idx_media_mime (mime_type)
);

-- Add foreign key constraint for album cover after media table is created
ALTER TABLE albums 
ADD CONSTRAINT fk_album_cover 
FOREIGN KEY (cover_media_id) REFERENCES media(id) ON DELETE SET NULL;

-- =============================================
-- DAPILS TABLE (Daerah Pemilihan)
-- =============================================
CREATE TABLE dapils (
    id INT PRIMARY KEY CHECK (id BETWEEN 1 AND 6),
    name VARCHAR(100) NOT NULL,
    regions JSON NOT NULL, -- Array of region names
    pic_person_id VARCHAR(36),
    description TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- =============================================
-- PERSONS TABLE
-- =============================================
CREATE TABLE persons (
    id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
    full_name VARCHAR(100) NOT NULL,
    photo_url TEXT,
    phone VARCHAR(20),
    email VARCHAR(100),
    instagram VARCHAR(100),
    x_twitter VARCHAR(100),
    linkedin VARCHAR(100),
    facebook VARCHAR(100),
    bio TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_person_name (full_name),
    INDEX idx_person_active (is_active)
);

-- Add foreign key constraint for dapil PIC
ALTER TABLE dapils 
ADD CONSTRAINT fk_dapil_pic 
FOREIGN KEY (pic_person_id) REFERENCES persons(id) ON DELETE SET NULL;

-- =============================================
-- ROLE ENTRIES TABLE (Struktur Organisasi)
-- =============================================
CREATE TABLE role_entries (
    id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
    unit ENUM('DPD', 'SAYAP', 'DPC', 'DPRT') NOT NULL,
    area VARCHAR(100), -- Dapil, Kecamatan, Desa
    position_title VARCHAR(100) NOT NULL,
    person_id VARCHAR(36) NOT NULL,
    sort_order INT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    group_name VARCHAR(50), -- For grouping positions
    meta_data JSON, -- Additional metadata
    start_date DATE,
    end_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (person_id) REFERENCES persons(id) ON DELETE RESTRICT,
    INDEX idx_role_unit (unit),
    INDEX idx_role_area (area),
    INDEX idx_role_active (is_active),
    INDEX idx_role_order (sort_order)
);

-- =============================================
-- AUDIT LOGS TABLE
-- =============================================
CREATE TABLE audit_logs (
    id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
    user_name VARCHAR(100) DEFAULT 'System',
    action VARCHAR(50) NOT NULL, -- created, updated, deleted, published, etc.
    table_name VARCHAR(50) NOT NULL,
    record_id VARCHAR(36) NOT NULL,
    old_values JSON,
    new_values JSON,
    ip_address VARCHAR(45),
    user_agent TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    INDEX idx_audit_user (user_name),
    INDEX idx_audit_table (table_name),
    INDEX idx_audit_action (action),
    INDEX idx_audit_created (created_at)
);

-- =============================================
-- CREATE VIEWS FOR COMMON QUERIES
-- =============================================

-- View for published news with author info
CREATE VIEW published_news_view AS
SELECT 
    n.id,
    n.title,
    n.slug,
    n.summary,
    n.cover_url,
    n.published_at,
    n.view_count,
    n.pinned,
    n.author as author_name,
    GROUP_CONCAT(nt.tag_name) as tags
FROM news n
LEFT JOIN news_tags nt ON n.id = nt.news_id
WHERE n.status = 'PUBLISHED'
GROUP BY n.id;

-- View for organization structure
CREATE VIEW organization_structure_view AS
SELECT 
    re.id,
    re.unit,
    re.area,
    re.position_title,
    re.sort_order,
    re.group_name,
    p.full_name,
    p.photo_url,
    p.phone,
    p.email,
    p.instagram,
    p.x_twitter,
    p.linkedin
FROM role_entries re
JOIN persons p ON re.person_id = p.id
WHERE re.is_active = TRUE AND p.is_active = TRUE
ORDER BY re.unit, re.sort_order;

-- =============================================
-- INDEXES FOR PERFORMANCE
-- =============================================

-- Additional composite indexes
CREATE INDEX idx_news_status_published ON news(status, published_at DESC);
CREATE INDEX idx_media_album_created ON media(album_id, created_at DESC);
CREATE INDEX idx_role_unit_order ON role_entries(unit, sort_order);
CREATE INDEX idx_audit_table_action ON audit_logs(table_name, action, created_at DESC);
