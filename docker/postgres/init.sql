-- BBSolana PostgreSQL Initialization Script
-- This script runs when the PostgreSQL container is first created

-- Create extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Set timezone
SET timezone = 'UTC';

-- Create additional roles if needed (optional)
-- CREATE ROLE readonly WITH LOGIN PASSWORD 'readonly_password' NOSUPERUSER INHERIT NOCREATEDB NOCREATEROLE NOREPLICATION;
-- CREATE ROLE readwrite WITH LOGIN PASSWORD 'readwrite_password' NOSUPERUSER INHERIT NOCREATEDB NOCREATEROLE NOREPLICATION;

-- Grant privileges (adjust as needed)
-- GRANT CONNECT ON DATABASE bbsolana TO readonly;
-- GRANT CONNECT ON DATABASE bbsolana TO readwrite;

-- Create schema for better organization (optional)
-- CREATE SCHEMA IF NOT EXISTS bbsolana_schema;
-- GRANT USAGE ON SCHEMA bbsolana_schema TO bbsolana;
-- GRANT USAGE ON SCHEMA bbsolana_schema TO readwrite;
-- GRANT SELECT ON ALL TABLES IN SCHEMA bbsolana_schema TO readonly;

-- Set search path for bbsolana user
ALTER ROLE bbsolana SET search_path TO bbsolana_schema, public;

-- Enable statement logging for debugging (disable in production)
ALTER DATABASE bbsolana SET log_statement = 'all';

-- Set work memory (adjust based on your server)
ALTER DATABASE bbsolana SET work_mem = '16MB';

-- Set maintenance work memory
ALTER DATABASE bbsolana SET maintenance_work_mem = '256MB';

-- Log a message
DO $$
BEGIN
    RAISE NOTICE 'BBSolana database initialized successfully';
END $$;