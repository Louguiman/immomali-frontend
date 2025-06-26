import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// interface Tenant {
//   id?: number;
//   userId: number;
//   propertyId: number;
//   agentId?: number;
//   leaseStartDate: string;
//   leaseEndDate: string;
//   leaseType: string;
//   autoRenew?: boolean;
//   securityDeposit: number;
//   additionalTerms?: string;
//   monthlyRent: number;
//   leaseStatus: "pending" | "active" | "terminated";
//   leaseDocuments: File[];
// }

// interface TenantsState {
//   createTenant: Tenant;
//   tenantsList: Tenant[];
// }

const initialState = {
  tenantDetails: {
    id: null,
    userId: null,
    name: "",
    email: "",
    phone: "",
    agentId: "",
    propertyId: "",
  },
  leaseDetails: {
    tenantId: undefined,
    leaseStartDate: "",
    leaseEndDate: "",
    leaseType: "",
    autoRenew: false,
    securityDeposit: "0",
    monthlyRent: "0",
    leaseStatus: "pending",
    additionalTerms: "",
    leaseDocuments: [],
  },
  tenantsList: [],
};

const tenantsSlice = createSlice({
  name: "tenants",
  initialState,
  reducers: {
    /** 🔹 Tenant Actions */
    setTenantField: (state, action) => {
      state.tenantDetails[action.payload.field] = action.payload.value;
    },

    setTenant: (state, action) => {
      state.tenantDetails = { ...state.tenantDetails, ...action.payload };
    },

    /** 🔹 Lease Actions */
    setLeaseField: (state, action) => {
      state.leaseDetails[action.payload.field] = action.payload.value;
    },

    setLease: (state, action) => {
      state.leaseDetails = action.payload;
    },

    /** 🔹 Lease Document Management */
    addTenantDocument: (state, action) => {
      state.leaseDetails.leaseDocuments.push(action.payload);
    },

    removeTenantDocument: (state, action) => {
      state.leaseDetails.leaseDocuments =
        state.leaseDetails.leaseDocuments.filter(
          (doc) => doc.name !== action.payload
        );
    },

    /** 🔹 Reset Forms */
    resetTenantForm: (state) => {
      state.tenantDetails = initialState.tenantDetails;
      state.leaseDetails = initialState.leaseDetails;
    },
  },
});

export const {
  setTenantField,
  setTenant,
  setLeaseField,
  setLease,
  addTenantDocument,
  removeTenantDocument,
  resetTenantForm,
} = tenantsSlice.actions;
export default tenantsSlice.reducer;
