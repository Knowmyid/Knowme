import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { useNavigate } from "react-router-dom";

const LoginButton = () => {
    const { user, loginWithRedirect, isAuthenticated, logout } = useAuth0();
    const navigate = useNavigate()

    return (
        <>
            {
                isAuthenticated ? (
                    <>
                        <h3 className="text-white">Hello, {user.name}</h3>
                        <button
                            className="bg-white text-black"
                            onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
                        >
                            Logout
                        </button>
                    </>

                ) : (
                    <button
                        className="bg-white text-black"
                        onClick={() => loginWithRedirect()}
                    >
                        Log In
                    </button>
                )
            }
        </>
    );


};

export default LoginButton;