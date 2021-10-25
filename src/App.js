import { useEffect, useState } from "react";
import {
  HashRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import Navbar from './Navbar'
import A from "./components/a";
import B from "./components/b";
import C from "./components/c";
import D from "./components/d";
import { PROBABILITY_THRESHOLD } from './constants'
import predictor from './predictor'

function App() {

  const [alert, setAlert] = useState()

  function showAlert(message) {
    setAlert(message)
  }

  function predict() {
    const { probability } = predictor.get()
    showAlert(`${probability}`)
  }

  useEffect(predict, [])

  const { link, probability, predictions } = predictor.get()

  function reset() {
    predictor.reset();
    predict();
  }

  return (
    <div>
      <h1>alz predictor demo</h1>
      <h3 style={{color: 'red'}}>注意⚠️：<span style={{color: 'black'}}>alz predictor存在localStorage中</span></h3>
      <div>点击ABCD链接提供训练数据</div>
      <div>点击Predict按钮获取预测概率</div>
      <Router>
        <Navbar onPredict={predict} onReset={reset}/>
        <div>
          <Switch>
            <Route path="/b">
              <B/>
            </Route>
            <Route path="/c">
              <C/>
            </Route>
            <Route path="/d">
              <D/>
            </Route>
            <Route path="/a">
              <A/>
            </Route>
          </Switch>
        </div>
      </Router>

      <div>
          {
            link ? 
            <div>
              {
                probability < PROBABILITY_THRESHOLD ?
                <div>
                  预提取{link}，但概率小于{PROBABILITY_THRESHOLD},  建议提供更多训练数据!
                  <div>下一个点击事件是a链接的概率：{predictions.a ? predictions.a.toFixed(2) : 0}</div>
                  <div>下一个点击事件是b链接的概率：{predictions.b ? predictions.b.toFixed(2) : 0}</div>
                  <div>下一个点击事件是c链接的概率：{predictions.c ? predictions.c.toFixed(2) : 0}</div>
                  <div>下一个点击事件是d链接的概率：{predictions.d ? predictions.d.toFixed(2) : 0}</div>
                </div>
                :
                <div>
                  预提取{link}
                  <div>下一个点击事件是a链接的概率：{predictions.a ? predictions.a.toFixed(2) : 0}</div>
                  <div>下一个点击事件是b链接的概率：{predictions.b ? predictions.b.toFixed(2) : 0}</div>
                  <div>下一个点击事件是c链接的概率：{predictions.c ? predictions.c.toFixed(2) : 0}</div>
                  <div>下一个点击事件是d链接的概率：{predictions.d ? predictions.d.toFixed(2) : 0}</div>
                </div>
              }
            </div> 
            : 
            <div>没有训练数据</div>
          }
        </div>
    </div>
  );
}

export default App;
