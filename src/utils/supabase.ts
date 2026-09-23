import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://cxxpbyqgvumvuqedoefc.supabase.co';
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || 'sb_publishable_rEr19UmzqjPeLKl4mfbQkg_HRawiXsg';

export const supabase = createClient(supabaseUrl, supabaseKey);
