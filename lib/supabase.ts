import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://zavbnbmjehmdpdusmroc.supabase.co";

export const supabase = createClient(
  supabaseUrl,
  process.env.NEXT_PUBLIC_SUPABSE_ANON_KEY!
);
