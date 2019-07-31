import React from "react";

const About = () => {
    // Make text white on homepage only
    let classes = "text-center header";
    if (window.location.hash === "#/") {
        console.log(window.location.hash);
        classes = "text-center header text-white";
    }
    return (
        <div>
            <h1 className={classes}>ABOUT</h1>
            <p>
                My name is <strong>Sebastian Safari</strong>, and I am a{" "}
                <em>Systems and Software Engineer</em>, meaning I do both System
                Administration, and Software Engineering instead of just one or
                the other. My username is{" "}
                <span className="text-tertiary" style={{ fontSize: "1.5rem" }}>
                    ssebs
                </span>
                , you can find me online with that.
            </p>
            <p>
               Day to day I build, develop, automate, and maintain misc IT infrastructure systems and web applications. Some examples of this would be things like:
            </p>
            <ul>
                <li>Automating User OnBoarding</li>
                <li>Developing internal Web Apps (e.g. New Hire Form, MAC Address Cleaner, etc</li>
                <li>Migrating from Exchange OnPrem to O365</li>
                <li>Provisioning Linux Desktops and Servers</li>
                <li>Deploying Web Apps to local VMs and the Cloud</li>
                <li>Developing REST API app integrations for business use</li>
                <li>Fixing networking issues</li>
                <li>etc</li>
            </ul>
        </div>
    );
};

export default About;
