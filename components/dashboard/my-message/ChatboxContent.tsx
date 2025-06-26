"use client";

import { useState, FormEvent } from "react";
import { useTranslations } from "next-intl";
import { useSelector } from "react-redux";
import {
  useGetInquiryRepliesQuery,
  useSendInquiryReplyMutation,
} from "@/features/api/inquiries.api";
import SingleChatboxReply from "./SingleChatboxReply";
import PropertyCardWithQuery from "@/components/common/cards/PropertyCardWithQuery";
import type { Inquiry, InquiryReply } from "@/utils/interface/inquiry.interface";
import type { RootState } from "@/store/store";
import type { User } from "@/utils/interface/user.interface";

interface ChatboxContentProps {
  inquiry: Inquiry;
}

const ChatboxContent: React.FC<ChatboxContentProps> = ({ inquiry }) => {
  const t = useTranslations("dashboard.message.chatbox");
  const user = useSelector((state: RootState) => state.auth.user as User | null);
  
  const { 
    data: replies = [], 
    isLoading, 
    isError 
  } = useGetInquiryRepliesQuery(inquiry?.id || 0, {
    skip: !inquiry?.id,
    refetchOnMountOrArgChange: true,
  });
  
  const [createReply, { isLoading: isSending }] = useSendInquiryReplyMutation();
  const [message, setMessage] = useState("");

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center my-5">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="alert alert-danger">
        {t("error_loading_messages")}
      </div>
    );
  }

  // Function to send a reply
  const handleSendReply = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!message.trim() || !user) return;

    try {
      await createReply({
        userId: user.id,
        inquiryId: inquiry.id,
        message,
      }).unwrap();
      setMessage(""); // Clear the field after sending
    } catch (error) {
      console.error("Error sending reply:", error);
    }
  };

  return (
    <div className="chatbox-content">
      <div className="meta mb-4 p-3 bg-light rounded">
        {/* Sender Information */}
        <div className="d-flex flex-wrap gap-4 mb-3">
          <div>
            <h5 className="name fw-bold mb-1">
              <i className="flaticon-user me-2"></i>
              {inquiry?.user?.firstName && inquiry?.user?.lastName 
                ? `${inquiry.user.firstName} ${inquiry.user.lastName}`
                : t("unknown_sender")}
            </h5>
            <p className="text-muted small mb-0">{t("sender")}</p>
          </div>

          <div>
            <h6 className="email mb-1">
              <i className="flaticon-mail me-2"></i>
              {inquiry?.user?.email || t("unknown")}
            </h6>
            <p className="text-muted small mb-0">{t("email")}</p>
          </div>

          {inquiry?.user?.phoneNumber && (
            <div>
              <h6 className="phone mb-1">
                <i className="flaticon-phone-call me-2"></i>
                {inquiry.user.phoneNumber}
              </h6>
              <p className="text-muted small mb-0">{t("phone")}</p>
            </div>
          )}
        </div>

        {/* Inquiry Message */}
        <div className="mt-3">
          <h6 className="text-thm mb-2">{t("inquiry_message")}</h6>
          <div className="p-3 bg-white rounded">
            <p className="mb-0">{inquiry.message}</p>
          </div>
        </div>
      </div>
      {/* Property Preview */}
      {inquiry?.property && (
        <div className="property-preview mb-4">
          <h5 className="text-thm mb-3">{t("property_inquiry")}</h5>
          <div className="card">
            <div className="card-body">
              <PropertyCardWithQuery id={inquiry.property.id} />
            </div>
          </div>
        </div>
      )}

      {/* Chat Messages */}
      <div className="inbox_chatting_box mb-4">
        <div className="chatting_content">
          {replies.length === 0 ? (
            <div className="text-center text-muted py-4">
              {t("no_messages")}
            </div>
          ) : (
            <ul className="list-unstyled mb-0">
              {replies.map((reply: InquiryReply) => (
                <li key={reply.id} className="mb-3">
                  <SingleChatboxReply reply={reply} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Message Input */}
      <div className="message-input-container bg-light p-3 rounded">
        <form onSubmit={handleSendReply} className="position-relative">
          <div className="input-group">
            <textarea
              className="form-control border-0"
              placeholder={t("enter_text")}
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              disabled={isSending}
              aria-label={t("type_message")}
            />
            <button
              type="submit"
              className="btn btn-thm"
              disabled={!message.trim() || isSending}
            >
              {isSending ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  {t("sending")}
                </>
              ) : (
                <>
                  <i className="far fa-paper-plane me-2"></i>
                  {t("send")}
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChatboxContent;
