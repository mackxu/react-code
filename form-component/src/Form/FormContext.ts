import { createContext } from "react";

export interface FormContextProps {
  onValueChange?: (name: string, value: any) => void;
  values?: Record<string, any>;
  registerValidate?: (
    name: string,
    cb: (...args: any) => Promise<void>
  ) => void;
}

export default createContext<FormContextProps>({});
