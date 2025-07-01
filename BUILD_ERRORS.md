# Build Errors Log

This file contains the current build errors for reference during the iterative fix process.

---

```
tation' does not exist on type 'Api<BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError, ExtraOptions>, EndpointDefinitions, "api", "User" | ... 15 more ... | "Maintenance", unique symbol | unique symbol>'.

27   useMarkNotificationReadMutation,
     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

features/api/payments.api.ts:2:1 - error TS6133: 'Payment' is declared but its value is never read.

2 import { Payment } from "@/utils/interface/payment.interface";
  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

features/api/payments.api.ts:21:3 - error TS2353: Object literal may only specify known properties, and 'tagTypes' does not exist in type '{ endpoints: (build: EndpointBuilder<BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError, ExtraOptions>, "User" | "Users" | ... 14 more ... | "Maintenance", "api">) => { ...; }; overrideExisting?: boolean | ... 1 more ... | undefined; }'.

21   tagTypes: ["Payments"],
     ~~~~~~~~

features/api/payments.api.ts:46:3 - error TS2339: Property 'useCreatePaymentMutation' does not exist on type 'Api<BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError, ExtraOptions>, EndpointDefinitions, "api", "User" | ... 15 more ... | "Maintenance", unique symbol | unique symbol>'.

46   useCreatePaymentMutation,
     ~~~~~~~~~~~~~~~~~~~~~~~~

features/api/payments.api.ts:47:3 - error TS2339: Property 'useCreateManualPaymentMutation' does not exist on type 'Api<BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError, ExtraOptions>, EndpointDefinitions, "api", "User" | ... 15 more ... | "Maintenance", unique symbol | unique symbol>'.

47   useCreateManualPaymentMutation,
     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

features/api/payments.api.ts:48:3 - error TS2339: Property 'useFetchPaymentsQuery' does not exist on type 'Api<BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError, ExtraOptions>, EndpointDefinitions, "api", "User" | ... 15 more ... | "Maintenance", unique symbol | unique symbol>'.

48   useFetchPaymentsQuery,
     ~~~~~~~~~~~~~~~~~~~~~

features/api/permissions.api.ts:4:3 - error TS2353: Object literal may only specify known properties, and 'tagTypes' does not exist in type '{ endpoints: (build: EndpointBuilder<BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError, ExtraOptions>, "User" | "Users" | ... 14 more ... | "Maintenance", "api">) => { ...; }; overrideExisting?: boolean | ... 1 more ... | undefined; }'.

4   tagTypes: ["Permissions"],
    ~~~~~~~~

features/api/permissions.api.ts:17:16 - error TS2339: Property 'useGetPermissionsQuery' does not exist on type 'Api<BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError, ExtraOptions>, EndpointDefinitions, "api", "User" | ... 15 more ... | "Maintenance", unique symbol | unique symbol>'.

17 export const { useGetPermissionsQuery, useAssignPermissionMutation } =
                  ~~~~~~~~~~~~~~~~~~~~~~

features/api/permissions.api.ts:17:40 - error TS2339: Property 'useAssignPermissionMutation' does not exist on type 'Api<BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError, ExtraOptions>, EndpointDefinitions, "api", "User" | ... 15 more ... | "Maintenance", unique symbol | unique symbol>'.

17 export const { useGetPermissionsQuery, useAssignPermissionMutation } =
                                          ~~~~~~~~~~~~~~~~~~~~~~~~~~~

features/api/properties.api.ts:1:1 - error TS6192: All imports in import declaration are unused.

1 import {
  ~~~~~~~~
2   Property,
  ~~~~~~~~~~~
3   PropertyQueryParams,
  ~~~~~~~~~~~~~~~~~~~~~~
4 } from "@/utils/interface/property.interface";
  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

features/api/properties.api.ts:29:3 - error TS2353: Object literal may only specify known properties, and 'tagTypes' does not exist in type '{ endpoints: (build: EndpointBuilder<BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError, ExtraOptions>, "User" | "Users" | ... 14 more ... | "Maintenance", "api">) => { ...; }; overrideExisting?: boolean | ... 1 more ... | undefined; }'.

29   tagTypes: ["Properties", "userProperties"],
     ~~~~~~~~

... (truncated for brevity)
```

---

Please refer to this file for the current error list as we fix them iteratively.
