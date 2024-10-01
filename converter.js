const MAX_INPUT_LENGTH = 2000;
const MAX_HISTORY_LENGTH = 5;

function convert() {
    const dictionary = new Map([
        ['А', '丹'],
        ['Б', '石'],
        ['В', '丑'],
        ['Г', '厂'],
        ['Д', '亼'],
        ['Е', '仨'],
        ['Ё', '仨'],
        ['Ж', '水'],
        ['З', '弓'],
        ['И', '仈'],
        ['Й', '以'],
        ['К', '长'],
        ['Л', '几'],
        ['М', '爪'],
        ['Н', '卄'],
        ['О', '口'],
        ['П', '冂'],
        ['Р', '尸'],
        ['С', '匚'],
        ['Т', '丅'],
        ['У', '丫'],
        ['Ф', '中'],
        ['Х', '乂'],
        ['Ц', '凵'],
        ['Ч', '丩'],
        ['Ш', '山'],
        ['Щ', '山'],
        ['Ь', '乚'],
        ['Ы', '矵'],
        ['Ъ', 'ろ'],
        ['Э', '彐'],
        ['Ю', '扣'],
        ['Я', '牙'],
        ['.', '。'],
    ]);

    const inputValue = document.querySelector('.converter-input').value;
    const clearValue = inputValue.trim().toUpperCase();

    if (clearValue === '') return;

    if (inputValue.length > MAX_INPUT_LENGTH) {
        showNotification(`Текст должен содержать не более ${MAX_INPUT_LENGTH} символов!`);
        return;
    }

    let resultValue = '';
    for (const letter of clearValue) {
        if (dictionary.has(letter)) {
            resultValue += dictionary.get(letter);
        }
        else {
            resultValue += letter;
        }
    }

    const resultFieldElement = document.querySelector('.result-field');
    resultFieldElement.textContent = resultValue;
    
    addToHistory(inputValue);
    showCopyButton();
}

function clear() {
    const inputFieldElement = document.querySelector('.converter-input');
    const resultFieldElement = document.querySelector('.result-field');
    inputFieldElement.value = '';
    resultFieldElement.textContent = '';

    hideCopyButton();
    showSymbolsAmount();
}

function copy() {
    const resultFieldElement = document.querySelector('.result-field');
    const valueToCopy = resultFieldElement.textContent;

    navigator.clipboard.writeText(valueToCopy)
    .then(function() {
        showNotification('Успешно скопировано');
    })
    .catch(function(err) {
        showNotification('Ошибка копирования');
        console.error(err);
    });
}

function showCopyButton() {
    const copyButtonElement = document.querySelector('.copy-button');
    copyButtonElement.classList.add('shown');
}

function hideCopyButton() {
    const copyButtonElement = document.querySelector('.copy-button');
    copyButtonElement.classList.remove('shown');
}

function showNotification(message) {
    const notificationElement = document.querySelector('.notification');
    const notificationTextElement = document.querySelector('.notification-text');
    notificationTextElement.textContent = message;
    notificationElement.classList.add('shown');

    setTimeout(() => notificationElement.classList.remove('shown'), 2000);
}

function addToHistory(data) {
    let history = JSON.parse(localStorage.getItem('history'));

    if (history.includes(data)) return;

    if (history.length === MAX_HISTORY_LENGTH) history.shift();

    history.push(data);
    localStorage.setItem('history', JSON.stringify(history));

    updateHistory();
}

function loadHistory() {
    const history = JSON.parse(localStorage.getItem('history'));
    const historyListElement = document.querySelector('.history-list');
    historyListElement.innerHTML = '';

    for (const item of history.reverse()) {
        let historyItemElement = document.createElement('div');
        historyItemElement.classList.add('history-item');
        historyItemElement.textContent = item;
        historyItemElement.onclick = () => insertFromHistory(item);
        historyListElement.append(historyItemElement);
    }
}

function updateHistory() {
    const historyElement = document.querySelector('.history');

    if (!historyElement.classList.contains('shown')) return;

    loadHistory();
}

function switchHistoryPanel() {
    const mainElement = document.querySelector('.main');
    const historyElement = document.querySelector('.history');

    if (historyElement.classList.contains('shown')) {
        mainElement.classList.remove('shifted');
        historyElement.classList.remove('shown');
    }
    else {
        loadHistory();
        mainElement.classList.add('shifted');
        historyElement.classList.add('shown');
    }
}

function closeHistoryMobile() {
    if (document.documentElement.offsetWidth <= 767)
        switchHistoryPanel();
}

function insertFromHistory(data) {
    const inputFieldElement = document.querySelector('.converter-input');
    inputFieldElement.value = data;

    closeHistoryMobile();
    showSymbolsAmount();
    convert();
}

function showSymbolsAmount() {
    const symbolsAmountElement = document.querySelector('.symbols-amount');
    const inputValueLength = document.querySelector('.converter-input').value.length;

    symbolsAmountElement.textContent = `${inputValueLength} / ${MAX_INPUT_LENGTH}`
}

function init() {
    const inputFieldElement = document.querySelector('.converter-input');
    inputFieldElement.oninput = () => {
        if (inputFieldElement.value === '') clear();

        showSymbolsAmount();
    };

    const convertButtonElement = document.querySelector('.convert-button');
    convertButtonElement.onclick = convert;

    const clearButtonElement = document.querySelector('.clear-button');
    clearButtonElement.onclick = clear;

    const copyButtonElement = document.querySelector('.copy-button');
    copyButtonElement.onclick = copy;

    const historyButtonElement = document.querySelector('.history-button');
    const closeHistoryButtonElement = document.querySelector('.close-history-button');
    historyButtonElement.onclick = closeHistoryButtonElement.onclick = switchHistoryPanel;
    
    if (!localStorage.getItem('history')) {
        localStorage.setItem('history', JSON.stringify([]));
    }

    showSymbolsAmount();
}

init();