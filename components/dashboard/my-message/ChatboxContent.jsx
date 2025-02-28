"use client";
import { useState } from "react";
import Image from "next/image";
import {
  useGetInquiryRepliesQuery,
  useSendInquiryReplyMutation,
} from "@/features/api/inquiries.api";
import SignleChatboxReply from "./SignleChatboxReply";
import PropertyCard from "@/components/PropertyCard";
import { useSelector } from "react-redux";

const ChatboxContent = ({ inquiry }) => {
  const { user } = useSelector((state) => state.auth); // Get logged-in user
  const { data: replies, isLoading } = useGetInquiryRepliesQuery(inquiry?.id);
  const [createReply, { isLoading: isSending }] = useSendInquiryReplyMutation();
  const [message, setMessage] = useState("");

  if (isLoading) return <p>Loading messages...</p>;

  // Function to handle reply submission
  const handleSendReply = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    try {
      await createReply({
        userId: user.id,
        inquiryId: inquiry.id,
        message,
      }).unwrap();

      setMessage(""); // Clear input field after sending
    } catch (error) {
      console.error("Error sending reply:", error);
    }
  };

  return (
    <>
      <div className="meta">
        <h5 className="name">{inquiry?.name || "Unknown"}</h5>
        <h6 className="name">{inquiry?.email || "Unknown"}</h6>
        <h6 className="name">{inquiry?.phoneNumber || "Unknown"}</h6>
        <p className="preview">{inquiry.message}</p>
      </div>

      {/* Display PropertyCard if inquiry is about a property */}
      {inquiry.property && (
        <div className="property-preview">
          <h5 className="text-thm">Property Inquiry</h5>
          <PropertyCard property={inquiry.property} />
        </div>
      )}

      <div className="inbox_chatting_box">
        <ul className="chatting_content">
          {replies?.map((reply) => (
            <SignleChatboxReply key={reply.id} reply={reply} />
          ))}
        </ul>
      </div>

      {/* Message Input */}
      <div className="mi_text">
        <div className="message_input">
          <form
            className="form-inline position-relative"
            onSubmit={handleSendReply}
          >
            <textarea
              className="form-control"
              placeholder="Enter text here..."
              cols="20"
              rows="1"
              wrap="hard"
              required
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button className="btn" type="submit" disabled={isSending}>
              {isSending ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ChatboxContent;
