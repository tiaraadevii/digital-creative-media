import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://rcslprrocgugpxiqnhmt.supabase.co';
const SUPABASE_ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJjc2xwcnJvY2d1Z3B4aXFuaG10Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTI3MzY1NTQsImV4cCI6MjEwODMxMjU1NH0.Q-yqbY1ydYDTU2BCIBIPNuB-zyCFMwJl6mz01EOJsYc';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
