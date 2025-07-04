import LoginSignup from "./user-credentials/LoginSignup";

import React from "react";
const PopupSignInUp: React.FC = () => {
  return (
    <div
      className="sign_up_modal modal fade bd-example-modal-lg"
      tabIndex={-1}
      role="dialog"
      aria-hidden="true"
    >
      <div
        className="modal-dialog modal-dialog-centered modal-lg"
        role="document"
      >
        <LoginSignup />
      </div>
    </div>
  );
};

export default PopupSignInUp;
