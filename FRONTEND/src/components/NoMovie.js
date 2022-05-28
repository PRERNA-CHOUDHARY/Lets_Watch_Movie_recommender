import React from "react";
import Lottie from "lottie-react";
import movie from "../movie-ani.json";

export default function NoMovie() {
    return (
        <div style={{ textAlign: "center" }}>
            <div className="flex justify-center">
                <Lottie
                    className="lg:m-6 md:m-32 h-60 w-60"
                    animationData={movie}
                />
            </div>
            <div className="flex justify-center poppins text-yellow-400 text-lg font-bold">
                Movie Recommendation System
            </div>
            <div className="flex justify-center poppins text-white text-sm mx-2">
                a fancy way to retrieve movies based on your search preferences
            </div>
        </div>
    );
}
