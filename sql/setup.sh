#!/bin/bash

# =============================================
# NasDem Admin Panel - Database Setup Script
# Quick setup for development environment
# =============================================

set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
DB_NAME="nasdem_admin_panel"
DB_USER="root"
DB_HOST="localhost"
DB_PORT="3306"

echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE} NasDem Admin Panel Database Setup${NC}"
echo -e "${BLUE}========================================${NC}"
echo

# Check if MySQL is running
if ! command -v mysql &> /dev/null; then
    echo -e "${RED}❌ MySQL client not found. Please install MySQL.${NC}"
    exit 1
fi

# Get database password
echo -e "${YELLOW}Please enter MySQL password for user '${DB_USER}':${NC}"
read -s DB_PASSWORD
echo

# Test database connection
echo -e "${BLUE}🔍 Testing database connection...${NC}"
if ! mysql -h "$DB_HOST" -P "$DB_PORT" -u "$DB_USER" -p"$DB_PASSWORD" -e "SELECT 1;" &> /dev/null; then
    echo -e "${RED}❌ Failed to connect to MySQL. Please check your credentials.${NC}"
    exit 1
fi
echo -e "${GREEN}✅ Database connection successful${NC}"

# Create database if not exists
echo -e "${BLUE}📦 Creating database '${DB_NAME}'...${NC}"
mysql -h "$DB_HOST" -P "$DB_PORT" -u "$DB_USER" -p"$DB_PASSWORD" -e "CREATE DATABASE IF NOT EXISTS \`${DB_NAME}\`;"
echo -e "${GREEN}✅ Database '${DB_NAME}' ready${NC}"

# Execute SQL files in order
sql_files=(
    "01_init_database.sql"
    "02_sample_data.sql"
    "03_functions_procedures.sql"
    "04_indexes_optimization.sql"
    "05_backup_maintenance.sql"
)

for sql_file in "${sql_files[@]}"; do
    if [ -f "$sql_file" ]; then
        echo -e "${BLUE}📝 Executing ${sql_file}...${NC}"
        mysql -h "$DB_HOST" -P "$DB_PORT" -u "$DB_USER" -p"$DB_PASSWORD" "$DB_NAME" < "$sql_file"
        echo -e "${GREEN}✅ ${sql_file} executed successfully${NC}"
    else
        echo -e "${YELLOW}⚠️  File ${sql_file} not found, skipping...${NC}"
    fi
done

# Verify installation
echo -e "${BLUE}🔍 Verifying installation...${NC}"
table_count=$(mysql -h "$DB_HOST" -P "$DB_PORT" -u "$DB_USER" -p"$DB_PASSWORD" "$DB_NAME" -e "SELECT COUNT(*) as count FROM information_schema.tables WHERE table_schema = '$DB_NAME';" | tail -n 1)

if [ "$table_count" -ge 9 ]; then
    echo -e "${GREEN}✅ Database setup completed successfully!${NC}"
    echo -e "${GREEN}   📊 ${table_count} tables created${NC}"
    
    # Show sample data counts
    echo -e "${BLUE}📈 Sample data summary:${NC}"
    mysql -h "$DB_HOST" -P "$DB_PORT" -u "$DB_USER" -p"$DB_PASSWORD" "$DB_NAME" -e "
        SELECT 'Users' as table_name, COUNT(*) as count FROM users
        UNION ALL SELECT 'News', COUNT(*) FROM news
        UNION ALL SELECT 'Media', COUNT(*) FROM media
        UNION ALL SELECT 'Persons', COUNT(*) FROM persons
        UNION ALL SELECT 'Role Entries', COUNT(*) FROM role_entries
        UNION ALL SELECT 'Albums', COUNT(*) FROM albums
        UNION ALL SELECT 'Dapils', COUNT(*) FROM dapils;
    "
    
    echo
    echo -e "${GREEN}🎉 Setup completed! Your NasDem Admin Panel database is ready.${NC}"
    echo -e "${BLUE}📋 Database Details:${NC}"
    echo -e "   Host: ${DB_HOST}:${DB_PORT}"
    echo -e "   Database: ${DB_NAME}"
    echo -e "   Tables: ${table_count}"
    echo
    echo -e "${YELLOW}📝 Default admin credentials:${NC}"
    echo -e "   Username: admin"
    echo -e "   Email: admin@nasdemsidoarjo.id"
    echo -e "   Password: [use bcrypt to hash your password]"
    echo
    echo -e "${BLUE}🔗 Next steps:${NC}"
    echo -e "   1. Update your application's database configuration"
    echo -e "   2. Set up proper user passwords (hash them with bcrypt)"
    echo -e "   3. Configure your media upload directory"
    echo -e "   4. Set up backup schedule using provided procedures"
    
else
    echo -e "${RED}❌ Database setup failed. Expected at least 9 tables, found ${table_count}.${NC}"
    exit 1
fi
