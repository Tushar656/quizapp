import {React, useRef} from 'react';
import Theme from '../assets/KBCcut.mp3';
import useSound from 'use-sound';
import './Start.css'

function Start({setUserName}) {
    const [theme, {stop}] = useSound(Theme);
    theme();
    
    const nameref = useRef()
  return <div>
      <form className="start" onSubmit={()=> {stop(); setUserName(nameref.current.value)}}>
          <input type="text" className="startname" placeholder='Enter your name' ref={nameref}/>
          <input type="submit" value="Start" className='startbtn'/>
      </form>
  </div>;
}

export default Start;
