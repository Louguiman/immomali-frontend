"use client";

import Image from "next/image";

const Creator = ({ owner }) => {
  if (!owner) return null; // Prevents rendering if no agent data is available

  return (
    <div className="media d-flex">
      <Image
        width={90}
        height={90}
        className="me-3 rounded-circle"
        src={owner.avatarUrl || "/assets/images/team/default-agent.png"} // Fallback image
        alt={owner.name || "Agent"}
      />
      <div className="media-body">
        <h5 className="mt-0 mb0">{owner.name || "Unknown Agent"}</h5>
        <p className="mb0">{owner.phoneNumber || "No phone available"}</p>
        <p className="mb0">{owner.email || "No email available"}</p>
        <a className="text-thm" href={`/agents/${owner.id}`}>
          View My Listings
        </a>
      </div>
    </div>
  );
};

export default Creator;
