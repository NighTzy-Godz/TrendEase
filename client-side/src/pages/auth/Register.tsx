import React from "react";
import Form, { FormDataValues } from "../../components/common/Form";
import FormInput from "../../components/common/FormInput";
import Button, { ButtonSize } from "../../components/common/Button";
import "./Auth.css";
import InputContainer from "../../components/containers/InputContainer";

interface RegisterValuesData extends FormDataValues {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  password: string;
  confirm_password: string;
}

function Register() {
  const initialData: RegisterValuesData = {
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    password: "",
    confirm_password: "",
  } as RegisterValuesData;

  const handleFormSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <div className="auth_form">
      <div className="container">
        <div className="form_container">
          <h3>Register</h3>

          <Form dataValues={initialData} onFormSubmit={handleFormSubmit}>
            <InputContainer>
              <FormInput
                label="First Name"
                name="first_name"
                placeholder="Ex. John Yol"
              />
            </InputContainer>
            <InputContainer>
              <FormInput
                label="Last Name"
                name="last_name"
                placeholder="Ex. Doe"
              />
            </InputContainer>
            <InputContainer>
              <FormInput
                label="Email"
                name="email"
                placeholder="Ex. johndoe@gmail.com"
              />
            </InputContainer>
            <InputContainer>
              <FormInput
                label="Phone Number"
                name="phone"
                placeholder="Ex. 0912 434 5675"
                isNumber={true}
              />
            </InputContainer>
            <InputContainer>
              <FormInput
                label="Password"
                name="password"
                placeholder="Your Desired Password"
              />
            </InputContainer>
            <InputContainer>
              <FormInput
                label="Confirm Password"
                name="confirm_password"
                placeholder="Matched it with your password"
              />
            </InputContainer>

            <Button size={ButtonSize.MEDIUM}>Submit</Button>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default Register;

// interface IFormData {
//   first_name: string;
//   last_name: string;
//   email: string;
//   phone: string;
//   password: string;
//   confirm_password: string;
// }
