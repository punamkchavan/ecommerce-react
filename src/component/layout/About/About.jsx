import React from "react";
import "./aboutSection.css";
import { Button, Header } from 'semantic-ui-react';
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
                <Header component="h1">About Us</Header>

                <div>
                    <div>
                        <Header>Avadhut Kelaksar</Header>
                        <Button onClick={visitInstagram} color="primary">
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
