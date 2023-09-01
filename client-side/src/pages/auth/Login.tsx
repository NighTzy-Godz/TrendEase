// import Form, { FormDataValues } from "../../components/common/Form";
import InputContainer from "../../components/containers/InputContainer";
// import FormInput from "../../components/common/FormInput";
import Button, { ButtonSize } from "../../components/common/Button";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../store/slices/auth";
import { useForm } from "react-hook-form";

export interface LoginData {
  email: string;
  password: string;
}

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state: any) => state.entities.auth.token);
  const authError = useSelector((state: any) => state.entities.auth.error);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>();

  useEffect(() => {
    if (!token) return;
    navigate("/");
  }, [authError]);

  const handleFormSubmit = (data: LoginData) => {
    dispatch(loginUser(data));
  };

  return (
    <div className="auth_form">
      <div className="container">
        <div className="form_container">
          <h3>Login</h3>
          <form onSubmit={handleSubmit(handleFormSubmit)}>
            <InputContainer>
              <label>Email</label>
              <input
                type="email"
                {...register("email", {
                  required: "Email is a required field",
                })}
                placeholder="Ex. johdoe@gmail.com"
              />
              {errors.email && (
                <p className="form_error">{errors.email.message}</p>
              )}
            </InputContainer>

            <InputContainer>
              <label>Password</label>
              <input
                type="password"
                {...register("password", {
                  required: "Password is a required field",
                })}
                placeholder="Your account's password"
              />
              {errors.password && (
                <p className="form_error">{errors.password.message}</p>
              )}
            </InputContainer>

            <div className="form_question">
              <small>
                Don't have an account?
                <Link to="/register"> Register</Link>
              </small>
            </div>

            <Button size={ButtonSize.MEDIUM} className="primary">
              Login
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
