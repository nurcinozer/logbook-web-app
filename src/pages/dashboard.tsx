import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Dashboard: NextPage = () => {
  const router = useRouter();
  const { status: sessionStatus } = useSession();

  useEffect(() => {
    if (sessionStatus !== "loading" && sessionStatus === "unauthenticated") {
      router.push("/");
    }
  });

  return <div>Dashboard</div>;
};

export default Dashboard;
