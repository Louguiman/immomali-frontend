import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TenantDetails {
  id: number | null;
  userId: number | null;
  name: string;
  email: string;
  phone: string;
  agentId: string;
  propertyId: string;
}

interface LeaseDetails {
  tenantId: number | undefined;
  leaseStartDate: string;
  leaseEndDate: string;
  leaseType: string;
  autoRenew: boolean;
  securityDeposit: string;
  monthlyRent: string;
  leaseStatus: string;
  additionalTerms: string;
  leaseDocuments: any[];
}

interface TenantsState {
  tenantDetails: TenantDetails;
  leaseDetails: LeaseDetails;
  tenantsList: any[];
}

const initialState: TenantsState = {
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
    setTenantField: (
      state,
      action: { payload: { field: string; value: any } }
    ) => {
      (state.tenantDetails as any)[action.payload.field] = action.payload.value;
    },

    setTenant: (state, action: { payload: Partial<TenantDetails> }) => {
      state.tenantDetails = { ...state.tenantDetails, ...action.payload };
    },

    /** 🔹 Lease Actions */
    setLeaseField: (
      state,
      action: { payload: { field: string; value: any } }
    ) => {
      (state.leaseDetails as any)[action.payload.field] = action.payload.value;
    },

    setLease: (state, action: { payload: LeaseDetails }) => {
      state.leaseDetails = action.payload;
    },

    /** 🔹 Lease Document Management */
    addTenantDocument: (state, action: { payload: any }) => {
      state.leaseDetails.leaseDocuments.push(action.payload);
    },

    removeTenantDocument: (state, action: { payload: string }) => {
      state.leaseDetails.leaseDocuments =
        state.leaseDetails.leaseDocuments.filter(
          (doc: any) => doc.name !== action.payload
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
