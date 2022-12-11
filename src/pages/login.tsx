import protectedAuth from "@/utils/protected";
import { useSessionContext, useUser } from "@supabase/auth-helpers-react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useState } from "react";

const Login: NextPage = () => {
  const user = useUser();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState<string>();
  const [loading, setLoading] = useState(false);

  const { supabaseClient } = useSessionContext();

  if (user) {
    router.push("/");
  }

  const handleLogin = async () => {
    setErrorMessage(undefined);
    setLoading(true);

    const { data, error } = await supabaseClient.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      setErrorMessage(error.message);
      return; // early return to prevent redirect
    }

    if (data) {
      router.push("/");
    }
  };

  return (
    <div>
      <h1>Sign In</h1>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          handleLogin();
        }}
        method="POST"
      >
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />

          <button type="submit" disabled={loading}>
            Sign In
          </button>

          {errorMessage && <p>{errorMessage}</p>}
        </div>
      </form>
    </div>
  );
};

export const getServerSideProps = protectedAuth;

export default Login;
