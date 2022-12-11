import type { Context } from "@/types/context";
import {
  createServerSupabaseClient,
  type User,
} from "@supabase/auth-helpers-nextjs";

export const getUserFromContext = async (
  ctx: Context
): Promise<User | null> => {
  const supabaseServerClient = createServerSupabaseClient(ctx);

  const {
    data: { user },
  } = await supabaseServerClient.auth.getUser();

  return user;
};
