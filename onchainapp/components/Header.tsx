import { Searchbar } from "./Searchbar";
// import type { ToggleDrawer } from "@/interfaces";
import User from "./User";

export default function Header() {

    return (
        <nav className="relative h-fit bg-kimred text-kimwhite p-4">
            <div className="w-full flex justify-end">
                <User />
            </div>
            <div className="grid justify-center space-y-4 ">
                <h3 className="absolute top-0 left-0 pl-4 pt-4 text-3xl font-black text-">Kimiko</h3>
                <Searchbar/>
            </div>
        </nav>
    );
}
