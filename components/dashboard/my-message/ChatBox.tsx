"use client";

import { useTranslations } from "next-intl";
import { useState, useMemo } from "react";
import InboxUser from "./InboxUser";
import ChatboxContent from "./ChatboxContent";
import { useAppSelector } from "@/store/hooks";
import {
  useGetSentInquiriesQuery,
  useGetReceivedInquiriesQuery,
} from "@/features/api/inquiries.api";
import type { Inquiry } from "@/utils/interface/inquiry.interface";
import type { User } from "@/utils/interface/user.interface";
import LoadingSpinner from "@/components/common/LoadingSpinner";

interface ChatBoxProps {
  // Add any props if needed in the future
}

const ChatBox: React.FC<ChatBoxProps> = () => {
  const t = useTranslations("dashboard.message");
  const user = useAppSelector((state: { auth: { user: User } }) => state.auth?.user);
  const userId = user?.id;

  // Fetch sent and received inquiries
  const {
    data: sentInquiries = [],
    isLoading: sentLoading,
    isError: isErrorSent,
  } = useGetSentInquiriesQuery(userId || 0, { 
    skip: !userId,
    refetchOnMountOrArgChange: true,
  });

  const {
    data: receivedInquiries = [],
    isLoading: receivedLoading,
    isError: isErrorReceived,
  } = useGetReceivedInquiriesQuery(userId || 0, { 
    skip: !userId,
    refetchOnMountOrArgChange: true,
  });

  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);

  // Determine which inquiries to display based on user role
  const inquiries = useMemo(() => {
    const isAgencyUser = user?.role === 'admin' || user?.role === 'agent';
    return isAgencyUser ? receivedInquiries : sentInquiries;
  }, [user?.role, receivedInquiries, sentInquiries]);

  // Loading state
  if (sentLoading || receivedLoading) {
    return (
      <div className="d-flex justify-content-center my-5">
        <LoadingSpinner />
      </div>
    );
  }

  // Error state
  if (isErrorSent || isErrorReceived) {
    return (
      <div className="alert alert-danger">
        {t("chatbox.error_loading")}
      </div>
    );
  }


  return (
    <div className="row" role="main" aria-label={t('chatbox.title')}>
      {/* Sidebar - List of inquiries */}
      <div className="col-lg-5 col-xl-4">
        <div className="message_container">
          <InboxUser
            selectedInquiry={selectedInquiry}
            inquiries={inquiries}
            onClick={setSelectedInquiry}
          />
        </div>
      </div>

      {/* Chat area - Display messages */}
      <div
        className={
          selectedInquiry?.property ? "col-lg-5 col-xl-6" : "col-lg-7 col-xl-8"
        }
        aria-live="polite"
      >
        <div className="message_container">
          {selectedInquiry ? (
            <ChatboxContent inquiry={selectedInquiry} />
          ) : (
            <p className="text-center text-muted my-5">
              {t("chatbox.select_inquiry")}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatBox;
