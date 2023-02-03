import { PrismaAdapter } from "@next-auth/prisma-adapter";
import type { Prisma } from "@prisma/client";
import type { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import slugify from "slugify";
import { prisma } from "../../../server/db/client";

const createUserProfile = async (message: {
  user: Prisma.UserCreateInput;
}): Promise<void> => {
  await prisma.profile.create({
    data: {
      username: slugify(message.user.name || ""),
      userId: message.user.id || "",
    },
  });
};

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  callbacks: {
    async session({ session, user }) {
      const profileFromDb =
        await prisma.profile.findFirst<Prisma.ProfileFindFirstArgs>({
          where: {
            userId: user.id,
          },
        });

      if (profileFromDb && session.user) session.user.profile = profileFromDb;
      if (session.user) session.user.id = user.id;

      return session;
    },
  },
  events: { createUser: createUserProfile },
};

export default NextAuth(authOptions);
