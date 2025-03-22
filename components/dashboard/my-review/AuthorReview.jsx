"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import { useTranslations } from "next-intl";
import {
  useUpdateReviewMutation,
  useDeleteReviewMutation,
  useGetAllUserReviewsQuery,
} from "@/features/api/reviews.api";
import { useAppSelector } from "@/store/hooks";
import Image from "next/image";
import Link from "next/link";

const AuthorReview = () => {
  const t = useTranslations("dashboard.reviews");
  const user = useAppSelector((state) => state.auth?.user);
  const { data: reviews, isLoading } = useGetAllUserReviewsQuery(user?.id, {
    skip: !user?.id,
  });

  const [updateReview] = useUpdateReviewMutation();
  const [deleteReview] = useDeleteReviewMutation();
  const [editingReview, setEditingReview] = useState(null);
  const [updatedReview, setUpdatedReview] = useState({
    comment: "",
    rating: 0,
  });

  if (isLoading) return <p>{t("loading")}</p>;
  if (!reviews?.length) return <p>{t("noReviews")}</p>;

  /** Handle Edit Click */
  const handleEditClick = (review) => {
    setEditingReview(review.id);
    setUpdatedReview({ comment: review.comment, rating: review.rating });
  };

  /** Handle Save Updated Review */
  const handleSave = async (reviewId) => {
    try {
      await updateReview({ id: reviewId, ...updatedReview }).unwrap();
      toast.success(t("updateSuccess"));
      setEditingReview(null);
    } catch (err) {
      toast.error(
        t("updateError", { error: err.data?.message || err.message })
      );
    }
  };

  /** Handle Delete Review */
  const handleDelete = async (reviewId) => {
    if (!window.confirm(t("confirmDelete"))) return;

    try {
      await deleteReview(reviewId).unwrap();
      toast.success(t("deleteSuccess"));
    } catch (err) {
      toast.error(
        t("deleteError", { error: err.data?.message || err.message })
      );
    }
  };

  return (
    <>
      {reviews.map((item) => (
        <div className="media mt30" key={item.id}>
          <Image
            width={120}
            height={120}
            className="mr-3 rounded-circle"
            src="/assets/images/resource/review.png"
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
            <a className="review_date text-muted" href="#">
              {new Date(item.createdAt).toLocaleDateString()}
            </a>

            {/* Edit Mode */}
            {editingReview === item.id ? (
              <div className="mt3">
                <textarea
                  className="form-control mb-2"
                  rows={3}
                  value={updatedReview.comment}
                  onChange={(e) =>
                    setUpdatedReview({
                      ...updatedReview,
                      comment: e.target.value,
                    })
                  }
                ></textarea>
                <div className="d-flex align-items-center">
                  <label className="me-2">{t("rating")}:</label>
                  <select
                    className="form-select w-auto"
                    value={updatedReview.rating}
                    onChange={(e) =>
                      setUpdatedReview({
                        ...updatedReview,
                        rating: Number(e.target.value),
                      })
                    }
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
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handleEditClick(item);
                  }}
                >
                  <span className="flaticon-edit text-primary"></span>
                </a>
              </li>
              <li
                className="list-inline-item"
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                title={t("delete")}
              >
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handleDelete(item.id);
                  }}
                >
                  <span className="flaticon-garbage text-danger"></span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      ))}
    </>
  );
};

export default AuthorReview;
