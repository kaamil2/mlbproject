import logo from './logo.svg';
import './App.css';
import axios, {Axios} from "axios";
import React, {useRef} from "react";
import {useEffect, useState} from "react";

//TODO: use the api i have created to project the png of the graph



function App() {

    const [images, setImages] = useState([]);

    const inputRef = useRef(null);

    const varRef = useRef(images.length);

    useEffect(() => {

        axios.get('https://kaamil2.github.io', {
            /*params: {
                o1: 1,
                b1: 10,
                t1: "4Yr",
                p1: "Bat",
                a5: false
            }*/
        })
            .then((res) => {
                //setImages(res.data);
                console.log(res.data);
                // handle success
            })
    }, []);

    return (
        <div className="App">
            <header className="App-header">
                <h1>Hello This will be the MLB place </h1>
                <h2>Here is the graph</h2>
                <img src={images} className="App-logo" alt="logo" />



                {/*<img src={logo} className="App-logo" alt="logo" />
                <p>
                    Edit <code>src/App.js</code> and save to reload.
                </p>
                <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Learn React
                </a>*/}
            </header>
        </div>
    );
}

export default App;
