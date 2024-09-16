import { Input, Link, Navbar, NavbarContent } from "@nextui-org/react";
import React from "react";
import { BurguerButton } from "./burger-button";
import { BoxIcon, GithubIcon, Search } from "lucide-react";
import { NotificationsDropdown } from "./notifications-dropdown";
import { UserDropdown } from "./user-dropdown";

interface Props {
  children: React.ReactNode;
}

export const NavbarWrapper = ({ children }: Props) => {
  return (
    <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
      <Navbar
        isBordered
        className="w-full"
        classNames={{
          wrapper: "w-full max-w-full",
        }}
      >
        <NavbarContent className="md:hidden">
          <BurguerButton />
        </NavbarContent>
        <NavbarContent className="w-full max-md:hidden">
          <Input
            startContent={<Search />}
            isClearable
            className="w-full"
            classNames={{
              input: "w-full",
              mainWrapper: "w-full",
            }}
            placeholder="Search..."
          />
        </NavbarContent>
        <NavbarContent justify="end" className="w-fit data-[justify=end]:flex-grow-0">
          <div className="flex items-center gap-2 max-md:hidden">
            <BoxIcon />
            <span>Feedback?</span>
          </div>

          <NotificationsDropdown />

          <div className="max-md:hidden">
            <BoxIcon />
          </div>

          <Link href="https://github.com/Siumauricio/nextui-dashboard-template" target={"_blank"}>
            <GithubIcon />
          </Link>
          <NavbarContent>
            <UserDropdown />
          </NavbarContent>
        </NavbarContent>
      </Navbar>
      {children}
    </div>
  );
};
