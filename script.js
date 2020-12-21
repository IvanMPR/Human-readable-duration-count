const input = document.getElementById('inp');
const output = document.querySelector('.output');
const button = document.getElementById('btn');
//infoP opens the modal window
const infoP = document.querySelector('.info');
//modal background, modal body, and modal button below
const modalBg = document.querySelector('.modal-bg');
const modalP = document.querySelector('.modal-p');
const btnCloseModal = document.querySelector('.close');
//Main function call
button.addEventListener('click', formatDuration);
//Close modal by clicking anywhere of the modal area
modalBg.addEventListener('click', function (e) {
  if (
    e.target === modalBg &&
    !modalBg.classList.contains('hidden') &&
    !modalP.classList.contains('hidden')
  ) {
    toggleModal();
  }
});
//Close modal with 'Esc' key
document.addEventListener('keydown', function (e) {
  if (
    e.key === 'Escape' &&
    !modalBg.classList.contains('hidden') &&
    !modalP.classList.contains('hidden')
  ) {
    toggleModal();
  }
});
//Close modal with button
btnCloseModal.addEventListener('click', function () {
  toggleModal();
});
//Show modal by clicking on 'More info' paragraph
infoP.addEventListener('click', function () {
  toggleModal();
});
//Accept 'Enter' as click
input.addEventListener('keydown', function (event) {
  if (event.key === 'Enter') {
    button.click();
    input.blur();
  }
});
//Clear fields on new focus
input.addEventListener('focus', function () {
  input.value = '';
  output.innerText = 'Your output will be displayed here';
  output.style.color = '#ccc';
  output.style.borderColor = '#333';
});
//Open/close modal function
function toggleModal() {
  modalBg.classList.toggle('hidden');
  modalP.classList.toggle('hidden');
}
//Main function
function formatDuration(seconds) {
  seconds = Number(input.value);
  if (!seconds || isNaN(seconds)) {
    alert('Please enter valid numeric value');
  }

  if (!seconds) {
    return 'now';
  }

  const m = 60;
  const h = 3600;
  const d = 86400;
  const y = 31536000;

  let secVal = 0;
  let minVal = 0;
  let houVal = 0;
  let dayVal = 0;
  let yearVal = 0;

  let calcYear = function (seconds) {
    if (seconds < y) {
      yearVal = 0;
      return seconds;
    } else {
      yearVal = Math.trunc(seconds / y);
      remainder = seconds % y;
      return remainder;
    }
  };
  calcYear(seconds);

  let calcDay = function (num) {
    if (num < d) {
      dayVal = 0;
      return num;
    } else {
      dayVal = Math.trunc(num / d);
      remainder = num % d;
      return remainder;
    }
  };
  calcDay(calcYear(seconds));

  let calcHour = function (num) {
    if (num < h) {
      houVal = 0;
      return num;
    } else {
      houVal = Math.trunc(num / h);
      remainder = num % h;
      return remainder;
    }
  };
  calcHour(calcDay(calcYear(seconds)));

  let calcMinute = function (num) {
    if (num < m) {
      minVal = 0;
      return num;
    } else {
      minVal = Math.trunc(num / m);
      remainder = num % m;
      return remainder;
    }
  };
  calcMinute(calcHour(calcDay(calcYear(seconds))));

  let calcSeconds = function (num) {
    secVal = num;
    return secVal;
  };
  calcSeconds(calcMinute(calcHour(calcDay(calcYear(seconds)))));

  let yString = function (year) {
    if (!year) {
      return '';
    } else {
      return year === 1 ? `${yearVal} year` : `${yearVal} years`;
    }
  };
  let dString = function (day) {
    if (!day) {
      return '';
    } else {
      return day === 1 ? `${dayVal} day` : `${dayVal} days`;
    }
  };
  let hString = function (hour) {
    if (!hour) {
      return '';
    } else {
      return hour === 1 ? `${houVal} hour` : `${houVal} hours`;
    }
  };
  let mString = function (minute) {
    if (!minute) {
      return '';
    } else {
      return minute === 1 ? `${minVal} minute` : `${minVal} minutes`;
    }
  };
  let sString = function (second) {
    if (!second) {
      return '';
    } else {
      return second === 1 ? `${secVal} second` : `${secVal} seconds`;
    }
  };

  const arr = [
    yString(yearVal),
    dString(dayVal),
    hString(houVal),
    mString(minVal),
    sString(secVal),
  ];

  const newArr = [];

  for (let i = 0; i < arr.length; i++) {
    if (!arr[i]) continue;
    newArr.push(arr[i]);
  }

  let finalString = function () {
    if (newArr.length === 1) {
      return newArr[0];
    } else if (newArr.length === 2) {
      return `${newArr[0]} and ${newArr[1]}`;
    } else if (newArr.length === 3) {
      return `${newArr[0]}, ${newArr[1]} and ${newArr[2]}`;
    } else if (newArr.length === 4) {
      return `${newArr[0]}, ${newArr[1]}, ${newArr[2]} and ${newArr[3]}`;
    } else {
      return `${newArr[0]}, ${newArr[1]}, ${newArr[2]}, ${newArr[3]} and ${newArr[4]}`;
    }
  };
  output.style.color = '#333';
  output.style.borderColor = 'lightseagreen';
  return (output.innerText = finalString());
}
