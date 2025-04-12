"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import {
  useGetInquiryRepliesQuery,
  useSendInquiryReplyMutation,
} from "@/features/api/inquiries.api";
import SignleChatboxReply from "./SignleChatboxReply";
import PropertyCard from "@/components/PropertyCard";
import { useSelector } from "react-redux";

const ChatboxContent = ({ inquiry }) => {
  const t = useTranslations("dashboard.message.chatbox"); // Utilisation des traductions
  const { user } = useSelector((state) => state.auth); // Récupération de l'utilisateur connecté
  const { data: replies, isLoading } = useGetInquiryRepliesQuery(inquiry?.id);
  const [createReply, { isLoading: isSending }] = useSendInquiryReplyMutation();
  const [message, setMessage] = useState("");

  if (isLoading) return <p>{t("loading_messages")}</p>;

  // Fonction pour envoyer une réponse
  const handleSendReply = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    try {
      await createReply({
        userId: user.id,
        inquiryId: inquiry.id,
        message,
      }).unwrap();
      setMessage(""); // Effacer le champ après l'envoi
    } catch (error) {
      console.log("Error sending reply:", error);
    }
  };

  return (
    <>
      <div className="meta">
        {/* Nom */}
        <h5 className="name">
          <span className="flaticon-user pr-2"></span>
          {inquiry?.name || t("unknown")}
        </h5>

        {/* Email */}
        <h6 className="email">
          <span className="flaticon-mail pr-2"></span>
          {inquiry?.email || t("unknown")}
        </h6>

        {/* Téléphone */}
        <h6 className="phone">
          <span className="flaticon-phone-call pr-2"></span>
          {inquiry?.phoneNumber || t("unknown")}
        </h6>

        {/* Message */}
        <p className="preview">{inquiry.message}</p>
      </div>

      {/* Affichage de la propriété si concerné */}
      {inquiry.property && (
        <div className="property-preview">
          <h5 className="text-thm">{t("property_inquiry")}</h5>
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

      {/* Zone de saisie du message */}
      <div className="mi_text">
        <div className="message_input">
          <form
            className="form-inline position-relative"
            onSubmit={handleSendReply}
          >
            <textarea
              className="form-control"
              placeholder={t("enter_text")}
              cols="20"
              rows="1"
              wrap="hard"
              required
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            >
              <span className="flaticon-chat pr-2"></span>
            </textarea>
            <button className="btn" type="submit" disabled={isSending}>
              {isSending ? t("sending") : t("send_message")}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ChatboxContent;
