import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignInAlt, faSignOutAlt, faBars, faTimes } from '@fortawesome/free-solid-svg-icons';

export default function Header() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false); // State to manage mobile menu visibility
    const navigate = useNavigate();

    useEffect(() => {
        const checkLoginStatus = () => {
            const token = localStorage.getItem('jwtToken');
            setIsLoggedIn(!!token);
        };

        // Check login status on mount
        checkLoginStatus();

        // Add event listener to listen for login/logout events
        window.addEventListener('userLoggedIn', checkLoginStatus);

        // Cleanup event listener on unmount
        return () => {
            window.removeEventListener('userLoggedIn', checkLoginStatus);
        };
    }, []);

    const handleSignOut = () => {
        localStorage.removeItem('jwtToken');
        setIsLoggedIn(false);
        navigate('/SignIn');
        window.dispatchEvent(new Event('userLoggedIn')); // Ensure Header state updates
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <header className="shadow sticky z-50 top-0">
            <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5">
                <div className="flex justify-between items-center mx-auto max-w-screen-xl">
                    <div className="flex items-center">
                        <Link to="/" className="flex items-center">
                            <img
                                src="https://find-a-helper.com/wp-content/uploads/2024/03/FIndahelper_logo-1.png"
                                className="mr-3 h-12"
                                alt="Logo"
                            />
                        </Link>
                        <button
                            onClick={toggleMenu}
                            className="lg:hidden p-2 text-gray-500 hover:text-gray-700 focus:outline-none"
                        >
                            <FontAwesomeIcon icon={isMenuOpen ? faTimes : faBars} />
                        </button>
                    </div>
                    <div className={`lg:flex lg:space-x-8 ${isMenuOpen ? 'block' : 'hidden'} lg:block`}>
                        <ul className="flex flex-col lg:flex-row lg:space-x-8 items-center font-medium">
                            <li>
                                <NavLink
                                    to="/"
                                    className={({ isActive }) =>
                                        `block py-2 duration-200 ${isActive ? "text-orange-700" : "text-gray-700"} hover:text-orange-700`
                                    }
                                >
                                    Home
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/AboutUs"
                                    className={({ isActive }) =>
                                        `block py-2 duration-200 ${isActive ? "text-orange-700" : "text-gray-700"} hover:text-orange-700`
                                    }
                                >
                                    About
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/Contact"
                                    className={({ isActive }) =>
                                        `block py-2 duration-200 ${isActive ? "text-orange-700" : "text-gray-700"} hover:text-orange-700`
                                    }
                                >
                                    Contact
                                </NavLink>
                            </li>
                        </ul>
                        <div className="flex items-center space-x-4 mt-4 lg:mt-0">
                            {isLoggedIn ? (
                                <>
                                    <button
                                        onClick={handleSignOut}
                                        className="text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5"
                                        style={{ marginBottom: '20px' }} // Add margin-bottom here
                                    >
                                        <FontAwesomeIcon icon={faSignOutAlt} /> Logout
                                    </button>
                                    <Link
                                        to="/SignUp"
                                        className="text-white bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5"
                                        style={{ marginBottom: '21px' }} // Add margin-bottom here
                                    >
                                        Registration
                                    </Link>
                                </>
                            ) : (
                                <>
                                    <Link
                                        to="/SignIn"
                                        className="text-primary-800 hover:bg-primary-50 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5"
                                        style={{ marginBottom: '20px' }} // Add margin-bottom here
                                    >
                                        <FontAwesomeIcon icon={faSignInAlt} /> Sign In
                                    </Link>
                                    <Link
                                        to="/SignUp"
                                        className="text-white bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5"
                                        style={{ marginBottom: '21px' }} // Add margin-bottom here
                                    >
                                        Registration
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    );
}
