"use client";

import {
  useDeleteReviewMutation,
  useGetReviewsQuery,
} from "@/features/api/reviews.api";
import { useAppSelector } from "@/store/store";
import { Review } from "@/types/review";
import { toast } from "react-toastify";

const ReviewsList = ({ propertyId }: { propertyId: string }) => {
  const { data: reviews, isLoading } = useGetReviewsQuery(propertyId);
  const user = useAppSelector((state) => state.auth?.user);
  const [deleteReview] = useDeleteReviewMutation();

  if (isLoading) return <p>Loading reviews...</p>;
  if (!reviews?.length) return <p>No reviews yet.</p>;

  const handleDelete = async (id: number) => {
    try {
      await deleteReview(id).unwrap();
      toast.success("Review deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete review.");
    }
  };

  return (
    <div className="reviews-section">
      <h3>Property Reviews</h3>
      <ul className="list-group">
        {reviews.map((review: Review) => (
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
