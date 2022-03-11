import { BsFillCreditCard2FrontFill, BsFillEmojiHeartEyesFill, BsFillEmojiDizzyFill,
  BsFillEmojiSunglassesFill } from 'react-icons/bs'
import Generator from './Generator';
import React, { useState, useRef, useEffect } from 'react';
import gen from './gen';
import Header from './Header';
  
function App() {
  const socket = useRef(null);
  const [genIsClose, setGenIsClose] = useState(true);
  const [theme, setTheme] = useState('light');
  const [delay, setDelay] = useState(100);
  const [cardCount, setCardCount] = useState(0);
  const [filter, setFilter] = useState('CVV');
  const [checked, setChecked] = useState([]);
  const [genFields, setGenFields] = useState({
    bin: '',
    month: 'rand',
    year: 'rand',
    cvv: '',
    quantity: 10
  });
  
  //refs
  const cardField = useRef(null);
  const skField = useRef(null);
  const skSaved = useRef(localStorage.getItem('sk'));
  const themeSaved = useRef(localStorage.getItem('theme'));
  const hostname = useRef(window.location.hostname);
  
  useEffect(() => {
    socket.current = new WebSocket(`ws://${hostname.current}:8080`);
    
    socket.current.onopen = () => {
      console.log("WebSocket is connected.");
    };
    if (themeSaved.current !== "") {
      setTheme(themeSaved.current || "");
    }
  }, []);
  
  useEffect(() => {
    socket.current.onmessage = (data) => {
      const res = JSON.parse(data.data);
      setChecked(checked => [...checked, res]);
      const cardArr = cardField.current.value.replace(" ","").split("\n");
      const index = cardArr.indexOf(res.card);
      if (index !== -1) {
        cardArr.splice(index , 1);
      }
      cardField.current.value = cardArr.join("\n");
      updateCount();
    }
  }, []);
  
  useEffect(() => {
    skField.current.value = skSaved.current;
  }, [skField]);
  
  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);
  
  const sendToChecker = () => {
    localStorage.setItem('sk', skField.current.value);
    const cards = cardField.current.value.replace(" ", "").split("\n");
    cards.forEach((card, index) => {
      setTimeout(() => {
        const data = {card, sk: skField.current.value};
        socket.current.send(JSON.stringify(data));
      }, delay * index);
    });
  };
  
  const clearFromChecked = () => {
    const cpArr = [...checked];
    const filtArr = cpArr.filter(item => item.type !== filter);
    setChecked(filtArr);
  };
  
  const updateCount = () => {
    const toArr = cardField.current.value.replace(" ","").split("\n");
    const filtArr = toArr.filter(item => item.length > 1);
    setCardCount(filtArr.length);
  };
  
  return <div className={theme}>
  <div className="bg-gray-100 dark:bg-slate-900 min-h-screen">
    <Generator isClose={genIsClose} setIsClose={setGenIsClose} fields={genFields} setFields={setGenFields} gen={gen} cardField={cardField} updateCount={updateCount} />
    <Header theme={theme} setTheme={setTheme}/>
    <div className="grid sm:grid-rows-2 sm:grid-flow-col gap-6 p-6">
    
      {/*Cards*/}
      <div className="sm:row-span-3 p-2 bg-white max-h-[370px] rounded-md shadow-sm dark:bg-slate-800">
        <div className="p-2 mt-4 sm:mt-6">
          <div className="flex space-x-1 text-gray-800">
            <BsFillCreditCard2FrontFill className="text-xl dark:text-gray-300"/>
            <div className="text-sm font-medium dark:text-gray-300">Generated cards: {cardCount}</div>
          </div>
          <textarea className="w-full h-32 rounded-md p-2 bg-gray-100 text-sm px-4 placeholder-gray-600 outline-none dark:bg-slate-900 dark:text-gray-200 dark:placeholder-gray-400" placeholder="xxxxxx|xx|xxxx|xxx" ref={cardField} onChange={updateCount}/>
        </div>
        <div className="flex items-center px-2">
          <input className="h-[35px] rounded-md p-2 bg-gray-100 text-sm placeholder-gray-600 px-4 outline-none scrollbar-hide w-[80%] dark:bg-slate-900 dark:text-gray-200 dark:placeholder-gray-400" placeholder="sk_live_xxxxxxxxxxx" ref={skField}/>
          <select className="rounded-md outline-none ml-1 max-h-[35px] p-2 text-sm bg-gray-100 w-[20%] dark:text-gray-200 dark:bg-slate-900" onChange={(e) => setDelay(e.target.value)}
          value={delay}>
            <option value="10">0s</option>
            <option value="100">.1s</option>
            <option value="200">.2s</option>
            <option value="300">.3s</option>
            <option value="400">.4s</option>
            <option value="500">.5s</option>
            <option value="1000">1s</option>
            <option value="2000">2s</option>
            <option value="3000">3s</option>
            <option value="4000">4s</option>
            <option value="5000">5s</option>
          </select>
        </div>
        <div className="flex items-center p-2">
          <select className="rounded-md outline-none max-h-[35px] p-2 text-sm bg-gray-100 w-[80%] dark:text-gray-200 dark:bg-slate-900">
            <option value="1">Stripe Auth [Need SK]</option>
            <option value="2">Stripe Charge [Need SK]</option>
          </select>
          <select className="rounded-md outline-none ml-1 max-h-[35px] p-2 text-sm bg-gray-100 w-[20%] dark:text-gray-200 dark:bg-slate-900" onChange={(e) => setDelay(e.target.value)}
          value={delay}>
            <option value="ws">WS</option>
            <option value="http">HTTP</option>
          </select>
        </div>
        <div className="flex p-2 space-x-1 mb-6">
          <button className="w-[50%] p-1.5 border-2 border-blue-100 rounded-md text-blue-600 dark:border-gray-400 dark:text-blue-500" onClick={() => setGenIsClose(false)}>Generate</button>
          <button className="w-[50%] p-1.5 border-2 border-blue-100 rounded-md text-blue-600 dark:border-gray-400 dark:text-blue-500" onClick={sendToChecker}>Check</button>
        </div>
      </div>
      
      {/*Table*/}
      <div className="sm:row-span-2 sm:col-span-2 grid bg-white rounded-md p-2 space-x-1 max-h-[370px] gap-4 dark:bg-slate-800">
      
        {/*Status*/}
        <div className="grid grid-cols-3 max-h-[90px] sm:max-h-[60px] ">
          <div className="flex justify-center p-4 space-x-1 text-green-500">
            <BsFillEmojiSunglassesFill className="text-lg"/>
            <div className="text-sm font-bold">CVV: {checked.filter(i => i.type === "CVV").length}</div>
          </div>
          <div className="flex justify-center p-4 space-x-1 text-yellow-500">
            <BsFillEmojiHeartEyesFill className="text-lg"/>
            <div className="text-sm font-bold">CCN: {checked.filter(i => i.type === "CCN").length}</div>
          </div>
          <div className="flex justify-center p-4 space-x-1 text-red-500">
            <BsFillEmojiDizzyFill className="text-lg"/>
            <div className="text-sm font-bold">DEAD: {checked.filter(i => i.type === "DEAD").length}</div>
          </div>
        </div>
      
        <h3 className="p-2 text-sm text-gray-600 dark:text-gray-300">> Checked cards</h3>
        <div className="flex space-x-1 px-2">
          <button className="w-full border-2 border-green-200 h-8.5 max-w-[70px] rounded-md text-sm font-bold text-green-400 hover:bg-green-500 hover:text-white max-h-8" onClick={() => setFilter('CVV')}>Cvv</button>
          <button className="w-full border-2 border-yellow-200 h-8.5 max-w-[70px] rounded-md text-sm font-bold text-yellow-400 hover:bg-yellow-500 hover:text-white max-h-8" onClick={() => setFilter('CCN')}>Ccn</button>
          <button className="w-full border-2 border-red-200 h-8.5 max-w-[70px] rounded-md text-sm font-bold text-red-400 hover:bg-red-500 hover:text-white max-h-8" onClick={() => setFilter('DEAD')}>Dead</button>
          <div className="flex grow flex-row-reverse">
            <button className="w-full border-2 border-gray-200 h-8.5 max-w-[70px] rounded-md text-sm font-bold text-gray-400 hover:bg-gray-500 hover:text-white max-h-8" onClick={clearFromChecked}>Clear</button>
          </div>
        </div>
          <div className="p-2 overflow-scroll mb-2">
          <table className={checked.filter(i => i.type === filter).length === 0 ? "hidden" : "border-b border-gray-200"}>
            <thead>
              <tr>
                <th className="text-sm px-2 text-gray-600 text-left border-t dark:border-gray-400 dark:text-gray-200">Status</th>
                <th className="text-sm px-2 text-gray-600 text-left border-t dark:border-gray-400 dark:text-gray-200">Card Number</th>
                <th className="text-sm px-2 text-gray-600 text-left border-t dark:border-gray-400 dark:text-gray-200">Code</th>
                <th className="text-sm px-2 text-gray-600 text-left border-t dark:border-gray-400 dark:text-gray-200">Message</th>
              </tr>
            </thead>
            <tbody>
              {checked && checked.filter(item => item.type === filter).map((item, index) => {
                return <tr key={index} className="py-2">
                  <td className="px-2 text-[12px] border dark:border-gray-400 dark:text-gray-100">{item.type}</td>
                  <td className="px-2 text-[12px] border dark:border-gray-400 dark:text-gray-100">{item.card}</td>
                  <td className="px-2 text-[12px] border dark:border-gray-400 dark:text-gray-100">{item.code}</td>
                  <td className="whitespace-nowrap px-2 text-[12px] border dark:border-gray-400 dark:text-gray-100">{item.message}</td>
                </tr>
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
  </div>
}

export default App;
