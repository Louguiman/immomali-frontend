"use client";

import { useTranslations } from "next-intl";
import InboxUser from "./InboxUser";
import ChatboxContent from "./ChatboxContent";
import { useAppSelector } from "@/store/hooks";
import {
  useGetSentInquiriesQuery,
  useGetReceivedInquiriesQuery,
} from "@/features/api/inquiries.api";
import { useState } from "react";

const ChatBox = () => {
  const t = useTranslations("dashboard.message"); // Hook de traduction
  const user = useAppSelector((state) => state.auth?.user);
  const userId = user?.id;

  const {
    data: sentInquiries,
    isLoading: sentLoading,
    isError: isErrorSent,
  } = useGetSentInquiriesQuery(userId, { skip: !userId });

  const {
    data: receivedInquiries,
    isLoading: receivedLoading,
    isError: isErrorReceived,
  } = useGetReceivedInquiriesQuery(userId, { skip: !userId });

  const [selectedInquiry, setSelectedInquiry] = useState(null);

  if (sentLoading || receivedLoading) return <p>{t("chatbox.loading")}</p>;

  if (isErrorSent || isErrorReceived)
    return <p>{t("chatbox.error_loading")}</p>;

  const inquiries = user?.roles?.some((role) => role.name !== "user")
    ? receivedInquiries
    : sentInquiries;

  return (
    <div className="row">
      {/* Barre latérale - Liste des demandes */}
      <div className="col-lg-5 col-xl-4">
        <div className="message_container">
          <InboxUser
            selectedInquiry={selectedInquiry}
            inquiries={inquiries}
            onClick={setSelectedInquiry}
          />
        </div>
      </div>

      {/* Zone de discussion - Affichage des messages */}
      <div
        className={
          selectedInquiry?.property ? "col-lg-5 col-xl-6" : "col-lg-7 col-xl-8"
        }
      >
        <div className="message_container">
          {selectedInquiry ? (
            <ChatboxContent inquiry={selectedInquiry} />
          ) : (
            <p className="text-center">{t("chatbox.select_inquiry")}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatBox;
