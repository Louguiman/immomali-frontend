import Link from "next/link";
import Image from "next/image";
import { slugify } from "@/utils/slugify";
import { useTranslations } from "next-intl";

// interface CityPropertyStat {
//   city: string;
//   count: number;
//   imageUrl: string;
// }

// interface Props {
//   data: CityPropertyStat[];
// }

const FindProperties = ({ data }) => {
  const t = useTranslations("property");
  return (
    <>
      {data.map((item, index) => {
        const slug = slugify(item.city);

        return (
          <div className="col-sm-6 col-lg-4 col-xl-4" key={index}>
            <Link
              href={`/properties?location=${slug}`}
              className="properti_city style2 d-block"
            >
              <div className="thumb">
                <Image
                  width={342}
                  height={241}
                  // priority={true}
                  loading="lazy"
                  // className="img-whp w-100 h-100 cover"
                  className="img-fluid w100 h-100 cover"
                  objectFit="contain"
                  objectPosition="center"
                  style={{ maxWidth: "342px", height: "241px" }}
                  // src={item.imageUrl?.regular || "/assets/images/property/pc3.jpg"}
                  src={
                    item.imageUrl?.regular || "/assets/images/property/pc3.jpg"
                  }
                  alt={`Image of ${item.city}`}
                />
              </div>
              <div className="details">
                <h4>{item.city}</h4>
                <p>
                  {item.count} {t("Properties")}
                </p>
              </div>
            </Link>
          </div>
        );
      })}
    </>
  );
};

export default FindProperties;
