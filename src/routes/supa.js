import { createClient } from '@supabase/supabase-js';

const supabase = createClient('https://xknymdtoevzozdfhgngn.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhrbnltZHRvZXZ6b3pkZmhnbmduIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcwMzk2NzE3NiwiZXhwIjoyMDE5NTQzMTc2fQ.CTSEcrIEKPEHrAhMqfsEvTUEW_R5AHkRi364J9tax-c')

export default supabase;