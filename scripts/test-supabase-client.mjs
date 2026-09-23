import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://cxxpbyqgvumvuqedoefc.supabase.co';
const supabaseKey = 'sb_publishable_rEr19UmzqjPeLKl4mfbQkg_HRawiXsg';

const supabase = createClient(supabaseUrl, supabaseKey);

async function test() {
  console.log('Testing Supabase client query...');
  const { data: projects, error: pErr } = await supabase.from('projects').select('*');
  if (pErr) console.error('Projects query error:', pErr);
  else console.log(`Fetched ${projects.length} projects successfully!`);

  const { data: services, error: sErr } = await supabase.from('services').select('*');
  if (sErr) console.error('Services query error:', sErr);
  else console.log(`Fetched ${services.length} services successfully!`);

  const { data: experiences, error: eErr } = await supabase.from('experiences').select('*').order('sort_order', { ascending: true });
  if (eErr) console.error('Experiences query error:', eErr);
  else console.log(`Fetched ${experiences.length} experiences successfully!`);

  const { data: certs, error: cErr } = await supabase.from('certifications').select('*').order('sort_order', { ascending: true });
  if (cErr) console.error('Certifications query error:', cErr);
  else console.log(`Fetched ${certs.length} certifications successfully!`);
}

test();
