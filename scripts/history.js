const MAX_HISTORY_LENGTH = 5;
const MOBILE_SCREEN_WIDTH = 767;

function addToHistory(data) {
    let history = JSON.parse(localStorage.getItem('history'));

    if (history.includes(data)) return;

    if (history.length === MAX_HISTORY_LENGTH) history.pop();

    history.unshift(data);
    localStorage.setItem('history', JSON.stringify(history));

    updateHistory();
}

function loadHistory() {
    const history = JSON.parse(localStorage.getItem('history'));
    const historyListElement = document.querySelector('.history-list');
    historyListElement.innerHTML = '';

    for (let i = 0; i < history.length; i++) {
        let historyItemElement = document.createElement('div');
        historyItemElement.classList.add('history-item');
        historyItemElement.setAttribute('data-history-index', i);

        let historyItemTextElement = document.createElement('p');
        historyItemTextElement.textContent = history[i];

        historyItemElement.append(historyItemTextElement);
        
        historyListElement.append(historyItemElement);
    }
}

function updateHistory() {
    const historyElement = document.querySelector('.history');

    if (!historyElement.classList.contains('shown')) return;

    loadHistory();
}

function doOnMobile(callback) {
    if (document.documentElement.offsetWidth <= MOBILE_SCREEN_WIDTH)
        callback();
}

function toggleBodyScroll() {
    document.body.classList.toggle('scroll-blocked');
}

function toggleHistoryPanel() {
    const mainElement = document.querySelector('.main');
    const historyElement = document.querySelector('.history');

    mainElement.classList.toggle('shifted');
    historyElement.classList.toggle('shown');

    if (historyElement.classList.contains('shown')) {
        loadHistory();
    }

    doOnMobile(toggleBodyScroll);
}

function insertFromHistory(index) {
    const historyItem = JSON.parse(localStorage.getItem('history'))[index];

    const inputFieldElement = document.querySelector('.converter-input');
    inputFieldElement.value = historyItem;

    doOnMobile(toggleHistoryPanel);

    const insertEvent = new CustomEvent('insert');
    document.dispatchEvent(insertEvent);
}

function delegateInsertion(event) {
    const targetElement = event.target.closest('.history-item');

    if (!targetElement) return;

    const historyIndex = +targetElement.dataset.historyIndex;
    insertFromHistory(historyIndex);
}

export function init() {
    const historyButtonElement = document.querySelector('.history-button');
    const closeHistoryButtonElement = document.querySelector('.close-history-button');
    historyButtonElement.onclick = closeHistoryButtonElement.onclick = toggleHistoryPanel;

    const historyListElement = document.querySelector('.history-list');
    historyListElement.onclick = delegateInsertion;

    document.addEventListener('convert', event => {
        addToHistory(event.detail.textToHistory);
    });
    
    if (!localStorage.getItem('history')) {
        localStorage.setItem('history', JSON.stringify([]));
    }
}