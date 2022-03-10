
const randInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const cardValidate = (number) => {
  let total = 0;
  let n = number.split("");
  for (let i = 0; i < number.length; i += 2) {
    let double = parseFloat(number[i]) * 2;
    if (double.toString().length === 2) {
      const x = parseFloat(double.toString()[0]);
      const y = parseFloat(double.toString()[1]);
      
      double = x + y;
    } 
    n[i] = double;
  }
  for (let i = 0; i < n.length; i++) {
    total += parseFloat(n[i]);
  }
  const lastChar = total.toString().substring(total.toString().length - 1);
  if (lastChar === "0") {
    return true;
  } else {
    return false
  }
};

const changeXtoInt = (b) => {
  const bin = b;
  let strs = '';
  for (let i = 0; i < bin.length; i++) {
    if (bin[i] === "x") {
      const ri = randInt(1,9);
      strs += ri.toString();
    } else {
      strs += bin[i];
    };
  };
  return strs;
};

const generate = (fields) => {
  if (fields.bin === "") {
      return([]);
 }
 
 let bin = fields.bin.substring(0, 16);
 if (bin.length !== 16) {
   const count = 16 - bin.length;
   for (let i = 0; i < count; i++) {
     bin += "x";
   }
 }

  const generated = [];
  while(true) {
    let year = '';
    let month = '';
    let cvv = '';
    
    if (fields.month === "rand") {
      let ri = randInt(1, 12).toString();
      if (ri.length === 1) {
        ri = "0"+ri;
      }
      month = ri;
    } else {
      month = fields.month;
    }
    
    if (fields.year === "rand") {
      let ri = randInt(2023, 2030).toString();
      year = ri;
    } else {
      year = fields.year;
    }
    
    if (fields.cvv === "") {
      let ri = randInt(1, 999).toString();
      if (ri.length === 1) {
        ri = "00"+ri;
      }
      if (ri.length === 2) {
        ri = "0"+ri;
      }
      cvv = ri;
    } else {
      cvv = fields.cvv;
    }
    
    const xtoi = changeXtoInt(bin);
    if (cardValidate(xtoi)) {
      generated.push(`${xtoi}|${month}|${year}|${cvv}`);
    }
    
    if (generated.length >= fields.quantity) {
      break;
    }
  }
  
  return(generated);
};

export default generate;