import Image from "next/image";

const SingleUser = ({ isSelected, inquiry, onClick }) => {
  return (
    <li
      className={`contact ${isSelected ? "active-inquiry" : ""}`}
      onClick={onClick}
    >
      <a href="#">
        <div className="wrap">
          <Image
            width={50}
            height={50}
            className="img-fluid"
            src={inquiry?.user?.img || "/assets/images/team/s8.jpg"}
            alt="User"
          />
          <div className="meta">
            <h5 className="name">{inquiry?.name || "Unknown"}</h5>
            <h6 className="name">{inquiry?.email || "Unknown"}</h6>
            <h6 className="name">{inquiry?.phoneNumber || "Unknown"}</h6>
            <p className="preview">{inquiry.message.slice(0, 50)}...</p>
          </div>
        </div>
      </a>
    </li>
  );
};

export default SingleUser;
