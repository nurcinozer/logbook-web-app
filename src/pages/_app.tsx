import { type AppType } from "next/app";

import { trpc } from "../utils/trpc";

import "../styles/globals.css";
import {
  createBrowserSupabaseClient,
  type Session,
} from "@supabase/auth-helpers-nextjs";
import { useState } from "react";
import { SessionContextProvider } from "@supabase/auth-helpers-react";

type Props = {
  initialSession: Session;
};

const MyApp: AppType<Props> = ({ Component, pageProps }) => {
  const [supabaseClient] = useState(() => createBrowserSupabaseClient());

  return (
    <SessionContextProvider
      supabaseClient={supabaseClient}
      initialSession={pageProps.initialSession}
    >
      <Component {...pageProps} />
    </SessionContextProvider>
  );
};

export default trpc.withTRPC(MyApp);
