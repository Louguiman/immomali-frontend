"use client";

import { useGetReceivedReviewsQuery } from "@/features/api/reviews.api";
import { useAppSelector } from "@/store/hooks";
import { RootState } from "@/store/store";
import Image from "next/image";
import { useTranslations } from "next-intl";

// Define the review type based on the API response
interface Review {
  id: string;
  comment: string;
  rating: number;
  createdAt: string;
  user: {
    id: string;
    name: string;
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

// Define the shape of the API response
type ReviewsResponse = {
  data: Review[];
  isLoading: boolean;
  error?: unknown;
};

const ClientReview = () => {
  const t = useTranslations("dashboard.reviews");
  
  // Define Role type for better type safety
  type Role = { name: string };
  
  // Safely extract user data from Redux state
  const { id: userId = '', roles = [] } = useAppSelector((state: RootState) => ({
    id: state.auth?.user?.id ?? '',
    roles: (state.auth?.user?.roles as Role[]) ?? []
  }));
  
  // Check if user has 'user' role
  const isUser = roles.some(role => role.name === 'user');
  
  // Fetch reviews with proper typing
  const { data = [], isLoading, error } = useGetReceivedReviewsQuery(
    userId,
    { skip: !userId || isUser }
  ) as ReviewsResponse;

  const reviews = data || [];

  // Loading and error states
  if (isLoading) return <p className="text-center py-4">{t("loadingReviews")}</p>;
  
  if (error) {
    console.error('Error loading reviews:', error);
    return <p className="text-center text-danger py-4">{t("errorLoadingReviews")}</p>;
  }
  
  if (!userId) return <p className="text-center py-4">{t("pleaseLogin")}</p>;
  if (!reviews.length) return <p className="text-center py-4">{t("noReviews")}</p>;

  return (
    <>
      {reviews.map((review) => (
        <article 
          className="media pb30 mt30 d-flex align-items-start" 
          key={review.id}
          itemScope
          itemType="https://schema.org/Review"
        >
          <div className="flex-shrink-0 me-3">
            <Image
              width={80}
              height={80}
              className="rounded-circle"
              src={review.user?.img || "/assets/images/resource/review.png"}
              alt={`${review.user?.name || t('user')} ${t('profileImage')}`}
              title={review.user?.name}
              itemProp="image"
            />
          </div>
          <div className="media-body">
            <header>
              <h2 className="review_title mt-0 h5" itemProp="name">
                {t("reviewFrom")}{" "}
                <span className="text-thm" itemProp="author">
                  {review.user?.name}
                </span>
                <div 
                  className="sspd_review d-inline-flex gap-1 ms-2" 
                  aria-label={`${review.rating} ${t('outOf')} 5 ${t('stars')}`}
                >
                  {[1, 2, 3, 4, 5].map((star) => (
                    <i 
                      key={star} 
                      className={`fa fa-star${star <= review.rating ? ' text-warning' : ' text-muted'}`}
                      aria-hidden="true"
                    />
                  ))}
                </div>
                <meta itemProp="reviewRating" content={review.rating.toString()} />
              </h2>
              <time 
                className="d-block text-muted mb-2 small" 
                dateTime={review.createdAt}
                itemProp="datePublished"
              >
                {new Date(review.createdAt).toLocaleDateString(undefined, {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </time>
            </header>
            <div className="review-content" itemProp="reviewBody">
              <p className="mb-0">{review.comment}</p>
            </div>
          </div>
        </article>
      ))}
    </>
  );
};

export default ClientReview;
