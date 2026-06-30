// Handles inserting waitlist signups into Supabase.
// This keeps your components clean and makes the logic reusable.

import { supabase } from "../lib/supabaseClient";

export interface WaitlistInput {
  email: string;
  business_type?: string;
  business_name?: string;
}

export async function joinWaitlist(input: WaitlistInput): Promise<boolean> {
  const { error } = await supabase.from("waitlist_signups").insert({
    email: input.email,
    business_type: input.business_type,
    business_name: input.business_name
  });

  if (error) {
    console.error("Error joining waitlist:", error);
    return false;
  }

  return true;
}