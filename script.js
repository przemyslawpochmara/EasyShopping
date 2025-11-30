const itemInput = document.getElementById('itemInput');
const addBtn = document.getElementById('addBtn');
const shoppingList = document.getElementById('shoppingList');

let items = JSON.parse(localStorage.getItem('shoppingList')) || [];

function saveToLocalStorage() {
    localStorage.setItem('shoppingList', JSON.stringify(items));
}

function renderList() {
    shoppingList.innerHTML = '';
    items.forEach((item, index) => {
        const li = document.createElement('li');
        li.className = `list-item ${item.completed ? 'completed' : ''}`;
        
        li.innerHTML = `
            <input type="checkbox" ${item.completed ? 'checked' : ''} onchange="toggleItem(${index})">
            <span>${item.text}</span>
            <button class="delete-btn" onclick="deleteItem(${index})">Delete</button>
        `;
        
        shoppingList.appendChild(li);
    });
}

function addItem() {
    const text = itemInput.value.trim();
    if (text) {
        items.push({ text, completed: false });
        itemInput.value = '';
        saveToLocalStorage();
        renderList();
    }
}

function toggleItem(index) {
    items[index].completed = !items[index].completed;
    saveToLocalStorage();
    renderList();
}

function deleteItem(index) {
    items.splice(index, 1);
    saveToLocalStorage();
    renderList();
}

addBtn.addEventListener('click', addItem);
itemInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addItem();
});

renderList();
