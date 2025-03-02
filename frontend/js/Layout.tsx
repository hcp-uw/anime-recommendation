import { Outlet } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";

export default function Layout(): JSX.Element {
    return (
      <div className="bg-page-c page">
        <Navbar />
        <div className="content">
          <Outlet />
        </div>
      </div>  
    );
}
