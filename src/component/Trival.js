import React, { useEffect, useState } from 'react';
import './trival.css'
import data from './Data'
import useSound from 'use-sound';
import Qtune from '../assets/QueTune.mp3';
import Newplay from '../assets/Newplay.mp3';

function Trival({setStop, questionNum, setQuestionNum, setStopTimer}) {
  const [question, setQuestion] = useState(null);
  const [selectedAnswer, setselectedAnswer] = useState(null);
  const [classname, setClassname] = useState("answer");

  const [letsPlay] = useSound(Newplay);
  const [Quetune, {stop}] = useSound(Qtune);
  useEffect(()=>{
    letsPlay();
  }, [letsPlay])

  useEffect(()=>{
    Quetune();
    setQuestion(data[questionNum-1]);
  }, [questionNum, Quetune]);
  
  const selectansClick=(a)=>{
    if(!selectedAnswer){
        setselectedAnswer(a);
        setClassname("answer active")
    
        setTimeout(() => {
          setClassname(a.correct? "answer correct" : "answer wrong");
          setTimeout(() => {
            if(a.correct){
              if(questionNum < 15){
                letsPlay();
                setStopTimer(0);
                setQuestionNum(questionNum+1);
                
                setselectedAnswer(null);
              }else{
                setStop(true);
              }
            }else{
              setStop(true)
            }
          }, 4500);
        }, 3000);
    }
  }

  return (
  <div className='questionSection'>
      <div className="question">{question?.question}</div>
      <div className="options">
        {question?.answers.map((a)=>(
          <div className={a===selectedAnswer? classname : "answer"} onClick={() => {setStopTimer(1); selectansClick(a); stop()}}>{a?.text}</div>
        ))}
      </div>
  </div>
  );
}

export default Trival;


