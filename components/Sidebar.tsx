// import {LogOut} from "lucide-react";
// import {sidemenu} from "../assets/assets";

const Sidebar = () => {

    return (
        <aside
            className={`h-screen w-64 flex-shrink-0 transition-all duration-300 ease-in-out bg-BG hidden md:flex flex-col flex-grow-0 border-r-[1px] border-Text/10}`}
        >
            {/* Menu */}
            <div className="flex-1 flex flex-col p-3 gap-3 text-Text mt-20 overflow-y-auto">

            </div>

            {/* Log Out Button */}
            <div className="cursor-pointer flex items-center gap-4 m-3 font-medium text-Text mt-auto rounded-xl hover:bg-Text/20">
                <div className="p-3">
                    Logout
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;