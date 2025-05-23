"use client";

import Image from "next/image";
import Link from "next/link";

const UserCard = ({ user }) => {
  return (
    <div className="card user-card">
      <div className="card-img-top text-center">
        <Image
          src={user?.img || "/assets/images/team/e1.png"}
          alt={user.name}
          width={100}
          height={100}
          className="rounded-circle img-fluid"
        />
      </div>

      <div className="card-body text-center">
        <h5 className="card-title">{user.name}</h5>
        <p className="card-text">
          <i className="flaticon-envelope"></i> {user.email}
        </p>
        <p className="card-text">
          <i className="flaticon-phone"></i> {user.phoneNumber || "N/A"}
        </p>
        <p className="card-text">
          <span className="badge bg-info">
            {user.roles?.map((role) => role.name).join(", ")}
          </span>
        </p>
        <Link
          href={`/users/${user.id}`}
          className="btn btn-sm btn-outline-primary"
        >
          View Profile
        </Link>
      </div>
    </div>
  );
};

export default UserCard;
