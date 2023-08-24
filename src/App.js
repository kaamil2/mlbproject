import './App.css';
import React from "react";
import Navbar from './components/Navbar/Navbar.js';
//TODO: use the api i have created to project the png of the graph



function App() {

    /*const [images, setImages] = useState([]);

    const inputRef = useRef(null);

    const varRef = useRef(images.length);

    useEffect(() => {

        axios.get('https://kaamil2.github.io', {
            /!*params: {
                o1: 1,
                b1: 10,
                t1: "4Yr",
                p1: "Bat",
                a5: false
            }*!/
        })
            .then((res) => {
                //setImages(res.data);
                console.log(res.data);
                // handle success
            })
    }, []);*/

    return (
        <div className="App">
            <Navbar />

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
        </div>
    );
}

export default App;
