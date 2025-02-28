import Image from "next/image";

const SignleChatboxReply = ({ reply }) => {
  return (
    <>
      <li
        className={`media ${
          reply.user?.email === reply.inquiry?.email ? "sent" : "received"
        }`}
        key={reply.id}
      >
        <span className="contact-status busy"></span>
        <Image
          width={57}
          height={57}
          className="img-fluid align-self-start mr-3"
          src={reply.user?.img || "/assets/images/default-user.png"}
          alt="User"
        />
        <div className="media-body">
          <div className="date_time">
            {new Date(reply.createdAt).toLocaleString()}
          </div>
          <p>{reply.message}</p>
        </div>
      </li>
    </>
  );
};

export default SignleChatboxReply;
