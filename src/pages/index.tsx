import { type NextPage } from "next";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Home: NextPage = () => {
  const router = useRouter();
  const { status: sessionStatus } = useSession();

  useEffect(() => {
    if (sessionStatus === "authenticated") {
      router.push("/dashboard");
    }
  }, [router, sessionStatus]);

  return <button onClick={() => signIn("google")}>Sign in with Google</button>;
};

export default Home;
