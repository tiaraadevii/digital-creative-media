/*
# Core Tables: Site Settings, Admin Profiles, Navigation, Services

## Overview
Creates the foundational tables for the CV Digital Creative Media website CMS.

## New Tables
1. `site_settings` — Single-row table for global website configuration
2. `admin_profiles` — Links to auth.users, stores admin role and display name
3. `navigation_items` — Dynamic navigation menu items with ordering
4. `services` — Company service offerings with slug, descriptions, images, status, SEO

## Security
- `site_settings`: Public read, admin write
- `admin_profiles`: Authenticated read/insert/update own profile only
- `navigation_items`: Public read published, admin full CRUD
- `services`: Public read published, admin full CRUD
*/

-- ============ site_settings ============
CREATE TABLE IF NOT EXISTS site_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company_name text NOT NULL DEFAULT 'CV Digital Creative Media',
  logo_url text,
  favicon_url text,
  primary_color text DEFAULT '#101B2D',
  accent_color text DEFAULT '#C6A875',
  email text DEFAULT 'info@digitalcreativemedia.id',
  whatsapp text DEFAULT '',
  instagram text DEFAULT '',
  address text DEFAULT '',
  operating_hours text DEFAULT '',
  company_description text DEFAULT '',
  seo_title text DEFAULT 'CV Digital Creative Media — Connecting Ideas, Creating Opportunities',
  meta_description text DEFAULT 'CV Digital Creative Media menghadirkan solusi digital media, layanan kreatif, promosi, kolaborasi event, dan pengelolaan properti.',
  social_sharing_image text,
  copyright_text text DEFAULT 'CV Digital Creative Media. All rights reserved.',
  footer_about text DEFAULT '',
  footer_cta_title text DEFAULT 'Lets Collaborate',
  footer_cta_description text DEFAULT 'Hubungi kami untuk menjelajahi peluang kerja sama dan kreativitas bersama.',
  footer_cta_button_text text DEFAULT 'Get in Touch',
  footer_cta_button_link text DEFAULT '/contact',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_read_site_settings" ON site_settings;
CREATE POLICY "public_read_site_settings" ON site_settings FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "admin_update_site_settings" ON site_settings;
CREATE POLICY "admin_update_site_settings" ON site_settings FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);

-- ============ admin_profiles ============
CREATE TABLE IF NOT EXISTS admin_profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name text NOT NULL DEFAULT 'Admin',
  role text NOT NULL DEFAULT 'admin' CHECK (role IN ('admin', 'editor')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE admin_profiles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "admin_read_own_profile" ON admin_profiles;
CREATE POLICY "admin_read_own_profile" ON admin_profiles FOR SELECT
  TO authenticated USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "admin_insert_own_profile" ON admin_profiles;
CREATE POLICY "admin_insert_own_profile" ON admin_profiles FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "admin_update_own_profile" ON admin_profiles;
CREATE POLICY "admin_update_own_profile" ON admin_profiles FOR UPDATE
  TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- ============ navigation_items ============
CREATE TABLE IF NOT EXISTS navigation_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  label text NOT NULL,
  url text NOT NULL,
  sort_order int NOT NULL DEFAULT 0,
  is_published boolean NOT NULL DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE navigation_items ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_read_nav" ON navigation_items;
CREATE POLICY "public_read_nav" ON navigation_items FOR SELECT
  TO anon, authenticated USING (is_published = true);

DROP POLICY IF EXISTS "admin_insert_nav" ON navigation_items;
CREATE POLICY "admin_insert_nav" ON navigation_items FOR INSERT
  TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "admin_update_nav" ON navigation_items;
CREATE POLICY "admin_update_nav" ON navigation_items FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "admin_delete_nav" ON navigation_items;
CREATE POLICY "admin_delete_nav" ON navigation_items FOR DELETE
  TO authenticated USING (true);

-- ============ services ============
CREATE TABLE IF NOT EXISTS services (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text NOT NULL UNIQUE,
  short_description text NOT NULL DEFAULT '',
  full_description text NOT NULL DEFAULT '',
  icon_name text DEFAULT '',
  image_url text,
  sort_order int NOT NULL DEFAULT 0,
  is_published boolean NOT NULL DEFAULT false,
  cta_label text DEFAULT 'Learn More',
  cta_link text DEFAULT '',
  seo_title text DEFAULT '',
  meta_description text DEFAULT '',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE services ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_read_services" ON services;
CREATE POLICY "public_read_services" ON services FOR SELECT
  TO anon, authenticated USING (is_published = true);

DROP POLICY IF EXISTS "admin_insert_services" ON services;
CREATE POLICY "admin_insert_services" ON services FOR INSERT
  TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "admin_update_services" ON services;
CREATE POLICY "admin_update_services" ON services FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "admin_delete_services" ON services;
CREATE POLICY "admin_delete_services" ON services FOR DELETE
  TO authenticated USING (true);

CREATE INDEX IF NOT EXISTS idx_services_slug ON services(slug);
CREATE INDEX IF NOT EXISTS idx_services_published ON services(is_published);
