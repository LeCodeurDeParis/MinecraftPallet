const caseBlock = document.querySelectorAll('.Block')
const lockButton = document.querySelectorAll('.lock')
const buttonRandom = document.getElementById('generate')

function randomInt(min, max) {
    return min + Math.floor((max - min) * Math.random());
}

async function getBlock(){
    let response = await fetch('/api/data');
    let data = await response.json();
    return data;
}


async function displayBlockRandom(){
    let data = await getBlock()
    console.log(data)
    caseBlock.forEach(element => {
        if (!element.classList.contains('locked')) {
            let getRandomBlock = randomInt(0, data.length)
            console.log(getRandomBlock)
            element.innerHTML = `
            <img src="${data[getRandomBlock].image}" alt="${data[getRandomBlock].nom}">
            `
        }
    });
}

function toggleLock(event) {
    const button = event.target;
    const block = button.closest('.color'); // Trouver le bloc parent

    if (button.classList.contains('locked')) {
        // Déverrouiller
        button.classList.remove('locked');
        button.textContent = 'Lock';
    } else {
        // Verrouiller
        button.classList.add('locked');
        button.textContent = 'Unlock';
    }
}

buttonRandom.addEventListener('click', displayBlockRandom)

lockButton.forEach(button => {
    button.addEventListener('click', toggleLock);
});