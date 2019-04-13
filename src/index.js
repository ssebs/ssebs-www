import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';

import logo from "./assets/256ssebsSquareLogo.png";

// Main app
const App = () => {
    return (
        <div>
            <p>ssebs</p>
            <img src={logo} alt="logo" width="64px" />
        </div>
    )
}


ReactDOM.render(<App />, document.getElementById('root'));
