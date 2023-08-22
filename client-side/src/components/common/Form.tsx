import "../../assets/css/common/Form.css";

import {
  ChangeEvent,
  FormEvent,
  ReactNode,
  createContext,
  useState,
} from "react";

export interface FormDataValues {
  [key: string]: string | number;
}

interface FormContextData {
  data: {};
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const FormContext = createContext<FormContextData>({
  data: {},
  handleChange: () => {},
});

interface FormProps {
  className?: string;
  children: ReactNode;
  dataValues: Record<string, any>;
  onFormSubmit: (formData: Record<string, any>) => void;
}

function Form({
  dataValues,
  className = "",
  children,
  onFormSubmit,
}: FormProps) {
  const [data, setData] = useState<Record<string, any>>(dataValues);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;

    const newData = {
      ...data,
      [name]: value,
    };

    setData(newData);
  };

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();

    onFormSubmit(data);
  };
  return (
    <FormContext.Provider value={{ data, handleChange }}>
      <form className={className} onSubmit={handleFormSubmit}>
        {children}
      </form>
    </FormContext.Provider>
  );
}

export default Form;
