import React from "react";

const Contact = () => {
    return (
        <div>
            <h1 className="text-center header">CONTACT</h1>
            <div className="contact-card mb-5 pb-3">
                <img
                    src={require("../assets/me200.jpg")}
                    alt="Me"
                    width="180px"
                    style={{ borderRadius: "50%" }}
                />
                <p className="text-center">
                    My name is{" "}
                    <span
                        className="text-tertiary"
                        style={{ fontSize: "1.5rem" }}
                    >
                        Sebastian Safari
                    </span>
                    ,but you can find me online with the username{" "}
                    <span
                        className="text-tertiary"
                        style={{ fontSize: "1.5rem" }}
                    >
                        ssebs
                    </span>
                    .
                </p>
                <hr/>
                <p>
                    You can email me at{" "}
                    <a href="mailto:contact@ssebs.com">contact@ssebs.com</a> if
                    you want to get in touch with me. I am open to new projects,
                    so you can feel free to reach out if you're looking for
                    someone like me.
                </p>
                <p>
                    Above you'll find a photo of me. If you want to see this
                    face in real life you'll first have to email me, or connect
                    with me on{" "}
                    <a href="https://linkedin.com/in/ssebs">LinkedIn</a>. I am
                    also around on <a href="https://github.com/ssebs">GitHub</a>{" "}
                    if you want to see some of my work.
                </p>
            </div>
        </div>
    );
};

export default Contact;
