'use client';
import {Input} from "../Input";

interface FormOneProps {
    username: string;
    setUsername: any;
    firstName: string;
    setFirstName: any;
    lastName: string;
    setLastName: any;
  }
  export const FormOne: React.FC<FormOneProps> = ({
    username,
    setUsername,
    firstName,
    setFirstName,
    lastName,
    setLastName,
  }) => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <label htmlFor="username">Username</label>
          <Input
            id="username"
            name="username"
            type="text"
            onChange={(e: any) => setUsername(e.target.value)}
            value={username}
          >
            Enter your username
          </Input>
        </div>
        <div className="flex flex-col justify-between gap-4">
          <div className="flex flex-col gap-1">
            <label htmlFor="password">First Name</label>
            <Input
              id="firstName"
              name="firstName"
              type="text"
              onChange={(e: any) => setFirstName(e.target.value)}
              value={firstName}
            >
              first name
            </Input>
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="lastName">Last Name</label>
            <Input
              id="lastName"
              name="lastName"
              type="text"
              onChange={(e: any) => setLastName(e.target.value)}
              value={lastName}
            >
              last name
            </Input>
          </div>
        </div>
      </div>
    );
  };