/*
# Properties, Inquiries, Contact Messages, Media, Homepage Settings

## Overview
Creates tables for kost/property listings, inquiry management, contact messages, media library, and homepage configuration.

## New Tables
1. `properties` — Kost/property listings with slug, descriptions, pricing, facilities, status
2. `property_images` — Gallery images for property listings
3. `partnership_inquiries` — Partnership/collaboration form submissions with status workflow
4. `property_inquiries` — Property management inquiry form submissions
5. `contact_messages` — Contact form submissions with read status
6. `rental_inquiries` — Rental inquiries from prospective tenants
7. `media_library` — Uploaded media files metadata (name, size, URL, type, usage)
8. `homepage_settings` — Single-row table for homepage section configuration
9. `about_content` — Single-row table for about page content

## Security
- properties: Public read published, admin CRUD
- property_images: Public read (when parent published), admin CRUD
- All inquiry/message tables: Public INSERT only, admin SELECT/UPDATE/DELETE (no public read)
- media_library: Admin full CRUD, no public access
- homepage_settings: Public read, admin update
- about_content: Public read, admin update

## Notes
1. Inquiry tables accept anonymous inserts (form submissions) but are only readable by authenticated admins
2. All inquiry tables have a status field with a workflow (new, in_review, contacted, completed, rejected, archived)
3. Internal notes field on inquiry tables for admin use only
*/

-- ============ properties ============
CREATE TABLE IF NOT EXISTS properties (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text NOT NULL UNIQUE,
  description text NOT NULL DEFAULT '',
  address_area text DEFAULT '',
  city text NOT NULL DEFAULT '',
  price numeric(12,2) NOT NULL DEFAULT 0,
  price_period text DEFAULT 'month' CHECK (price_period IN ('month', 'year', 'day')),
  facilities text[] DEFAULT '{}',
  cover_image_url text,
  property_type text DEFAULT 'kost' CHECK (property_type IN ('kost', 'house', 'apartment', 'shop', 'other')),
  room_type text DEFAULT '',
  availability text DEFAULT 'available' CHECK (availability IN ('available', 'limited', 'full')),
  contact_method text DEFAULT '',
  status text NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  is_featured boolean NOT NULL DEFAULT false,
  sort_order int NOT NULL DEFAULT 0,
  seo_title text DEFAULT '',
  meta_description text DEFAULT '',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE properties ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_read_properties" ON properties;
CREATE POLICY "public_read_properties" ON properties FOR SELECT
  TO anon, authenticated USING (status = 'published');

DROP POLICY IF EXISTS "admin_insert_properties" ON properties;
CREATE POLICY "admin_insert_properties" ON properties FOR INSERT
  TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "admin_update_properties" ON properties;
CREATE POLICY "admin_update_properties" ON properties FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "admin_delete_properties" ON properties;
CREATE POLICY "admin_delete_properties" ON properties FOR DELETE
  TO authenticated USING (true);

CREATE INDEX IF NOT EXISTS idx_properties_slug ON properties(slug);
CREATE INDEX IF NOT EXISTS idx_properties_status ON properties(status);
CREATE INDEX IF NOT EXISTS idx_properties_city ON properties(city);
CREATE INDEX IF NOT EXISTS idx_properties_type ON properties(property_type);
CREATE INDEX IF NOT EXISTS idx_properties_featured ON properties(is_featured);

-- ============ property_images ============
CREATE TABLE IF NOT EXISTS property_images (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  property_id uuid NOT NULL REFERENCES properties(id) ON DELETE CASCADE,
  image_url text NOT NULL,
  caption text DEFAULT '',
  sort_order int NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE property_images ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_read_property_images" ON property_images;
CREATE POLICY "public_read_property_images" ON property_images FOR SELECT
  TO anon, authenticated USING (
    EXISTS (SELECT 1 FROM properties WHERE properties.id = property_images.property_id AND properties.status = 'published')
  );

DROP POLICY IF EXISTS "admin_insert_property_images" ON property_images;
CREATE POLICY "admin_insert_property_images" ON property_images FOR INSERT
  TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "admin_update_property_images" ON property_images;
CREATE POLICY "admin_update_property_images" ON property_images FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "admin_delete_property_images" ON property_images;
CREATE POLICY "admin_delete_property_images" ON property_images FOR DELETE
  TO authenticated USING (true);

CREATE INDEX IF NOT EXISTS idx_property_images_prop ON property_images(property_id);

-- ============ partnership_inquiries ============
CREATE TABLE IF NOT EXISTS partnership_inquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  applicant_name text NOT NULL,
  organization_name text DEFAULT '',
  email text NOT NULL,
  whatsapp_number text NOT NULL,
  cooperation_type text NOT NULL DEFAULT 'paid_promote',
  event_or_campaign_name text DEFAULT '',
  event_date date,
  message text NOT NULL DEFAULT '',
  proposal_link text DEFAULT '',
  status text NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'in_review', 'contacted', 'completed', 'rejected', 'archived')),
  is_read boolean NOT NULL DEFAULT false,
  internal_notes text DEFAULT '',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE partnership_inquiries ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_insert_partnership" ON partnership_inquiries;
