import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { auth } from "../firebase";
import { Link, useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";
import {
  Form,
  Error,
  Input,
  Switcher,
  Title,
  Message,
  Wrapper,
} from "../components/Auth-components";
import GithubButton from "../components/GithubButton";

interface IFormInput {
  name: string;
  email: string;
  password: string;
}

export default function CreateAccount() {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();

  const onValid: SubmitHandler<IFormInput> = async (data) => {
    setError("");
    if (isLoading) return;
    try {
      setLoading(true);
      const credentials = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      await updateProfile(credentials.user, {
        displayName: data.name,
      });
      navigate("/");
    } catch (error) {
      if (error instanceof FirebaseError) setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Wrapper>
      <Title>Join 𝕏 </Title>
      <Form onSubmit={handleSubmit(onValid)}>
        <Input
          {...register("name", {
            required: "This input is required",
          })}
          placeholder="name"
          type="text"
        />

        <ErrorMessage
          errors={errors}
          name="name"
          render={({ message }) => <Message>{message}</Message>}
        />
        <Input
          {...register("email", { required: "This input is required" })}
          placeholder="email"
          type="email"
        />
        <ErrorMessage
          errors={errors}
          name="email"
          render={({ message }) => <Message>{message}</Message>}
        />
        <Input
          {...register("password", {
            required: "This input is required",
            minLength: {
              value: 6,
              message: "This input requires 6 letters at least",
            },
          })}
          placeholder="password"
          type="password"
        />
        <ErrorMessage
          errors={errors}
          name="password"
          render={({ message }) => <Message>{message}</Message>}
        />
        <Input
          type="submit"
          value={isLoading ? "Loading..." : "Create Account"}
        />
      </Form>
      {error !== "" ? <Error>{error}</Error> : null}
      <Switcher>
        You already have an account?
        <Link to="/login"> Log in &rarr;</Link>
      </Switcher>
      <GithubButton />
    </Wrapper>
  );
}
