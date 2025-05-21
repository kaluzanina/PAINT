import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { useLocation } from "react-router-dom";
import "./UserMenu.css";


export default function UserMenu() {
    const [open, setOpen] = useState(false);
    const menuRef = useRef(null);
    const { logout, user } = useUser();
    const navigate = useNavigate();
    const location = useLocation();


    useEffect(() => {
        const handler = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    return (
        <div className="user-menu" ref={menuRef}>
            <button onClick={() => setOpen(!open)} className="menu-toggle">
                ☰ MENU
            </button>
            {open && (
                <div className="menu-dropdown">
                    {location.pathname !== "/dashboard" && (
                        <button onClick={() => navigate("/dashboard")}>Wykresy</button>
                    )}
                    {location.pathname !== "/history" && (
                        <button onClick={() => navigate("/history")}>Historia</button>
                    )}
                    <button onClick={() => { logout(); navigate("/login"); }}>Wyloguj</button>
                </div>

            )}
        </div>
    );
}
