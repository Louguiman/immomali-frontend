import AuthorReview from "./AuthorReview";
import ClientReview from "./ClientReview";
import SearchBox from "./SearchBox";

const index = () => {
  return (
    <div className="container-fluid ovh">
      <div className="row">
        <div className="col-lg-12 maxw100flex-992">
          <div className="row">
            <div className="col-lg-12">
              <div id="myreview" className="my_dashboard_review">
                <div className="review_content">
                  <h4>My Reviews</h4>
                  <AuthorReview />
                </div>
              </div>
            </div>
            {/* End col */}

            <div className="col-lg-12">
              <div id="client_myreview" className="my_dashboard_review mt30">
                <div className="review_content client-review">
                  <h4>Visitor Reviews</h4>
                  <ClientReview />
                </div>
              </div>
            </div>
          </div>
          {/* End .row */}

          <div className="row mt50">
            <div className="col-lg-12">
              <div className="copyright-widget text-center">
                <p>© 2020 Find House. Made with love.</p>
              </div>
            </div>
          </div>
          {/* End .row */}
        </div>
        {/* End .col */}
      </div>
    </div>
  );
};

export default index;
