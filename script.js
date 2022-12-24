showSavedTodo();

// function to enable and disable dark mode
function enableDarkMode() {
    let dText = "Disable Dark Mode",
        darkBtn = document.getElementById("darkMode-btn"),
        navbar = document.querySelector(".navbar"),
        jumbotron = document.querySelector("#jumbo"),
        inputButtons = document.querySelectorAll(".form-control"),
        addBtn = document.querySelector(".add-note-btn"),
        clearBtn = document.querySelector(".clear-txt-btn");

    if (darkBtn.innerText === dText) {
        darkBtn.innerText = "Enable Dark Mode";
    } else {
        darkBtn.innerText = dText;
    }

    // toggling classes
    document.body.classList.toggle("dark");
    toggleMultipleClasses(navbar, "navbar-dark bg-dark")
    toggleMultipleClasses(jumbotron, "shadow-lg bg-dark");
    toggleMultipleClasses(inputButtons[0], "dark");
    toggleMultipleClasses(inputButtons[1], "dark");
    toggleMultipleClasses(addBtn, "btn-dark btn-outline-light");
    toggleMultipleClasses(clearBtn, "btn-dark btn-outline-light");
}

function toggleMultipleClasses(element, classes) {
    let classArr = classes.split(" ");
    classArr.forEach(c => {
        element.classList.toggle(c);
    });
}

// Function to add todo in localStorage
const addTodo = (inp_title, inp_description) => {
    let c = new Date();
    let dataObj = {
        title: inp_title,
        desc: inp_description,
        saved_time: `${c.getDate()}-${c.getMonth() + 1}-${c.getFullYear()} || ${c.getHours()}:${c.getMinutes()}:${c.getSeconds()}`
    }
    let dataArr;
    if (!localStorage.getItem("saved")) {
        dataArr = [];
    } else {
        dataArr = JSON.parse(localStorage.getItem("saved"));
    }
    dataArr.push(dataObj);
    localStorage.setItem("saved", JSON.stringify(dataArr));
}

function addANoteEvent() {
    let titleTxt = document.querySelector('.inp-title').value;
    let descTxt = document.querySelector('.inp-desc').value;
    if (titleTxt.length === 0 && descTxt.length === 0) {
        alert("Please enter title and description before adding a todo!!");
    } else if (titleTxt.length === 0) {
        alert("Please enter title!!");
    } else if (descTxt.length === 0) {
        alert("Please enter description!!");
    } else {
        addTodo(titleTxt, descTxt);
        clearInputs();
        showSavedTodo();
    }
}

// event listener to handle 'add a todo' button
document.querySelector('.add-note-btn').addEventListener('click', addANoteEvent);

// Function to clear inputs
const clearInputs = () => {
    document.querySelector('.inp-title').value = '';
    document.querySelector('.inp-desc').value = '';
}


// event listener to handle 'clear' button
document.querySelector('.clear-txt-btn').addEventListener('click', () => {
    clearInputs();
});


// event listener to handle 'delete all todos' button
document.querySelector(".delete-all-btn").addEventListener('click', () => {
    if (!(document.querySelector(".saved-todos").style.display === "none") && localStorage.getItem("saved")) {
        const confirm_deletion = confirm("Do you really want to delete all the saved todo's??\nThis can't be undone!!");
        if (confirm_deletion) {
            localStorage.removeItem('saved');
            showSavedTodo();
        }
    } else if (!(document.querySelector(".completed-todos").style.display === "none") && localStorage.getItem("completed")) {
        const confirm_ = confirm("Do you really want to delete all the completed todo's??");
        if (confirm_) {
            localStorage.removeItem('completed');
            showCompletedTodo();
        }
    }

});


// function to handle display only saved todo's
function displaySavedTodo() {
    document.querySelector(".completed-todos").style.display = "none";
    document.querySelector(".saved-todos").style.display = "flex";
    showSavedTodo();
}

function displayCompletedTodo() {
    document.querySelector(".saved-todos").style.display = "none";
    document.querySelector(".completed-todos").style.display = "flex";
    showCompletedTodo();
}


// Function to show text when there is nothing present in localstorage
function showText(key, element, msg) {
    if (!localStorage.getItem(key)) {
        element.innerHTML = `<p class="text-md-left my-4">${msg}</p>`
    }
}

