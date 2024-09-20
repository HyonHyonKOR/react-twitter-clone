import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import styled from "styled-components";
import { auth } from "../firebase";

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
    &:hover {
      opacity: 0.8;
    }
  }
`;

const Error = styled.span`
  font-weight: 600;
  color: red;
`;

export default function CreateAccount() {
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();

  const onValid: SubmitHandler<IFormInput> = async (data) => {
    if (
      isLoading ||
      data.name === "" ||
      data.email === "" ||
      data.password === "" ||
      data.password.length < 6
    )
      return;
    try {
      const credentials = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      console.log(credentials);
    } catch (error) {
      console.log(1);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Wrapper>
      <Title>Join 𝕏 </Title>
      <Form onSubmit={handleSubmit(onValid)}>
        <Input
          {...register("name", { required: true })}
          placeholder="name"
          type="text"
        />
        {errors.name && "you need name"}
        <Input
          {...register("email", { required: true })}
          placeholder="email"
          type="email"
        />
        {errors.email && "you need email"}
        <Input
          {...register("password", { required: true, min: 6 })}
          placeholder="password"
          type="password"
        />

        {errors.password && "you need password"}
        <Input type="submit" value="Create Account" />
      </Form>
      {error !== "" ? <Error>{error}</Error> : null}
    </Wrapper>
  );
}
