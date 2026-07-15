import React, { useState, useRef, useEffect } from "react";
import {
    FiUser,
    FiLogOut,
    FiChevronDown,
} from "react-icons/fi";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation, Link } from "react-router-dom";

const navLinks = [
    { label: "All Products", path: "/allproducts" },
    { label: "About", path: "/about" },
];

const CartIcon = () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 4h2l2.4 12.2a2 2 0 0 0 2 1.6h7.2a2 2 0 0 0 2-1.6L20 8H6" />
        <circle cx="9.5" cy="20" r="1.4" />
        <circle cx="17" cy="20" r="1.4" />
    </svg>
);

const UserIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="3.5" />
        <path d="M4.5 20c1.4-3.6 4.4-5.5 7.5-5.5s6.1 1.9 7.5 5.5" />
    </svg>
);

const MenuIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
        <path d="M4 6h16M4 12h16M4 18h16" />
    </svg>
);

const CloseIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
        <path d="M6 6l12 12M18 6L6 18" />
    </svg>
);

const Navbar = ({ cartCount = 0 }) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const [profileOpen, setProfileOpen] = useState(false);

    const profileRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (profileRef.current && !profileRef.current.contains(event.target)) {
                setProfileOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const storedUser = (() => {
        try {
            return JSON.parse(localStorage.getItem("user"));
        } catch {
            return null;
        }
    })();

    const initial = storedUser?.username
        ? storedUser.username.charAt(0).toUpperCase()
        : "U";

    const handleLogout = () => {
        // dispatch(logout());
        localStorage.removeItem("user");
        navigate("/");
    };

    return (
        <header className="sticky top-0 z-50 border-b border-[#2A2C3E] bg-[#14151F] text-[#F5F3EE]">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

                {/* Left: Logo mark + wordmark */}
                <Link to="/home" className="flex items-center gap-2">
                    <div className="flex items-center gap-3">
                        <span className="flex h-9 w-9 rotate-3 items-center justify-center rounded-md bg-[#D4A73A] font-serif text-base font-bold text-[#14151F]">
                            BE
                        </span>
                        <div className="hidden flex-col leading-none sm:flex">
                            <span className="font-serif text-lg font-semibold tracking-wide">
                                Best Ecommerce
                            </span>
                            <span className="text-[10px] uppercase tracking-[0.2em] text-[#9A9AA8]">
                                Shop the essentials
                            </span>
                        </div>
                    </div>
                </Link>

                {/* Right: Desktop nav */}
                <nav className="hidden items-center gap-8 md:flex">
                    {navLinks.map((link) => {
                        const active = location.pathname === link.path;

                        return (
                            <button
                                key={link.path}
                                onClick={() => navigate(link.path)}
                                className={`relative text-sm font-medium tracking-wide transition-colors ${active
                                    ? "text-[#D4A73A]"
                                    : "text-[#F5F3EE] hover:text-[#D4A73A]"
                                    }`}
                            >
                                {link.label}

                                {active && (
                                    <span className="absolute -bottom-[18px] left-0 h-[2px] w-full bg-[#D4A73A]" />
                                )}
                            </button>
                        );
                    })}

                    <span className="h-6 w-px bg-[#2A2C3E]" />

                    <button
                        onClick={() => navigate("/cart")}
                        aria-label="Cart"
                        className="relative text-[#F5F3EE] transition-colors hover:text-[#D4A73A]"
                    >
                        <CartIcon />
                        {cartCount > 0 && (
                            <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-[#D4A73A] text-[10px] font-semibold text-[#14151F]">
                                {cartCount}
                            </span>
                        )}
                    </button>

                    <div className="relative" ref={profileRef}>
                        <button
                            onClick={() => setProfileOpen(!profileOpen)}
                            className="flex items-center gap-2 rounded-full border border-[#2A2C3E] px-2 py-1 transition hover:border-[#D4A73A]"
                        >
                            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#D4A73A] text-sm font-bold text-black">
                                {initial}
                            </span>

                            <FiChevronDown
                                className={`transition-transform duration-200 ${profileOpen ? "rotate-180" : ""
                                    }`}
                            />
                        </button>

                        {profileOpen && (
                            <div className="absolute right-0 mt-3 w-56 overflow-hidden rounded-xl border border-[#2A2C3E] bg-[#1A1C27] shadow-2xl">

                                <div className="border-b border-[#2A2C3E] px-4 py-3">
                                    <p className="text-sm font-semibold text-white">
                                        {storedUser?.username || "User"}
                                    </p>

                                    <p className="text-xs text-gray-400">
                                        {storedUser?.email || ""}
                                    </p>
                                </div>

                                <button
                                    onClick={() => {
                                        navigate("/profile");
                                        setProfileOpen(false);
                                    }}
                                    className="flex w-full items-center gap-3 px-4 py-3 text-sm text-white transition hover:bg-[#2A2C3E]"
                                >
                                    <FiUser size={18} />
                                    Profile
                                </button>

                                <button
                                    onClick={() => {
                                        handleLogout();
                                        setProfileOpen(false);
                                    }}
                                    className="flex w-full items-center gap-3 px-4 py-3 text-sm text-red-400 transition hover:bg-red-500/10"
                                >
                                    <FiLogOut size={18} />
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>
                </nav>

                {/* Mobile toggle */}
                <button
                    className="md:hidden"
                    onClick={() => setMenuOpen((prev) => !prev)}
                    aria-label="Toggle menu"
                >
                    {menuOpen ? <CloseIcon /> : <MenuIcon />}
                </button>
            </div>

            {/* Mobile menu */}
            {menuOpen && (
                <div className="flex flex-col gap-1 border-t border-[#2A2C3E] px-6 py-4 md:hidden">
                    {navLinks.map((link) => (
                        <button
                            key={link.path}
                            onClick={() => {
                                navigate(link.path);
                                setMenuOpen(false);
                            }}
                            className="py-2 text-left text-sm font-medium tracking-wide text-[#F5F3EE] hover:text-[#D4A73A]"
                        >
                            {link.label}
                        </button>
                    ))}

                    <button
                        onClick={() => {
                            navigate("/cart");
                            setMenuOpen(false);
                        }}
                        className="flex items-center gap-2 py-2 text-left text-sm font-medium tracking-wide text-[#F5F3EE] hover:text-[#D4A73A]"
                    >
                        <CartIcon />
                        Cart {cartCount > 0 && `(${cartCount})`}
                    </button>

                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 py-2 text-left text-sm font-medium tracking-wide text-[#F5F3EE] hover:text-[#D4A73A]"
                    >
                        <UserIcon />
                        Logout
                    </button>
                </div>
            )}
        </header>
    );
};

export default Navbar;