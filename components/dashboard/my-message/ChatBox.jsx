"use client";

import InboxUser from "./InboxUser";
import ChatboxContent from "./ChatboxContent";
import { useAppSelector } from "@/store/hooks";
import {
  useGetSentInquiriesQuery,
  useGetReceivedInquiriesQuery,
} from "@/features/api/inquiries.api";
import { useState } from "react";

const ChatBox = () => {
  const user = useAppSelector((state) => state.auth?.user);
  const {
    data: sentInquiries,
    isLoading: sentLoading,
    isError: isErrorSent,
  } = useGetSentInquiriesQuery();
  const {
    data: receivedInquiries,
    isLoading: receivedLoading,
    isError: isErrorReceived,
  } = useGetReceivedInquiriesQuery();
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  if (sentLoading || receivedLoading) return <p>Loading inquiries...</p>;
  if (isErrorSent || isErrorReceived) return <p>Error loading inquiries...</p>;

  const inquiries = user.roles.some((role) => role.name !== "user")
    ? receivedInquiries
    : sentInquiries;

  return (
    <div className="row">
      {/* Sidebar - List of Inquiries */}
      <div className="col-lg-5 col-xl-4">
        <div className="message_container">
          <InboxUser
            inquiries={inquiries}
            onSelectInquiry={setSelectedInquiry}
          />
        </div>
      </div>

      {/* Chatbox - Display selected inquiry details */}
      <div className="col-lg-7 col-xl-8">
        <div className="message_container">
          {selectedInquiry ? (
            <ChatboxContent inquiry={selectedInquiry} />
          ) : (
            <p className="text-center">Select an inquiry to view messages.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatBox;
