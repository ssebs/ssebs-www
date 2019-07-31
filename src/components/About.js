import React from "react";

const About = () => {
    // Make text white on homepage only
    let classes = "text-center header";
    if (window.location.hash === "#/") {
        classes = "text-center header text-white";
    }
    return (
        <div>
            <h1 className={classes}>ABOUT</h1>
            <p>
                My name is <strong>Sebastian Safari</strong>, and I am a{" "}
                <em>Systems and Software Engineer</em>, meaning I do both System
                Administration, and Software Engineering instead of just one or
                the other. Day to day I build, develop, automate, and maintain
                numerous IT infrastructure systems and web applications.
            </p>

            <p>
                I am located in the southern part of California's Silicon
                Valley, so I am easy to reach around the south bay.
            </p>

            <blockquote className="blockquote">
                <p className="mb-0 text-dark">What am I best at?</p>
                <div className="blockquote-footer">
                    Making functional and secure Full Stack Web applications.
                </div>
            </blockquote>

            <blockquote className="blockquote">
                <p className="mb-0 text-dark">
                    What technologies do I use for this?
                </p>
                <div className="blockquote-footer">
                    Python, Flask, Javascript (ES6), React, &amp; JWT.
                </div>
            </blockquote>

            <p>
                Please note that most of my work is internal, so you won't be
                able to see all the good stuff. Typically the internal work I do
                is much more secure, using modern security to keep the data
                where it's supposed to be. Some types of the work that I do are
                listed below:
            </p>

            <ul>
                <li>Automating User OnBoarding</li>
                <li>
                    Developing internal Web Apps (e.g. New Hire Form, MAC
                    Address Cleaner, etc
                </li>
                <li>Migrating from Exchange OnPrem to O365</li>
                <li>Provisioning Linux Desktops and Servers</li>
                <li>Deploying Web Apps to local VMs and the Cloud</li>
                <li>Developing REST API app integrations for business use</li>
                <li>Fixing networking issues</li>
                <li>etc.</li>
            </ul>
        </div>
    );
};

export default About;
