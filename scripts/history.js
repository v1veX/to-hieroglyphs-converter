const MAX_HISTORY_LENGTH = 5;

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
    const insertEvent = new CustomEvent('insert');
    document.dispatchEvent(insertEvent);
}

export function init() {
    const historyButtonElement = document.querySelector('.history-button');
    const closeHistoryButtonElement = document.querySelector('.close-history-button');
    historyButtonElement.onclick = closeHistoryButtonElement.onclick = switchHistoryPanel;

    document.addEventListener('convert', event => {
        addToHistory(event.detail.textToHistory);
    });
    
    if (!localStorage.getItem('history')) {
        localStorage.setItem('history', JSON.stringify([]));
    }
}