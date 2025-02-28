"use client";

import Link from "next/link";
import Slider from "react-slick";
import Image from "next/image";

const socialList = [
  { icon: "fa-facebook", liveLink: "https://www.facebook.com/" },
  { icon: "fa-twitter", liveLink: "https://www.twitter.com/" },
  {
    icon: "fa-instagram",
    liveLink: "https://www.instagram.com/",
  },
  {
    icon: "fa-pinterest",
    liveLink: "https://www.pinterest.com/",
  },
  { icon: "fa-dribbble", liveLink: "https://www.dribbble.com/" },
];

const Team = ({ data }) => {
  const settings = {
    dots: false,
    arrows: true,
    slidesToShow: 4,
    slidesToScroll: 3,
    autoplay: true,
    speed: 1200,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 520,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 3,
        },
      },
    ],
  };

  return (
    <Slider {...settings} arrows={true}>
      {data?.map((item) => (
        <div className="item" key={item.id}>
          <div className="team_member home4">
            <div className="thumb">
              <Image
                width={245}
                height={307}
                className="img-fluid w100 cover h-100"
                src={item?.img || "/assets/images/team/6.jpg"}
                alt="5.jpg"
              />
              <div className="overylay">
                <ul className="social_icon">
                  {socialList?.map((social, i) => (
                    <li className="list-inline-item" key={i}>
                      <a
                        href={social.liveLink}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <i className={`fa ${social.icon}`}></i>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            {/* End .thumb */}

            <div className="details">
              <h4>
                <Link href={`/agent-details/${item.id}`}>{item.name}</Link>
              </h4>
              <p>{item?.phone || item?.email}</p>
              <p>{(item?.agency && item?.agency.name) || "Free Agent"}</p>
            </div>
            {/* End .details */}
          </div>
        </div>
      ))}
    </Slider>
  );
};

export default Team;
