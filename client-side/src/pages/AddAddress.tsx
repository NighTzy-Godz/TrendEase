import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import InputContainer from "../components/containers/InputContainer";
import Button, { ButtonSize } from "../components/common/Button";
import PaddedPage from "../components/containers/PaddedPage";
import { State } from "../store/store";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addUserAddress } from "../store/slices/auth";
interface AddAddressData {
  address: string;
}

function AddAddress() {
  const [submitted, setSubmitted] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const error = useSelector((state: State) => state.entities.auth.error);
  useEffect(() => {
    if (submitted && !error) {
      setSubmitted(false);
      navigate("/cart");
    }
  }, [submitted, error]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddAddressData>();

  const handleFormSubmit = (data: AddAddressData) => {
    dispatch(addUserAddress(data));

    setTimeout(() => {
      setSubmitted(true);
    }, 50);
  };

  return (
    <PaddedPage className="auth_form">
      <div className="container">
        <div className="form_container">
          <h3>Add Your Address</h3>
          <form onSubmit={handleSubmit(handleFormSubmit)}>
            <InputContainer>
              <label>Address</label>
              <textarea
                {...register("address", {
                  required: "Address Input is a required field",
                  minLength: {
                    value: 10,
                    message:
                      "Address Field should be atleast 10 characters long",
                  },
                  maxLength: {
                    value: 100,
                    message: "Address Field can only contain 100 characters",
                  },
                })}
                placeholder="Where do you want to recieve your delivery? Type Here . . . "
              />

              <p className="form_error">
                {errors.address && errors.address.message}
              </p>
            </InputContainer>

            <Button size={ButtonSize.SMALL}>Update Address</Button>
          </form>
        </div>
      </div>
    </PaddedPage>
  );
}

export default AddAddress;
