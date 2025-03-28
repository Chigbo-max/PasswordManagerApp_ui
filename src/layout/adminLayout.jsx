import Sidebar from "../pages/admin/AdminSidebar";
import {Outlet} from "react-router-dom";


function UserLayout() {
  return (
    <div className="layout">
      <Sidebar/>
      <main>
        <Outlet/>
      </main>
    </div>
  )
}
export default UserLayout