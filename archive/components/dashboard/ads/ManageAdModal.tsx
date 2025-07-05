import { useState } from "react";

type Ad = {
  id: string | number;
  adType: string;
  status: string;
  views: number;
  clicks: number;
  property: {
    title: string;
    images: { imageUrl: string }[];
  };
  owner: {
    name: string;
  };
};

type ManageAdModalProps = {
  ad: Ad;
  onClose: () => void;
  onUpdate: (args: { adId: string | number; status: string; reason?: string }) => void;
};

const ManageAdModal: React.FC<ManageAdModalProps> = ({ ad, onClose, onUpdate }) => {
  const [status, setStatus] = useState<string>(ad.status);
  const [rejectionReason, setRejectionReason] = useState<string>("");

  const handleUpdate = () => {
    onUpdate({
      adId: ad.id,
      status,
      reason: status === "rejected" ? rejectionReason : undefined,
    });
    onClose();
  };

  return (
    <div className="modal show d-block" tabIndex={-1}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Manage Ad: {ad.property.title}</h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
            ></button>
          </div>

          <div className="modal-body">
            <p>Ad Type: {ad.adType}</p>
            <p>Owner: {ad.owner.name}</p>
            <p>
              Views: {ad.views} | Clicks: {ad.clicks}
            </p>
            z
            {ad.status === "pending" && (
              <>
                <label htmlFor="statusSelect" className="form-label">Update Status</label>
                <select
                  id="statusSelect"
                  className="form-select"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  title="Update Status"
                >
                  <option value="active">Approve</option>
                  <option value="rejected">Reject</option>
                </select>
              </>
            )}
            {status === "rejected" && (
              <div className="mt-2">
                <label className="form-label">Rejection Reason</label>
                <textarea
                  className="form-control"
                  value={rejectionReason}
                  onChange={(e) => setRejectionReason(e.target.value)}
                  title="Rejection Reason"
                  placeholder="Enter the reason for rejection"
                ></textarea>
              </div>
            )}
          </div>

          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onClose} title="Close Modal">
              Close
            </button>
            <button className="btn btn-primary" onClick={handleUpdate} title="Save Changes">
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageAdModal;
