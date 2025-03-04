"use client";

import { logIn, signUp } from "@/actions/actions";
import AuthFormButton from "./AuthFormButton";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useFormState } from "react-dom";

type AuthFormProps = {
  type: "login" | "signup";
};

export default function AuthForm({ type }: AuthFormProps) {
  const [signUpError, dispatchSignUp] = useFormState(signUp, undefined);
  const [logInError, dispatchLogIn] = useFormState(logIn, undefined);

  return (
    <form action={type === "login" ? dispatchLogIn : dispatchSignUp}>
      <div className="spacy-y-1">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          className="border-zinc-400"
          required
          maxLength={100}
        />
      </div>
      <div className="spacy-y-1 mt-2 mb-4">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          name="password"
          type="password"
          className="border-zinc-400"
          required
          maxLength={100}
        />
      </div>

      <AuthFormButton type={type} />

      {signUpError && (
        <p className="text-red-500 text-sm mt-2">{signUpError.message}</p>
      )}
      {logInError && (
        <p className="text-red-500 text-sm mt-2">{logInError.message}</p>
      )}
    </form>
  );
}
