// Input
const form = document.querySelector('#form');
const input = document.querySelector('#input');
const error = document.querySelector('#error');

// Results
const results = document.querySelector('#results');
const qty = document.querySelector('#qty');
const success = document.querySelector('#success');
const prob = document.querySelector('#prob');

// Log
const list = document.querySelector('#list');



// On submit form
form.addEventListener('submit', (e) => {
   e.preventDefault();
   
   const inputValue = input.value;

   if (inputValue == '') {
      error.innerText = 'Debe ingresar una cantidad';
      error.classList.add('show');
      return;
   } else if (Number(inputValue) < 1) {
      error.innerText = 'La cantidad ingresada debe ser mayor a 0';
      error.classList.add('show');
      return;
   } else {
      error.classList.remove('show');
   }

   const execQty = Number(inputValue);

   let data = [];

   list.innerHTML = '';

   for (let i = 0; i < execQty; i++) {
      const { pos, result } = algorithm();

      data.push({pos, result});

      const row = generateLogRow({number: i + 1, posX: pos.x, posY: pos.y, result: result});

      list.appendChild(row);
   }

   const successQty = data.filter(el => el.result).length;

   qty.innerText = execQty;
   success.innerText = successQty;
   prob.innerText = `${(successQty / execQty) * 100}%`;

   results.classList.add('show');
});

// On change input
input.addEventListener('keydown', (e) => {
   if (!/^[0-9]*$/.test(e.key) && e.key !== 'Backspace') {
      e.preventDefault();
   }
});



// Functions

const algorithm = () => {
   const pos = {
      x: 0,
      y: 0
   }

   for (let i = 0; i < 10; i++) {
      const rand = Math.ceil(Math.random() * 4);

      switch (rand) {
         case 1:
            pos.x++;
            break;
         
         case 2:
            pos.x--;
            break;
         
         case 3:
            pos.y++;
            break;
         
         case 4:
            pos.y--;
            break;
         
         default:
            break;
      }
   }

   const result = Math.abs(pos.x) + Math.abs(pos.y) === 2 ? true : false;

   return { pos, result }
}

const generateLogRow = ({number, posX, posY, result}) => {

   const div = document.createElement('div');
   div.classList.add('record');

   const numberP = document.createElement('p');
   numberP.innerText = number;

   const posP = document.createElement('p');
   posP.innerText = `(${posX}, ${posY})`;

   const resultP = document.createElement('p');
   resultP.innerText = result ? 'Sí' : 'No';
   resultP.classList.add(result ? 'true' : 'false');

   div.appendChild(numberP);
   div.appendChild(posP);
   div.appendChild(resultP);

   return div;
}