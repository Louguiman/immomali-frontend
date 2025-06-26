import { useTranslations } from "next-intl";
import Image from "next/image";
import type { Inquiry } from "@/utils/interface/inquiry.interface";
import type { User } from "@/utils/interface/user.interface";
import styles from "./SingleUser.module.css";
import { useCallback } from "react";

// Extend the Inquiry interface to include unreadCount and properly type the user
interface ExtendedInquiry extends Omit<Inquiry, 'user'> {
  unreadCount: number;
  user?: User & { img?: string };
}

// Simple date formatter as a fallback
const formatDate = (dateString?: string): string => {
  if (!dateString) return "";
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    });
  } catch (error) {
    console.error("Error formatting date:", error);
    return "";
  }
};

interface SingleUserProps {
  isSelected: boolean;
  inquiry: ExtendedInquiry;
  onClick: () => void;
}

const SingleUser: React.FC<SingleUserProps> = ({ isSelected, inquiry, onClick }) => {
  const t = useTranslations("dashboard.message");

  // Get user display name
  const getUserName = useCallback((): string => {
    if (inquiry.user?.firstName && inquiry.user?.lastName) {
      return `${inquiry.user.firstName} ${inquiry.user.lastName}`;
    }
    return inquiry.name || t("user.unknown");
  }, [inquiry.name, inquiry.user?.firstName, inquiry.user?.lastName, t]);

  // Get user avatar
  const getAvatarUrl = useCallback((): string => {
    // Safe access to img property which might exist on user object
    return inquiry.user?.img || "/assets/images/team/avatar.png";
  }, [inquiry.user]);

  // Handle keyboard navigation
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onClick();
    }
  }, [onClick]);

  // Get unread count with proper typing and default value
  const unreadCount = (inquiry as ExtendedInquiry).unreadCount || 0;
  const hasUnread = unreadCount > 0;

  return (
    <li
      className={`${styles['contact']} ${isSelected ? styles['active-inquiry'] : ''}`}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="listitem"
      aria-current={isSelected ? 'true' : undefined}
    >
      <div className={styles['contactContent']}>
        {/* User Avatar */}
        <div className={styles['avatarContainer']}>
          <Image
            width={50}
            height={50}
            className={`${styles['avatar']} ${isSelected ? styles['selected'] : ''}`}
            src={getAvatarUrl()}
            alt={t("user.image_alt")}
            priority={isSelected}
          />
          {hasUnread && (
            <span className={`${styles['unreadBadge']} unread-badge`}>
              {unreadCount}
              <span className="visually-hidden">{t("unread_messages")}</span>
            </span>
          )}
        </div>

        <div className={styles['details']}>
          <div className={styles['header']}>
            <h3 className={styles['name']}>
              {getUserName()}
            </h3>
            <span className={styles['timestamp']}>
              {formatDate(inquiry.updatedAt || inquiry.createdAt)}
            </span>
          </div>

          <p className={styles['preview']}>
            {inquiry.property?.title && (
              <span className={styles['propertyTitle']}>
                {inquiry.property.title}:
              </span>
            )}
            {inquiry.message?.slice(0, 70) || t("user.no_message")}
            {inquiry.message && inquiry.message.length > 70 ? "..." : ""}
          </p>

          <div className={styles['contactInfo']}>
            {inquiry.email && (
              <span className={styles['contactInfoItem']}>
                <i className="far fa-envelope" aria-hidden="true"></i>
                {inquiry.email}
              </span>
            )}
            {inquiry.phoneNumber && (
              <span className={styles['contactInfoItem']}>
                <i className="fas fa-phone-alt" aria-hidden="true"></i>
                {inquiry.phoneNumber}
              </span>
            )}
          </div>
        </div>
      </div>
    </li>
  );
};

export default SingleUser;
