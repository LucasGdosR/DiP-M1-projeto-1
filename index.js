// Global variables
const STORAGE_KEY = 'DEVINKNOWLEDGE';
let tips = [];
let idCount = 0;
const list = document.getElementById("tips");
const q = document.getElementById('q');
// End global variables

// Local storage functions
function getLocalTips() {
    const localTips = localStorage.getItem(STORAGE_KEY);
    return localTips ? JSON.parse(localTips) : [[], 0];
}

function saveLocalTips() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([tips, idCount]));
}
// End local storage functions

// Form
function submitForm(event) {
    event.preventDefault();
    if (!validateYoutube(event.target.youtube.value)) {
        alert("URL não corresponde a um link https do youtube.");
        return;
    }

    const input = {
        'title' : event.target.title.value,
        'languageSkill' : event.target.languageSkill.value,
        'category' : event.target.category.value,
        'description' : event.target.description.value,
        'youtube' : event.target.youtube.value,
    }

    if (event.target.id.value == '') {
        if (!confirm('Você realmente deseja cadastrar essa dica?'))
            return;
        addTip(input);
    }

    else {
        if (!confirm('Você realmente deseja salvar a edição dessa dica?\nSe quiser cancelar a edição, clique no botão "Limpar".'))
            return;
        input.id = event.target.id.value;
        editTip(input);
    }

    document.getElementById('form').reset();
    document.getElementById('id').value = '';
    
    saveLocalTips();
    renderTotals();
    renderTips();
}

function validateYoutube(url) {
    if (url === '' ||
        url.slice(0, 24).toLowerCase() == "https://www.youtube.com/" ||
        url.slice(0, 17).toLowerCase() == "https://youtu.be/" ||
        url.slice(0, 22).toLowerCase() == "https://m.youtube.com/")
        return true;
    return false;
}
// End form

// CRUD: C
function addTip(input) {
    input.id = idCount++;
    tips.push(input);
    alert('Dica cadastrada.');
}

// CRUD: R
function renderTips() {
    list.innerHTML = '';
    tips.forEach(tip => {
        renderTip(tip);
    });
}

function renderTip(tip) {
    const card = document.createElement('li');
    card.innerHTML = `<h3>${tip.title}</h3>
    <p><strong>Linguagem/Skill:</strong> ${tip.languageSkill}</p>
    <p><strong>Categoria:</strong> ${tip.category}</p>
    <p>${tip.description}</p>`;

    const deleteTip = document.createElement('button');
    deleteTip.deleteId = tip.id;
    deleteTip.innerHTML = "Excluir";
    deleteTip.classList = "deleteButton button";
    
    const editTip = document.createElement('button');
    editTip.tip = tip;
    editTip.innerHTML = "Editar";
    editTip.classList = "editButton button";
    
    card.appendChild(deleteTip);
    deleteTip.addEventListener('click', (event) => deleteMe(event));
    card.appendChild(editTip);
    editTip.addEventListener('click', (event) => editMe(event));
    
    if (tip.youtube) {
        const youtube = document.createElement('a');
        youtube.href = tip.youtube;
        youtube.target = "_blank";
        youtube.innerHTML = '<button class="youtubeButton button">Youtube</button>';
        card.appendChild(youtube);
    }
    list.appendChild(card);
}

function renderTotals() {
    let total = tips.length;
    let front = 0;
    let back = 0;
    let full = 0;
    let soft = 0;
    for (const tip of tips) {
        switch (tip.category) {
            case 'FrontEnd':
                front++;
                break;
            case 'BackEnd':
                back++;
                break;
            case 'FullStack':
                full++;
                break;
            case 'Comportamental/Soft':
                soft++
        }
    }
    document.getElementById('cardsTotal').innerHTML = `Total<br>${total}`;
    document.getElementById('cardsFront').innerHTML = `FrontEnd<br>${front}`;
    document.getElementById('cardsBack').innerHTML = `BackEnd<br>${back}`;
    document.getElementById('cardsFull').innerHTML = `FullStack<br>${full}`;
    document.getElementById('cardsSoft').innerHTML = `SoftSkill<br>${soft}`;
}

// CRUD: U
function editMe(event) {
    if (!confirm('Você realmente deseja editar esta dica?'))
        return;
    const me = event.target.tip;
    document.getElementById('id').value = me.id;
    document.getElementById('title').value = me.title;
    document.getElementById('languageSkill').value = me.languageSkill;
    document.getElementById('category').value = me.category;
    document.getElementById('description').value = me.description;
    document.getElementById('youtube').value = me.youtube;
    alert('As informações da dica selecionada para edição foram enviadas para a barra lateral. Realize as devidas edições e clique em "Salvar" para finalizar.');
}

function editTip(input) {
    tips.forEach((tip, index) => {
        if (input.id == tip.id) {
            tips[index] = input;
        }
    })
    alert('Dica editada.');
}

// CRUD: D
function deleteMe(event) {
    if (!confirm('Você realmente deseja deletar essa dica?'))
        return;
    const myId = event.target.deleteId;
    tips.forEach((tip, index) => {
        if (tip.id == myId) {
            tips.splice(index, 1);
            saveLocalTips();
            renderTotals();
            renderTips();
        }       
    });
    alert('Dica deletada.')
}
// End CRUD

function filter() {
    list.innerHTML = '';
    const qValue = q.value.toLowerCase();
    tips.forEach(tip => {
        if (tip.title.toLowerCase().includes(qValue)
         || tip.languageSkill.toLowerCase().includes(qValue)
         || tip.category.toLowerCase().includes(qValue))
            renderTip(tip);
    })
}

function loadInitialData() {
    [tips, idCount] = getLocalTips();
    renderTotals();
    renderTips();
}

// Event listeners
window.addEventListener('load', loadInitialData);
q.addEventListener('input', filter);
document.getElementById('form').addEventListener('submit', (event) => {submitForm(event)});
document.getElementById('resetForm').addEventListener('click', () => {document.getElementById('id').value = ''});