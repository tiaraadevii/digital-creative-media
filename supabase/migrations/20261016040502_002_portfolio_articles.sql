/*
# Portfolio and Articles Tables

## Overview
Creates tables for portfolio projects (with categories and images) and news articles (with categories).

## New Tables
1. `portfolio_categories` — Categories for portfolio projects
2. `portfolio_projects` — Portfolio project entries with slug, descriptions, status, featured flag
3. `portfolio_images` — Gallery images for portfolio projects
4. `article_categories` — Categories for news articles
5. `articles` — News/article entries with slug, content, status, featured flag, author

## Security
- portfolio_categories / article_categories: Public read, admin CRUD
- portfolio_projects: Public read published only, admin CRUD
- portfolio_images: Public read (when parent project is published), admin CRUD
- articles: Public read published only, admin CRUD

## Relationships
- portfolio_projects → portfolio_categories (FK)
- portfolio_images → portfolio_projects (FK, cascade delete)
- articles → article_categories (FK)
*/

-- ============ portfolio_categories ============
CREATE TABLE IF NOT EXISTS portfolio_categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text NOT NULL UNIQUE,
  sort_order int NOT NULL DEFAULT 0,
  is_published boolean NOT NULL DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE portfolio_categories ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_read_portfolio_cat" ON portfolio_categories;
CREATE POLICY "public_read_portfolio_cat" ON portfolio_categories FOR SELECT
  TO anon, authenticated USING (is_published = true);

DROP POLICY IF EXISTS "admin_insert_portfolio_cat" ON portfolio_categories;
CREATE POLICY "admin_insert_portfolio_cat" ON portfolio_categories FOR INSERT
  TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "admin_update_portfolio_cat" ON portfolio_categories;
CREATE POLICY "admin_update_portfolio_cat" ON portfolio_categories FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "admin_delete_portfolio_cat" ON portfolio_categories;
CREATE POLICY "admin_delete_portfolio_cat" ON portfolio_categories FOR DELETE
  TO authenticated USING (true);

-- ============ portfolio_projects ============
CREATE TABLE IF NOT EXISTS portfolio_projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text NOT NULL UNIQUE,
  category_id uuid REFERENCES portfolio_categories(id) ON DELETE SET NULL,
  client_name text DEFAULT '',
  short_description text NOT NULL DEFAULT '',
  full_description text NOT NULL DEFAULT '',
  cover_image_url text,
  project_date date,
  location text DEFAULT '',
  services_rendered text DEFAULT '',
  external_link text DEFAULT '',
  status text NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  is_featured boolean NOT NULL DEFAULT false,
  sort_order int NOT NULL DEFAULT 0,
  seo_title text DEFAULT '',
  meta_description text DEFAULT '',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE portfolio_projects ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_read_portfolio" ON portfolio_projects;
CREATE POLICY "public_read_portfolio" ON portfolio_projects FOR SELECT
  TO anon, authenticated USING (status = 'published');

DROP POLICY IF EXISTS "admin_insert_portfolio" ON portfolio_projects;
CREATE POLICY "admin_insert_portfolio" ON portfolio_projects FOR INSERT
  TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "admin_update_portfolio" ON portfolio_projects;
CREATE POLICY "admin_update_portfolio" ON portfolio_projects FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "admin_delete_portfolio" ON portfolio_projects;
CREATE POLICY "admin_delete_portfolio" ON portfolio_projects FOR DELETE
  TO authenticated USING (true);

CREATE INDEX IF NOT EXISTS idx_portfolio_slug ON portfolio_projects(slug);
CREATE INDEX IF NOT EXISTS idx_portfolio_status ON portfolio_projects(status);
CREATE INDEX IF NOT EXISTS idx_portfolio_featured ON portfolio_projects(is_featured);
CREATE INDEX IF NOT EXISTS idx_portfolio_category ON portfolio_projects(category_id);

-- ============ portfolio_images ============
CREATE TABLE IF NOT EXISTS portfolio_images (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid NOT NULL REFERENCES portfolio_projects(id) ON DELETE CASCADE,
  image_url text NOT NULL,
  caption text DEFAULT '',
  sort_order int NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE portfolio_images ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_read_portfolio_images" ON portfolio_images;
CREATE POLICY "public_read_portfolio_images" ON portfolio_images FOR SELECT
  TO anon, authenticated USING (
    EXISTS (SELECT 1 FROM portfolio_projects WHERE portfolio_projects.id = portfolio_images.project_id AND portfolio_projects.status = 'published')
  );

DROP POLICY IF EXISTS "admin_insert_portfolio_images" ON portfolio_images;
CREATE POLICY "admin_insert_portfolio_images" ON portfolio_images FOR INSERT
  TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "admin_update_portfolio_images" ON portfolio_images;
CREATE POLICY "admin_update_portfolio_images" ON portfolio_images FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "admin_delete_portfolio_images" ON portfolio_images;
CREATE POLICY "admin_delete_portfolio_images" ON portfolio_images FOR DELETE
  TO authenticated USING (true);

CREATE INDEX IF NOT EXISTS idx_portfolio_images_project ON portfolio_images(project_id);

-- ============ article_categories ============
CREATE TABLE IF NOT EXISTS article_categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text NOT NULL UNIQUE,
  sort_order int NOT NULL DEFAULT 0,
  is_published boolean NOT NULL DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE article_categories ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_read_article_cat" ON article_categories;
CREATE POLICY "public_read_article_cat" ON article_categories FOR SELECT
  TO anon, authenticated USING (is_published = true);

DROP POLICY IF EXISTS "admin_insert_article_cat" ON article_categories;
CREATE POLICY "admin_insert_article_cat" ON article_categories FOR INSERT
  TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "admin_update_article_cat" ON article_categories;
CREATE POLICY "admin_update_article_cat" ON article_categories FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "admin_delete_article_cat" ON article_categories;
CREATE POLICY "admin_delete_article_cat" ON article_categories FOR DELETE
  TO authenticated USING (true);

-- ============ articles ============
CREATE TABLE IF NOT EXISTS articles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text NOT NULL UNIQUE,
  summary text NOT NULL DEFAULT '',
  content text NOT NULL DEFAULT '',
  featured_image_url text,
  category_id uuid REFERENCES article_categories(id) ON DELETE SET NULL,
  author text NOT NULL DEFAULT 'CV Digital Creative Media',
  status text NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  is_featured boolean NOT NULL DEFAULT false,
  published_at timestamptz,
  seo_title text DEFAULT '',
  meta_description text DEFAULT '',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE articles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_read_articles" ON articles;
CREATE POLICY "public_read_articles" ON articles FOR SELECT
  TO anon, authenticated USING (status = 'published');

DROP POLICY IF EXISTS "admin_insert_articles" ON articles;
CREATE POLICY "admin_insert_articles" ON articles FOR INSERT
  TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "admin_update_articles" ON articles;
CREATE POLICY "admin_update_articles" ON articles FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "admin_delete_articles" ON articles;
CREATE POLICY "admin_delete_articles" ON articles FOR DELETE
  TO authenticated USING (true);

CREATE INDEX IF NOT EXISTS idx_articles_slug ON articles(slug);
CREATE INDEX IF NOT EXISTS idx_articles_status ON articles(status);
CREATE INDEX IF NOT EXISTS idx_articles_published_at ON articles(published_at);
CREATE INDEX IF NOT EXISTS idx_articles_category ON articles(category_id);
CREATE INDEX IF NOT EXISTS idx_articles_featured ON articles(is_featured);
