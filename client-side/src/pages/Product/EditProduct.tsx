import React, { ChangeEvent, useEffect } from "react";
import PaddedPage from "../../components/containers/PaddedPage";
import InputContainer from "../../components/containers/InputContainer";
import { useForm } from "react-hook-form";

import { ProductData, ProductEditData } from "../../interfaces/product";
import categoryOptions from "../../data/categoryOptions";
import Button, { ButtonSize } from "../../components/common/Button";
import { State } from "../../store/store";
import { useDispatch, useSelector } from "react-redux";
import {
  getSingleProduct,
  setStatusCode,
  updateProduct,
} from "../../store/slices/product";
import { useNavigate, useParams } from "react-router-dom";
function EditProduct() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { productId } = useParams();
  const loading = useSelector((state: State) => state.entities.product.loading);
  const statusCode = useSelector(
    (state: State) => state.entities.product.statusCode
  );
  const currProduct = useSelector(
    (state: State) => state.entities.product.singleProduct
  );

  const { title, desc, price, quantity } = (currProduct as ProductData) || {};

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductEditData>({
    defaultValues: {
      title,
      desc,
      price,
      quantity,
    },
  });

  useEffect(() => {
    dispatch(getSingleProduct(productId as string));
  }, []);

  useEffect(() => {
    if (statusCode === 200) {
      setStatusCode(null);
      navigate(`/products/${productId}`);
    }
  }, [statusCode]);

  const renderCategoryOptions = () => {
    return categoryOptions.map((item) => {
      return (
        <option key={item.id} value={item.value}>
          {item.name}
        </option>
      );
    });
  };

  const handleTextAreaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    e.currentTarget.style.height = "auto";
    e.currentTarget.style.height = e.currentTarget.scrollHeight + "px";
  };

  const handleFormSubmit = (data: ProductEditData) => {
    dispatch(updateProduct(data, productId as string));
  };

  return (
    <PaddedPage className="auth_form edit_product">
      <div className="container">
        <div className="form_container">
          <h3>Edit Product Form</h3>
          <form onSubmit={handleSubmit(handleFormSubmit)}>
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
              Update Product
            </Button>
          </form>
        </div>
      </div>
    </PaddedPage>
  );
}

export default EditProduct;
