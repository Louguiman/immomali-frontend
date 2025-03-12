import React from "react";

function layout({ children }) {
  return (
    <section className="our-dashbord dashbord bgc-f7 pb50 mt-4">
      <h2>My Tenancies</h2>
      <p>
        Manage your active and past leases, view payment history, and submit
        maintenance requests.
      </p>
      {children}
    </section>
  );
}

export default layout;
