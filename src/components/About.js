import React from "react";

const About = () => {
    // Make text white on homepage only
    let classes = "text-center header";
    if (window.location.hash === "#/") {
        console.log(window.location.hash);
        classes = "text-center header text-tertiary";
    }
    return (
        <div>
            <h1 className={classes}>ABOUT</h1>
            <p>
               <span className="text-tertiary" style={{fontSize:"1.75rem"}}>ssebs</span> is my username for most things on the web. My real name is <em className="text-tertiary">Sebastian Safari</em>, and I am a Systems and Software Engineer. What does that mean? I do both System Engineering/Administration, and Software Development. 
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
