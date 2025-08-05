import Link from "next/link";
import { useTranslations } from "next-intl";

type BreadCrumbProps = {
  title?: string;
};

const BreadCrumb = ({ title = "" }: BreadCrumbProps) => {
  const t = useTranslations("navbar");
  return (
    <>
      <ol className="breadcrumb">
        <li className="breadcrumb-item">
          <Link href="/">{t("home")}</Link>
        </li>
        <li className="breadcrumb-item active" aria-current="page">
          {title}
        </li>
      </ol>
    </>
  );
};

export default BreadCrumb;
