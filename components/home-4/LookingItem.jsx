"use client";
import { useRouter } from "next/navigation";
import find from "../../data/find";

const LookingItem = () => {
  const router = useRouter();
  return (
    <>
      {find.map((item) => (
        <li
          className="list-inline-item"
          onMouseDown={() => router.push(item.route)}
          key={item.id}
        >
          <div className="icon">
            <span className={item.icon}></span>
            <p>{item.title}</p>
          </div>
        </li>
      ))}
    </>
  );
};

export default LookingItem;
