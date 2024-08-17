// app/pages/register/page.tsx

"use client";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useState } from "react";
import Button from "../../../components/Button";
import { FormOne } from "../../../components/multiStepForm/FormOne";
import { FormTwo } from "../../../components/multiStepForm/FormTwo";
import { FormThree } from "../../../components/multiStepForm/FormThree";
import '../../globals.css'
import Form from "./Form";

// page
export const SignInPage = () => {
  const [index, setIndex] = useState<number>(1);
  // step 1
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  // step 2
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  // step 3
  const [codeVerif, setCodeVerif] = useState("");

  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await signIn("credentials", {
      redirect: false,
      username,
      password,
    });
    if (result?.error) {
      console.error("Login error:", result.error);
    } else {
      console.table(result);
      router.push("/pages/home");
    }
  };

  const renderForm = () => {
    switch (index) {
      case 1:
        return (
          <FormOne
            username={username}
            setUsername={setUsername}
            firstName={firstName}
            setFirstName={setFirstName}
            lastName={lastName}
            setLastName={setLastName}
          />
        );
      case 2:
        return (
          <FormTwo
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            confirmPassword={confirmPassword}
            setConfirmPassword={setConfirmPassword}
          />
        );
      case 3:
        return <FormThree codeVerif={codeVerif} setCodeVerif={setCodeVerif} />;
      default:
        return null;
    }
  };

  const renderProgressIndicator = () => (
    <div className="w-full h-fit flex items-center justify-between gap-2 place-self-end">
      <b
        className={`${
          index >= 1 ? "bg-primary" : "bg-secondary"
        } h-2 w-full text-center rounded-md text-[2px]`}
      >
        1
      </b>
      <b
        className={`${
          index >= 2 ? "bg-primary" : "bg-secondary"
        } h-2 w-full text-center rounded-md text-[2px]`}
      >
        2
      </b>
      <b
        className={`${
          index >= 3 ? "bg-primary" : "bg-secondary"
        } h-2 w-full text-center rounded-md text-[2px]`}
      >
        3
      </b>
    </div>
  );

  
  return (
    <div className="p-8 place-self-center max-h-screen grid gap-6 outline outline-1 outline-[#151515] rounded-lg w-[25%] h-[80%] grid-rows-[1fr_auto_auto_1fr]">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl">Create an account</h1>
        <p className="text-primary">please entrer your details.</p>
      </div>
      {/* <form onSubmit={handleSubmit} className="grid gap-6">
        {renderForm()}
      </form>
      <div className="flex justify-between gap-4">
        {index > 1 && (
          <Button
            color="primary"
            radius="md"
            type="button"
            size="full"
            addClassName="grid place-items-center"
            addOnClick={() => setIndex((prev) => (prev > 1 ? prev - 1 : 1))}
          >
            Back
          </Button>
        )}
        {index < 3 ? (
          <Button
            color="primary"
            radius="md"
            type="button"
            size="full"
            addClassName="grid place-items-center"
            addOnClick={() => setIndex((prev) => (prev < 3 ? prev + 1 : 3))}
          >
            Continue
          </Button>
        ) : (
          <Button
            color="primary"
            radius="md"
            type="submit"
            size="full"
            addClassName="grid place-items-center"
          >
            Register
          </Button>
        )}
      </div>

      {renderProgressIndicator()} */}

      <Form/>
    </div>
  );
};

export default SignInPage;
