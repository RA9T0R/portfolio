'use client'
import { useTheme } from 'next-themes'
import { Sun,Moon } from 'lucide-react';
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "@/components/ui/resizable-navbar";
import { useState } from "react";

const NavbarMain = () => {
  const navItems = [
    {
      name: "Main",
      link: "#Hero",
    },
    {
      name: "About Me",
      link: "#About Me",
    },
    {
      name: "Contact",
      link: "#contact",
    },
  ];

  const {theme, setTheme} = useTheme()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <Navbar className="mb-5">
        {/* Desktop Navigation */}
        <NavBody>
          <NavbarLogo />
          <NavItems items={navItems} />
          <div className="flex items-center gap-4">
            <NavbarButton className="bg-black dark:bg-white rounded-full shadow-md shadow-black dark:shadow-white flex items-center justify-center cursor-pointer" type='button' onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
              {theme === 'dark' 
              ? <Sun className="text-white dark:text-black"/>
              : <Moon className="text-white dark:text-black"/>}
            </NavbarButton>
          </div>
        </NavBody>
 
        {/* Mobile Navigation */}
        <MobileNav>
          <MobileNavHeader>
            <NavbarLogo />
            <MobileNavToggle
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
          </MobileNavHeader>
 
          <MobileNavMenu
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
          >
            {navItems.map((item, idx) => (
              <a
                key={`mobile-link-${idx}`}
                href={item.link}
                onClick={() => setIsMobileMenuOpen(false)}
                className="relative text-neutral-600 dark:text-neutral-300"
              >
                <span className="block">{item.name}</span>
              </a>
            ))}
            <div className="flex w-full flex-col gap-4">
              <NavbarButton className="bg-black dark:bg-white rounded-full shadow-md shadow-black dark:shadow-white flex items-center justify-center cursor-pointer" type='button' onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
                {theme === 'dark' 
                ? <Sun className="text-white dark:text-black"/>
                : <Moon className="text-white dark:text-black"/>}
              </NavbarButton>
            </div>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>
    </>
  )
}

export default NavbarMain
