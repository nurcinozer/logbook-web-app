import { FormWrapper } from "@/modules/auth/components";
import protectedAuth from "@/utils/protected";
import {
  Anchor,
  Paper,
  TextInput,
  PasswordInput,
  Group,
  Button,
  Text,
} from "@mantine/core";
import { useSessionContext, useUser } from "@supabase/auth-helpers-react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useState } from "react";

const Login: NextPage = () => {
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

  const handleLogin = async () => {
    setValidationMessage(undefined);
    setLoading(true);

    const { data, error } = await supabaseClient.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      setValidationMessage(error.message);
      return; // early return to prevent redirect
    }

    if (data) {
      router.push("/");
    }
  };

  return (
    <FormWrapper type="login">
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
        <Group position="apart" mt="lg">
          <Anchor<"a">
            onClick={(event) => event.preventDefault()}
            href="#"
            size="sm"
          >
            Forgot password?
          </Anchor>
        </Group>
        <Button fullWidth mt="xl" onClick={handleLogin} loading={loading}>
          Sign in
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

export default Login;
