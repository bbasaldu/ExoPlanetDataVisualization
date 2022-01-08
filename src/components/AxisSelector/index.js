import cls from './AxisSelector.module.css'
import Histogram from '../Histogram'
const AxisSelector = (props) => {
    return (
        <div className={cls.selectorContainer}>
            <h3>{props.title}</h3>
            <select>
                <option>Hello</option>
            </select>
            <Histogram />
        </div>
    )
}
export default AxisSelector