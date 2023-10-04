import React, { useEffect, useState } from "react";
import PaddedPage from "../../components/containers/PaddedPage";

export interface UserUpdateData {
  pfp?: FileList;
  cover_photo?: FileList;
  first_name: string;
  last_name: string;
  bio: string;
  email: string;
  phone: string;
  address: string;
}

import { State } from "../../store/store";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserData,
  setStatusCode,
  updateUserData,
} from "../../store/slices/user";
import { useForm } from "react-hook-form";
import InputContainer from "../../components/containers/InputContainer";
import Button, { ButtonSize } from "../../components/common/Button";
import { UserData } from "../../interfaces/user";
import { useNavigate } from "react-router-dom";
function EditProfile() {
  const currUser = useSelector((state: State) => state?.entities?.user?.info);
  const statusCode = useSelector(
    (state: State) => state?.entities?.user?.statusCode
  );
  const [submitted, setSubmitted] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { first_name, last_name, email, phone, bio, address } =
    (currUser as UserData) || {};

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserUpdateData>({
    defaultValues: {
      first_name,
      last_name,
      email,
      phone,
      bio,
      address,
    },
  });

  useEffect(() => {
    if (!currUser) dispatch(getUserData());
  }, [currUser]);

  useEffect(() => {
    if (statusCode === 200) {
      dispatch(setStatusCode(null));
      navigate("/profile");
    }
  });

  const handleFormSubmit = (data: UserUpdateData) => {
    const {
      first_name,
      last_name,
      email,
      phone,
      bio,
      address,
      pfp,
      cover_photo,
    } = data;
    const formData = new FormData();
    formData.append("first_name", first_name);
    formData.append("last_name", last_name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("bio", bio);
    formData.append("address", address);
    Array.from(pfp as FileList).map((item) => {
      formData.append("pfp", item);
    });

    Array.from(cover_photo as FileList).map((item) => {
      formData.append("cover_photo", item);
    });

    dispatch(updateUserData(formData as any));
  };

  return (
    <PaddedPage className="edit_profile auth_form">
      <div className="container">
        <div className="form_container">
          <h3> Edit Profile Form</h3>
          <form
            onSubmit={handleSubmit(handleFormSubmit)}
            encType="multipart/form-data"
          >
            <InputContainer>
              <label>Profile Picture</label>
              <input type="file" accept="image/*" {...register("pfp")} />
              {errors.pfp && <p className="form_error">{errors.pfp.message}</p>}
            </InputContainer>

            <InputContainer>
              <label>Cover Photo</label>
              <input
                type="file"
                accept="image/*"
                {...register("cover_photo")}
              />
              {errors.cover_photo && (
                <p className="form_error">{errors.cover_photo.message}</p>
              )}
            </InputContainer>
            <InputContainer>
              <label>First Name</label>
              <input
                placeholder="Ex. John Yol"
                {...register("first_name", {
                  required: "First Name Field is required",
                  minLength: {
                    value: 3,
                    message: "First name should be at least 3 character long",
                  },
                })}
              />

              <p className="form_error">
                {errors.first_name && errors.first_name.message}
              </p>
            </InputContainer>

            <InputContainer>
              <label>Last Name</label>
              <input
                placeholder="Ex. Doe"
                {...register("last_name", {
                  required: "Last Name Field is required",
                  minLength: {
                    value: 2,
                    message: "Last name should be at least 2 character long",
                  },
                })}
              />

              <p className="form_error">
                {errors.last_name && errors.last_name.message}
              </p>
            </InputContainer>

            <InputContainer>
              <label>Biography</label>
              <input
                defaultValue={bio}
                placeholder="Short description of yours"
                {...register("bio")}
              />
            </InputContainer>

            <InputContainer>
              <label>Email</label>
              <input
                placeholder="Ex. johndoe@gmail.com"
                {...register("email", {
                  required: "Email Field is required",
                })}
                type="email"
              />
              <p className="form_error">
                {errors.email && errors.email.message}
              </p>
            </InputContainer>

            <InputContainer>
              <label>Phone Number</label>
              <input
                placeholder="Ex. 0912 434 5675"
                {...register("phone", {
                  required: "Phone Number Field is required",

                  minLength: {
                    value: 11,
                    message: "Phone Number should be 11 character long",
                  },
                })}
              />
              <p className="form_error">
                {errors.phone && errors.phone.message}
              </p>
            </InputContainer>

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

            <Button size={ButtonSize.SMALL}>Update Profile</Button>
          </form>
        </div>
      </div>
    </PaddedPage>
  );
}

export default EditProfile;
