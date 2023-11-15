// import Form, { FormDataValues } from "../../components/common/Form";
import InputContainer from "../../components/containers/InputContainer";
// import FormInput from "../../components/common/FormInput";
import Button, { ButtonSize } from "../../components/common/Button";
import { useEffect } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, setStatusCode } from "../../store/slices/auth";
import { useForm } from "react-hook-form";
import PaddedPage from "../../components/containers/PaddedPage";
import { toast } from "react-toastify";

export interface LoginData {
  email: string;
  password: string;
}

import { State } from "../../store/store";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state: State) => state.entities.auth.token);
  const isLoggedIn = useSelector(
    (state: State) => state.entities.auth.decodedUser
  );
  const authError = useSelector((state: State) => state.entities.auth.error);
  const statusCode = useSelector(
    (state: State) => state.entities.auth.statusCode
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>();

  useEffect(() => {
    if (!token) return;

    if (statusCode === 200) {
      dispatch(setStatusCode(null));
      navigate("/profile");
    }
  }, [authError, statusCode]);

  const handleFormSubmit = (data: LoginData) => {
    dispatch(loginUser(data));
  };

  if (isLoggedIn) {
    toast.error("You're already logged in, you cannot do that action", {
      autoClose: 2500,
    });
    return <Navigate to="/profile" />;
  }

  return (
    <PaddedPage className="auth_form">
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
    </PaddedPage>
  );
}

export default Login;
