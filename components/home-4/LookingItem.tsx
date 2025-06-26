"use client";
import { useRouter } from "next/navigation";
import find from "../../data/find";
import { useTranslations } from "next-intl";

const LookingItem = () => {
  const router = useRouter();
  const t = useTranslations("search");
  return (
    <>
      {find.map((item) => (
        <li
          className="list-inline-item"
          onMouseDown={() => router.push(item.route)}
          key={item.id}
        >
          <div className="icon">
            {item.icon}
            <p>
              {t(item.key)}
              {/* {item.title} */}
            </p>
          </div>
        </li>
      ))}
    </>
  );
};

export default LookingItem;
