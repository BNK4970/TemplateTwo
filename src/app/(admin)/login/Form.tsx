"use client";

import Button from "@/components/Button";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { Eye, EyeOff } from "lucide-react";

interface InputProps {
  id?: string;
  name: string;
  type: string;
  value?: any;
  onChange?: any;
  children: string;
  required?: boolean;
  icon?: boolean;
}

export const Input: React.FC<InputProps> = ({
  id,
  name,
  type,
  value,
  onChange,
  children,
  required,
  icon,
}) => {
  // Gérer l'état pour basculer entre "password" et "text"
  const [showPassword, setShowPassword] = useState(false);

  // Fonction pour basculer le type d'input
  const togglePasswordVisibility = () => {
    setShowPassword((prevState: any) => !prevState);
  };

  return (
    <div className="relative flex items-center">
      <input
        required={required}
        id={id}
        name={name}
        type={showPassword && type === "password" ? "text" : type} // Basculer le type ici
        value={value}
        onChange={onChange}
        placeholder={children}
        className="bg-background rounded-md outline outline-2 outline-[#151515] py-2 px-6 duration-300 focus:outline-primary w-full"
      />
      {icon && type === "password" && (
        <span
          onClick={togglePasswordVisibility} // Gestionnaire d'événement pour basculer la visibilité du mot de passe
          className="absolute right-5 mb-[6px] cursor-pointer size-4"
        >
          {showPassword ? <EyeOff /> : <Eye />} {/* Basculer entre l'icône */}
        </span>
      )}
    </div>
  );
};

export default function Form() {
  const router = useRouter();

  const handleSubmitLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const email = formData.get("email")?.toString().trim();
    const password = formData.get("password")?.toString().trim();

    if (!email || !password) {
      console.error("Email ou mot de passe manquant.");
      return;
    }

    const response = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    console.log({ response });

    if (response?.ok) {
      router.push("/dashboard");
    } else {
      console.error("Erreur de connexion :", response?.error);
    }
  };

  return (
    <form onSubmit={handleSubmitLogin} className="flex flex-col gap-6 mx-auto">
      <div className="flex flex-col">
        <label htmlFor="email">
          Email <span className="text-danger">*</span>
        </label>
        <Input name="email" type="email" required={true}>
          john@exemple.com
        </Input>
      </div>
      <div className="flex flex-col">
        <label htmlFor="password">
          Password <span className="text-danger">*</span>
        </label>
        <Input name="password" type="password" required={true} icon={true}>
          Enter your password
        </Input>
      </div>
      <Button
        color="primary"
        radius="md"
        size="full"
        type={"submit"}
        addClassName="grid place-self-center"
      >
        Submit
      </Button>
    </form>
  );
}
