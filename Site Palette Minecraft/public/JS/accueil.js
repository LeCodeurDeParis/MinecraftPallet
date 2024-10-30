document.addEventListener('DOMContentLoaded', async () => {
    const caseBlock = document.querySelectorAll('.block')
    const lockButton = document.querySelectorAll('.lock')
    const buttonRandom = document.getElementById('generate')
    const menuBlockButton = document.querySelectorAll('#pBlock')
    const menuBlock = document.querySelector('.popup');
    const displayBlockMenu = document.querySelector('.displayAllBlockForMenu')
    const closeMenu = document.getElementById('close-popup')
    const AllBlockPopUp = document.querySelectorAll('.block_specific')


    function randomInt(min, max) {
        return min + Math.floor((max - min) * Math.random());
    }

    async function getBlock() {
        let response = await fetch('/api/data');
        let data = await response.json();
        return data;
    }

    let allBlock = await getBlock()
    displayBlockMenu.innerHTML = ''
    allBlock.forEach(block => {
        displayBlockMenu.innerHTML += `
            <img class="block_specific" id = "${block.id}" src = "${block.image}" alt="${block.nom}" loading="lazy">
        `
    });
        
    async function displayBlockRandom() {
        caseBlock.forEach(element => {
            if (!element.classList.contains('locked')) {
                let getRandomBlock = randomInt(0, allBlock.length)
                let img = element.querySelector('img')
                img.id = allBlock[getRandomBlock].id
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

    function chooseBlock(event) {
        console.log("clicked")
        const searchParentBlock = event.target.id
        switch (searchParentBlock) {
            case 'color1':
                console.log('color1')
                break;
            case 'color2':
                console.log('color2')
                break;  
            case 'color3':
                console.log('color3')
                break;
            case 'color4':
                console.log('color4')
                break;
            case 'color5':
                console.log('color5')
                break;
        }
    }


    function toggleMenuBlockDisplay() {
        menuBlock.classList.toggle('show');
    }

    function closePopup() {
        menuBlock.classList.remove('show');
    }


    buttonRandom.addEventListener('click', displayBlockRandom)

    lockButton.forEach(button => {
        button.addEventListener('click', toggleLock);
    });


    menuBlockButton.forEach(button => {
        button.addEventListener('click', toggleMenuBlockDisplay);
    });

    closeMenu.addEventListener('click', closePopup)

    displayBlockMenu.addEventListener('click', eventAllBlock)

    function eventAllBlock(event){
        console.log(event.target)
        chooseBlock(event)
    }

})