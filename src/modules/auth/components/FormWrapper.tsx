import { Anchor, Container, Title, Text } from "@mantine/core";
import router from "next/router";
import React from "react";

type FormWrapperProps = {
  type: "login" | "register";
  children: React.ReactNode;
};

export const FormWrapper = ({ type, children }: FormWrapperProps) => {
  return (
    <Container size={420} my={40}>
      <Title
        align="center"
        sx={(theme) => ({
          fontFamily: `Greycliff CF, ${theme.fontFamily}`,
          fontWeight: 900,
        })}
      >
        {type === "login" ? "Sign in" : "Create account"}
      </Title>
      <Text color="dimmed" size="sm" align="center" mt={5}>
        {type === "login"
          ? "Do not have an account yet? "
          : "Already have an account? "}
        <Anchor<"a">
          href="#"
          size="sm"
          onClick={(event) => {
            event.preventDefault();
            router.push(type === "login" ? "/register" : "/login");
          }}
        >
          {type === "login" ? "Create account" : "Sign in"}
        </Anchor>
      </Text>
      {children}
    </Container>
  );
};
