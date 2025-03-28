import Sidebar from "../pages/User/Sidebar";
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