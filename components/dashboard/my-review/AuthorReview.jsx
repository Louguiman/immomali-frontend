"use client";
import { useState } from "react";
import { toast } from "react-toastify";
import {
  useUpdateReviewMutation,
  useDeleteReviewMutation,
  useGetAllUserReviewsQuery,
} from "@/features/api/reviews.api";
import { useAppSelector } from "@/store/hooks";
import Image from "next/image";
import { Link } from "@/i18n/navigation";

const AuthorReview = () => {
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

  if (isLoading) return <p>Loading reviews...</p>;
  if (!reviews?.length) return <p>No reviews yet.</p>;

  /** Handle Edit Click */
  const handleEditClick = (review) => {
    setEditingReview(review.id);
    setUpdatedReview({ comment: review.comment, rating: review.rating });
  };

  /** Handle Save Updated Review */
  const handleSave = async (reviewId) => {
    try {
      await updateReview({ id: reviewId, ...updatedReview }).unwrap();
      toast.success("Review updated successfully!");
      setEditingReview(null);
    } catch (err) {
      toast.error(
        "Failed to update review: " + err.data?.message || err.message
      );
    }
  };

  /** Handle Delete Review */
  const handleDelete = async (reviewId) => {
    if (!window.confirm("Are you sure you want to delete this review?")) return;

    try {
      await deleteReview(reviewId).unwrap();
      toast.success("Review deleted successfully!");
    } catch (err) {
      toast.error(
        "Failed to delete review: " + err.data?.message || err.message
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
            alt="Review image"
          />
          <div className="media-body">
            <h5 className="review_title mt-0">
              Your review on{" "}
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
                  <label className="me-2">Rating:</label>
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
                    Save
                  </button>
                  <button
                    className="btn btn-sm btn-secondary ms-2"
                    onClick={() => setEditingReview(null)}
                  >
                    Cancel
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
                title="Edit"
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
                title="Delete"
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
