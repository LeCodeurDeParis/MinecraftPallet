document.addEventListener('DOMContentLoaded', async () => {
    const caseBlock = document.querySelectorAll('.block')
    const lockButton = document.querySelectorAll('.lock')
    const buttonRandom = document.getElementById('generate')
    const menuBlockButton = document.querySelectorAll('#pBlock')
    const selectButton = document.querySelectorAll('.select')
    const menuBlock = document.querySelector('.popup');
    const displayBlockMenu = document.querySelector('.displayAllBlockForMenu')
    const closeMenu = document.getElementById('close-popup')
    const searchInput = document.getElementById('block_searchbar')
    
    let selectedBlock;

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
        console.log('chooseBlock called');
        const blockId = event.target.id;
        const block = allBlock.find(b => b.id == blockId);
        console.log('selectedBlock:', selectedBlock); // Ajouté pour le débogage
        console.log('block:', block); // Ajouté pour le débogage
        if (selectedBlock && block) {
            let img = selectedBlock.querySelector('img');
            img.id = block.id;
            img.src = block.image;
            img.alt = block.nom;
            closePopup();
        }
    }

    searchInput


    function toggleMenuBlockDisplay() {
        console.log('toggleMenuBlockDisplay called');
        selectedBlock = event.currentTarget.closest('.block');
        console.log('selectedBlock set to:', selectedBlock);
        menuBlock.classList.toggle('show');
    }

    function closePopup() {
        console.log('closePopup called');
        menuBlock.classList.remove('show');
    }


    buttonRandom.addEventListener('click', displayBlockRandom)

    lockButton.forEach(button => {
        button.addEventListener('click', toggleLock);
    });

    selectButton.forEach(button => {
        button.addEventListener('click', toggleMenuBlockDisplay);
    });

    menuBlockButton.forEach(button => {
        button.addEventListener('click', toggleMenuBlockDisplay);
    });

    closeMenu.addEventListener('click', closePopup)

    displayBlockMenu.addEventListener('click', eventAllBlock)
    
    searchInput.addEventListener('input', filterBlocks);

    function eventAllBlock(event){
        console.log('eventAllBlock called');
        if (event.target.classList.contains('block_specific')) {
            chooseBlock(event);
        }
    }

    function filterBlocks() {
        const searchText = searchInput.value.toLowerCase();
        const blocks = document.querySelectorAll('.block_specific');
        blocks.forEach(block => {
            const blockName = block.alt.toLowerCase();
            if (blockName.includes(searchText)) {
                block.style.display = 'block';
            } else {
                block.style.display = 'none';
            }
        });
    }
})