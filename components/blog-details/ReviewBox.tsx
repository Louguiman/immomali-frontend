import { useState } from "react";
import { useCreateReviewMutation } from "@/features/api/reviews.api";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

interface ReviewBoxProps {
  agentId: string | number;
}

const ReviewBox = ({ agentId }: ReviewBoxProps) => {
  const [title, setTitle] = useState("");
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const [createReview, { isLoading }] = useCreateReviewMutation();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !comment.trim() || rating === 0) {
      toast.error("Please fill in all fields and provide a rating");
      return;
    }

    try {
      await createReview({
        agentId,
        title,
        comment,
        rating,
      }).unwrap();

      toast.success("Review submitted successfully!");
      setTitle("");
      setComment("");
      setRating(0);
      router.refresh(); // Refresh to show the new review
    } catch (error) {
      console.error("Failed to submit review:", error);
      toast.error("Failed to submit review. Please try again.");
    }
  };

  return (
    <form className="comments_form" onSubmit={handleSubmit}>
      <div className="form-group">
        <input
          type="text"
          className="form-control"
          placeholder="Review Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          disabled={isLoading}
        />
      </div>
      {/* End .form-group */}

      <div className="form-group">
        <textarea
          className="form-control"
          rows={6}
          placeholder="Your Review"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          required
          disabled={isLoading}
        ></textarea>
      </div>

      <div className="form-group">
        <label className="d-block mb-2">Rating</label>
        <div className="d-flex align-items-center">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              className={`border-0 bg-transparent fs-3 ${rating >= star ? "text-warning" : "text-muted"}`}
              onClick={() => setRating(star)}
              disabled={isLoading}
              aria-label={`Rate ${star} out of 5`}
            >
              ★
            </button>
          ))}
          <span className="ms-2">
            {rating > 0
              ? `${rating} ${rating === 1 ? "star" : "stars"}`
              : "No rating"}
          </span>
        </div>
      </div>

      <div className="form-group mb0">
        <button type="submit" className="btn btn-thm" disabled={isLoading}>
          {isLoading ? "Submitting..." : "Submit Review"}
        </button>
      </div>
    </form>
  );
};

export default ReviewBox;
