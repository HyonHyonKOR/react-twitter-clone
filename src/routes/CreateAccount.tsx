import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import styled from "styled-components";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

interface IFormInput {
  name: string;
  email: string;
  password: string;
}

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 420px;
  padding: 50px 0px;
`;

const Title = styled.h1`
  font-size: 42px;
`;
const Form = styled.form`
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
`;

const Input = styled.input`
  padding: 10px 20px;
  border-radius: 50px;
  border: none;
  width: 100%;
  font-size: 16px;
  &[type="submit"] {
    cursor: pointer;
    &:hover,
    &:focus {
      color: white;
      background-color: #08a0e9;
    }
  }
`;
const Message = styled.p`
  margin-left: 0.5rem;
  font-size: 0.875rem;
  color: crimson;

  &::before {
    display: inline;
    content: "⚠ ";
  }
`;

const Error = styled.span`
  font-weight: 600;
  color: red;
`;

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
    if (isLoading) return;
    try {
      setLoading(true);
      const credentials = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      console.log(credentials.user);
      await updateProfile(credentials.user, {
        displayName: data.name,
      });
      navigate("/");
    } catch (error) {
      console.log("error!");
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
    </Wrapper>
  );
}
