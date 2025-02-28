"use client";

import { useGetReceivedReviewsQuery } from "@/features/api/reviews.api";
import { useAppSelector } from "@/store/hooks";
import Image from "next/image";
import Link from "next/link";

const ClientReview = () => {
  const user = useAppSelector((state) => state.auth?.user);
  const { data: reviews, isLoading } = useGetReceivedReviewsQuery(user.id, {
    skip: !user?.id,
  });

  if (isLoading) return <p>Loading received reviews...</p>;
  if (!reviews?.length) return <p>No reviews received yet.</p>;

  return (
    <>
      {reviews.map((review) => (
        <div className="media pb30 mt30" key={review.id}>
          <Image
            width={120}
            height={120}
            className="mr-3"
            src={
              review.user?.profilePicture || "/assets/images/default-user.png"
            }
            alt="User image"
          />
          <div className="media-body">
            <h5 className="review_title mt-0">
              Review from{" "}
              <Link href={`/user/${review.user?.id}`}>
                <span className="text-thm">{review.user?.name}</span>
              </Link>
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