CREATE POLICY "public_insert_partnership" ON partnership_inquiries FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "admin_read_partnership" ON partnership_inquiries;
CREATE POLICY "admin_read_partnership" ON partnership_inquiries FOR SELECT
  TO authenticated USING (true);

DROP POLICY IF EXISTS "admin_update_partnership" ON partnership_inquiries;
CREATE POLICY "admin_update_partnership" ON partnership_inquiries FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "admin_delete_partnership" ON partnership_inquiries;
CREATE POLICY "admin_delete_partnership" ON partnership_inquiries FOR DELETE
  TO authenticated USING (true);

CREATE INDEX IF NOT EXISTS idx_partnership_status ON partnership_inquiries(status);
CREATE INDEX IF NOT EXISTS idx_partnership_created ON partnership_inquiries(created_at);

-- ============ property_inquiries ============
CREATE TABLE IF NOT EXISTS property_inquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_name text NOT NULL,
  whatsapp_number text NOT NULL,
  email text NOT NULL,
  property_name text NOT NULL,
  city_area text NOT NULL,
  unit_count int,
  service_needed text NOT NULL DEFAULT '',
  description text DEFAULT '',
  status text NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'in_review', 'contacted', 'completed', 'rejected', 'archived')),
  is_read boolean NOT NULL DEFAULT false,
  internal_notes text DEFAULT '',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE property_inquiries ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_insert_prop_inquiry" ON property_inquiries;
CREATE POLICY "public_insert_prop_inquiry" ON property_inquiries FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "admin_read_prop_inquiry" ON property_inquiries;
CREATE POLICY "admin_read_prop_inquiry" ON property_inquiries FOR SELECT
  TO authenticated USING (true);

DROP POLICY IF EXISTS "admin_update_prop_inquiry" ON property_inquiries;
CREATE POLICY "admin_update_prop_inquiry" ON property_inquiries FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "admin_delete_prop_inquiry" ON property_inquiries;
CREATE POLICY "admin_delete_prop_inquiry" ON property_inquiries FOR DELETE
  TO authenticated USING (true);

-- ============ contact_messages ============
CREATE TABLE IF NOT EXISTS contact_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  subject text DEFAULT '',
  message text NOT NULL DEFAULT '',
  is_read boolean NOT NULL DEFAULT false,
  status text NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'read', 'responded', 'archived')),
  internal_notes text DEFAULT '',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_insert_contact" ON contact_messages;
CREATE POLICY "public_insert_contact" ON contact_messages FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "admin_read_contact" ON contact_messages;
CREATE POLICY "admin_read_contact" ON contact_messages FOR SELECT
  TO authenticated USING (true);

DROP POLICY IF EXISTS "admin_update_contact" ON contact_messages;
CREATE POLICY "admin_update_contact" ON contact_messages FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "admin_delete_contact" ON contact_messages;
CREATE POLICY "admin_delete_contact" ON contact_messages FOR DELETE
  TO authenticated USING (true);

-- ============ rental_inquiries ============
CREATE TABLE IF NOT EXISTS rental_inquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_name text NOT NULL,
  whatsapp_number text NOT NULL,
  email text NOT NULL,
  property_id uuid REFERENCES properties(id) ON DELETE SET NULL,
  message text DEFAULT '',
  status text NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'in_review', 'contacted', 'completed', 'rejected', 'archived')),
  is_read boolean NOT NULL DEFAULT false,
  internal_notes text DEFAULT '',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE rental_inquiries ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_insert_rental" ON rental_inquiries;
CREATE POLICY "public_insert_rental" ON rental_inquiries FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "admin_read_rental" ON rental_inquiries;
CREATE POLICY "admin_read_rental" ON rental_inquiries FOR SELECT
  TO authenticated USING (true);

DROP POLICY IF EXISTS "admin_update_rental" ON rental_inquiries;
CREATE POLICY "admin_update_rental" ON rental_inquiries FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "admin_delete_rental" ON rental_inquiries;
CREATE POLICY "admin_delete_rental" ON rental_inquiries FOR DELETE
  TO authenticated USING (true);

