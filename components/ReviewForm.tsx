"use client";

import { useCreateReviewMutation } from "@/features/api/reviews.api";
import { useState } from "react";
import { toast } from "react-toastify";
import { useTranslations } from "next-intl";
import { useAppSelector } from "@/store/store";

const ReviewForm = ({ propertyId }: { propertyId: string }) => {
  const t = useTranslations("property.ReviewForm");

  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(5);
  const user = useAppSelector((state) => state.auth?.user);
  const [createReview, { isLoading }] = useCreateReviewMutation();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) {
      toast.error(t("mustBeLoggedIn"));
      return;
    }

    try {
      await createReview({ propertyId, comment, rating }).unwrap();
      toast.success(t("reviewSubmitted"));
      setComment("");
      setRating(5);
    } catch (error) {
      toast.error(t("reviewFailed"));
    }
  };

  return (
    <div className="review-form">
      <h4>{t("leaveReview")}</h4>
      <form onSubmit={handleSubmit} className="comments_form">
        <div className="form-group">
          <label htmlFor="rating-select">{t("rating")}</label>
          <select
            id="rating-select"
            className="form-control"
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            aria-label={t("selectRating")}
          >
            {[1, 2, 3, 4, 5].map((num) => (
              <option key={num} value={num}>
                {t("stars", { num })}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>{t("comment")}</label>
          <textarea
            className="form-control"
            rows={6}
            placeholder={t("placeholder")}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={isLoading} className="btn btn-thm">
          {t("submit")}
        </button>
      </form>
    </div>
  );
};

export default ReviewForm;
