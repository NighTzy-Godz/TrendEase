import "../../assets/css/common/Stars.css";

interface StarsProps {
  onStarClick(star: number): void;
  rating: number;
}

function Stars({ rating, onStarClick }: StarsProps) {
  return (
    <div>
      <div className="star_rating">
        <div className="star_btns">
          {[...Array(5)].map((star, index) => {
            index += 1;

            return (
              <button
                type="button"
                key={index}
                className={`${index <= rating ? "on" : ""}`}
                onClick={() => onStarClick(index)}
                // onMouseEnter={() => handleStarsClick(index)}
                // onMouseLeave={() => handleStarsClick(rating)}
              >
                <span className="star">&#9733;</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Stars;
