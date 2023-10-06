const modeInput = document.getElementById('mode-input')
const countInput = document.getElementById('count-input')

document.getElementById('request-form')
    .addEventListener('submit', e => {
        e.preventDefault();
        fetch(getUrlForFetch())
            .then(res => res.json())
            .then(data => {
                const newColorArr = data.colors.map(color => color.hex.value);
                renderColorDisplay(newColorArr);
            });
    });
    
modeInput.addEventListener("change", e => {
    getCountOptions();
});

document.addEventListener('click', e => {
    if (e.target.dataset.copy) {
        const copyText = e.target.dataset.copy;
        const textArea = document.createElement('textarea');
        textArea.value = copyText;
        document.body.appendChild(textArea);
        
        textArea.select();
        textArea.setSelectionRange(0, 99999);
        
        try {
            document.execCommand('copy');
            alert("Text copied: " + copyText);
        } catch(err) {
            console.error('Unable to copy text: ', err);
        } finally {
            document.body.removeChild(textarea);
        }
    }
})
    
function getUrlForFetch() {
    const color = document.getElementById('color-input').value.split("");
    color.shift();
    return `https://www.thecolorapi.com/scheme?hex=${color.join("")}&mode=${modeInput.value}&count=${countInput.value}`;
};
    
function renderColorDisplay(arr) {
    const displayDiv = document.getElementById('color-display');
    displayDiv.innerHTML = arr.map(color => `
    <div class="ind-color-div">
        <div class="color" style="background-color: ${color};" data-copy="${color}"></div>
        <p class="hex-value" data-copy="${color}">${color}</p>
    </div>
    `).join("");
};

function getCountOptions() {
     let countArr = [];
    switch (modeInput.value) {
        case ("monochrome"):
        countArr = [10,9,8,7,6,5,4,3,2];
        break;
        case ("monochrome-dark"):
        countArr = [7,6,5,4,3,2];
        break;
        case ("monochrome-light"):
        countArr = [7,6,5,4,3,2];
        break;
        case ("analogic"):
        countArr = [10,9,8,7,6,5,4,3,2];
        break;
        case ("complement"):
        countArr = [2];
        break;
        case ("analogic-complement"):
        countArr = [10,9,8,7,6,5,4,3,2];
        break;
        case ("triad"):
        countArr = [3];
        break;
        case ("quad"):
        countArr = [4];
        break;
    };
    countInput.innerHTML = countArr.map(number => {
        return number === 5 ? `<option selected>${number}</option>` : `<option>${number}</option>`
    });
};
