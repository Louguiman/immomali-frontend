import { useTranslations } from "next-intl";

const SearchUser = () => {
  const t = useTranslations("dashboard.message"); // Hook de traduction

  return (
    <form className="form-inline d-flex">
      <input
        className="form-control"
        type="search"
        placeholder={t("search.placeholder")}
        aria-label={t("search.aria_label")}
        required
      />
      <button className="btn" type="submit" aria-label={t("search.aria_label")}>
        <span className="flaticon-magnifying-glass" aria-hidden="true"></span>
      </button>
    </form>
  );
};

export default SearchUser;
