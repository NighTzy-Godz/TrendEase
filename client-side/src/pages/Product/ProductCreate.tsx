import React, { ChangeEvent } from "react";
import "../../assets/css/pages/product_create.css";
import { useForm, SubmitHandler } from "react-hook-form";
import InputContainer from "../../components/containers/InputContainer";
import Button, { ButtonSize } from "../../components/common/Button";
import categoryOptions from "../../data/categoryOptions";

enum Category {
  ELECTRONICS = "electronics",
  FASHION = "fashion",
  APPLIANCES = "appliances",
  APPAREL = "apparel",
  INSTRUMENTS = "instruments",
  SPORTS = "sports",
  HEALTH_AND_BEAUTY = "health and beauty",
}

interface IProductCreate {
  title: string;
  desc: string;
  price: number;
  quantity: number;
  category: Category;
}

function ProductCreate() {
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm<IProductCreate>();

  const onSubmit: SubmitHandler<IProductCreate> = (data) => {
    console.log(data);
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
    <div className="product_create">
      <div className="container">
        <div className="form_container">
          <h3>Product Create</h3>
          <form onSubmit={handleSubmit(onSubmit)}>
            <InputContainer>
              <label>Title</label>
              <input
                {...register("title", {
                  required: "Title is a required field",
                  maxLength: {
                    value: 150,
                    message: "Title cannot exceed up to 150 characters",
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

            <Button size={ButtonSize.MEDIUM}>Submit</Button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ProductCreate;
