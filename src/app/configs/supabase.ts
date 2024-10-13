import { createClient } from '@supabase/supabase-js';
import envConfigKeys from './environment-config';

const { supabase_url: supabaseUrl, supabase_api_key: supabaseKey } = envConfigKeys;

const supabase = createClient(supabaseUrl ?? '', supabaseKey ?? '');

export default supabase;
