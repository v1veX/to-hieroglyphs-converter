init();

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
    const inputValue = inputField.value.toUpperCase().trim();

    if (inputValue === '') return;

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
    
    showCopyButton();
}

function clear() {
    const inputField = document.querySelector('.converter-input');
    const resultField = document.querySelector('.result-field');
    inputField.value = '';
    resultField.textContent = '';

    hideCopyButton();
}

function showCopyButton() {
    const copyButton = document.querySelector('.copy-button');
    copyButton.classList.add('shown');
}

function hideCopyButton() {
    const copyButton = document.querySelector('.copy-button');
    copyButton.classList.remove('shown');
}

function showCopyNotification(message) {
    const notification = document.querySelector('.copy-notification');
    const notificationText = document.querySelector('.copy-notification-text');
    notificationText.textContent = message;
    notification.classList.add('shown');

    setTimeout(() => notification.classList.remove('shown'), 2000);
}

function init() {
    const inputField = document.querySelector('.converter-input');
    inputField.oninput = () => {
        if (inputField.value === '') clear(); 
    };

    const convertButton = document.querySelector('.convert-button');
    convertButton.onclick = convert;

    const clearButton = document.querySelector('.clear-button');
    clearButton.onclick = clear;

    const copyButton = document.querySelector('.copy-button');
    copyButton.onclick = () => {
        const resultField = document.querySelector('.result-field');
        const valueToCopy = resultField.textContent;

        navigator.clipboard.writeText(valueToCopy)
        .then(function() {
            showCopyNotification('Успешно скопировано');
        })
        .catch(function(err) {
            showCopyNotification('Ошибка копирования');
            console.error(err);
        });
    };
}
