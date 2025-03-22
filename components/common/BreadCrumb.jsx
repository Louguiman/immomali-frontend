import { useTranslations } from "next-intl";

const BreadCrumb = ({ title = "" }) => {
  const t = useTranslations("navbar");
  return (
    <>
      <ol className="breadcrumb">
        <li className="breadcrumb-item">
          <a href="/">{t("home")}</a>
        </li>
        <li className="breadcrumb-item active" aria-current="page">
          {title}
        </li>
      </ol>
    </>
  );
};

export default BreadCrumb;
