import Image from "next/image";
import Ratings from "./Ratings";
import { Review } from "@/types/review";
import { format } from "date-fns";

interface CommentsProps {
  reviews: Review[];
}

const Comments = ({ reviews = [] }: CommentsProps) => {
  if (reviews.length === 0) {
    return (
      <div className="text-center py-4">
        <p>No reviews yet. Be the first to review!</p>
      </div>
    );
  }

  return (
    <div className="comments">
      {reviews.map((review) => (
        <div key={review.id} className="mbp_first media">
          <div className="d-flex">
            {review.user?.img && (
              <Image
                src={review.user.img}
                alt={review.user.name || 'User'}
                width={70}
                height={70}
                className="rounded-circle"
              />
            )}
            <div className="comment-body">
              <div className="d-flex justify-content-between">
                <h5 className="comment-author">
                  {review.user?.name || 'Anonymous'}
                </h5>
                <div className="comment-date">
                  {format(new Date(review.createdAt), 'MMMM d, yyyy')}
                </div>
              </div>
              <div className="rating mb-2">
                <Ratings rating={review.rating} />
              </div>
              <p className="comment-text">{review.comment}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Comments;
