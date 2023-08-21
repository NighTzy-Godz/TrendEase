import "../../assets/css/common/Form.css";

import {
  ChangeEvent,
  FormEvent,
  ReactNode,
  createContext,
  useState,
} from "react";

interface FormData {
  [key: string]: string | number;
}

interface FormContextData {
  data: FormData;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const FormContext = createContext<FormContextData>({
  data: {},
  handleChange: () => {},
});

interface FormProps {
  className?: string;
  children: ReactNode;
  dataValues: FormData;
  onFormSubmit: (data: FormData) => void;
}

function Form({ dataValues, className, children, onFormSubmit }: FormProps) {
  const [data, setData] = useState<FormData>(dataValues);

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
