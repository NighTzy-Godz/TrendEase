import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import PaddedPage from "../../components/containers/PaddedPage";
import InputContainer from "../../components/containers/InputContainer";
import Button, { ButtonSize } from "../../components/common/Button";
import { useDispatch, useSelector } from "react-redux";
import { setStatusCode, userChangePass } from "../../store/slices/auth";
import { useNavigate } from "react-router-dom";

export interface ChangePasswordData {
  currPassword: string;
  newPassword: string;
  confirmPassword: string;
}
import { State } from "../../store/store";

function ChangePassword() {
  const [submitted, setSubmitted] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const error = useSelector((state: State) => state.entities.auth.error);
  const statusCode = useSelector(
    (state: State) => state.entities.auth.statusCode
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ChangePasswordData>();

  useEffect(() => {
    console.log(statusCode);
    if (statusCode === 200 && !error) {
      dispatch(setStatusCode(null));
      return navigate("/profile");
    }
  }, [statusCode, error]);

  const handleFormSubmit = (data: ChangePasswordData) => {
    dispatch(userChangePass(data));
  };

  return (
    <PaddedPage className="auth_form">
      <div className="container">
        <div className="form_container">
          <h3>Change Your Password</h3>
          <form onSubmit={handleSubmit(handleFormSubmit)}>
            <InputContainer>
              <label>Current Password</label>
              <input
                type="password"
                {...register("currPassword", {
                  required: "Current Password is a required field",
                })}
                placeholder="Your Current Password"
              />
              {errors.currPassword && (
                <p className="form_error">{errors.currPassword.message}</p>
              )}
            </InputContainer>

            <InputContainer>
              <label>New Password</label>
              <input
                type="password"
                {...register("newPassword", {
                  required: "New Password is a required field",
                })}
                placeholder="Your Desired New Password"
              />
              {errors.newPassword && (
                <p className="form_error">{errors.newPassword.message}</p>
              )}
            </InputContainer>

            <InputContainer>
              <label>Confirm Password</label>
              <input
                type="password"
                {...register("confirmPassword", {
                  required: "Confirm Password is a required field",
                })}
                placeholder="Match it with you New Password"
              />
              {errors.confirmPassword && (
                <p className="form_error">{errors.confirmPassword.message}</p>
              )}
            </InputContainer>

            <Button size={ButtonSize.MEDIUM} className="primary">
              Update Password
            </Button>
          </form>
        </div>
      </div>
    </PaddedPage>
  );
}

export default ChangePassword;
