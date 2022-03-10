

const Component = ({isClose, setIsClose, fields, setFields, gen, cardField}) => {
  const updateFields = (e) => {
    const cpObj = {...fields};
    cpObj[e.target.name] = e.target.value;
    setFields(cpObj);
  };
  
  const updateGenerated = () => {
    const genArr = gen(fields);
    cardField.current.value = genArr.join("\n");
  };
  
  return <>
    <div className={isClose ? "hidden":"absolute flex justify-center items-center h-[90vh] w-screen shadow-2xl"}>
      <div className="p-2 max-w-[400px] w-80 bg-white rounded-md shadow-2xl dark:bg-slate-700">
        <div className="flex items-center p-2 space-x-1">
          <div className="text-md font-medium dark:text-gray-200">BIN: </div>
          <input className="p-2 w-[95%] outline-none bg-gray-100 rounded-md text-sm dark:bg-slate-800 dark:text-gray-200 dark:placeholder-gray-500" type="text" name="bin" placeholder="454948" onChange={(e) => updateFields(e)} value={fields.bin || ""}/>
        </div>
        <div className="flex items-center space-x-1 p-2 dark:text-gray-300">
          <div className="w-[50%] border-2 border-gray-100 rounded-md relative dark:border-slate-800">
            <div className="bg-white absolute text-sm -top-[12px] left-2 px-2 dark:bg-slate-700">Month:</div>
            <select className="w-full bg-gray-100 p-1 mt-[12px] rounded-md outline-none dark:bg-slate-800" name="month" onChange={(e) => updateFields(e)}  value={fields.month}>
              <option value="rand">Random</option>
              <option value="01">01-Jan</option>
              <option value="02">02-Feb</option>
              <option value="03">03-Mar</option>
              <option value="04">04-Apr</option>
              <option value="05">05-May</option>
              <option value="06">06-Jun</option>
              <option value="07">07-Jul</option>
              <option value="08">08-Aug</option>
              <option value="09">09-Sep</option>
              <option value="10">10-Oct</option>
              <option value="11">11-Nov</option>
              <option value="12">12-Dec</option>
            </select>
          </div>
          <div className="w-[50%] border-2 border-gray-100 rounded-md relative dark:border-slate-800">
            <div className="bg-white absolute text-sm -top-[12px] left-2 px-2 dark:bg-slate-700">Year:</div>
            <select className="w-full bg-gray-100 p-1 mt-[12px] rounded-md outline-none dark:bg-slate-800" name="year" onChange={(e) => updateFields(e)}  value={fields.year}>
              <option value="rand">Random</option>
              <option value="2022">2022</option>
              <option value="2023">2023</option>
              <option value="2024">2024</option>
              <option value="2025">2025</option>
              <option value="2026">2026</option>
              <option value="2027">2027</option>
              <option value="2028">2028</option>
              <option value="2029">2029</option>
              <option value="2030">2030</option>
            </select>
          </div>
        </div>
        <div className="p-2 flex space-x-1 dark:text-gray-300">
          <div className="w-[50%] border-2 border-gray-100 rounded-md relative dark:border-slate-900">
            <div className="bg-white absolute text-sm -top-[12px] left-2 px-2  dark:bg-slate-700">Cvv:</div>
              <input className="w-full bg-gray-100 p-1 px-2 mt-[12px] rounded-md outline-none text-sm dark:bg-slate-800" placeholder="Leave it blank to randomise" name="cvv" onChange={(e) => updateFields(e)}  value={fields.cvv}/>
          </div>
          <div className="w-[50%] border-2 border-gray-100 rounded-md relative dark:border-slate-800">
            <div className="bg-white absolute text-sm -top-[12px] left-2 px-2 dark:bg-slate-700">Quantity:</div>
              <input className="w-full bg-gray-100 p-1 px-2 mt-[12px] rounded-md outline-none text-sm dark:bg-slate-800" placeholder="10" name="quantity" onChange={(e) => updateFields(e)}  value={fields.quantity}/>
          </div>
        </div>
        <div className="p-2 flex justify-center space-x-1">
          <button className="p-1 w-full border-2 border-blue-200 rounded-md text-blue-600" onClick={updateGenerated}>Generate</button>
          <button className="p-1 w-full border-2 border-yellow-200 rounded-md text-yellow-600" onClick={() => setIsClose(true)}>Close</button>
        </div>
      </div>
    </div>
  </>
};

export default Component;