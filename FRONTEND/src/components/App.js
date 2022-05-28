import { useEffect } from "react";
import Signup from "./Signup";
import Login from "./Login";
import ForgotPassword from "./ForgotPassword";
import { AuthProvider } from "../contexts/AuthContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import alanBtn from "@alan-ai/alan-sdk-web";

export default function App() {
    useEffect(() => {
        let alanBtnInstance = alanBtn({
            key: "df5e0a87ce4cf578d610608f6aad42102e956eca572e1d8b807a3e2338fdd0dc/stage",
            onConnectionStatus: async function (status) {
                if (status === "authorized") {
                    await alanBtnInstance.activate();
                    alanBtnInstance.playText(
                        "Welcome to Let's Watch - a Movie Recommendation Website."
                    );
                }
            },
        });
    }, []);

    return (
        <Router>
            <AuthProvider>
                <Routes>
                    <Route exact path="/" element={<PrivateRoute />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/login" element={<Login />} />
                    <Route
                        path="/forgot-password"
                        element={<ForgotPassword />}
                    />
                </Routes>
            </AuthProvider>
        </Router>
    );
}
