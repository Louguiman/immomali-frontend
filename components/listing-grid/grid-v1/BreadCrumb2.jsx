import { useTranslations } from "next-intl";
import BreadCrumb from "../../common/BreadCrumb";

const BreadCrumb2 = () => {
  const t = useTranslations("property");

  return (
    <div className="breadcrumb_content style2">
      <BreadCrumb title={t("sectionTitle")} />
      <h2 className="breadcrumb_title">{t("sectionDescription")}</h2>
    </div>
  );
};

export default BreadCrumb2;