// Function to show "saved todo's" on screen
function showSavedTodo() {
    let savedTodo = document.querySelector('.saved-todos');
    let arr = [], ihtml;
    if (!localStorage.getItem("saved")) {
        arr = [];
    } else {
        arr = JSON.parse(localStorage.getItem("saved"));
        for (let i = 0; i < arr.length; i++) {
            ihtml += `
                <div class="card sh-card border-light text-white shadow bg-dark mb-3">
                    <div class="card-body">
                        <h5 class="card-title">${arr[i].title}</h5>
                        <p class="card-text text-monospace">${arr[i].desc}</p>
                        <footer class="blockquote-footer" style="font-size: 0.75rem; margin-bottom: 0.5rem">Saved at : <cite title="Source Title">${arr[i].saved_time}</cite></footer>
                        <button type="button" id="${i}" class="btn btn-warning delete-btn" onclick="deleteATodo(this.id)"><img
                                src="https://img.icons8.com/material-rounded/24/null/trash.png" /></button>
                        <button type="button" id="t-${i}" class="btn btn-success task-btn" onclick="taskComplete(this.id)"><img
                                src="https://img.icons8.com/ios-glyphs/24/null/task-completed.png" /></button>
                    </div>
                </div>
            `
        }
    }
    savedTodo.innerHTML = ihtml;
    savedTodo.firstChild.remove();
    showText("saved", savedTodo, "Nothing to show here in 'Saved todo(s)' section...");
}


// function to handle the delete a todo event
function deleteATodo(index) {
    let tArr;
    if (!localStorage.getItem("saved")) {
        tArr = [];
    } else {
        tArr = JSON.parse(localStorage.getItem("saved"));
        tArr.splice(index, 1);
        localStorage.setItem("saved", JSON.stringify(tArr));
    }

    if (localStorage.getItem("saved") === '[]') {
        localStorage.removeItem("saved")
    }

    showSavedTodo();
}



// function to show completed todo's
function showCompletedTodo() {
    const completedTodo = document.querySelector('.completed-todos');
    let cArr, ihtml;
    if (!localStorage.getItem("completed")) {
        cArr = [];
    } else {
        cArr = JSON.parse(localStorage.getItem("completed"));
        for (let i = 0; i < cArr.length; i++) {
            ihtml += `
                <div class="container c-todo border border-success mt-3 py-2 px-3">
                    <details style="position: relative;">
                        <summary class="h5">${cArr[i].title} 
                        <button type="button" id=comp-${i} class="btn btn-warning c-delete-btn" onclick="deleteACompletedTodo(this.id)"><img class="c-delete-img"
                                src="https://img.icons8.com/material-rounded/24/null/trash.png" /></button>
                        </summary>
                        <p class="text-monospace">${cArr[i].desc}</p>
                        <footer class="blockquote-footer">Saved at : <cite title="Source Title">${cArr[i].saved_time}</cite></footer>
                        <footer class="blockquote-footer">Completed at : <cite title="Source Title">${cArr[i].completed_time}</cite></footer>
                    </details>
                </div>
            `
        }
    }

    completedTodo.innerHTML = ihtml;
    completedTodo.firstChild.remove();
    showText("completed", completedTodo, "Nothing to show here in 'Completed todo(s)' section...");
}


// function to handle task completion
function taskComplete(index) {
    const splitedIndex = Number.parseInt(index.split("t-")[1]);
    let c = new Date();

    let completedTodoArr, savedTodoArr = [];
    savedTodoArr = JSON.parse(localStorage.getItem("saved"));

    const completedObj = {
        title: savedTodoArr[splitedIndex].title,
        desc: savedTodoArr[splitedIndex].desc,
        saved_time: savedTodoArr[splitedIndex].saved_time,
        completed_time: `${c.getDate()}-${c.getMonth() + 1}-${c.getFullYear()} || ${c.getHours()}:${c.getMinutes()}:${c.getSeconds()}`
    }

    if (!localStorage.getItem("completed")) {
        completedTodoArr = [];
    } else {
        completedTodoArr = JSON.parse(localStorage.getItem("completed"));
    }

    completedTodoArr.unshift(completedObj);

    localStorage.setItem("completed", JSON.stringify(completedTodoArr));
    savedTodoArr.splice(splitedIndex, 1);
    localStorage.setItem("saved", JSON.stringify(savedTodoArr));
    if (localStorage.getItem("saved") === '[]') {
        localStorage.removeItem("saved");
    }
    showSavedTodo();
}


// function to delete a completed todo
function deleteACompletedTodo(index) {
    const todoIndex = Number.parseInt(index.split("comp-")[1]);
    let cArr;
    if (!localStorage.getItem("completed")) {
        cArr = [];
    } else {
        cArr = JSON.parse(localStorage.getItem("completed"));
        cArr.splice(todoIndex, 1);
        localStorage.setItem("completed", JSON.stringify(cArr));
    }

    if (localStorage.getItem("completed") === '[]') {
        localStorage.removeItem("completed");
    }
    showCompletedTodo();
}