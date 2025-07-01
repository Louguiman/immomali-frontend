import { FC } from 'react';
import Image from "next/image";
import { useSelector } from "react-redux";
import styles from "./SingleChatboxReply.module.css";

type UserRole = 'tenant' | 'agent' | 'admin';

interface User {
  id: number;
  email: string;
  firstName?: string;
  lastName?: string;
  img?: string;
  role?: UserRole;
  phoneNumber?: string;
}

interface Reply {
  id: number | string;
  message: string;
  createdAt: string | Date;
  user?: User;
}

interface AuthState {
  user: {
    email: string;
    // Add other user properties as needed
    [key: string]: unknown;
  } | null;
}

interface SingleChatboxReplyProps {
  reply: Reply;
}

const SingleChatboxReply: FC<SingleChatboxReplyProps> = ({ reply }) => {
  const authState = useSelector((state: import("@/store/store").RootState) => state.auth);
  const currentUserEmail = authState.user?.email || '';
  const isSender = reply.user?.email === currentUserEmail;

  return (
    <>
      <li 
        className={`media ${isSender ? styles['sent'] : styles['received']} ${styles['replyContainer']}`} 
        key={reply.id}
      >
        <div className={`position-relative ${styles['avatarContainer']}`}>
          <Image
            fill
            className={`img-fluid align-self-start me-3 rounded-circle ${styles['avatar']}`}
            src={reply?.user?.img || "/assets/images/team/s8.jpg"}
            alt={reply?.user?.firstName ? `${reply.user.firstName} ${reply.user.lastName || ''}` : 'User'}
            sizes="57px"
            priority={false}
          />
        </div>
        <div className="media-body">
          <div className="date_time text-muted small" role="timer" aria-live="off">
            {new Date(reply.createdAt).toLocaleString(undefined, {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
              hour12: true
            })}
          </div>
          <div className={`${styles['messageBubble']} ${isSender ? styles['sent'] : ''} d-inline-block p-2 rounded`}>
            {reply.message}
          </div>
        </div>
      </li>
    </>
  );
};

export default SingleChatboxReply;
