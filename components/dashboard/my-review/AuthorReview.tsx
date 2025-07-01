"use client";

import { useState, ChangeEvent } from "react";
import { toast } from "react-toastify";
import { useTranslations } from "next-intl";
import {
  useUpdateReviewMutation,
  useDeleteReviewMutation,
  useGetAllUserReviewsQuery,
} from "@/features/api/reviews.api";
import { useAppSelector } from "@/store/hooks";
import { RootState } from "@/store/store";
import Image from "next/image";
import Link from "next/link";

interface Review {
  id: string;
  comment: string;
  rating: number;
  createdAt: string;
  user?: {
    id: string;
    img?: string;
  };
  property?: {
    title: string;
  };
  agent?: {
    name: string;
  };
  agency?: {
    name: string;
  };
}

interface UpdatedReviewState {
  comment: string;
  rating: number;
}

const AuthorReview = () => {
  const t = useTranslations("dashboard.reviews");
  const user = useAppSelector((state: import("@/store/store").RootState) => state.auth?.user);
  const userId = user?.id || "";
  const { data: reviews, isLoading } = useGetAllUserReviewsQuery(userId, {
    skip: !user?.id,
  });

  const [updateReview] = useUpdateReviewMutation();
  const [deleteReview] = useDeleteReviewMutation();
  const [editingReview, setEditingReview] = useState<string | null>(null);
  const [updatedReview, setUpdatedReview] = useState<UpdatedReviewState>({
    comment: "",
    rating: 0,
  });

  if (isLoading) return <p>{t("loading")}</p>;
  if (!reviews?.length) return <p>{t("noReviews")}</p>;

  /** Handle Edit Click */
  const handleEditClick = (review: Review) => {
    if (!review.id) return;
    setEditingReview(review.id);
    setUpdatedReview({ 
      comment: review.comment, 
      rating: review.rating 
    });
  };

  /** Handle Save Updated Review */
  const handleSave = async (reviewId: string) => {
    if (!reviewId) return;
    
    try {
      await updateReview({ 
        id: reviewId, 
        ...updatedReview 
      }).unwrap();
      toast.success(t("updateSuccess"));
      setEditingReview(null);
    } catch (error: unknown) {
      const errorMessage = error && 
        typeof error === 'object' && 
        'data' in error && 
        error.data && 
        typeof error.data === 'object' &&
        'message' in error.data ? 
          String(error.data.message) : 
        error instanceof Error ? 
          error.message : 
        t("unknownError");
      
      toast.error(t("updateError", { error: errorMessage }));
    }
  };

  /** Handle Delete Review */
  const handleDelete = async (reviewId: string) => {
    if (!window.confirm(t("confirmDelete"))) return;

    try {
      await deleteReview(reviewId).unwrap();
      toast.success(t("deleteSuccess"));
    } catch (error: unknown) {
      const errorMessage = error && 
        typeof error === 'object' && 
        'data' in error && 
        error.data && 
        typeof error.data === 'object' &&
        'message' in error.data ? 
          String(error.data.message) : 
        error instanceof Error ? 
          error.message : 
        t("unknownError");
      
      toast.error(t("deleteError", { error: errorMessage }));
    }
  };

  return (
    <>
      {reviews.map((item: Review) => (
        <div className="media mt30" key={item.id}>
          <Image
            width={120}
            height={120}
            className="mr-3 rounded-circle"
            src={item?.user?.img || "/assets/images/resource/review.png"}
            alt={t("reviewImageAlt")}
          />
          <div className="media-body">
            <h5 className="review_title mt-0">
              {t("yourReviewOn")}{" "}
              <Link href="#">
                <span className="text-thm">
                  {item?.property?.title ||
                    item?.agent?.name ||
                    item?.agency?.name}
                </span>
              </Link>
              <span className="sspd_review float-end">
                {[...Array(5)].map((_, index) => (
                  <i
                    key={index}
                    className={`fa fa-star ${
                      index < item.rating ? "text-warning" : "text-muted"
                    }`}
                  ></i>
                ))}
              </span>
            </h5>
<time 
              className="review_date text-muted d-inline-block mb-2" 
              dateTime={item.createdAt}
            >
              {new Date(item.createdAt).toLocaleDateString()}
            </time>

            {/* Edit Mode */}
            {editingReview === item.id ? (
              <div className="mt3">
                <textarea
                  className="form-control mb-2"
                  rows={3}
                  value={updatedReview.comment}
                  onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                    setUpdatedReview({
                      ...updatedReview,
                      comment: e.target.value,
                    })
                  }
                  aria-label={t("comment")}
                  placeholder={t("enterYourComment")}
                ></textarea>
                <div className="d-flex align-items-center">
                  <label className="me-2">{t("rating")}:</label>
                  <select
                    className="form-select w-auto"
                    value={updatedReview.rating}
                    onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                      setUpdatedReview({
                        ...updatedReview,
                        rating: Number(e.target.value),
                      })
                    }
                    aria-label={t("rating")}
                    title={t("selectRating")}
                  >
                    {[1, 2, 3, 4, 5].map((num) => (
                      <option key={num} value={num}>
                        {num}
                      </option>
                    ))}
                  </select>
                  <button
                    className="btn btn-sm btn-success ms-3"
                    onClick={() => handleSave(item.id)}
                  >
                    {t("save")}
                  </button>
                  <button
                    className="btn btn-sm btn-secondary ms-2"
                    onClick={() => setEditingReview(null)}
                  >
                    {t("cancel")}
                  </button>
                </div>
              </div>
            ) : (
              // View Mode
              <p className="para">{item.comment}</p>
            )}

            {/* Edit & Delete Icons */}
            <ul className="view_edit_delete_list mb0 mt35 d-flex gap-3">
              <li
                className="list-inline-item"
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                title={t("edit")}
              >
<button
                  type="button"
                  className="btn btn-link p-0 border-0 bg-transparent"
onClick={() => item.id && handleEditClick(item)}
                  aria-label={t("editReview")}
                >
                  <span className="flaticon-edit text-primary" aria-hidden="true"></span>
                </button>
              </li>
              <li
                className="list-inline-item"
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                title={t("delete")}
              >
<button
                  type="button"
                  className="btn btn-link p-0 border-0 bg-transparent"
onClick={() => item.id && handleDelete(item.id)}
                  aria-label={t("deleteReview")}
                >
                  <span className="flaticon-garbage text-danger" aria-hidden="true"></span>
                </button>
              </li>
            </ul>
          </div>
        </div>
      ))}
    </>
  );
};

export default AuthorReview;
