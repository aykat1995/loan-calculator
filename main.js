let amountInput = document.getElementById('amount'),
    periodInput = document.getElementById('period'),
    dateInput = document.getElementById('calendar'),
    depositDateInput = document.getElementById('date'),
    typeOfPayment = document.querySelectorAll('input[name="payment"]'),
    monthlyPayment = document.querySelector('.monthly-payment__value');
    repay = document.querySelector('.repay__value');
    borrowing = document.querySelector('.borrowing__value');
    
    amount = 10500,   // сумма кредита
    period = 7,       // период в годах
    rate = 4.95,      // процентная ставка в в год
    isCash = false;

// Прослушка изменения суммы кредита
amountInput.addEventListener('change', () => {
  amount = amountInput.value;
  borrowing.innerHTML = '£' + amount;
  document.getElementById('borrow').innerHTML = '£' + amount;
  toCalculate(amount, rate, period);
})

// Прослушка изменения срока кредита
periodInput.addEventListener('change', () => {
  period = periodInput.value * 12;
  document.getElementById('period-span').innerHTML = periodInput.value + ' Years';
  toCalculate(amount, rate, period);
})

// Прослушка изменения даты платежа
dateInput.addEventListener('change', () => {
  let date = dateInput.valueAsDate;
  let currentDate = new Date();

  currentDate.setMonth(currentDate.getMonth() + 3);
  
  if (date > currentDate) rate = 6.8;
  document.getElementById('rate').innerHTML = rate + '%';
  toCalculate(amount, rate, period);
})

// Прослушка изменения способа платежа
for (const el of typeOfPayment) {
  el.addEventListener('change', () => {
  toCalculate(amount, rate, period);
  })
}

// Функция расчета ежемесячного платежа
function toCalculate(S, r, n) {

  //проверяем способ платежа:
  for (const el of typeOfPayment) {
    if (el.checked) {
      console.log(el.value);
      if (el.value === 'true') r = r - 0.5;
    }
  }

  let r_0 = r / (100 * 12),
      n_0 = n * 12

  let result = S * ((r_0 * Math.pow(1 + r_0, n_0)) / (Math.pow(1 + r_0, n_0) - 1));
  let resultInnerHtml = commaValue(result.toFixed(2));
  monthlyPayment.innerHTML = '£' + resultInnerHtml;
  repay.innerHTML = '£' + (result * n_0).toFixed(2);
}

function commaValue(value) {
  let parts = value.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return parts.join(".");
}