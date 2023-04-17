import {useState,useEffect,useRef} from "";
function usegame(){
       
       const [text, settext] = useState(' ');
       const [time, settime] = useState(timelimit);
       const [timerunning, settimerunning] = useState(false);
       const [wordcount, setwordcount] = useState(0);
       const inputref = useRef(null);
       const timelimit = 5;
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
       }, [time, timerunning])
       return{handleclick,startgame,calculateword,timerunning,time,wordcount,text,inputref}
}
export default usegame