-- ============ media_library ============
CREATE TABLE IF NOT EXISTS media_library (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  file_name text NOT NULL,
  file_url text NOT NULL,
  file_type text NOT NULL DEFAULT 'image',
  file_size bigint DEFAULT 0,
  width int,
  height int,
  alt_text text DEFAULT '',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE media_library ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "admin_read_media" ON media_library;
CREATE POLICY "admin_read_media" ON media_library FOR SELECT
  TO authenticated USING (true);

DROP POLICY IF EXISTS "admin_insert_media" ON media_library;
CREATE POLICY "admin_insert_media" ON media_library FOR INSERT
  TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "admin_update_media" ON media_library;
CREATE POLICY "admin_update_media" ON media_library FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "admin_delete_media" ON media_library;
CREATE POLICY "admin_delete_media" ON media_library FOR DELETE
  TO authenticated USING (true);

-- ============ homepage_settings ============
CREATE TABLE IF NOT EXISTS homepage_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  hero_headline text NOT NULL DEFAULT 'Connecting Ideas, Creating Opportunities.',
  hero_description text NOT NULL DEFAULT 'CV Digital Creative Media menghadirkan solusi digital media, layanan kreatif, promosi, kolaborasi event, dan pengelolaan properti untuk menghubungkan brand, bisnis, serta masyarakat.',
  hero_image_url text,
  hero_cta_primary_label text NOT NULL DEFAULT 'Explore Our Work',
  hero_cta_primary_link text NOT NULL DEFAULT '/portfolio',
  hero_cta_secondary_label text NOT NULL DEFAULT 'Lets Collaborate',
  hero_cta_secondary_link text NOT NULL DEFAULT '/partnership',
  about_preview_title text NOT NULL DEFAULT 'About Digital Creative Media',
  about_preview_text text NOT NULL DEFAULT 'CV Digital Creative Media is a creative company connecting brands, businesses, and communities through digital media, promotion, and event collaboration.',
  about_preview_link text NOT NULL DEFAULT '/about',
  featured_service_ids uuid[] DEFAULT '{}',
  featured_portfolio_ids uuid[] DEFAULT '{}',
  featured_article_ids uuid[] DEFAULT '{}',
  featured_property_ids uuid[] DEFAULT '{}',
  show_services_section boolean NOT NULL DEFAULT true,
  show_portfolio_section boolean NOT NULL DEFAULT true,
  show_news_section boolean NOT NULL DEFAULT true,
  show_property_section boolean NOT NULL DEFAULT true,
  show_partnership_cta boolean NOT NULL DEFAULT true,
  show_about_preview boolean NOT NULL DEFAULT true,
  show_contact_preview boolean NOT NULL DEFAULT true,
  partnership_cta_title text NOT NULL DEFAULT 'Ready to Collaborate?',
  partnership_cta_text text NOT NULL DEFAULT 'Whether you are a brand, event organizer, or property owner — we would love to hear from you.',
  partnership_cta_button_label text NOT NULL DEFAULT 'Start a Partnership',
  partnership_cta_button_link text NOT NULL DEFAULT '/partnership',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE homepage_settings ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_read_homepage" ON homepage_settings;
CREATE POLICY "public_read_homepage" ON homepage_settings FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "admin_update_homepage" ON homepage_settings;
CREATE POLICY "admin_update_homepage" ON homepage_settings FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);

-- ============ about_content ============
CREATE TABLE IF NOT EXISTS about_content (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company_profile text NOT NULL DEFAULT '',
  business_description text NOT NULL DEFAULT '',
  vision text NOT NULL DEFAULT '',
  mission text NOT NULL DEFAULT '',
  company_values text NOT NULL DEFAULT '',
  business_fields text NOT NULL DEFAULT '',
  image_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE about_content ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_read_about" ON about_content;
CREATE POLICY "public_read_about" ON about_content FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "admin_update_about" ON about_content;
CREATE POLICY "admin_update_about" ON about_content FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);

-- ============ updated_at trigger function ============
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply triggers to tables with updated_at
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'trg_site_settings_updated') THEN
    CREATE TRIGGER trg_site_settings_updated BEFORE UPDATE ON site_settings FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'trg_admin_profiles_updated') THEN
    CREATE TRIGGER trg_admin_profiles_updated BEFORE UPDATE ON admin_profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'trg_nav_updated') THEN
    CREATE TRIGGER trg_nav_updated BEFORE UPDATE ON navigation_items FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'trg_services_updated') THEN
    CREATE TRIGGER trg_services_updated BEFORE UPDATE ON services FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'trg_portfolio_cat_updated') THEN
    CREATE TRIGGER trg_portfolio_cat_updated BEFORE UPDATE ON portfolio_categories FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'trg_portfolio_updated') THEN
    CREATE TRIGGER trg_portfolio_updated BEFORE UPDATE ON portfolio_projects FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'trg_article_cat_updated') THEN
    CREATE TRIGGER trg_article_cat_updated BEFORE UPDATE ON article_categories FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'trg_articles_updated') THEN
    CREATE TRIGGER trg_articles_updated BEFORE UPDATE ON articles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'trg_properties_updated') THEN
    CREATE TRIGGER trg_properties_updated BEFORE UPDATE ON properties FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'trg_homepage_updated') THEN
    CREATE TRIGGER trg_homepage_updated BEFORE UPDATE ON homepage_settings FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'trg_about_updated') THEN
    CREATE TRIGGER trg_about_updated BEFORE UPDATE ON about_content FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'trg_partnership_updated') THEN
    CREATE TRIGGER trg_partnership_updated BEFORE UPDATE ON partnership_inquiries FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'trg_prop_inquiry_updated') THEN
    CREATE TRIGGER trg_prop_inquiry_updated BEFORE UPDATE ON property_inquiries FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'trg_rental_updated') THEN
    CREATE TRIGGER trg_rental_updated BEFORE UPDATE ON rental_inquiries FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
  END IF;
END
$$;
