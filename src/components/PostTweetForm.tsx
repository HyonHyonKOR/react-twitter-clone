import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { styled } from "styled-components";

interface IFormInput {
  textarea: string;
  file: FileList | null;
}
const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
const TextArea = styled.textarea`
  border: 2px solid white;
  padding: 20px;
  border-radius: 20px;
  font-size: 16px;
  color: white;
  background-color: black;
  width: 100%;
  resize: none;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  &::placeholder {
    font-size: 16px;
  }
  &:focus {
    outline: none;
    border-color: #1d9bf0;
  }
`;
const AttachFileButton = styled.label`
  padding: 10px 0px;
  color: #1d9bf0;
  text-align: center;
  border-radius: 20px;
  border: 1px solid #1d9bf0;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
`;
const AttachFileInput = styled.input`
  display: none;
`;
const SubmitBtn = styled.input`
  background-color: #1d9bf0;
  color: white;
  border: none;
  padding: 10px 0px;
  border-radius: 20px;
  font-size: 16px;
  cursor: pointer;
  &:hover,
  &:active {
    opacity: 0.9;
  }
`;

export default function PostTweetForm() {
  const [isLoading, setLoading] = useState(false);
  const { register, handleSubmit } = useForm<IFormInput>();
  const onValid: SubmitHandler<IFormInput> = async (data) => {
    console.log(data.textarea);
    console.log(data.file);
  };

  return (
    <Form>
      <TextArea
        {...register("textarea", {
          required: true,
          maxLength: {
            value: 180,
            message: "Description cannot be longer than 180 characters",
          },
        })}
        placeholder="What is happening?!"
        rows={5}
      />
      <AttachFileButton htmlFor="file">Add Photo</AttachFileButton>
      <AttachFileInput
        {...register("file")}
        type="file"
        id="file"
        accept="image/*"
      />
      <SubmitBtn
        onSubmit={handleSubmit(onValid)}
        type="submit"
        value={isLoading ? "Posting..." : "Post Tweet"}
      />
    </Form>
  );
}
