import React from 'react'
import Style from "./adminDashboard.module.css"

function AdminDashboard() {
  return (
      <div className={Style.dashboard}>
                  <h2>Welcome back, admin!</h2>
                  <p>Manage clients' credentials securely with SafePass.</p>
              </div>
  )
}

export default AdminDashboard
