import BreadCrumb from "./BreadCrumb2";

const BreadCrumbBanner = () => {
  return (
    <section className="inner_page_breadcrumb2">
      <div className="container">
        <div className="row">
          <div className="col-xl-6 mt150">
            <div className="breadcrumb_content">
              <BreadCrumb />
            </div>
          </div>
          {/* End .col */}
        </div>
      </div>
    </section>
  );
};

export default BreadCrumbBanner;
