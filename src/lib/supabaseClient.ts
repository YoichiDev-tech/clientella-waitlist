// This file initializes the Supabase client so the rest of the app can use it.
// It reads your URL + ANON KEY from the .env file.

import { createClient } from "@supabase/supabase-js";

// Vite exposes environment variables via import.meta.env
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

// Create a Supabase client instance
export const supabase = createClient(supabaseUrl, supabaseAnonKey);