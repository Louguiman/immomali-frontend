import { useTranslations } from "next-intl";
import { useEffect, useRef, useMemo } from "react";
import type { Inquiry } from "@/utils/interface/inquiry.interface";
import type { User } from "@/utils/interface/user.interface";
import SearchUser from "./SearchUser";
import SingleUser from "./SingleUser";

// Define the ExtendedInquiry type with required properties
interface ExtendedInquiry extends Omit<Inquiry, 'user'> {
  unreadCount: number;
  user: {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    role: 'tenant' | 'agent' | 'admin';
    phoneNumber?: string;
    img?: string;
  };
}

// Type guard to check if an object has an img property
function hasImgProperty(obj: unknown): boolean {
  return typeof obj === 'object' && obj !== null && 'img' in obj && typeof (obj as { img: unknown }).img === 'string';
}

// Extend the Inquiry interface for the Inbox component
type InboxInquiry = Inquiry & {
  unreadCount?: number;
  user?: User & { img?: string };
};

/**
 * Props for the InboxUser component
 * @interface InboxUserProps
 * @property {Inquiry | null} selectedInquiry - Currently selected inquiry
 * @property {Inquiry[]} inquiries - List of inquiries to display
 * @property {(inquiry: Inquiry) => void} onClick - Callback when an inquiry is selected
 * @property {(query: string) => void} [onSearch] - Callback for search functionality
 * @property {boolean} [isLoading] - Whether the component is in a loading state
 * @property {Error | null} [error] - Error object if an error occurred
 * @property {string} [className] - Additional CSS classes
 */
interface InboxUserProps {
  selectedInquiry: InboxInquiry | null;
  inquiries: InboxInquiry[];
  onClick: (inquiry: InboxInquiry) => void;
  onSearch?: (query: string) => void;
  isLoading?: boolean;
  error?: Error | null;
  className?: string;
}

/**
 * InboxUser component displays a list of inquiries with search functionality
 * @component
 * @param {InboxUserProps} props - Component props
 * @returns {JSX.Element} The rendered InboxUser component
 */
const InboxUser: React.FC<InboxUserProps> = ({
  selectedInquiry,
  inquiries,
  onClick,
  onSearch,
  isLoading = false,
  error = null,
  className = "",
}) => {
  const t = useTranslations("dashboard.message.inbox");
  const listRef = useRef<HTMLUListElement>(null);
  const searchTermRef = useRef<string>("");

  // Focus the selected inquiry when it changes
  useEffect(() => {
    if (selectedInquiry && listRef.current) {
      const selectedItem = listRef.current.querySelector('[aria-current="true"]');
      if (selectedItem instanceof HTMLElement) {
        selectedItem.focus();
      }
    }
  }, [selectedInquiry]);

  // Filter inquiries based on search term
  const filteredInquiries = useMemo(() => {
    if (!searchTermRef.current.trim()) return inquiries;
    const searchLower = searchTermRef.current.toLowerCase();
    return inquiries.filter(inquiry => {
      const user = inquiry.user || {} as Partial<User>;
      return (
        (user.firstName?.toLowerCase().includes(searchLower) ||
        user.lastName?.toLowerCase().includes(searchLower) ||
        user.email?.toLowerCase().includes(searchLower) ||
        inquiry.message?.toLowerCase().includes(searchLower))
      );
    });
  }, [inquiries]);

  // Use filtered inquiries or fallback to all inquiries
  const displayedInquiries = filteredInquiries.length > 0 ? filteredInquiries : inquiries;

  const handleKeyDown = (e: React.KeyboardEvent, inquiry: Inquiry) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick(inquiry);
    }
  };

  return (
    <div 
      className={`inbox_user_list h-100 d-flex flex-column ${className}`}
      role="region"
      aria-label={t("inbox")}
    >
      <div className="iu_heading p-3 border-bottom">
        <h2 className="h4 mb-0 fw-bold">{t("inbox")}</h2>
      </div>
      
      <div className="p-3 border-bottom">
        <div className="candidate_revew_search_box">
          <SearchUser 
            onSearch={onSearch || ((term: string) => { searchTermRef.current = term; })} 
            disabled={isLoading}
            aria-label={t("search_messages")}
          />
        </div>
      </div>

      <div 
        className="flex-grow-1 overflow-auto"
        {...(isLoading && { 'aria-busy': true })}
        aria-live="polite"
        aria-label={t("messages_container")}
      >
        {isLoading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">{t("loading")}...</span>
            </div>
          </div>
        ) : error ? (
          <div className="alert alert-danger m-3" role="alert">
            {t("error_loading_messages")}
          </div>
        ) : inquiries.length === 0 ? (
          <div className="text-center py-5 text-muted">
            {t("no_messages")}
          </div>
        ) : (
          <ul 
            ref={listRef}
            className="list-unstyled mb-0"
            role="listbox"
            aria-label={t("messages_list")}
          >
            {displayedInquiries.map((inquiry) => {
              const isSelected = selectedInquiry?.id === inquiry.id;
              // Create a safe user object with required fields
              const defaultUser = {
                id: 0,
                firstName: t('unknown'),
                lastName: '',
                email: '',
                role: 'tenant' as const,
                phoneNumber: ''
              };

              // Merge with the actual user data if available
              const userData = inquiry.user ? {
                id: inquiry.user.id || 0,
                firstName: inquiry.user.firstName || t('unknown'),
                lastName: inquiry.user.lastName || '',
                email: inquiry.user.email || '',
                role: (inquiry.user.role as 'tenant' | 'agent' | 'admin') || 'tenant',
                phoneNumber: inquiry.user.phoneNumber || '',
                ...(hasImgProperty(inquiry.user) && { img: (inquiry.user as { img: string }).img })
              } : defaultUser;
              
              const extendedInquiry: ExtendedInquiry = {
                ...inquiry,
                unreadCount: inquiry.unreadCount ?? 0,
                user: userData
              };
              
              return (
                <li 
                  key={inquiry.id} 
                  className="border-bottom"
                  role="option"
                  aria-selected={isSelected ? "true" : "false"}
                  tabIndex={isSelected ? 0 : -1}
                  onKeyDown={(e) => handleKeyDown(e, inquiry)}
                  title={isSelected ? t('selected_message') : ''}
                  aria-label={`${t('message_from')} ${inquiry.user?.firstName || t('unknown_user')}${isSelected ? `, ${t('selected')}` : ''}`}
                >
                  <SingleUser
                    inquiry={extendedInquiry}
                    isSelected={isSelected}
                    onClick={() => onClick(inquiry)}
                  />
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
};

export default InboxUser;
