import {
  ChangeEvent,
  Children,
  cloneElement,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import FormContext, { FormContextProps } from "./FormContext";
import Schema from "async-validator";

const getValueFromEvent = (e: ChangeEvent<HTMLInputElement>) => {
  if (e.target.type === "checkbox") {
    return e.target.checked;
  }
  return e.target.value;
};

export default function Item({
  children,
  name,
  label,
  valuePropName,
  rules,
}: PropsWithChildren<{
  name?: string;
  label?: string;
  rules?: Array<Record<string, any>>;
  valuePropName?: string;
}>) {
  const { onValueChange, values, registerValidate } =
    useContext<FormContextProps>(FormContext);
  const [value, setValue] = useState<string | number | boolean>();
  const [error, setError] = useState("");

  useEffect(() => {
    if (!name || !values) return;
    if (values[name] !== value) {
      setValue(values[name]);
    }
  }, [value, name, values]);

  const handleValidate = useCallback(
    async (value: any) => {
      if (!Array.isArray(rules) || !rules.length) return null;
      const validator = new Schema({
        [name]: rules.map((rule) => ({ type: "string", ...rule })),
      });

      try {
        await validator.validate({ [name]: value });
        setError("");
        return null;
      } catch (err: any) {
        if ("errors" in err) {
          setError(err.errors[0].message);
          return err.errors[0].message;
        }
      }
    },
    [name, rules]
  );

  useEffect(() => {
    if (!name) return;
    registerValidate?.(name, handleValidate);
  }, [value, name, registerValidate, handleValidate]);

  if (!name) return children;

  const propsName: Record<string, any> = { id: name };
  if (valuePropName) {
    propsName[valuePropName] = value;
  } else {
    propsName.value = value;
  }

  return (
    <div>
      {label && <label htmlFor={name}>{label}:</label>}
      <div>
        {Children.count(children) > 1
          ? children
          : cloneElement(children!, {
              ...propsName,
              onChange: (e: ChangeEvent<HTMLInputElement>) => {
                const value = getValueFromEvent(e);
                setValue(value);
                onValueChange?.(name, value);
                handleValidate(value);
                // setError("");
              },
            })}
        {error && <div style={{ color: "red" }}>{error}</div>}
      </div>
    </div>
  );
}
