"use client";

import { useAppSelector, useAppDispatch } from "@/store/store";
import selectedFiles from "../../../utils/selectedFiles";
import {
  addTenantDocument,
  removeTenantDocument,
} from "@/features/tenant/tenantsSlice";
import { useTranslations } from "next-intl";

interface TenantDocumentUploaderProps {
  activeStep: number;
  onNext?: () => void;
  onPrevious?: () => void;
}

const TenantDocumentUploader = ({
  activeStep,
  // onNext,
  onPrevious,
}: TenantDocumentUploaderProps) => {
  const t = useTranslations("dashboard");
  const dispatch = useAppDispatch();
  const leaseDocuments = useAppSelector(
    (state) => state.tenants.leaseDetails.leaseDocuments
  );

  // Handle document upload
  const handleDocumentUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = selectedFiles(e);
    if (files) {
      files.forEach((file: File) => dispatch(addTenantDocument(file)));
    }
  };

  // Delete document
  const deleteDocument = (name: string) => {
    dispatch(removeTenantDocument(name));
  };

  return (
    <div className="container bg-white p-4 rounded shadow-sm">
      <h3 className="mb-3">{t("TenantProfile.leaseDocumentsTitle")}</h3>
      <p className="text-muted mb-4">{t("TenantProfile.uploadInstructions")}</p>

      <div className="mb-4">
        <label htmlFor="fileInput" className="form-label">
          {t("TenantProfile.selectDocuments")}
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
          <h5 className="mb-2">{t("TenantProfile.uploadedDocuments")}</h5>
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
                  {t("TenantProfile.delete")}
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
            {t("TenantProfile.back")}
          </button>
        )}
      </div>
    </div>
  );
};

export default TenantDocumentUploader;
