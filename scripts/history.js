const MAX_HISTORY_LENGTH = 5;
const MOBILE_SCREEN_WIDTH = 767;

export class History {
    _selectors = {
        mainTabElement: '[data-js-main]',
        historyTabElement: '[data-js-history]',
        historyListElement: '[data-js-history-list]',
        historyItemElement: '[data-js-history-item]',
        historyButtonElement: '[data-js-history-button]',
        closeHistoryButtonElement: '[data-js-close-history-button]',
        converterInputElement: '[data-js-converter-input]',
    };

    _history = null;

    constructor() {
        this._bindEvents();
        
        if (!localStorage.getItem('history')) {
            localStorage.setItem('history', JSON.stringify([]));
        }

        this._history = JSON.parse(localStorage.getItem('history'));
    }

    _addToHistory(data) {
        if (this._history.includes(data)) return;

        if (this._history.length === MAX_HISTORY_LENGTH) this._history.pop();

        this._history.unshift(data);
        localStorage.setItem('history', JSON.stringify(this._history));

        this._updateHistory();
    }

    _createHistoryItemElement(index, text) {
        let historyItemElement = document.createElement('div');
        historyItemElement.classList.add('history-item');
        historyItemElement.setAttribute('data-history-index', index);
        historyItemElement.setAttribute('data-js-history-item', '');

        let historyItemTextElement = document.createElement('p');
        historyItemTextElement.textContent = text;

        historyItemElement.append(historyItemTextElement);

        return historyItemElement;
    }

    _loadHistory() {
        const historyListElement = document.querySelector(this._selectors.historyListElement);
        historyListElement.innerHTML = '';

        for (let i = 0; i < this._history.length; i++) {
            const historyItemElement = this._createHistoryItemElement(i, this._history[i]);
            historyListElement.append(historyItemElement);
        }
    }

    _updateHistory() {
        const historyElement = document.querySelector(this._selectors.historyTabElement);

        if (!historyElement.classList.contains('shown')) return;

        this._loadHistory();
    }

    _doOnMobile(callback) {
        if (document.documentElement.offsetWidth <= MOBILE_SCREEN_WIDTH)
            callback();
    }

    _toggleBodyScroll() {
        document.body.classList.toggle('scroll-blocked');
    }

    _toggleHistoryPanel() {
        const mainElement = document.querySelector(this._selectors.mainTabElement);
        const historyElement = document.querySelector(this._selectors.historyTabElement);

        mainElement.classList.toggle('shifted');
        historyElement.classList.toggle('shown');

        if (historyElement.classList.contains('shown')) {
            this._loadHistory();
        }

        this._doOnMobile(this._toggleBodyScroll);
    }

    _insertFromHistory(index) {
        const historyItem = this._history[index];

        const inputFieldElement = document.querySelector(this._selectors.converterInputElement);
        inputFieldElement.value = historyItem;

        this._doOnMobile(this._toggleHistoryPanel);

        const insertEvent = new CustomEvent('insert');
        document.dispatchEvent(insertEvent);
    }

    _delegateInsertion(event) {
        const targetElement = event.target.closest(this._selectors.historyItemElement);

        if (!targetElement) return;

        const historyIndex = +targetElement.dataset.historyIndex;
        this._insertFromHistory(historyIndex);
    }

    _bindEvents() {
        const historyButtonElement = document.querySelector(this._selectors.historyButtonElement);
        const closeHistoryButtonElement = document.querySelector(this._selectors.closeHistoryButtonElement);
        historyButtonElement.addEventListener('click', () => this._toggleHistoryPanel());
        closeHistoryButtonElement.addEventListener('click', () => this._toggleHistoryPanel());

        const historyListElement = document.querySelector(this._selectors.historyListElement);
        historyListElement.addEventListener('click', event => this._delegateInsertion(event));

        document.addEventListener('convert', event => this._addToHistory(event.detail));
    }
}