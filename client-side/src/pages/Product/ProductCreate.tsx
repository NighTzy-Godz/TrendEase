import React, { ChangeEvent, useEffect, useState } from "react";
import "../../assets/css/pages/product_create.css";
import { useForm } from "react-hook-form";
import InputContainer from "../../components/containers/InputContainer";
import Button, { ButtonSize } from "../../components/common/Button";
import categoryOptions from "../../data/categoryOptions";
import { useDispatch, useSelector } from "react-redux";
import { createProduct } from "../../store/slices/product";
import { useNavigate } from "react-router-dom";
import PaddedPage from "../../components/containers/PaddedPage";

enum Category {
  ELECTRONICS = "electronics",
  FASHION = "fashion",
  APPLIANCES = "appliances",
  APPAREL = "apparel",
  INSTRUMENTS = "instruments",
  SPORTS = "sports",
  HEALTH_AND_BEAUTY = "health and beauty",
}

export interface IProductCreate {
  img: FileList;
  title: string;
  desc: string;
  price: number;
  quantity: number;
  category: Category;
}
import { State } from "../../store/store";
function ProductCreate() {
  const [submitted, setSubmitted] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const error = useSelector((state: State) => state?.entities?.product?.error);
  const loading = useSelector(
    (state: State) => state?.entities?.product?.loading
  );

  useEffect(() => {
    if (submitted && !error) {
      setSubmitted(false);
      navigate("/my-products");
    }
  }, [submitted, error]);

  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm<IProductCreate>();

  const onSubmit = async (data: IProductCreate) => {
    const { title, img, category, desc, price, quantity } = data;
    const formData = new FormData();
    formData.append("category", category);
    formData.append("title", title);
    formData.append("desc", desc);
    formData.append("price", price.toString());
    formData.append("quantity", quantity.toString()),
      Array.from(img).map((item) => {
        console.log(item instanceof File);
        formData.append("img", item);
      });
    dispatch(createProduct(formData as any));

    setTimeout(() => {
      setSubmitted(true);
    }, 50);
  };

  const handleTextAreaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    e.currentTarget.style.height = "auto";
    e.currentTarget.style.height = e.currentTarget.scrollHeight + "px";
  };

  const renderCategoryOptions = () => {
    return categoryOptions.map((item) => {
      return (
        <option key={item.id} value={item.value}>
          {item.name}
        </option>
      );
    });
  };

  return (
    <PaddedPage className="product_create">
      <div className="container">
        <div className="form_container">
          <h3>Product Create</h3>
          <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
            <InputContainer>
              <label>Images</label>
              <input
                type="file"
                accept="image/*"
                multiple
                {...register("img", { required: "Image is required" })}
              />
              {errors.img && <p className="form_error">{errors.img.message}</p>}
            </InputContainer>
            <InputContainer>
              <label>Title</label>
              <input
                {...register("title", {
                  required: "Title is a required field",
                  maxLength: {
                    value: 150,
                    message: "Title cannot exceed up to 150 characters",
                  },
                  minLength: {
                    value: 10,
                    message: "Title should be atleast 10 characters",
                  },
                })}
                placeholder="Product Title"
              />
              {errors.title && (
                <p className="form_error">{errors.title.message}</p>
              )}
            </InputContainer>

            <InputContainer>
              <label>Price</label>
              <input
                {...register("price", {
                  required: "Price is a required field",
                  pattern: {
                    value: /^[0-9]*$/,
                    message: "Price should be number",
                  },
                })}
                placeholder="Product Price"
              />
              {errors.price && (
                <p className="form_error">{errors.price.message}</p>
              )}
            </InputContainer>

            <InputContainer>
              <label>Quantity</label>
              <input
                {...register("quantity", {
                  required: "Quantity is a required field",
                  pattern: {
                    value: /^[0-9]*$/,
                    message: "Quantity should be number",
                  },
                })}
                placeholder="Product Quantity"
              />
              {errors.quantity && (
                <p className="form_error">{errors.quantity.message}</p>
              )}
            </InputContainer>

            <InputContainer>
              <label>Category</label>
              <select
                {...register("category", {
                  required: "Category is a required field",
                })}
              >
                {renderCategoryOptions()}
              </select>
            </InputContainer>

            <InputContainer>
              <label>Description</label>
              <textarea
                {...register("desc", {
                  required: "Description is a required Field",
                  minLength: {
                    value: 10,
                    message: "Description should be at least 10 characters",
                  },
                })}
                placeholder="Enter Product Description"
                onChange={(e) => handleTextAreaChange(e)}
              ></textarea>

              {errors.desc && (
                <p className="form_error">{errors.desc.message}</p>
              )}
            </InputContainer>

            <Button
              className={`${loading && "loading"} primary`}
              size={ButtonSize.MEDIUM}
            >
              Submit
            </Button>
          </form>
        </div>
      </div>
    </PaddedPage>
  );
}

export default ProductCreate;
