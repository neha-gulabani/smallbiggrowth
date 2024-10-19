import React from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { googleAuth } from "../../services/api";
import { useNavigate } from 'react-router-dom';


export default (props) => {
    const navigate = useNavigate();
    const responseGoogle = async (authResult) => {
        try {
            if (authResult["code"]) {
                console.log(authResult.code);
                const result = await googleAuth(authResult.code);
                props.setUser(result.data.data.user);
                navigate('/leadslist');
                alert("successfuly logged in");
            } else {
                console.log(authResult);
                throw new Error(authResult);
            }
        } catch (e) {
            console.log(e);
        }
    };

    const googleLogin = useGoogleLogin({
        onSuccess: responseGoogle,
        onError: responseGoogle,
        flow: "auth-code",
    });

    return (
        <button
            className="flex items-center justify-center w-full py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            onClick={googleLogin}
        >
            <svg
                className="w-5 h-5 mr-2"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 48 48"
            >
                <path
                    fill="#4285F4"
                    d="M47.532 24.552c0-1.642-.147-3.205-.423-4.71H24.49v8.904h13.068c-.564 3.003-2.253 5.532-4.79 7.224v6.024h7.74c4.534-4.175 7.125-10.332 7.125-17.442z"
                />
                <path
                    fill="#34A853"
                    d="M24.49 48c6.468 0 11.89-2.158 15.852-5.846l-7.74-6.024c-2.143 1.438-4.848 2.292-8.112 2.292-6.238 0-11.526-4.212-13.414-9.866H2.171v6.184C6.118 42.86 14.828 48 24.49 48z"
                />
                <path
                    fill="#FBBC05"
                    d="M11.075 28.556a14.834 14.834 0 01-.777-4.704c0-1.633.283-3.218.777-4.704v-6.184H2.17A23.492 23.492 0 000 23.852c0 3.82.921 7.438 2.17 10.488l8.905-5.784z"
                />
                <path
                    fill="#EA4335"
                    d="M24.49 9.62c3.62 0 6.854 1.25 9.402 3.692l6.972-6.972C35.697 2.05 30.856 0 24.49 0 14.828 0 6.118 5.14 2.17 13.012l8.905 6.184c1.888-5.654 7.176-9.866 13.414-9.866z"
                />
            </svg>
            Continue with Google
        </button>

    );
};