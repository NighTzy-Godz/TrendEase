import React, { useState, useEffect } from "react";
import { OrderData } from "../../interfaces/order";

import Button, { ButtonSize } from "../common/Button";
import "./PendingReviewCard.css";
import formatDate from "../../utils/formatDate";
import Modal from "../common/Modal";
import { useForm } from "react-hook-form";
import { ReviewSubmitData } from "../../interfaces/review";
import InputContainer from "../containers/InputContainer";
import Stars from "../common/Stars";
import { useDispatch, useSelector } from "react-redux";
import { orderReviewed } from "../../store/slices/order";
import { State } from "../../store/store";

interface PendingReviewCardProps {
  data: OrderData;
}

function PendingReviewCard({ data }: PendingReviewCardProps) {
  const { _id: orderId, item, createdAt, rated } = data;
  const {
    product: { _id: productId, images, title },
  } = item;
  const reviewError = useSelector((state: State) => state.entities.order.error);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitted, setIsSubmitted] = useState(false);
  const [rating, setRating] = useState(0);

  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ReviewSubmitData>();

  useEffect(() => {
    if (submitted && !reviewError) {
      setIsModalOpen(false);
    }
  }, [submitted, reviewError]);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleStarClick = (rating: number) => {
    setRating(rating);
  };

  const handleReviewSubmit = (data: ReviewSubmitData) => {
    data.productId = productId;
    data.orderId = orderId;
    data.rating = rating;
    dispatch(orderReviewed(data));
    setTimeout(() => {
      setIsSubmitted(true);
    }, 10);
  };

  return (
    <React.Fragment>
      <div className="pendingReviewCard">
        <div className="pendingReviewCard_container">
          <div className="img">
            <img src={item.product.images[0]} alt="" />
          </div>
          <div className="name">
            <h3>{item.product.title}</h3>
          </div>
        </div>
        <div className="bought_date">
          <p>
            <span>Bought Date: </span> {formatDate(createdAt)}
          </p>
        </div>

        {!rated && (
          <div className="action">
            <Button
              size={ButtonSize.X_SMALL}
              handleClick={() => setIsModalOpen(true)}
            >
              Rate Now
            </Button>
          </div>
        )}
      </div>
      {isModalOpen && (
        <Modal
          className="review_form"
          onModalClose={handleCloseModal}
          isModalOpen
        >
          <div className="form_container">
            <h3>Review Form </h3>
            <form onSubmit={handleSubmit(handleReviewSubmit)}>
              <div className="review_form_item">
                <div className="img">
                  <img src={images[0]} alt="" />
                </div>
                <div className="name">
                  <p>{title}</p>
                </div>
              </div>
              <InputContainer>
                <label>Star Rating</label>
                <Stars onStarClick={handleStarClick} rating={rating} />
                <p className="form_error">
                  {errors.rating && errors.rating.message}
                </p>
              </InputContainer>

              <InputContainer>
                <label>Content</label>
                <textarea
                  {...register("content", {
                    required: "Content Input is a required field.",
                    minLength: {
                      value: 5,
                      message:
                        " Content Field should be atleast 5 characters long",
                    },

                    maxLength: {
                      value: 200,
                      message: " Content Field can only contain 200 characters",
                    },
                  })}
                  placeholder="Express your thoughts about the product here  ..."
                />
                <p className="form_error">
                  {errors.content && errors.content.message}
                </p>
              </InputContainer>

              <Button size={ButtonSize.SMALL}>Submit</Button>
            </form>
          </div>
        </Modal>
      )}
    </React.Fragment>
  );
}

export default PendingReviewCard;
