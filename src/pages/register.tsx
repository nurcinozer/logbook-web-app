import { useSessionContext, useUser } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import type { NextPage } from "next/types";
import { useState } from "react";

const Register: NextPage = () => {
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

  const handleRegister = async () => {
    setErrorMessage(undefined);
    setLoading(true);

    const {
      data: { session },
      error,
    } = await supabaseClient.auth.signUp({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      setErrorMessage(error.message);
      return; // early return to prevent redirect
    }

    if (session) {
      router.push("/");
    } else {
      setErrorMessage(
        "Check your email and click the link in the message to activate your account."
      );
    }
  };

  return (
    <div>
      <h1>Register</h1>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          handleRegister();
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
            Sign Up
          </button>

          {errorMessage && <p>{errorMessage}</p>}
        </div>
      </form>
    </div>
  );
};

export default Register;
