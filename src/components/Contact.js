import React from "react";

const Contact = () => {
    return (
        <div>
            <h1 className="text-center header">CONTACT</h1>
            <div className="contact-card">
                <img
                    src={require("../assets/me200.jpg")}
                    alt="Me"
                    width="180px"
                    style={{ borderRadius: "50%" }}
                />

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
                <p>
                    Please note that most of my work is internal, so you won't
                    be able to see all the good stuff.
                </p>
            </div>
        </div>
    );
};

export default Contact;
