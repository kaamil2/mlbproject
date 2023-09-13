import React, {Component} from "react";
/*import Navbar from './components/Navbar/Navbar.js';
import Compare from './pages/Compare';
import About from './pages/About';*/
import MlbData from '../mlbDraftPlotData.csv';
import Papa from 'papaparse';
import {useEffect, useState} from 'react';
import { Line } from 'react-chartjs-2';

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

function Predict() {
  const [name, setName] = useState('');
  const [greeting, setGreeting] = useState('');

  const handleChange = (event) => {
    setName(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch(`/api/greeting?name=${encodeURIComponent(name)}`)
        .then(response => response.json())
        .then(data => setGreeting(data.greeting));
  };


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
              borderColor: "blue",
              backgroundColor: "black",
              stepped: true,
            },
            {
              label: "retire",
              data: retired,
              borderColor: "maroon",
              backgroundColor: "red",
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
            },
          }
        })
      })
    })
  }, [])

  return (
      <div className="Predict">
        {/*<Navbar />*/}
        <div>
          <h1>MLB Draft Data</h1>
          {
            <div>
              <Line options={chartOptions} data={chartData} />
            </div>
          }
          </div>
            <div>
                <form onSubmit={handleSubmit}>
                    <label>
                        Name:
                        <input type="text" value={name} onChange={handleChange} />
                    </label>
                    <button type="submit">Submit</button>
                </form>
                <p>{greeting}</p>
        </div>
        {/*{component}*/}
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

export default Predict