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

    const inputField = document.querySelector('.converter-input');
    const inputValue = inputField.value.toUpperCase();

    let resultValue = '';
    for (const letter of inputValue) {
        if (dictionary.has(letter)) {
            resultValue += dictionary.get(letter);
        }
        else {
            resultValue += letter;
        }
    }

    const resultField = document.querySelector('.result-field');
    resultField.textContent = resultValue;
}

function clear() {
    const inputField = document.querySelector('.converter-input');
    const resultField = document.querySelector('.result-field');
    inputField.value = '';
    resultField.textContent = '';
}

const converterForm = document.querySelector('.converter-form');
converterForm.onsubmit = function() {
    convert();
    return false;
};

const clearButton = document.querySelector('.clear-button');
clearButton.onclick = clear;