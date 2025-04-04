// Описаний у документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';

// Напиши скрипт, який після сабміту форми створює проміс.
//  В середині колбека цього промісу через вказану
//  користувачем кількість мілісекунд проміс має
//   виконуватися (при fulfilled) або відхилятися
//   (при rejected), залежно від обраної опції в радіокнопках.
//   Значенням промісу, яке передається як аргумент у методи
//   resolve/reject, має бути значення затримки в мілісекундах.

// Створений проміс треба опрацювати у відповідних для
//  вдалого/невдалого виконання методах.

// Якщо проміс виконується вдало, виводь у консоль наступний рядок,
//  де delay — це значення затримки виклику промісу в мілісекундах.

const form = document.querySelector('.form');
form.addEventListener('submit', promFoo);

function promFoo(event) {
  event.preventDefault();

  const delay = Number(form.elements.delay.value);
  const radio = form.elements.state.value;

  new Promise((resolve, reject) => {
    setTimeout(() => {
      if (radio === 'fulfilled') {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  })
    .then(delay => {
      iziToast.show({
        // title: 'Success',
        message: `✅ Fulfilled promise in ${delay}ms`,
        position: 'topRight',
        backgroundColor: 'green',
        messageColor: 'white',
      });
    })
    .catch(delay => {
      iziToast.show({
        // title: 'Error',
        message: `❌ Rejected promise in ${delay}ms`,
        position: 'topRight',
        backgroundColor: 'red',
        messageColor: 'white',
      });
    });
}
