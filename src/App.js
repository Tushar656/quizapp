import { useEffect, useState } from 'react';
import './App.css';
import Trival from './component/Trival';
import Start from './component/Start'

function App() {
  const [userName, setUserName] = useState(null);
  const [questionNum, setQuestionNum] = useState(1);
  const [stop, setStop] = useState(false)
  const [timer, setTimer] = useState(30);
  const [stoptimer, setStopTimer] = useState(0);


  const moneyPyramid = [
    {id:1, amount: "$ 100"},
    {id:2, amount: "$ 200"},
    {id:3, amount: "$ 300"},
    {id:4, amount: "$ 500"},
    {id:5, amount: "$ 1000"},
    {id:6, amount: "$ 2000"},
    {id:7, amount: "$ 4000"},
    {id:8, amount: "$ 8000"},
    {id:9, amount: "$ 16000"},
    {id:10, amount: "$ 32000"},
    {id:11, amount: "$ 64000"},
    {id:12, amount: "$ 100000"},
    {id:13, amount: "$ 200000"},
    {id:14, amount: "$ 500000"},
    {id:15, amount: "$ 1000000"},
  ].reverse();

  useEffect(()=>{
    if(timer===0){ setStop(true); }
    const interval = setInterval(() => {
      if(stoptimer === 0){
        setTimer((prev) => prev-1)
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [setStop, stoptimer, timer])

  useEffect(()=>{
    setTimer(30);
  }, [questionNum, userName]);


  return (
    userName ? (
      <>
        <div className="App">
        <div className="questions">
        {stop ? <div className='gameStop'>{questionNum===1 ? `You Not win any amount of money` :`You won: ${moneyPyramid[16-questionNum].amount}`}</div>
              : <>
                  <div className="top">
                    <div className="timer">{timer}</div>
                  </div>
                  <div className="bottom"><Trival setStop={setStop} questionNum={questionNum} setStopTimer={setStopTimer} setQuestionNum={setQuestionNum}/></div>
                </>}
        </div>
        <div className="money">
          <ul className="moneyList">
            {
              moneyPyramid.map((m)=>(
                <li className={questionNum===m.id ? "moneylistitem active":"moneylistitem"}>{m.amount}</li>
              ))
            }
          </ul>
        </div>
    </div>
      </>
    ) : <Start setUserName={setUserName}/>
  );
}

export default App;
