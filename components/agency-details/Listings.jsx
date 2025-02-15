import Link from "next/link";
import Image from "next/image";
import { cleanUrl } from "@/utils/splitDescription";

const Listings = ({ properties }) => {
  return (
    <>
      {properties?.map((item) => (
        <div className="col-lg-12" key={item.id}>
          <div className="feat_property list style2 hvr-bxshd bdrrn mb10 mt20">
            <div className="thumb">
              <Image
                width={275}
                height={240}
                className="img-whp w-100 cover"
                src={item?.images[0]?.imageUrl}
                alt={item?.images[0]?.imageUrl}
              />
              <div className="thmb_cntnt">
                <ul className="icon mb0">
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
                </ul>
              </div>
            </div>
            {/* End .thumb */}

            <div className="details">
              <div className="tc_content">
                <div className="dtls_headr">
                  <ul className="tag mb-3">
                    {item.saleTag.map((val, i) => (
                      <li className="list-inline-item" key={i}>
                        <a href="#">{val}</a>
                      </li>
                    ))}
                  </ul>

                  <Link
                    href={`/listing-details-v1/${item.id}`}
                    className="fp_price"
                  >
                    ${item.price}
                    <small>/mo</small>
                  </Link>
                </div>
                <p className="text-thm">{item.type}</p>
                <h4>
                  <Link href={`/listing-details-v1/${item.id}`}>
                    {item.title}
                  </Link>
                </h4>
                <p>
                  <span className="flaticon-placeholder"></span>
                  {item.location}
                </p>

                {/* <ul className="prop_details mb0">
                  {item.itemDetails.map((val, i) => (
                    <li className="list-inline-item" key={i}>
                      <a href="#">
                        {val.name}: {val.number}
                      </a>
                    </li>
                  ))}
                </ul> */}
              </div>
              {/* End .tc_content */}

              <div className="fp_footer">
                <ul className="fp_meta float-start mb0">
                  <li className="list-inline-item">
                    <a href="#">
                      <Image
                        width={40}
                        height={40}
                        src={item?.owner?.avatarUrl}
                        alt="pposter1.png"
                      />
                    </a>
                  </li>
                  <li className="list-inline-item">
                    <a href="#">{item?.owner?.name}</a>
                  </li>
                </ul>
                <div className="fp_pdate float-end">{item.yearBuilt}</div>
              </div>
              {/* End . fp_footer */}
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default Listings;
