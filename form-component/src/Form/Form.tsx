import {
  ForwardedRef,
  forwardRef,
  PropsWithChildren,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import FormContext from "./FormContext";
import { message } from "antd";

export type FormRefApi = {
  getFieldsValue: () => Record<string, any>;
  setFieldsValue: (values: Record<string, any>) => void;
};

type Func = (...args: any) => Promise<any>;

function Form(
  {
    children,
    initialValues,
    onFinish,
  }: PropsWithChildren<{
    initialValues?: Record<string, any>;
    onFinish?: (values: Record<string, any>) => void;
  }>,
  ref: ForwardedRef<FormRefApi>
) {
  const [values, setValues] = useState<Record<string, any>>(
    initialValues || {}
  );
  const validatorMap = useRef(new Map<string, Func>());

  useImperativeHandle(ref, () => ({
    getFieldsValue: () => values,
    setFieldsValue: (fieldValues: Record<string, any>) => {
      setValues({ ...values, ...fieldValues });
    },
  }));
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    for (const [name, cb] of validatorMap.current.entries()) {
      const value = values[name];
      const errMessage = await cb(value);
      if (errMessage) {
        message.error(errMessage);
        return;
      }
    }
    onFinish?.(values);
  };
  const onValueChange = (name: string, value: any) => {
    values[name] = value;
  };
  const registerValidate = (name: string, cb: Func) => {
    validatorMap.current.set(name, cb);
  };
  return (
    <FormContext.Provider
      value={{
        onValueChange,
        values,
        registerValidate,
      }}
    >
      <form onSubmit={onSubmit}>{children}</form>
    </FormContext.Provider>
  );
}

export default forwardRef(Form);
