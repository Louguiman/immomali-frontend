import { useTranslations } from "next-intl";
import BreadCrumb from "../../common/BreadCrumb";

const BreadCrumbAgents = () => {
  const t = useTranslations("home.agents");

  return (
    <div className="breadcrumb_content style2 mb0-991">
      <BreadCrumb title={t("find_agents_breadcrumb")} />
      <h2 className="breadcrumb_title">{t("all_agents")}</h2>
    </div>
  );
};

export default BreadCrumbAgents;
