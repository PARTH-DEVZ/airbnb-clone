'use client'

import Container from "../Container";
import Search from "./Search";
import UserMenu from "./UserMenu";
import Logo from "./logo";
import { SafeUser } from "@/app/types";
import Catagories from "./Catagories";

interface NavbarProps {
    currentUser?: SafeUser | null
}
const Navbar: React.FC<NavbarProps> = ({ currentUser }) => {

    return (
        <div className="fixed w-full bg-white z-10 shadow-sm">
            <div className="py-4  border-b-[1px]">
                <Container>
                    <div className="flex flex-row items-center justify-between gap-3 md:gap-0 relative">
                        <Logo />
                        <div className="absolute left-1/2 -translate-x-1/2">
                            <Search />
                        </div>
                        <UserMenu currentUser={currentUser} />
                    </div>
                </Container>
            </div>
            <Catagories />
        </div>
    );
};

export default Navbar;
