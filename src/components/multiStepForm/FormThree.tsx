'use client';
import {Input} from "../Input";

interface FormThreeProps {
    codeVerif: string;
    setCodeVerif: any;
  }
  export const FormThree: React.FC<FormThreeProps> = ({
    codeVerif,
    setCodeVerif,
  }) => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <label htmlFor="codeVerif">Verification</label>
          <Input
            id="codeVerif"
            name="codeVerif"
            type="text"
            onChange={(e: any) => setCodeVerif(e.target.value)}
            value={codeVerif}
          >
            Enter your username
          </Input>
        </div>
      </div>
    );
  };