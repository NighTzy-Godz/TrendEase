import Form, { FormDataValues } from "../../components/common/Form";
import InputContainer from "../../components/containers/InputContainer";
import FormInput from "../../components/common/FormInput";
import Button, { ButtonSize } from "../../components/common/Button";

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../store/slices/auth";

export interface LoginFormData extends FormDataValues {
  email: string;
  password: string;
}

function Login() {
  // const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector((state: any) => state.entities.auth.token);
  const initialData: LoginFormData = {
    email: "",
    password: "",
  };

  const handleFormSubmit = async (data: LoginFormData) => {
    try {
      await dispatch(loginUser(data));
      console.log(token);
    } catch (error) {}
  };

  return (
    <div className="auth_form">
      <div className="container">
        <div className="form_container">
          <h3>Login</h3>
          <Form
            dataValues={initialData}
            onFormSubmit={(formData: FormDataValues) =>
              handleFormSubmit(formData as LoginFormData)
            }
          >
            <InputContainer>
              <FormInput
                type="email"
                label="Email"
                name="email"
                placeholder="Ex. johndoe@gmail.com"
              />
            </InputContainer>

            <InputContainer>
              <FormInput
                label="Password"
                name="password"
                placeholder="Your Password"
              />
            </InputContainer>

            <Button size={ButtonSize.MEDIUM}>Login</Button>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default Login;
