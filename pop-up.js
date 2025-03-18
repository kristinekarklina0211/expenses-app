const POPUP_OPENED_CLASSNAME = "pop-up_open";

const popupNode = document.querySelector(".js-pop-up");
const btnOpenNode = document.querySelector(".js-pop-up__open-btn");
const popupContentNode = document.querySelector(".js-pop-up__content");
const btnCloseNode = document.querySelector(".js-pop-up__close-btn");

const popupInputNode = document.querySelector(".js-pop-up__input");
const setLimitBtnNode = document.querySelector(".js-pop-up__set-btn");

// Открытие и закрытие попапа
btnOpenNode.addEventListener("click", togglePopup);
btnCloseNode.addEventListener("click", togglePopup);

popupNode.addEventListener("click", (event) => {
    const clickOutsideContent = !event.composedPath().includes(popupContentNode);

    if (clickOutsideContent) {
        togglePopup();
    }
});

function togglePopup() {
    popupNode.classList.toggle(POPUP_OPENED_CLASSNAME);
}

// Изменение лимита в попапе
setLimitBtnNode.addEventListener("click", function() {
    // 1. Получаем значение из поля ввода
    const newLimit = getLimitFromUser();

    // 2. Сохраняем новый лимит и выводим его в интерфейс
    updateLimit(newLimit);

    // 3. Обновляем статус
    renderStatus(limit);

    // 4. Закрываем попап
    togglePopup();
});



/* Подфункции */

// 1. Получаем значение из поля ввода
function getLimitFromUser() {
    if (!popupInputNode.value) {
        return null;
    }

    const newLimit = parseInt(popupInputNode.value);

    clearInput();

    return newLimit;
}

// 2. Сохраняем новый лимит и выводим его в интерфейс
function updateLimit(newLimit) {
    limit = newLimit;

    limitNode.innerText = `${limit} ${CURRENCY}`;
}