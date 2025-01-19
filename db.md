psql -U postgres

-- Drop database if exists
DROP DATABASE IF EXISTS crmitra;

-- Drop user if exists
DROP USER IF EXISTS crmitra;

-- Create user
CREATE USER crmitra WITH PASSWORD 'crmitra';

-- Create database
CREATE DATABASE crmitra OWNER crmitra;

-- Grant all privileges
GRANT ALL PRIVILEGES ON DATABASE crmitra TO crmitra;

-- Connect to the crmitra database
\c crmitra

-- Grant schema permissions
GRANT ALL ON SCHEMA public TO crmitra;

psql -U postgres -c "DROP DATABASE IF EXISTS crmitra; DROP USER IF EXISTS crmitra; CREATE USER crmitra WITH PASSWORD 'crmitra'; CREATE DATABASE crmitra OWNER crmitra; GRANT ALL PRIVILEGES ON DATABASE crmitra TO crmitra; \c crmitra; GRANT ALL ON SCHEMA public TO crmitra;"
