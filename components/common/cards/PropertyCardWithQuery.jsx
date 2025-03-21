import { useFetchPropertyByIdQuery } from "@/features/api/properties.api";
import Image from "next/image";
import Link from "next/link";
import { useSelector } from "react-redux";

const PropertyCardWithQuery = ({ id }) => {
  const { statusType, featured, isGridOrList } = useSelector(
    (state) => state.filter
  );
  const { data: item, isLoading } = useFetchPropertyByIdQuery(id, {
    skip: !id,
  });

  if (isLoading) return <div>Loading tenants...</div>;

  return (
    <div
      className={`feat_property home7 style4 ${
        isGridOrList ? "d-flex align-items-center" : undefined
      }`}
    >
      <div className="thumb">
        <Image
          width={342}
          height={220}
          className="img-whp w-100 h-100 cover"
          src={item?.images[0]?.imageUrl}
          alt="fp1.jpg"
        />
        <div className="thmb_cntnt">
          <ul className="tag mb0">
            <li className="list-inline-item">
              <a href="#">Featured</a>
            </li>
            <li className="list-inline-item">
              <a href="#" className="text-capitalize">
                {item.featured}
              </a>
            </li>
          </ul>
          {/* <ul className="icon mb0">
            <li className="list-inline-item">
              <a href="#">
                <span className="flaticon-transfer-1"></span>
              </a>
            </li>
            <li className="list-inline-item">
              <a href="#">
                <span className="flaticon-heart"></span>
              </a>
            </li>
          </ul> */}

          <Link href={`/listing-details-v2/${item.id}`} className="fp_price">
            ${item.price}
            <small>/mo</small>
          </Link>
        </div>
      </div>
      <div className="details">
        <div className="tc_content">
          <p className="text-thm">{item.type}</p>
          <h4>
            <Link href={`/listing-details-v1/${item.id}`}>{item.title}</Link>
          </h4>
          <p>
            <span className="flaticon-placeholder"></span>
            {item.address} {item?.city}, {item?.state}, {item?.country} &nbsp;
          </p>

          <ul className="prop_details mb0">
            <li className="list-inline-item">Beds: {item?.beds} &nbsp;</li>
            <li className="list-inline-item">Baths: {item?.baths} &nbsp;</li>
            <li className="list-inline-item">SqFt: {item?.sqFt} &nbsp;</li>
          </ul>
        </div>
        {/* End .tc_content */}

        <div className="fp_footer">
          <ul className="fp_meta float-start mb0">
            <li className="list-inline-item">
              <Link href="/agent-v2">
                <Image
                  width={40}
                  height={40}
                  src={item.posterAvatar}
                  alt="pposter1.png"
                />
              </Link>
            </li>
            <li className="list-inline-item">
              <Link href="/agent-v2">{item?.owner?.name || "Inconnu"}</Link>
            </li>
          </ul>
          <div className="fp_pdate float-end">{item.postedYear}</div>
        </div>
        {/* End .fp_footer */}
      </div>
    </div>
  );
};

export default PropertyCardWithQuery;
