import { Fragment, useEffect, useState } from "react";
import cls from "./App.module.css";
import AxisSelector from "./components/AxisSelector";
import ScatterPlot from "./components/ScatterPlot";
import * as d3 from "d3";
import pathToFile from "./assets/phl_hec_all_confirmed.csv";
//hard coded constant using commented out code below
const newHeaders = [
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
function App() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [options, setOptions] = useState(null);
  const [xField, setXField] = useState(null);
  const [yField, setYField] = useState(null);
  useEffect(() => {
    d3.csv(pathToFile).then((rawData) => {
      //just looked at the csv by eye and filtered non numeric values
      //console.log(rawData[0]);
      //const keys = Object.keys(rawData[0]);
      // let newKeys = keys.slice(9, keys.length - 1);
      // newKeys = newKeys.filter(
      //   (d) =>
      //     !d.includes("Name") && !d.includes("Type") && !d.includes("Method")
      // );
      setXField("P. Radius (EU)");
      setYField("P. Gravity (EU)");
      setData(rawData);
      setOptions(newHeaders);
      setLoading(false);
    });
  }, []);

  return (
    <div className={cls.appWrapper}>
      {loading && <p>Loading...</p>}
      {!loading && (
        <Fragment>
          <div className={cls.mainTitle}>
            <h1>ExoPlanet Data Explorer</h1>
          </div>
          <div className={cls.selectorWrapper}>
            <AxisSelector
              title="X-Axis"
              selected={xField}
              options={options.filter((d) => d === yField)}
            />
            <AxisSelector
              title="Y-Axis"
              selected={xField}
              options={options.filter((d) => d === yField)}
            />
          </div>
          <ScatterPlot />
        </Fragment>
      )}
    </div>
  );
}

export default App;
