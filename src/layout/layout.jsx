import Header from "../components/header";
import Footer from "../components/footer";
import {Outlet} from "react-router-dom";


function Layout() {
  return (
    <div className="layout">
      <Header/>
      <main>
        <Outlet/>
      </main>
      <Footer/>
    </div>
  )
}
export default Layout