let limit = 2000;

const CURRENCY = "EUR";
const INITIAL_SUM = 0;
const STATUS_WITHIN_LIMIT = "всё хорошо";
const STATUS_OUT_OF_LIMIT = "всё плохо";
const STATUS_OUT_OF_LIMIT_CLASSNAME = "status_red";

const inputNode = document.querySelector(".js-input");
const categoryNode = document.querySelector(".js-category");
const addBtnNode = document.querySelector(".js-add-btn");
const historyNode = document.querySelector(".js-history__list");
const limitNode = document.querySelector(".js-limit");
const sumNode = document.querySelector(".js-sum");
const statusNode = document.querySelector(".js-status");
const resetBtnNode = document.querySelector(".js-reset-btn");

const expenses = [];

init(expenses);

addBtnNode.addEventListener("click", function() {
    // 1. Получаем значение из поля ввода
    const expense = getExpenseFromUser();

    if (!expense) {
        return;
    }

    // 2. Получаем категорию трат
    const category = getCategoryFromUser();

    // 3. Сохраняем объект с тратой и категорией в список
    trackExpense(expense, category);

    // 4. Выводим данные в интерфейс
    render(expenses);
});

resetBtnNode.addEventListener("click", function() {
    reset(expenses);
});



/* Подфункции */

// Задаём первичные значения
function init(expenses) {
    limitNode.innerText = `${limit} ${CURRENCY}`;
    sumNode.innerText = `${calculateExpenses(expenses)} ${CURRENCY}`;
    statusNode.innerText = STATUS_WITHIN_LIMIT;
}

// Считаем сумму
function calculateExpenses(expenses) {
    let sum = 0;

    expenses.forEach(element => {
        sum += element.expense;
    });

    return sum;
}

// 1. Получаем значение из поля ввода
function getExpenseFromUser() {
    if (!inputNode.value) {
        return null;
    }

    const expense = parseInt(inputNode.value);

    clearInput();

    return expense;
}

// 1.1 Очищаем поле ввода
function clearInput() {
    inputNode.value = "";
    popupInputNode.value = "";
}

// 2. Получаем категорию трат
function getCategoryFromUser() {
    const category = categoryNode.selectedOptions[0].textContent.toLowerCase();

    return category;
}

// 3. Сохраняем объект с тратой и категорией в список
function trackExpense(expense, category) {
    expenses.push({
        expense,
        category
    });
}

// 4. Выводим данные в интерфейс
function render(expenses) {
    const sum = calculateExpenses(expenses);

    renderHistory(expenses);
    renderSum(sum);
    renderStatus(sum);
}

// 4.1 Выводим список трат
function renderHistory(expenses) {
    let expensesListHTML = "";

    expenses.forEach(element => {
        expensesListHTML += `<li>${element.expense} ${CURRENCY} – ${element.category}</li>`;
    });

    historyNode.innerHTML = `<ol>${expensesListHTML}</ol>`;
}

// 4.2 Выводим сумму
function renderSum(sum) {
    sumNode.innerText = `${sum} ${CURRENCY}`;
}

// 4.3 Выводим статус после сравнения с лимитом
function renderStatus(sum) {
    if (sum <= limit) {
        statusNode.innerText = STATUS_WITHIN_LIMIT;
        statusNode.classList.remove(STATUS_OUT_OF_LIMIT_CLASSNAME);
    } else {
        statusNode.innerText = `${STATUS_OUT_OF_LIMIT} (${getDeficit()} ${CURRENCY})`;
        statusNode.classList.add(STATUS_OUT_OF_LIMIT_CLASSNAME);
    }
}

// Считаем дефицит

function getDeficit() {
    const sum = calculateExpenses(expenses);
    const deficit = limit - sum;

    return deficit;
}



// Сбрасываем историю, сумму и статус
function reset() {
    // 1. Очищаем массив
    resetExpenses();

    // 2. Сбрасываем историю
    resetHistory();

    // 3. Сбрасываем сумму до 0
    resetSum();

    // 4. Сбрасываем статус до "всё хорошо"
    resetStatus();

    // 5. Переключаем категорию на самую первую ("Жильё")
    resetCategory();
}

function resetExpenses() {
    expenses.length = 0;
}

function resetHistory() {
    historyNode.innerHTML = "";
}

function resetSum() {
    const sum = INITIAL_SUM;
    sumNode.innerText = `${sum} ${CURRENCY}`;
}

function resetStatus() {
    statusNode.innerText = STATUS_WITHIN_LIMIT;
    statusNode.classList.remove(STATUS_OUT_OF_LIMIT_CLASSNAME);
}

function resetCategory() {
    categoryNode.selectedIndex = 0;
}