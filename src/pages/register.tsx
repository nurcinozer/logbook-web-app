import { FormWrapper } from "@/modules/auth/components";
import protectedAuth from "@/utils/protected";
import { Button, Paper, PasswordInput, TextInput, Text } from "@mantine/core";
import { useSessionContext, useUser } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import type { NextPage } from "next/types";
import { useState } from "react";

const Register: NextPage = () => {
  const user = useUser();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validationMessage, setValidationMessage] = useState<string>();
  const [loading, setLoading] = useState(false);

  const { supabaseClient } = useSessionContext();

  if (user) {
    router.push("/");
  }

  const handleRegister = async () => {
    setValidationMessage(undefined);
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
      setValidationMessage(error.message);
      return; // early return to prevent redirect
    }

    if (session) {
      router.push("/");
    } else {
      setValidationMessage(
        "Check your email and click the link in the message to activate your account."
      );
    }
  };

  return (
    <FormWrapper type="register">
      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <TextInput
          label="Email"
          placeholder="john@doe.com"
          required
          onChange={(event) => {
            setEmail(event.currentTarget.value);
          }}
        />
        <PasswordInput
          label="Password"
          placeholder="Your password"
          required
          mt="md"
          onChange={(event) => {
            setPassword(event.currentTarget.value);
          }}
        />
        <Button fullWidth mt="xl" onClick={handleRegister} loading={loading}>
          Register
        </Button>
        {validationMessage && (
          <Text color="red" size="sm" align="center" mt={5}>
            {validationMessage}
          </Text>
        )}
      </Paper>
    </FormWrapper>
  );
};

export const getServerSideProps = protectedAuth;

export default Register;
