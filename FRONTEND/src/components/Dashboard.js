import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import NoMovie from "./NoMovie.js";

export default function Dashboard() {
    const [error, setError] = useState("");
    const [names, setNames] = useState([]);
    const [posters, setPosters] = useState([]);
    const { currentUser, logout } = useAuth();
    const [movieName, setMovieName] = useState("");
    const [recMovie, setRecMovie] = useState("");
    const [isMovie, setIsMovie] = useState(0);
    const [history, setHistory] = useState(0);
    const navigate = useNavigate();

    let l = localStorage.getItem("movie");
    let list = JSON.parse(l);
    if (!list) list = [];

    function handleChange() {
        setIsMovie(0);
        axios
            .get(`http://127.0.0.1:8000/movie/${movieName}`)
            .then((response) => {
                setRecMovie(movieName);
                setIsMovie(1);
                let x = localStorage.getItem("movie");
                let list = JSON.parse(x) || [];
                list.push(movieName);
                localStorage.setItem("movie", JSON.stringify(list));
                setNames(response.data[0]);
                setPosters(response.data[1]);
            });
    }

    async function handleLogout() {
        setError("");

        try {
            navigate("/login");
            await logout();
        } catch {
            setError("Failed to Log Out");
        }
    }

    function handleHistory() {
        if (history === 1) setHistory(0);
        else setHistory(1);
    }

    return (
        <div style={{ textAlign: "center", height: "100%" }}>
            {error && <div className="">{error}</div>}
            <div className="flex justify-between poppins bg-yellow-400 py-3 px-3 text-white">
                <div className="text-xl font-bold">Let's Watch</div>
                <div className="flex items-center">
                    <div className="none mr-8 text-sm">{currentUser.email}</div>
                    <button
                        variant="link"
                        onClick={handleLogout}
                        className="border-b-2 border-white p-1 text-sm"
                    >
                        Log Out
                    </button>
                </div>
            </div>
            <div style={{ height: isMovie === 0 ? "100vh" : "100%" }}>
                <div className="p-4 flex justify-center">
                    <form className="max-w-sm" style={{ width: "60%" }}>
                        <input
                            className="shadow-lg appearance-none border border-rounded h-12 w-full py-2 px-3 text-grey-darker mb-3 leading-tight focus:outline-none focus:shadow-outline signUp-font"
                            type="text"
                            required
                            value={movieName}
                            onChange={(e) => setMovieName(e.target.value)}
                            placeholder="Movie"
                        />
                    </form>
                    <span
                        className="bg-yellow-400 hover:bg-white hover:text-yellow-400 text-white font-bold h-12 py-2 pt-3 px-4 ml-4 rounded focus:outline-none focus:shadow-outline poppins"
                        onClick={handleChange}
                    >
                        Search
                    </span>
                </div>
                {isMovie === 0 ? (
                    <NoMovie />
                ) : (
                    <div>
                        <div className="flex py-2 lg:px-8 mx-4 px-4 lg:mx-8 text-xl text-gray-300 signUp-font">
                            <span className="text-gray-300">
                                Recommendations found for &nbsp;
                            </span>
                            {recMovie}
                            <span className="text-black"></span>
                        </div>
                        <div className="flex justify-center">
                            <div className="grid grid-cols-1 lg:m-8 md:m-4 md:grid-cols-3 lg:grid-cols-5 gap-4 px-2 lg:px-8">
                                <div>
                                    <div className="poppins text-lg text-white font-bold p-1">
                                        {names[0]}
                                    </div>
                                    <div>
                                        <img
                                            className="rounded-lg w-48 ml-7"
                                            src={posters[0]}
                                            alt=""
                                        />
                                    </div>
                                </div>
                                <div>
                                    <div className="poppins text-lg text-white font-bold p-1">
                                        {names[1]}
                                    </div>
                                    <div>
                                        <img
                                            className="rounded-lg w-48 ml-7"
                                            src={posters[1]}
                                            alt=""
                                        />
                                    </div>
                                </div>
                                <div>
                                    <div className="poppins text-lg text-white font-bold p-1">
                                        {names[2]}
                                    </div>
                                    <div>
                                        <img
                                            className="rounded-lg w-48 ml-7"
                                            src={posters[2]}
                                            alt=""
                                        />
                                    </div>
                                </div>
                                <div>
                                    <div className="poppins text-lg text-white font-bold p-1">
                                        {names[3]}
                                    </div>
                                    <div>
                                        <img
                                            className="rounded-lg w-48 ml-7"
                                            src={posters[3]}
                                            alt=""
                                        />
                                    </div>
                                </div>
                                <div>
                                    <div className="poppins text-lg text-white font-bold p-1">
                                        {names[4]}
                                    </div>
                                    <div>
                                        <img
                                            className="rounded-lg w-48 ml-7"
                                            src={posters[4]}
                                            alt=""
                                        />
                                    </div>
                                </div>
                                <div>
                                    <div className="poppins text-lg text-white font-bold p-1">
                                        {names[5]}
                                    </div>
                                    <div>
                                        <img
                                            className="rounded-lg w-48 ml-7"
                                            src={posters[5]}
                                            alt=""
                                        />
                                    </div>
                                </div>
                                <div>
                                    <div className="poppins text-lg text-white font-bold p-1">
                                        {names[6]}
                                    </div>
                                    <div>
                                        <img
                                            className="rounded-lg w-48 ml-7"
                                            src={posters[6]}
                                            alt=""
                                        />
                                    </div>
                                </div>
                                <div>
                                    <div className="poppins text-lg text-white font-bold p-1">
                                        {names[7]}
                                    </div>
                                    <div>
                                        <img
                                            className="rounded-lg w-48 ml-7"
                                            src={posters[7]}
                                            alt=""
                                        />
                                    </div>
                                </div>
                                <div>
                                    <div className="poppins text-lg text-white font-bold p-1">
                                        {names[8]}
                                    </div>
                                    <div>
                                        <img
                                            className="rounded-lg w-48 ml-7"
                                            src={posters[8]}
                                            alt=""
                                        />
                                    </div>
                                </div>
                                <div className="none">
                                    <div className="poppins text-lg text-white font-bold p-1">
                                        {names[9]}
                                    </div>
                                    <div>
                                        <img
                                            className="rounded-lg w-48 ml-7"
                                            src={posters[9]}
                                            alt=""
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <div className="flex justify-center pt-4 pb-2">
                <span
                    className="bg-white text-yellow-400 hover:text-white hover:bg-yellow-400 text-sm font-bold h-12 py-2 pt-3 px-4 ml-4 rounded focus:outline-none focus:shadow-outline poppins"
                    onClick={handleHistory}
                >
                    {history === 1
                        ? "Show Search History"
                        : "Hide Search History"}
                </span>
            </div>
            {history === 0 ? (
                <div className="p-8">
                    {list.map((li) => (
                        <div className="signUp-font text-base text-white">
                            {li}
                        </div>
                    ))}
                </div>
            ) : (
                ""
            )}
            <div className="flex justify-center poppins bg-yellow-400 py-4 px-3 text-white">
                <div className="text-sm font-bold">By Prerna Choudhary</div>
            </div>
        </div>
    );
}
