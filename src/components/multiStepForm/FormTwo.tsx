'use client';
import {Input} from "../Input";

interface FormTwoProps {
  email: string;
  setEmail: any;
    password: string;
    setPassword: any;
    confirmPassword: string;
    setConfirmPassword: any;
  }
  export const FormTwo: React.FC<FormTwoProps> = ({
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
  }) => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <label htmlFor="email">Email</label>
          <Input
            id="email"
            name="email"
            type="text"
            onChange={(e: any) => setEmail(e.target.value)}
            value={email}
          >
            Enter your email
          </Input>
        </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="password">First Name</label>
            <Input
              id="password"
              name="password"
              type="password"
              onChange={(e: any) => setPassword(e.target.value)}
              value={password}
            >
              first name
            </Input>
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="confirmPassword">Confirm password</label>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              onChange={(e: any) => setConfirmPassword(e.target.value)}
              value={confirmPassword}
            >
              last name
            </Input>
          </div>
      </div>
    );
  };