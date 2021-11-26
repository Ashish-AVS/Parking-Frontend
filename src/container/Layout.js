import Footer from "../components/Footer";
import DarkNav from "./DarkNav";
import NavBar from "./Navigation";

const Layout = (props) => {
    return ( 
        <>
        <NavBar />
        {props.children}
        {/* <Footer /> */}
        </>
     );
}
 
export default Layout;