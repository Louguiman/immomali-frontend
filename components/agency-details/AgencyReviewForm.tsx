"use client";

import { useCreateReviewMutation } from "@/features/api/reviews.api";
import { useState } from "react";
import { useAppSelector } from "@/store/store";
import { toast } from "react-toastify";

const ReviewForm = ({ agencyId }: { agencyId: string }) => {
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(5);
  const user = useAppSelector((state) => state.auth?.user);
  const [createReview, { isLoading }] = useCreateReviewMutation();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) {
      toast.error("You must be logged in to leave a review.");
      return;
    }

    try {
      await createReview({ agencyId, comment, rating }).unwrap();
      toast.success("Review submitted!");
      setComment("");
      setRating(5);
    } catch (error) {
      toast.error("Failed to submit review.");
    }
  };

  return (
    <div className="review-form">
      <h4>Leave a Review</h4>
      <form onSubmit={handleSubmit} className="comments_form">
        <div className="form-group">
          <label htmlFor="rating-select">Rating:</label>
          <select
            id="rating-select"
            className="form-control"
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            aria-label="Select a rating from 1 to 5 stars"
          >
            {[1, 2, 3, 4, 5].map((num) => (
              <option key={num} value={num}>
                {num} Stars
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Comment:</label>
          <textarea
            className="form-control"
            rows={6}
            placeholder="Your Review"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={isLoading} className="btn btn-thm">
          Submit Review
        </button>
      </form>
    </div>
  );
};

export default ReviewForm;
