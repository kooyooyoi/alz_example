import { Link } from "react-router-dom";
import predictor, { LINKS } from './predictor'


const { A, B,  C, D } = LINKS


export default function Sidebar({ onPredict, onReset }) {
  return (
    <div>
      <div>
        <Link to="/a" onClick={() => predictor.add(A)}>A</Link>
      </div>
      <div>
        <Link to="/b" onClick={() => predictor.add(B)}>B</Link>
      </div>
      <div>
        <Link to="/c" onClick={() => predictor.add(C)}>C</Link>
      </div>
      <div>
        <Link to="/d" onClick={() => predictor.add(D)}>D</Link>
      </div>
      <button onClick={onPredict}>Predict</button>
      <button onClick={onReset}>Reset</button>
    </div>
  )
}