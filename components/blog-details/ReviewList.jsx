"use client";

import {
  useDeleteReviewMutation,
  useGetReviewsQuery,
} from "@/features/api/reviews.api";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import Ratings from "./Ratings";

const ReviewsList = ({ propertyId }) => {
  const { data: reviews, isLoading } = useGetReviewsQuery(propertyId);
  const user = useSelector((state) => state.auth?.user);
  const [deleteReview] = useDeleteReviewMutation();

  if (isLoading) return <p>Loading reviews...</p>;
  if (!reviews?.length) return <p>No reviews yet.</p>;

  const handleDelete = async (id) => {
    try {
      await deleteReview(id).unwrap();
      toast.success("Review deleted!");
    } catch (error) {
      toast.error("Failed to delete review.");
    }
  };

  return (
    <div className="reviews-section">
      <h3>Property Reviews</h3>
      <div className="total_review">
        <h4>{reviews.length || "0"} Reviews</h4>
        <ul className="review_star_list mb0 pl10">
          <Ratings />
        </ul>
        <a className="tr_outoff pl10" href="#">
          ( 4.5 out of 5 )
        </a>
        <a className="write_review float-end fn-xsd" href="#">
          Write a Review
        </a>
      </div>
      <ul className="list-group">
        {reviews.map((review) => (
          <li key={review.id} className="list-group-item">
            <p>
              <strong>{review.user.name}</strong> rated {review.rating}/5
            </p>
            <p>{review.comment}</p>
            {user?.id === review.user.id && (
              <button
                className="btn btn-danger btn-sm"
                onClick={() => handleDelete(review.id)}
              >
                Delete
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReviewsList;
