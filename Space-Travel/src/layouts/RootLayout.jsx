import styles from "./RootLayout.module.css";
import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";

const RootLayout = () => {
  return (
    <div>
      <header>
        <NavBar/>
      </header>
      <main>
        <Outlet/>
      </main>
    </div>
  );
}

export default RootLayout