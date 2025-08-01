"use client";
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
import { navItems } from "@/data";
import Link from "next/link";
import { useState } from "react";
import { ModeToggle } from "./ui/ModeToggle";
import { PostsSheet } from "./ui/PostsSheet";

export function Header() {
   
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <div className="relative w-full mt-3">
            <Navbar>
                {/* Desktop Navigation */}
                <NavBody>
                    <NavbarLogo />
                    <NavItems items={navItems} />
                    <div className="flex items-center gap-4">
                        
                        <NavbarButton href="#" variant="secondary">
                            <PostsSheet />
                        </NavbarButton>
                   
                                               
                        <NavbarButton href="/CV-odb.pdf" variant="primary">
                            Mon CV
                        </NavbarButton>
                        
                        <NavbarButton href="#" variant="secondary">
                            <ModeToggle />
                        </NavbarButton>
                        
                    </div>
                </NavBody>

                {/* Mobile Navigation */}
                <MobileNav>
                    <MobileNavHeader>
                        <NavbarLogo />

                        
                        <div className="ml-0  flex justify-center items-center">
                            <NavbarButton href="#" variant="secondary">
                                <ModeToggle />
                            </NavbarButton>

                            <MobileNavToggle
                                isOpen={isMobileMenuOpen}
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            />
                        </div>
                    </MobileNavHeader>

                    <MobileNavMenu
                        isOpen={isMobileMenuOpen}
                        onClose={() => setIsMobileMenuOpen(false)}
                    >
                        {navItems.map((item, idx) => (
                            <Link
                                key={`mobile-link-${idx}`}
                                href={item.link}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="relative text-neutral-600 dark:text-neutral-300"
                            >
                                <span className="block">{item.name}</span>
                            </Link>
                        ))}

                        <div className="flex w-full flex-col gap-4">
                            <NavbarButton href="#" variant="secondary">
                                <PostsSheet />
                            </NavbarButton>
                            
                            <NavbarButton
                                href="https://wa.me/+2290162140234"
                                variant="primary"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Whatsapp
                            </NavbarButton>
                            <NavbarButton
                                href="/CV-odb.pdf"
                                variant="primary"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Mon CV
                            </NavbarButton>
                            
                        </div>
                    </MobileNavMenu>
                </MobileNav>
            </Navbar>
        </div>
    );
}

