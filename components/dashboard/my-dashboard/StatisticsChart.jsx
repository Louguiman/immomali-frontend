"use client";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { useTranslations } from "next-intl";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function StatisticsChart() {
  const t = useTranslations("dashboard.stats");

  const labels = t("Months").split(",");

  const data = {
    labels,
    datasets: [
      {
        label: t("DatasetLabel"),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        data: [196, 132, 215, 362, 210, 252],
        fill: false,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
      tooltips: {
        position: "nearest",
        mode: "index",
        intersect: false,
        yPadding: 10,
        xPadding: 10,
        caretSize: 8,
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        borderColor: "rgba(0,0,0,1)",
        borderWidth: 4,
      },
    },
  };

  return (
    <div>
      <h4 className="text-lg font-semibold mb-4">{t("SectionTitle")}</h4>
      <Line options={options} data={data} />
    </div>
  );
}
