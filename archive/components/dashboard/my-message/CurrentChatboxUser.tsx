import Image from "next/image";
import { useTranslations } from "next-intl";
import type { User } from "@/utils/interface/user.interface";
import "./CurrentChatboxUser.module.css";

interface CurrentChatboxUserProps {
  user?: User & {
    lastSeen?: string;
    isOnline?: boolean;
  };
  avatarUrl?: string;
  onUserClick?: () => void;
}

const CurrentChatboxUser: React.FC<CurrentChatboxUserProps> = ({
  user,
  avatarUrl = "/assets/images/team/avatar.png",
  onUserClick,
}) => {
  const t = useTranslations("dashboard.message");
  
  // Format last seen time
  const formatLastSeen = (lastSeen?: string) => {
    if (!lastSeen) return t("never_online");
    
    const lastSeenDate = new Date(lastSeen);
    const now = new Date();
    const diffInHours = (now.getTime() - lastSeenDate.getTime()) / (1000 * 60 * 60);
    
    if (diffInHours < 1) {
      const minutes = Math.floor(diffInHours * 60);
      return t("minutes_ago", { minutes });
    } else if (diffInHours < 24) {
      const hours = Math.floor(diffInHours);
      return t("hours_ago", { hours });
    } else {
      return t("last_seen", { date: lastSeenDate.toLocaleDateString() });
    }
  };

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    onUserClick?.();
  };

  return (
    <div className="user_heading">
      <a href="#" onClick={handleClick} className="text-decoration-none">
        <div className="d-flex align-items-center gap-3 p-2">
          <div className="position-relative d-inline-block">
            <span 
              className={`user-status ${user?.isOnline ? 'online' : 'offline'}`}
              aria-label={user?.isOnline ? t("online") : t("offline")}
            />
            <div className="avatar-container">
              <Image
                width={45}
                height={45}
                className="img-fluid user-avatar"
                src={user?.img || avatarUrl}
                alt={user ? `${user.firstName} ${user.lastName}` : t("user_avatar")}
                fill
                sizes="45px"
              />
            </div>
          </div>
          <div className="meta">
            <h5 className="name mb-0 fw-bold text-dark">
              {user ? `${user.firstName} ${user.lastName}` : t("unknown_user")}
            </h5>
            <p className="preview text-muted small mb-0">
              {user?.isOnline 
                ? t("online")
                : t("last_seen", { time: formatLastSeen(user?.lastSeen) })}
            </p>
          </div>
        </div>
      </a>
    </div>
  );
};

export default CurrentChatboxUser;
