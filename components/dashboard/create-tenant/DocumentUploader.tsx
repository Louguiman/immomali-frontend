"use client";

import { useSelector } from "react-redux";
import { useAppDispatch } from "@/store/store";
import selectedFiles from "../../../utils/selectedFiles";
import {
  addTenantDocument,
  removeTenantDocument,
} from "@/features/tenant/tenantsSlice";
import { useTranslations } from "next-intl";

const TenantDocumentUploader = ({ activeStep, onNext, onPrevious }) => {
  const t = useTranslations("dashboard.TenantProfile");
  const dispatch = useAppDispatch();
  const leaseDocuments = useSelector(
    (state: import("@/store/store").RootState) => state.tenants.leaseDocuments
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
    <div className="container bg-white p-4 rounded shadow-sm">
      <h3 className="mb-3">{t("leaseDocumentsTitle")}</h3>
      <p className="text-muted mb-4">{t("uploadInstructions")}</p>

      <div className="mb-4">
        <label htmlFor="fileInput" className="form-label">
          {t("selectDocuments")}
        </label>
        <input
          type="file"
          className="form-control"
          id="fileInput"
          onChange={handleDocumentUpload}
          multiple
        />
      </div>

      {leaseDocuments?.length > 0 && (
        <div className="mt-4">
          <h5 className="mb-2">{t("uploadedDocuments")}</h5>
          <ul className="list-group">
            {leaseDocuments.map((file, index) => (
              <li
                key={index}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                {file.name}
                <button
                  onClick={() => deleteDocument(file.name)}
                  className="btn btn-outline-danger btn-sm"
                >
                  {t("delete")}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="d-flex justify-content-between mt-4">
        {activeStep > 1 && (
          <button
            type="button"
            className="btn btn-secondary"
            onClick={onPrevious}
          >
            {t("back")}
          </button>
        )}
      </div>
    </div>
  );
};

export default TenantDocumentUploader;
