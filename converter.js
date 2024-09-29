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
        showNotification('Текст должен содержать не более 1000 символов!');
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

    const resultField = document.querySelector('.result-field');
    resultField.textContent = resultValue;
    
    addToHistory(inputValue);
    showCopyButton();
}

function clear() {
    const inputField = document.querySelector('.converter-input');
    const resultField = document.querySelector('.result-field');
    inputField.value = '';
    resultField.textContent = '';

    hideCopyButton();
    showSymbolsAmount();
}

function copy() {
    const resultField = document.querySelector('.result-field');
    const valueToCopy = resultField.textContent;

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
    const copyButton = document.querySelector('.copy-button');
    copyButton.classList.add('shown');
}

function hideCopyButton() {
    const copyButton = document.querySelector('.copy-button');
    copyButton.classList.remove('shown');
}

function showNotification(message) {
    const notification = document.querySelector('.notification');
    const notificationText = document.querySelector('.notification-text');
    notificationText.textContent = message;
    notification.classList.add('shown');

    setTimeout(() => notification.classList.remove('shown'), 2000);
}

function addToHistory(data) {
    let history = JSON.parse(localStorage.getItem('history'));

    if (history.includes(data)) return;

    if (history.length === MAX_HISTORY_LENGTH) history.shift();

    history.push(data);
    localStorage.setItem('history', JSON.stringify(history));
}

function loadHistory() {
    const history = JSON.parse(localStorage.getItem('history'));
    const historyList = document.querySelector('.history-list');
    historyList.innerHTML = '';

    for (const item of history.reverse()) {
        let historyItem = document.createElement('div');
        historyItem.classList.add('history-item');
        historyItem.textContent = item;
        historyItem.onclick = () => insertFromHistory(item);
        historyList.append(historyItem);
    }
}

function switchHistoryPanel() {
    const mainPanel = document.querySelector('.main');
    const historyPanel = document.querySelector('.history');

    if (historyPanel.classList.contains('shown')) {
        mainPanel.classList.remove('shifted');
        historyPanel.classList.remove('shown');
    }
    else {
        loadHistory();
        mainPanel.classList.add('shifted');
        historyPanel.classList.add('shown');
    }
}

function insertFromHistory(data) {
    const inputField = document.querySelector('.converter-input');
    inputField.value = data;

    showSymbolsAmount();
    convert();
}

function showSymbolsAmount() {
    const amountField = document.querySelector('.symbols-amount');
    const inputValueLength = document.querySelector('.converter-input').value.length;

    amountField.textContent = `${inputValueLength} / ${MAX_INPUT_LENGTH}`
}

function init() {
    const inputField = document.querySelector('.converter-input');
    inputField.oninput = () => {
        if (inputField.value === '') clear();

        showSymbolsAmount();
    };

    const convertButton = document.querySelector('.convert-button');
    convertButton.onclick = convert;

    const clearButton = document.querySelector('.clear-button');
    clearButton.onclick = clear;

    const copyButton = document.querySelector('.copy-button');
    copyButton.onclick = copy;

    const historyButton = document.querySelector('.history-button');
    const closeHistoryButton = document.querySelector('.close-history-button');
    historyButton.onclick = closeHistoryButton.onclick = switchHistoryPanel;

    if (!localStorage.getItem('history')) {
        localStorage.setItem('history', JSON.stringify([]));
    }

    showSymbolsAmount();
}

init();