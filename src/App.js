import './App.css';
import React from "react";
import Navbar from './components/Navbar/Navbar.js';
import Predict from './pages/Predict';
import Compare from './pages/Compare';
import About from './pages/About';
import MlbData from './mlbDraftPlotData.csv';
import Papa from 'papaparse';
import {useEffect, useState} from 'react';
import {Bar} from 'react-chartjs-2';
import { Line } from 'react-chartjs-2';
import OscarData from './oscar_age_male.csv';
/*import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
}*/
import {
    Chart as ChartJS,
    LineElement,
    PointElement,
    LineController,
    LinearScale,
    CategoryScale,
    Title,
    Legend,
    Tooltip
}
    from 'chart.js';
//import Bar from "react-chartjs2/example/Components/Bar";

/*ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
)*/

ChartJS.register(
    LineElement,
    PointElement,
    LineController,
    LinearScale,
    CategoryScale,
    Title,
    Legend,
    Tooltip
)


//TODO: use the api i have created to project the png of the graph



function App() {
    const data = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
            {

                label: 'My First Dataset',
                data: [30, 59, 80, 81, 56, 55, 40],
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1,
                stepped: true,
            },
            {
                label: 'My Second Dataset',
                data: [10, 20, 30, 40, 50, 60, 70],
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1,
                stepped: true,
            }
        ]
    }

    const[chartData, setChartData] = useState({
        datasets: []
    });
    const [chartOptions, setChartOptions] = useState({});



    useEffect(() => {
        Papa.parse(MlbData, {
           download: true,
            header: true,
            dynamicTyping: true,
            delimiter: "",

            complete: ((result) => {
                console.log(result)

                let reachedMLB;
                reachedMLB = result.data.map((item, index) => [item['reachMLB']]).filter( Number )
                reachedMLB = [].concat.apply([], reachedMLB)
                console.log(reachedMLB)
                let retired;
                retired = result.data.map((item, index) => [item['retire']]).filter( Number )
                retired = [].concat.apply([], retired)
                console.log(retired)
                setChartData({
                    labels: result.data.map((item, index) => [item['year']]).filter( Number ),
                    datasets: [
                        {
                            label: "reachMLB",
                            //result.data.map((item, index) => [item['reachMLB']]).filter( Number )
                            data: reachedMLB,
                            borderColor: "black",
                            backgroundColor: "green",
                            stepped: true,
                        },
                        {
                            label: "retire",
                            data: retired,
                            borderColor: "green",
                           //backgroundColor: "red",
                            fill: false,
                            stepped: true,

                        }

                    ]
                });
                setChartOptions({
                    plugins: {
                        legend: {
                            position: 'top'
                        },
                        title: {
                            display: true,
                            text: "MLB Draft Probability"
                     }
                    }
                })
            })
        })
    }, [])

    let component
    switch (window.location.pathname) {
        case "/":
            component = <Predict />
            break
        case "/predict":
            component = <Predict />
            break
        case "/compare":
            component = <Compare />
            break
        case "/about":
            component = <About />
            break
    }

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
            <div>
                <h1>MLB Draft Data</h1>
                {
                        <div>
                            <Line options={chartOptions} data={chartData} />
                        </div>
                }
            </div>
            {component}
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
