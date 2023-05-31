import React from "react";
import Form from "../../components/Auth/Form";

export const metadata = {
  title: "Sign Up",
};

function SignUp() {
  return <Form signInMode={false} />;
}

export default SignUp;
