import Link from "next/link";
// REMOVED: Sample/demo component using static data
// import blogs from "../../data/blogs";
import Image from "next/image";
import React from "react";

type Blog = {
  id: number;
  img: string;
  postMeta: string;
  title: string;
  posterAvatar: string;
  posterName: string;
  postedDate: string;
};

const Blogs: React.FC = () => {
  return (
    <>
      {blogs.slice(0, 3).map((item: Blog) => (
        <div className="col-md-6 col-lg-4 col-xl-4" key={item.id}>
          <div className="for_blog feat_property">
            <div className="thumb">
              <Link href={`/blog-details/${item.id}`}>
                <Image
                  width={343}
                  height={220}
                  className="img-whp w-100 h-100 cover"
                  src={item.img}
                  alt="bh1.jpg"
                />
              </Link>
            </div>
            <div className="details">
              <div className="tc_content">
                <p className="text-thm">{item.postMeta}</p>
                <h4>
                  <Link href={`/blog-details/${item.id}`}>{item.title}</Link>
                </h4>
              </div>
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
                    <Link href="/agent-v2">{item.posterName}</Link>
                  </li>
                </ul>
                <a className="fp_pdate float-end" href="#">
                  {item.postedDate}
                </a>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default Blogs;
