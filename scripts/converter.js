const MAX_INPUT_LENGTH = 2000;

export class Converter {
    _selectors = {
        inputElement: '[data-js-converter-input]',
        outputElement: '[data-js-converter-output]',
        convertButtonElement: '[data-js-convert-button]',
        clearButtonElement: '[data-js-clear-button]',
        copyButtonElement: '[data-js-copy-button]',
        symbolsCounterElement: '[data-js-symbols-counter]'
    }

    _dictionary = new Map([
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

    _storedOutputValue = '';

    constructor() {
        this._bindEvents();
        this._updateSymbolsCounter();
    }

    _convert() {
        const inputValue = document.querySelector(this._selectors.inputElement).value;
        const formattedInputValue = inputValue.trim().toUpperCase();

        if (formattedInputValue === '') return;

        if (inputValue.length > MAX_INPUT_LENGTH) {
            const notificationText = `Текст должен содержать не более ${MAX_INPUT_LENGTH} символов!`;
            const notificationEvent = new CustomEvent('notify', {detail: notificationText});
            document.dispatchEvent(notificationEvent);
            return;
        }

        let outputValue = '';
        for (const letter of formattedInputValue) {
            outputValue += this._dictionary.has(letter) ? this._dictionary.get(letter) : letter;
        }

        const resultFieldElement = document.querySelector(this._selectors.outputElement);
        resultFieldElement.textContent = this._storedOutputValue = outputValue;
        
        const convertEvent = new CustomEvent('convert', {detail: inputValue});
        document.dispatchEvent(convertEvent);
        
        this._showCopyButton();
    }

    _clear() {
        const inputFieldElement = document.querySelector(this._selectors.inputElement);
        const resultFieldElement = document.querySelector(this._selectors.outputElement);
        inputFieldElement.value = resultFieldElement.textContent = this._inputValue = this._storedOutputValue = '';

        this._hideCopyButton();
        this._updateSymbolsCounter();
    }

    _copy() {
        let notificationText = '';

        navigator.clipboard.writeText(this._storedOutputValue)
        .then(function() {
            notificationText = 'Успешно скопировано';
        })
        .catch(function() {
            notificationText = 'Ошибка копирования';
        })
        .finally(function() {
            const notificationEvent = new CustomEvent('notify', {detail: notificationText});
            document.dispatchEvent(notificationEvent);
        });
    }

    _showCopyButton() {
        const copyButtonElement = document.querySelector(this._selectors.copyButtonElement);
        copyButtonElement.classList.add('shown');
    }

    _hideCopyButton() {
        const copyButtonElement = document.querySelector(this._selectors.copyButtonElement);
        copyButtonElement.classList.remove('shown');
    }

    _updateSymbolsCounter() {
        const symbolsAmountElement = document.querySelector(this._selectors.symbolsCounterElement);
        const inputValueLength = document.querySelector(this._selectors.inputElement).value.length;

        symbolsAmountElement.textContent = `${inputValueLength} / ${MAX_INPUT_LENGTH}`
    }

    _onInput(inputElement) {
        if (inputElement.value === '') this._clear();

        this._updateSymbolsCounter();
    }

    _bindEvents() {
        const inputFieldElement = document.querySelector(this._selectors.inputElement);
        inputFieldElement.addEventListener('input', () => this._onInput(inputFieldElement));

        const convertButtonElement = document.querySelector(this._selectors.convertButtonElement);
        convertButtonElement.addEventListener('click', () => this._convert());

        const clearButtonElement = document.querySelector(this._selectors.clearButtonElement);
        clearButtonElement.addEventListener('click', () => this._clear());

        const copyButtonElement = document.querySelector(this._selectors.copyButtonElement);
        copyButtonElement.addEventListener('click', () => this._copy());

        document.addEventListener(
            'insert',
            () => {
                this._updateSymbolsCounter();
                this._convert();
            }
        );
    }
}