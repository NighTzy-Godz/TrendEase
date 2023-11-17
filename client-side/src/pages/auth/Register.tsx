import { useEffect, useState } from "react";
import Button, { ButtonSize } from "../../components/common/Button";
import "./Auth.css";
import InputContainer from "../../components/containers/InputContainer";

import { Link, Navigate, useNavigate } from "react-router-dom";
import { registerUser } from "../../store/slices/auth";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import PaddedPage from "../../components/containers/PaddedPage";
import { toast } from "react-toastify";

export interface RegisterValuesData {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}
import { State } from "../../store/store";
function Register() {
  const [submitted, setSubmitted] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(
    (state: State) => state.entities.auth.decodedUser
  );
  const authError = useSelector((state: State) => state?.entities?.auth?.error);

  useEffect(() => {
    if (submitted && !authError) {
      navigate("/login");
      return setSubmitted(false);
    }
  }, [submitted, authError]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterValuesData>();

  const handleFormSubmit = (data: RegisterValuesData) => {
    setSubmitted(true);
    dispatch(registerUser(data));
  };

  if (isLoggedIn) {
    toast.error("You're already authenticated, you cannot do that action.", {
      autoClose: 2500,
    });
    return <Navigate to="/profile" />;
  }

  return (
    <PaddedPage className="auth_form">
      <div className="container">
        <div className="form_container">
          <h3>Register</h3>

          <form
            onSubmit={handleSubmit(handleFormSubmit)}
            encType="multipart/form-data"
          >
            <InputContainer>
              <label>First Name</label>
              <input
                placeholder="Ex. John Yol"
                {...register("first_name", {
                  required: "First Name is a required field",
                  minLength: {
                    value: 3,
                    message: "First name should be at least 3 character long",
                  },
                })}
              />
              {errors.first_name && (
                <p className="form_error">{errors.first_name.message}</p>
              )}
            </InputContainer>

            <InputContainer>
              <label>Last Name</label>
              <input
                placeholder="Ex. Doe"
                {...register("last_name", {
                  required: "Last Name is a required field",
                  minLength: {
                    value: 3,
                    message: "Last name should be at least 2 character long",
                  },
                })}
              />
              {errors.last_name && (
                <p className="form_error">{errors.last_name.message}</p>
              )}
            </InputContainer>

            <InputContainer>
              <label>Email</label>
              <input
                type="email"
                placeholder="Ex. johndoe@gmail.com"
                {...register("email", {
                  required: "Email is a required field",
                })}
              />
              {errors.email && (
                <p className="form_error">{errors.email.message}</p>
              )}
            </InputContainer>

            <InputContainer>
              <label>Phone Number</label>
              <input
                placeholder="Ex. 0912 434 5675"
                {...register("phone", {
                  required: "Phone Number is a required field",

                  pattern: {
                    value: /^[0-9]*$/,
                    message: "Phone Number should be a type of number",
                  },
                  minLength: {
                    value: 11,
                    message: "Phone Number should be 11 character long",
                  },
                  maxLength: {
                    value: 11,
                    message: "Phone Number should be 11 character long",
                  },
                })}
              />
              {errors.phone && (
                <p className="form_error">{errors.phone.message}</p>
              )}
            </InputContainer>

            <InputContainer>
              <label>Password</label>
              <input
                type="password"
                placeholder="Your Desired Password"
                {...register("password", {
                  required: "Password is a required field",
                })}
              />
              {errors.password && (
                <p className="form_error">{errors.password.message}</p>
              )}
            </InputContainer>

            <InputContainer>
              <label>Confirm Password</label>
              <input
                type="password"
                placeholder="Matched it with your password"
                {...register("confirmPassword", {
                  required: "Confirm Password is a required field",
                })}
              />
              {errors.confirmPassword && (
                <p className="form_error">{errors.confirmPassword.message}</p>
              )}
            </InputContainer>

            <div className="form_question">
              <small>
                Already have an account?
                <Link to="/login"> Sign In</Link>
              </small>
            </div>

            <Button size={ButtonSize.MEDIUM} className="primary">
              Submit
            </Button>
          </form>
        </div>
      </div>
    </PaddedPage>
  );
}

export default Register;
