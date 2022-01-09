import cls from "./AxisSelector.module.css";
import Histogram from "../Histogram";
/*
Axis Selector component is used for selecting and updating Axis' for the 'dashboard'  
*/
const AxisSelector = (props) => {
  const { title, selected, options, onChange, data, chartFill } = props;

  const handleOnChange = (ev) => {
    onChange(ev.target.value);
  };

  return (
    <div className={cls.selectorContainer}>
      <h3>{title}</h3>
      <select value={selected} onChange={handleOnChange}>
        {options.map((opt, i) => {
          return (
            <option value={opt} key={`${title}_option_${opt}`}>
              {opt}
            </option>
          );
        })}
      </select>
      <div className={cls.chartWrapper}>
        <Histogram fill={chartFill} field={selected} data={data}/>
      </div>
    </div>
  );
};
export default AxisSelector;
