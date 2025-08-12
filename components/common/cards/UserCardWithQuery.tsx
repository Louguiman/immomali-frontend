"use client";

import { useGetUserByIdMutation } from "@/features/api/user.api";
import { User } from "@/types/user";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const UserCard = ({ id }: { id: string }) => {
  const [getUserById, { isLoading }] = useGetUserByIdMutation();
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const result = await getUserById(id).unwrap();
        setUser(result);
        setError(null);
      } catch (err) {
        console.error("Failed to fetch user:", err);
        setError("Failed to load user data");
      }
    };

    if (id) {
      fetchUser();
    }
  }, [id, getUserById]);

  if (isLoading) return <div>Loading user...</div>;
  if (error) return <div className="text-danger">{error}</div>;
  if (!user) return <div>User not found</div>;

  return (
    <div className="card user-card">
      <div className="card-img-top text-center">
        <Image
          src={user.img || "/assets/images/default-user.jpg"}
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
