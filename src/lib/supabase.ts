import { createClient } from '@supabase/supabase-js';

// Replace with your actual project URL and Anon Key
const supabaseUrl = 'https://zuzeuuzdyzybfdsahqxn.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp1emV1dXpkeXp5YmZkc2FocXhuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk0NjU5ODQsImV4cCI6MjA4NTA0MTk4NH0.Am9CvjpNTvq81ScAtkny29Ecq0n6jwrpA8EYKL0CLm8';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
