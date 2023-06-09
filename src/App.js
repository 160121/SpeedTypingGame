import logo from './logo.svg';
import './App.css';
import {useState,useEffect,useRef} from 'react';
function App() {  
       const timelimit = 5;
       const [text, settext] = useState(' ');
       const [time, settime] = useState(timelimit);
       const [timerunning, settimerunning] = useState(false);
       const [wordcount, setwordcount] = useState(0);
       const inputref = useRef(null);
       function handleclick(e) {
         const { value } = e.target;
         settext(value);
       }
       function startgame() {
         settimerunning(true);
         settime(timelimit);
         settext('');
         setwordcount(0);
         inputref.current.disabled = false;
         inputref.current.focus();
       }
       function calculateword(text) {
         const wordarray = text.trim().split(' ');
         return wordarray.filter((word) => word !== '').length;
       }
       useEffect(() => {
         if (timerunning && time > 0) {
           setTimeout(() => {
             settime((time) => time - 1);
           }, 1000);
         } else {
           settimerunning(false);
           setwordcount(calculateword(text));
         }
       }, [time, timerunning]);
  return(
    <div>
      <h1>How fast can you type???</h1>
      <textarea rows="15" onChange={handleclick} ref={inputref} value={text} disabled={!timerunning}></textarea>
      <h4>remaining time:{time}</h4>
      <button onClick={startgame} disabled={timerunning}>start</button>
      <h1>Number of words:{wordcount}</h1>
    </div>
  )
   
}

export default App;
