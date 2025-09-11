# NasDem Admin Panel - Database Setup

This folder contains SQL scripts for initializing and managing the database for the NasDem Admin Panel CMS.

## 📁 File Structure

```
sql/
├── 01_init_database.sql      # Core database schema and tables
├── 02_sample_data.sql        # Sample data for development/testing
├── 03_functions_procedures.sql # Stored procedures and functions
├── 04_indexes_optimization.sql # Performance indexes and optimization
├── 05_backup_maintenance.sql  # Backup and maintenance procedures
└── README.md                 # This file
```

## 🚀 Setup Instructions

### 1. Initial Database Setup

Execute the scripts in order:

```bash
# 1. Create database and tables
mysql -u username -p < 01_init_database.sql

# 2. Insert sample data (optional for development)
mysql -u username -p < 02_sample_data.sql

# 3. Create stored procedures and functions
mysql -u username -p < 03_functions_procedures.sql

# 4. Add performance indexes
mysql -u username -p < 04_indexes_optimization.sql

# 5. Setup backup and maintenance procedures
mysql -u username -p < 05_backup_maintenance.sql
```

### 2. Environment Configuration

Create database connection based on your environment:

**Development:**
```sql
CREATE DATABASE nasdem_admin_panel_dev;
```

**Production:**
```sql
CREATE DATABASE nasdem_admin_panel_prod;
```

## 📊 Database Schema Overview

### Core Tables

| Table | Purpose | Key Features |
|-------|---------|--------------|
| `users` | System users (admin, editor, writer) | Role-based access, authentication |
| `news` | News articles and content | Status workflow, pin system, scheduling |
| `news_tags` | Tags for news articles | Many-to-many relationship |
| `media` | File/image management | Album organization, metadata |
| `albums` | Media album organization | Hierarchical media storage |
| `persons` | People in organization | Contact info, social media |
| `role_entries` | Organization structure | DPD, Sayap, DPC, DPRT hierarchy |
| `dapils` | Electoral districts (Daerah Pemilihan) | Regional mapping |
| `audit_logs` | System activity tracking | Complete audit trail |

### Key Relationships

```
users (1) ──→ (n) news [author]
users (1) ──→ (n) media [uploader]
persons (1) ──→ (n) role_entries [organization member]
albums (1) ──→ (n) media [album organization]
news (1) ──→ (n) news_tags [tagging system]
dapils (1) ──→ (1) persons [PIC assignment]
```

## 🔧 Key Features

### News Management
- **Status Workflow**: Draft → Scheduled → Published → Archived
- **Pin System**: Only one news can be pinned at a time
- **Scheduling**: Auto-publish scheduled content
- **Full-text Search**: Optimized content searching
- **Tagging**: Flexible categorization system

### Organization Structure
- **Multi-level Hierarchy**: DPD → Sayap → DPC → DPRT
- **Person Management**: Complete contact and social media info
- **Area Assignment**: Geographic organization support
- **Role Flexibility**: Dynamic position management

### Media Management
- **Album Organization**: Structured file management
- **Metadata Support**: Title, alt-text, ratios, file info
- **Storage Tracking**: File size and usage monitoring
- **User Attribution**: Track who uploaded what

### Security & Auditing
- **Role-based Access**: Super Admin, Admin, Editor, Writer
- **Complete Audit Trail**: All actions logged
- **Data Integrity**: Foreign key constraints
- **Performance Optimized**: Strategic indexing

## 🎯 Business Logic

### Pin System Implementation
```sql
-- Only one news can be pinned at a time
CONSTRAINT chk_single_pinned CHECK (
    pinned = FALSE OR 
    (SELECT COUNT(*) FROM news WHERE pinned = TRUE) <= 1
)
```

### Auto-publishing Scheduled News
```sql
-- Stored procedure to publish scheduled content
CALL PublishScheduledNews();
```

### Organization Hierarchy
```sql
-- Get complete organization structure
CALL GetOrganizationByUnit('DPD', NULL);
```

## 📈 Performance Features

### Optimized Queries
- Full-text search on news content
- Composite indexes for common query patterns
- Partitioned audit logs for large datasets
- Materialized views for dashboard stats

### Monitoring
```sql
-- Check database health
CALL DatabaseHealthCheck();

-- Get performance statistics
SELECT * FROM storage_usage;
```

## 🔄 Maintenance

### Regular Maintenance Tasks

```sql
-- Archive old published news (older than 1 year)
CALL ArchiveOldNews(365);

-- Clean up old audit logs (older than 90 days)
CALL CleanupOldAuditLogs(90);

-- Optimize tables for performance
CALL OptimizeTables();
```

### Backup Procedures

```sql
-- Create full backup
CALL CreateFullBackup();

-- Verify database after restore
CALL VerifyDatabaseRestore();
```

## 🚦 Production Considerations

### Security
- Use environment variables for database credentials
- Enable SSL connections
- Regular security updates
- Implement database user permissions

### Performance
- Monitor query performance with slow query log
- Regular index optimization
- Consider read replicas for heavy read workloads
- Implement caching layer (Redis/Memcached)

### Backup Strategy
- Daily full backups
- Hourly incremental backups
- Off-site backup storage
- Regular restore testing

## 🔗 Integration Notes

### API Integration
The database is designed to work with:
- RESTful APIs for CRUD operations
- GraphQL for complex queries
- Real-time updates via WebSocket
- File upload handling for media

### Frontend Integration
Optimized for React components:
- Paginated data loading
- Search and filtering
- Real-time status updates
- Optimistic UI updates

## 📝 Sample Queries

### Get Dashboard Statistics
```sql
SELECT GetNewsStats() as news_stats,
       GetMediaStats() as media_stats,
       GetOrganizationStats() as org_stats;
```

### Search Published News
```sql
CALL SearchNews('infrastruktur', 'PUBLISHED', 10, 0);
```

### Get Organization by Unit
```sql
CALL GetOrganizationByUnit('DPD', NULL);
```

### Recent Activity
```sql
CALL GetRecentActivity(10);
```

---

**Note**: This database schema is specifically designed for the **DPD Partai NasDem Kabupaten Sidoarjo** admin panel and includes all necessary tables and procedures to support the complete CMS functionality described in the codebase.
