"use client";
import { useTranslations } from "next-intl";

type Statistic = {
  id: number;
  blockStyle: string;
  icon: string;
  timer: string;
  name: string;
};

const AllStatistics: React.FC = () => {
  const t = useTranslations("dashboard.allStatistics");

  const allStatistics: Statistic[] = [
    {
      id: 1,
      blockStyle: "",
      icon: "flaticon-home",
      timer: "37",
      name: t("AllProperties"),
    },
    {
      id: 2,
      blockStyle: "style2",
      icon: "flaticon-view",
      timer: "24",
      name: t("TotalViews"),
    },
    {
      id: 3,
      blockStyle: "style3",
      icon: "flaticon-chat",
      timer: "12",
      name: t("TotalVisitorReviews"),
    },
    {
      id: 4,
      blockStyle: "style4",
      icon: "flaticon-heart",
      timer: "18",
      name: t("TotalFavorites"),
    },
  ];

  return (
    <>
      {allStatistics.map((item) => (
        <div className="col-sm-6 col-md-6 col-lg-6 col-xl-3" key={item.id}>
          <div className={`ff_one ${item.blockStyle}`}>
            <div className="detais">
              <div className="timer">{item.timer}</div>
              <p>{item.name}</p>
            </div>
            <div className="icon">
              <span className={item.icon}></span>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default AllStatistics;
