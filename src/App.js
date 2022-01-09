import { Fragment, useEffect, useState } from "react";
import cls from "./App.module.css";
import AxisSelector from "./components/AxisSelector";
import ScatterPlot from "./components/ScatterPlot";
import * as d3 from "d3";
import pathToFile from "./assets/phl_hec_all_confirmed.csv";
//hard coded constant using commented out code below
const options = [
  "P. Mass (EU)",
  "P. Max Mass (EU)",
  "P. Radius (EU)",
  "P. Density (EU)",
  "P. Gravity (EU)",
  "P. Esc Vel (EU)",
  "P. SFlux Min (EU)",
  "P. SFlux Mean (EU)",
  "P. SFlux Max (EU)",
  "P. Teq Min (K)",
  "P. Teq Mean (K)",
  "P. Teq Max (K)",
  "P. Ts Min (K)",
  "P. Ts Mean (K)",
  "P. Ts Max (K)",
  "P. Surf Press (EU)",
  "P. Mag",
  "P. Appar Size (deg)",
  "P. Period (days)",
  "P. Sem Major Axis (AU)",
  "P. Eccentricity",
  "P. Mean Distance (AU)",
  "P. Inclination (deg)",
  "P. Omega (deg)",
  "S. Constellation",
  "S. Mass (SU)",
  "S. Radius (SU)",
  "S. Teff (K)",
  "S. Luminosity (SU)",
  "S. [Fe/H]",
  "S. Age (Gyrs)",
  "S. Appar Mag",
  "S. Distance (pc)",
  "S. RA (hrs)",
  "S. DEC (deg)",
  "S. Mag from Planet",
  "S. Size from Planet (deg)",
  "S. No. Planets",
  "S. No. Planets HZ",
  "S. Hab Zone Min (AU)",
  "S. Hab Zone Max (AU)",
  "P. HZD",
  "P. HZC",
  "P. HZA",
  "P. HZI",
  "P. SPH",
  "P. Int ESI",
  "P. Surf ESI",
  "P. ESI",
  "S. HabCat",
  "P. Habitable",
  "P. Hab Moon",
  "P. Confirmed",
];
/*
App component is used to keep track of and contain the 'dashboard': 
  loading state -> used to show loading screen while csv is parsed
  data state -> supplies data to histrograms and scatter plots
  xField -> keeps track of selected option from dropdown for xAxis
  yField -> keeps track of selected option from dropdown for yAxis

*/
function App() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [xField, setXField] = useState(null);
  const [yField, setYField] = useState(null);

  //parse csv and set inital values for xField, yField and data
  //and set loading to false
  useEffect(() => {
    d3.csv(pathToFile).then((rawData) => {
      console.log(rawData.length)
      //just looked at the csv by eye and filtered non numeric values
      
      //console.log(rawData[0]);
      //const keys = Object.keys(rawData[0]);
      // let newKeys = keys.slice(9, keys.length - 1);
      // newKeys = newKeys.filter(
      //   (d) =>
      //     !d.includes("Name") && !d.includes("Type") && !d.includes("Method")
      // );

      //interesting looking inital values
      setXField("P. Teq Max (K)");
      setYField("P. Mag");
      setData(rawData);
      setLoading(false);
    });
  }, []);
  //called when the AxisSelector for the xAxis changes selected option
  const handleXAxisChange = (newField) => {
    setXField(newField)
  }
  //called when the AxisSelector for the yAxis changes selected option
  const handleYAxisChange = (newField) => {
    setYField(newField)
  }
  return (
    <div className={cls.appWrapper}>
      {loading && <div className={cls.loading}><p>Loading...</p></div>}
      {!loading && (
        <Fragment>
          <div className={cls.mainTitle}>
            <h1>ExoPlanet Data Explorer</h1>
          </div>
          <div className={cls.selectorWrapper}>
            <AxisSelector
              title="X-Axis"
              selected={xField}
              options={options.filter(d => d !== yField)}
              onChange={handleXAxisChange}
              data={data}
              chartFill="#BDD9BF"
            />
            <AxisSelector
              title="Y-Axis"
              selected={yField}
              options={options.filter(d => d !== xField)}
              onChange={handleYAxisChange}
              data={data}
              chartFill="#A997DF"
            />
          </div>
          <ScatterPlot chartFill="#FFC857" xField={xField} yField={yField} data={data}/>
        </Fragment>
      )}
    </div>
  );
}

export default App;
