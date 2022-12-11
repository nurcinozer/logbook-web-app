import { getUserFromContext } from "@/utils/serverUser";
import type { Context } from "@/server/trpc/context";

const protectedAuth = async (ctx: Context) => {
  const user = await getUserFromContext(ctx);

  const isAuthenticated = user && user.role === "authenticated";

  if (isAuthenticated) {
    return { props: {}, redirect: { destination: "/" } };
  }

  return { props: {} };
};

export default protectedAuth;
