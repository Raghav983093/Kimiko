import { FC, ReactNode } from "react";
import Footer from "./Footer";
// import { StateContext } from "./StateContextProvider";
import Header from "./Header";
import useContext from "./StateContextProvider/useContext";

const Layout: FC<LayoutProps> = ({ children }) => {
    const { activeLink, darkMode } = useContext();

    return (
        <main className={`mx-auto grid gap-5 mb-16 ${!darkMode && 'bg-white'}`}>
            { activeLink === 'Home' && <Header /> }
            <div className="px-3 mb-6">
                {children}
            </div>
            <Footer/>
        </main>
    );
};

export default Layout;

interface LayoutProps {
    children: ReactNode;
}
