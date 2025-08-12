interface RatingsProps {
  rating: number;
}

const Ratings = ({ rating }: RatingsProps) => {
  // Create an array of 5 elements and map through them
  // For each star, check if it should be filled (yellow) or not
  return (
    <>
      {[...Array(5)].map((_, index) => (
        <li key={index} className="list-inline-item">
          <a href="#" aria-label={`${index + 1} star${index !== 0 ? "s" : ""}`}>
            <i
              className={`fa ${index < Math.round(rating) ? "fa-star text-warning" : "fa-star-o"}`}
              aria-hidden="true"
            ></i>
          </a>
        </li>
      ))}
    </>
  );
};

export default Ratings;
