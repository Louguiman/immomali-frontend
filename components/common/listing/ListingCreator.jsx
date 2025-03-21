"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";

const Creator = ({ owner }) => {
  const t = useTranslations("property.sidebar.creator");

  if (!owner) return null; // Prevents rendering if no agent data is available

  return (
    <div className="media d-flex">
      <Image
        width={90}
        height={90}
        className="me-3 rounded-circle"
        src={owner.avatarUrl || "/assets/images/team/1.jpg"} // Fallback image
        alt={owner.name || t("unknownAgent")}
      />
      <div className="media-body">
        <h5 className="mt-0 mb0">{owner.name || t("unknownAgent")}</h5>
        <p className="mb0">{owner.phoneNumber || t("noPhone")}</p>
        <p className="mb0">{owner.email || t("noEmail")}</p>
        <a className="text-thm" href={`/agents/${owner.id}`}>
          {t("viewListings")}
        </a>
      </div>
    </div>
  );
};

export default Creator;
