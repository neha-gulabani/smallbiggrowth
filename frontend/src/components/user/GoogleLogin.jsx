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
            style={{
                padding: "10px 20px",
            }}
            onClick={googleLogin}
        >
            Sign in with Google
        </button>
    );
};