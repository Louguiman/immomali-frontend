import Image from "next/image";import { useGetInquiryRepliesQuery } from "@/features/api/inquiries.api";
import SignleChatboxReply from "./SignleChatboxReply";
import PropertyCard from "@/components/PropertCard";

const ChatboxContent = ({ inquiry }) => {
  const { data: replies, isLoading } = useGetInquiryRepliesQuery(inquiry?.id);

  if (isLoading) return <p>Loading messages...</p>;
  if (!replies || replies.length === 0) return <p>No messages yet.</p>;

  return (
    <>
      {/* Display PropertyCard if inquiry is about a property */}
      {inquiry.property && (
        <div className="property-preview">
          <h5 className="text-thm">Property Inquiry</h5>
          <PropertyCard property={inquiry.property} />
        </div>
      )}

      <div className="inbox_chatting_box">
        <ul className="chatting_content">
          {replies.map((reply) => (
            <SignleChatboxReply key={reply.id} reply={reply} />
          ))}
        </ul>
      </div>

      {/* Message Input */}
      <div className="mi_text">
        <div className="message_input">
          <form className="form-inline position-relative">
            <textarea
              className="form-control"
              placeholder="Enter text here..."
              cols="20"
              rows="1"
              wrap="hard"
              required
            />
            <button className="btn" type="submit">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ChatboxContent;
