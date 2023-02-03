import type { ColorScheme } from "@mantine/core";
import { ColorSchemeProvider, MantineProvider } from "@mantine/core";
import { SessionProvider } from "next-auth/react";

import { trpc } from "../utils/trpc";

import "../styles/globals.css";

import { useState } from "react";
import type { Session } from "next-auth";
import type { AppType } from "next/app";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  const [colorScheme, setColorScheme] = useState<ColorScheme>("light");
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

  return (
    <SessionProvider session={session}>
      <ColorSchemeProvider
        colorScheme={colorScheme}
        toggleColorScheme={toggleColorScheme}
      >
        <MantineProvider
          theme={{ colorScheme: colorScheme }}
          withGlobalStyles
          withNormalizeCSS
        >
          <Component {...pageProps} />
        </MantineProvider>
      </ColorSchemeProvider>
    </SessionProvider>
  );
};

export default trpc.withTRPC(MyApp);
