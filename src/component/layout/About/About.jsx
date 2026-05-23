import React from "react";
import "./aboutSection.css";
import { Button } from '@mui/material';
import MetaData from "../MetaData";

const About = () => {
    const visitInstagram = () => {
        window.location = "";
    };
    return (
        <div className="aboutSection">
            <MetaData title={"About Us"} />
            <div></div>
            <div className="aboutSectionGradient"></div>
            <div className="aboutSectionContainer">
                <h1>About Us</h1>

                <div>
                    <div>
                        <h2>Punam Chavan</h2>
                        <Button onClick={visitInstagram} variant="contained" color="primary">
                            Visit Instagram
                        </Button>
                        <span>

                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
