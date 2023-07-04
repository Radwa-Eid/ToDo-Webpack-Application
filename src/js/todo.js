let addTask = document.getElementById("addTask");
let addItem = document.getElementById("addItem");

let oldData;
let updateIndex;

async function getItem() {
    const res = await fetch('https://dummyjson.com/todos')
    const data = await res.json();
    oldData = data.todos;
    displayTodos(data.todos);
}

async function postItem(oldData, newItem) {
    if (newItem != "") {
        const res = await (fetch('https://dummyjson.com/todos/add', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                todo: newItem,
                completed: false,
                userId: 5,
            })
        }))
        const post = await res.json();
        post.id = oldData.length + 1;
        oldData.push(post)
    }
    else {
        alert("please Enter Item To add");
    }
    console.log(oldData);
    displayTodos(oldData)
}


function error() {
    console.log("errrorr");
}

(async function data() {
    try {
        getItem();
    }
    catch {
        error();
    }
})();

function displayTodos(data) {
    let todoList = '';
    for (let i = 0; i < data.length; i++) {
        todoList += `<tr>
        <td>${data[i].id}</td>
        <td>${data[i].todo}</td>
        </tr>`;
    }
    document.getElementById("tBody").innerHTML = todoList;
}

addTask.addEventListener("click", function () {
    postItem(oldData, addItem.value);
    addItem.value = '';
    alert("Todo Added");
})
