// Associando variáveis com os elementos HTML

let yourVoteTo = document.querySelector('.d-1-1 span');
let role = document.querySelector('.d-1-2 span');
let description = document.querySelector('.d-1-4');
let warning = document.querySelector('.d-2');
let lateral = document.querySelector('.d-1-right');
let numbers = document.querySelector('.d-1-3');

// Variáveis de ambiente
let currentStage = 0;
let number = '';
let voteWhite = false;
// Variáveis de ambiente

// Funções

// Começar
function startStage() {
    let stage = stages[currentStage];

    let numbersHtml = '';
    number = '';
    branco = false;

    for(let i=0;i<stage.numbers;i++){
        if(i === 0) {
            numbersHtml += '<div class="numero pisca"></div>';
        }
        else {
            numbersHtml += '<div class="numero"></div>';
        }   
    }

    yourVoteTo.style.display = 'none';
    role.innerHTML = stage.title;
    description.innerHTML = '';
    warning.style.display = 'none';
    lateral.innerHTML = '';
    numbers.innerHTML = numbersHtml;
}

// Atualizar interface
function updateInterface() {
    let stage = stages[currentStage];
    let candidate = stage.candidates.filter((item)=>{
        if(item.number === number) {
            return true;
        } else {
            return false;
        }
    });
    if(candidate.length > 0){
        candidate = candidate[0];
        yourVoteTo.style.display = 'block';
        warning.style.display = 'block';
        description.innerHTML = `Nome: ${candidate.name}<br/>Partido: ${candidate.politicalParty}`;

        let picturesHTML = '';
        for(let i in candidate.pictures) {
            picturesHTML += `<div class="d-1-image"><img src="images/${candidate.pictures[i].url}" alt="">${candidate.pictures[i].caption}</div>`;
            lateral.innerHTML = picturesHTML;
        }
    } else {
            yourVoteTo.style.display = 'block';
            warning.style.display = 'block';
            description.innerHTML = '<div class="aviso--grande">VOTO NULO</div>';            
        }
}

// Número clicado

function clicked(n) {
    let elNumber = document.querySelector('.numero.pisca');
    if(elNumber !== null) {
        elNumber.innerHTML = n;
        number = `${number}${n}`;

        elNumber.classList.remove('pisca');
        if(elNumber.nextElementSibling !== null) {
            elNumber.nextElementSibling.classList.add('pisca');
        } else {
            updateInterface();
        }

    }
}

// Botão Branco
function white() {
    if(number === '') {
        voteWhite = true;
        yourVoteTo.style.display = 'block';
        warning.style.display = 'block';
        numbers.innerHTML = '';
        description.innerHTML = '<div class="aviso--grande pisca">VOTO EM BRANCO</div>';
    } else {
        alert("Para votar em BRANCO, não digite nenhum número! Se quiser limpar os números, clique no botão CORRIGE!")
    }
}

// Botão Corrige
function correct() {
    startStage();
}

// Botão Confirma
function confirm() {
    let stage = stages[currentStage];

    let voteConfirmed = false;

    if(voteWhite === true) {
        voteConfirmed = true;
        console.log("Confirmando como BRANCO...");
    } else if(number.length === stage.numbers) {
        voteConfirmed = true;
        console.log("Confirmando como "+number);
    }

    if(voteConfirmed) {
        currentStage++;
        if(stages[currentStage] !== undefined) {
            startStage();
        } else {
            document.querySelector('.tela').innerHTML = '<div class="aviso--gigante pisca">FIM</div>';
        }
    }
}

startStage();