"use client";

import { useGetReceivedReviewsQuery } from "@/features/api/reviews.api";
import { useAppSelector } from "@/store/hooks";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";

const ClientReview = () => {
  const user = useAppSelector((state) => state.auth?.user);
  // Extract roles from user object
  const userRoles = user?.roles?.map((role) => role.name) || [];
  const isUser = userRoles.includes("user");
  const { data: reviews, isLoading } = useGetReceivedReviewsQuery(user.id, {
    skip: isUser,
  });

  const t = useTranslations("dashboard.reviews"); // Initialize translation function

  if (isUser) return <p>{t("pleaseLogin")}</p>;
  if (isLoading) return <p>{t("loadingReviews")}</p>;
  if (!reviews?.length) return <p>{t("noReviews")}</p>;

  return (
    <>
      {reviews.map((review) => (
        <div className="media pb30 mt30" key={review.id}>
          <Image
            width={120}
            height={120}
            className="mr-3"
            src={review?.user?.img || "/assets/images/resource/review.png"}
            alt="User image"
          />
          <div className="media-body">
            <h5 className="review_title mt-0">
              {t("reviewFrom")}{" "}
              <span className="text-thm">{review.user?.name}</span>
              <span className="sspd_review float-end">
                {[...Array(review.rating)].map((_, i) => (
                  <i key={i} className="fa fa-star"></i>
                ))}
              </span>
            </h5>
            <a className="review_date">
              {new Date(review.createdAt).toDateString()}
            </a>
            <p className="para">{review.comment}</p>
          </div>
        </div>
      ))}
    </>
  );
};

export default ClientReview;
