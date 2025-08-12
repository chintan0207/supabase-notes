import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://mgxwuoccaqdqahyluubh.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1neHd1b2NjYXFkcWFoeWx1dWJoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTUwMDg3MzEsImV4cCI6MjA3MDU4NDczMX0.7rJ2rTFXs9TLS_3d_wX9GLk4GBASE42K_B_g8RhduLM";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
