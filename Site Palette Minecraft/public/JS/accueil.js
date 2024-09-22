document.addEventListener('DOMContentLoaded', async () => {
    const caseBlock = document.querySelectorAll('.block')
    const lockButton = document.querySelectorAll('.lock')
    const buttonRandom = document.getElementById('generate')

    function randomInt(min, max) {
        return min + Math.floor((max - min) * Math.random());
    }

    async function getBlock() {
        let response = await fetch('/api/data');
        let data = await response.json();
        return data;
    }

    let allBlock = await getBlock()

    async function displayBlockRandom() {
        caseBlock.forEach(element => {
            if (!element.classList.contains('locked')) {
                console.log(element)
                let getRandomBlock = randomInt(0, allBlock.length)
                let img = element.querySelector('img')
                img.src = allBlock[getRandomBlock].image
                img.alt = allBlock[getRandomBlock].nom
            }
            else {
                console.log('bloqué')
            }
        });
    }

    function toggleLock(event) {
        const button = event.target;
        const block = button.parentElement.parentElement; // Trouver le bloc parent

        if (block.classList.contains('locked')) {
            // Déverrouiller
            block.classList.remove('locked');
            button.textContent = 'Lock';
        } else {
            // Verrouiller
            block.classList.add('locked');
            button.textContent = 'Unlock';
        }
    }

    buttonRandom.addEventListener('click', displayBlockRandom)

    lockButton.forEach(button => {
        button.addEventListener('click', toggleLock);
    });
})