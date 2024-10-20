const MAX_INPUT_LENGTH = 2000;

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

    const inputValue = document.querySelector('[data-js-converter-input]').value;
    const clearValue = inputValue.trim().toUpperCase();

    if (clearValue === '') return;

    if (inputValue.length > MAX_INPUT_LENGTH) {
        const notificationText = `Текст должен содержать не более ${MAX_INPUT_LENGTH} символов!`;
        const notificationEvent = new CustomEvent('notify', {detail: notificationText});
        document.dispatchEvent(notificationEvent);
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

    const resultFieldElement = document.querySelector('[data-js-result-output]');
    resultFieldElement.textContent = resultValue;
    
    const convertEvent = new CustomEvent('convert', {detail: inputValue});
    document.dispatchEvent(convertEvent);
    
    showCopyButton();
}

function clear() {
    const inputFieldElement = document.querySelector('[data-js-converter-input]');
    const resultFieldElement = document.querySelector('[data-js-result-output]');
    inputFieldElement.value = '';
    resultFieldElement.textContent = '';

    hideCopyButton();
    showSymbolsAmount();
}

function copy() {
    const resultFieldElement = document.querySelector('[data-js-result-output]');
    const valueToCopy = resultFieldElement.textContent;
    let notificationText = '';

    navigator.clipboard.writeText(valueToCopy)
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

function showCopyButton() {
    const copyButtonElement = document.querySelector('[data-js-copy-button]');
    copyButtonElement.classList.add('shown');
}

function hideCopyButton() {
    const copyButtonElement = document.querySelector('[data-js-copy-button]');
    copyButtonElement.classList.remove('shown');
}

function showSymbolsAmount() {
    const symbolsAmountElement = document.querySelector('[data-js-symbols-amount]');
    const inputValueLength = document.querySelector('[data-js-converter-input]').value.length;

    symbolsAmountElement.textContent = `${inputValueLength} / ${MAX_INPUT_LENGTH}`
}

export function init() {
    const inputFieldElement = document.querySelector('[data-js-converter-input]');
    inputFieldElement.oninput = () => {
        if (inputFieldElement.value === '') clear();

        showSymbolsAmount();
    };

    const convertButtonElement = document.querySelector('[data-js-convert-button]');
    convertButtonElement.onclick = convert;

    const clearButtonElement = document.querySelector('[data-js-clear-button]');
    clearButtonElement.onclick = clear;

    const copyButtonElement = document.querySelector('[data-js-copy-button]');
    copyButtonElement.onclick = copy;

    document.addEventListener('insert', () => {
        showSymbolsAmount();
        convert();
    });

    showSymbolsAmount();
}