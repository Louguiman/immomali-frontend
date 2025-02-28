"use client";

import { useSelector, useDispatch } from "react-redux";
import selectedFiles from "../../../utils/selectedFiles";
import { addTenantDocument, removeTenantDocument } from "@/features/tenant/tenantsSlice";

const TenantDocumentUploader = () => {
  const dispatch = useDispatch();
  const leaseDocuments = useSelector(
    (state) => state.tenants.leaseDetails.leaseDocuments
  );

  // Handle document upload
  const handleDocumentUpload = (e) => {
    const files = selectedFiles(e);
    files.forEach((file) => dispatch(addTenantDocument(file)));
  };

  // Delete document
  const deleteDocument = (name) => {
    dispatch(removeTenantDocument(name));
  };

  return (
    <div className="row">
      <div className="col-xl-6">
        <div className="resume_uploader mb30">
          <h3>Lease Documents</h3>
          <p>Upload lease agreements, ID verification, etc.</p>
          <form className="form-inline d-flex flex-wrap wrap">
            <input className="upload-path" />
            <label className="upload">
              <input type="file" onChange={handleDocumentUpload} multiple />
              Select Documents
            </label>
          </form>
          {leaseDocuments.length > 0 && (
            <ul>
              {leaseDocuments.map((file, index) => (
                <li key={index}>
                  {file.name}{" "}
                  <button onClick={() => deleteDocument(file.name)}>
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default TenantDocumentUploader;
