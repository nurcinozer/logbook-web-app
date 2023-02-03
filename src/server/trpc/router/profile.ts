import { router, protectedProcedure } from "../trpc";

export const profileRouter = router({
  profileBySession: protectedProcedure.query(async ({ ctx }) => {
    const user = await ctx.prisma.user.findFirst({
      where: {
        id: ctx.session?.user?.id,
      },
      include: {
        profile: true,
      },
    });

    return {
      ...user,
    };
  }),
});
