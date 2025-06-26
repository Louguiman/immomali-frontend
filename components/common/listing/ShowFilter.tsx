import { useTranslations } from "next-intl";

const ShowFilter = () => {
  const t = useTranslations("property");

  return (
    <div id="main2" data-bs-toggle="offcanvas" data-bs-target="#sidebarListing">
      <span
        id="open2"
        className="flaticon-filter-results-button filter_open_btn style2"
      >
        {t("showFilter")}
      </span>
    </div>
  );
};

export default ShowFilter;
