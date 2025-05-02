import Image from "next/image";
import { useSelector } from "react-redux";

const SingleChatboxReply = ({ reply }) => {
  console.log("reply: ", reply);
  const { email } = useSelector((state) => state.auth.user); // Récupérer l'utilisateur connecté

  const isSender = reply.user?.email === email; // Check if the user is the sender

  return (
    <>
      <li className={`media ${isSender ? "sent " : "received"}`} key={reply.id}>
        {/* <span className="contact-status busy"></span> */}
        <Image
          width={57}
          height={57}
          className="img-fluid align-self-start mr-3"
          src={reply?.user?.img || "/assets/images/team/s8.jpg"}
          alt="User"
        />
        <div className="media-body">
          <div className="date_time">
            {new Date(reply.createdAt).toLocaleString()}
          </div>
          <p className={`${isSender ? "bg-success text-white" : ""}`}>
            {reply.message}
          </p>
        </div>
      </li>
    </>
  );
};

export default SingleChatboxReply;
