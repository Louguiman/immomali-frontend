"use client";

import {
  useDeleteReviewMutation,
  useGetReviewsQuery,
} from "@/features/api/reviews.api";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import Ratings from "./Ratings";
import { useTranslations } from "next-intl";

const ReviewsList = ({ propertyId }) => {
  const t = useTranslations("property.ReviewsList");

  const { data: reviews, isLoading } = useGetReviewsQuery(propertyId);
  const user = useSelector((state) => state.auth?.user);
  const [deleteReview] = useDeleteReviewMutation();

  if (isLoading) return <p>{t("loading")}</p>;
  if (!reviews?.length) return <p>{t("noReviews")}</p>;

  const handleDelete = async (id) => {
    try {
      await deleteReview(id).unwrap();
      toast.success(t("deleteSuccess"));
    } catch (error) {
      toast.error(t("deleteFail"));
    }
  };

  return (
    <div className="reviews-section">
      <h3>{t("propertyReviews")}</h3>
      <div className="total_review">
        <h4>{t("totalReviews", { count: reviews.length || 0 })}</h4>
        <ul className="review_star_list mb0 pl10">
          <Ratings />
        </ul>
        <a className="tr_outoff pl10" href="#">
          ({t("ratingOutOf", { rating: "4.5" })})
        </a>
        <a className="write_review float-end fn-xsd" href="#">
          {t("writeReview")}
        </a>
      </div>
      <ul className="list-group">
        {reviews.map((review) => (
          <li key={review.id} className="list-group-item">
            <p>
              <strong>{review.user.name}</strong> {t("rated")} {review.rating}/5
            </p>
            <p>{review.comment}</p>
            {user?.id === review.user.id && (
              <button
                className="btn btn-danger btn-sm"
                onClick={() => handleDelete(review.id)}
              >
                {t("delete")}
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReviewsList;
