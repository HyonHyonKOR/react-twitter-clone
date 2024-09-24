import { styled } from "styled-components";

export const Wrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 420px;
  padding: 50px 0px;
`;

export const Title = styled.h1`
  font-size: 42px;
`;
export const Form = styled.form`
  margin-top: 50px;
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
`;

export const Input = styled.input`
  padding: 10px 20px;
  border-radius: 50px;
  border: none;
  width: 100%;
  font-size: 16px;
  &[type="submit"] {
    cursor: pointer;
    background-color: #08a0e9;
    color: white;
    &:hover,
    &:focus {
      opacity: 0.8;
    }
  }
`;
export const Message = styled.p`
  margin-left: 0.5rem;
  font-size: 0.875rem;
  color: crimson;

  &::before {
    display: inline;
    content: "⚠ ";
  }
`;

export const Error = styled.span`
  color: crimson;
  font-size: 0.875rem;
`;

export const Switcher = styled.span`
  margin-top: 20px;
  a {
    color: #08a0e9;
    text-decoration: none;
  }
`;
