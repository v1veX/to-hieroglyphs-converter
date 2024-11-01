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
        clearHistoryButtonElement: '[data-js-clear-history-button]',
    };

    _history = null;

    constructor() {
        this._bindEvents();
        
        if (!localStorage.getItem('history')) {
            localStorage.setItem('history', JSON.stringify([]));
        }

        this._history = JSON.parse(localStorage.getItem('history'));

        this._updateHistoryList();
    }

    _addToHistory(data) {
        if (this._history.includes(data)) return;

        if (this._history.length === MAX_HISTORY_LENGTH) this._history.pop();

        this._history.unshift(data);
        localStorage.setItem('history', JSON.stringify(this._history));

        this._updateHistoryList();
    }

    _clearHistory() {
        this._history = [];
        localStorage.setItem('history', JSON.stringify(this._history));

        this._updateHistoryList();
    }

    _createHistoryItemElement(index, text) {
        let historyItemElement = document.createElement('div');
        historyItemElement.classList.add('history-item', 'wrapped-text');
        historyItemElement.setAttribute('data-history-index', index);
        historyItemElement.setAttribute('data-js-history-item', '');

        let historyItemTextElement = document.createElement('p');
        historyItemTextElement.textContent = text;

        historyItemElement.append(historyItemTextElement);

        return historyItemElement;
    }

    _updateHistoryList() {
        const historyListElement = document.querySelector(this._selectors.historyListElement);
        historyListElement.innerHTML = '';

        for (let i = 0; i < this._history.length; i++) {
            const historyItemElement = this._createHistoryItemElement(i, this._history[i]);
            historyListElement.append(historyItemElement);
        }
    }

    _doOnMobile(callbackfn) {
        if (window.innerWidth <= MOBILE_SCREEN_WIDTH)
            callbackfn();
    }

    _toggleHistoryPanel() {
        const mainElement = document.querySelector(this._selectors.mainTabElement);
        const historyElement = document.querySelector(this._selectors.historyTabElement);

        mainElement.classList.toggle('shifted');
        historyElement.classList.toggle('shown');

        const toggleHistoryEvent = new CustomEvent(
            'toggle-history',
            { detail: historyElement.classList.contains('shown') }
        );
        document.dispatchEvent(toggleHistoryEvent);
    }

    _insertFromHistory(index) {
        const historyItem = this._history[index];

        const insertEvent = new CustomEvent('insert', { detail: historyItem });
        document.dispatchEvent(insertEvent);

        this._doOnMobile( () => this._toggleHistoryPanel() );
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

        const clearHistoryButtonElement = document.querySelector(this._selectors.clearHistoryButtonElement);
        clearHistoryButtonElement.addEventListener('click', () => this._clearHistory());

        const historyListElement = document.querySelector(this._selectors.historyListElement);
        historyListElement.addEventListener('click', event => this._delegateInsertion(event));

        document.addEventListener('convert', ({ detail }) => this._addToHistory(detail));
    }
}