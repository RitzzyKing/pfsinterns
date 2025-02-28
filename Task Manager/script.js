// Variables
let inputBar = document.querySelector("#task-input");
let addTaskBtn = document.querySelector("#add-task-btn");
let allBtn = document.querySelector("#filter-all");
let notStartedBtn = document.querySelector("#filter-notStarted");
let inProgressBtn = document.querySelector("#filter-progress");
let completedBtn = document.querySelector("#filter-completed");
let taskList = document.querySelector("#task-list");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Event Listeners
addTaskBtn.addEventListener("click", addTask);
allBtn.addEventListener("click", filter);
notStartedBtn.addEventListener("click", filter);
inProgressBtn.addEventListener("click", filter);
completedBtn.addEventListener("click", filter);

inputBar.addEventListener("keydown", (event) => {
    if (event.key === "Enter" && inputBar.value.trim() !== "") {
        addTask();
    }
});

taskList.addEventListener("mouseenter", (event) => {
    if (event.target.classList.contains("status-dropdown")) {
        let allStatuses = event.target.querySelectorAll("div");
        allStatuses.forEach(button => {
            button.style.visibility = "visible";
        });
    }
}, true);

taskList.addEventListener("mouseleave", (event) => {
    if (event.target.classList.contains("status-dropdown")) {
        let taskList = event.target.closest(".task-item");
        let activeStatus;
        if (taskList.classList.contains("notStarted")) {
            activeStatus = event.target.querySelector(".status-notStarted");
        } 
        else if (taskList.classList.contains("inProgress")) {
            activeStatus = event.target.querySelector(".status-progress");
        }
        else if (taskList.classList.contains("completed")) {
            activeStatus = event.target.querySelector(".status-completed");
        }
        let allStatuses = event.target.querySelectorAll("div");

        allStatuses.forEach(button => {
            button.style.visibility = "hidden";
        });

        if (activeStatus) {
            activeStatus.style.visibility = "visible";
        }
    }
}, true);

taskList.addEventListener("click", (event) => {
    if (!event.target.classList.contains("status-notStarted") && 
    !event.target.classList.contains("status-progress") && 
    !event.target.classList.contains("status-completed") && 
    !event.target.classList.contains("edit-btn") && 
    !event.target.classList.contains("delete-btn")) {
        return;
    }
    let taskItem = event.target.closest(".task-item");
    let statusDropdown = taskItem.querySelector(".status-dropdown");
    let allStatuses = statusDropdown.querySelectorAll("div");

    if (event.target.classList.contains("status-notStarted")) {
        updateTaskStatus(taskItem, "notStarted");
    } 
    else if (event.target.classList.contains("status-progress")) {
        updateTaskStatus(taskItem, "inProgress");
    } 
    else if (event.target.classList.contains("status-completed")) {
        updateTaskStatus(taskItem, "completed");
    }
    
    if (event.target.classList.contains("edit-btn")) {
        editTask(taskItem);
    }
    
    else if (event.target.classList.contains("delete-btn")) {
        deleteTask(taskItem);
    }
});

// Functions

function addTask(event) {
    if (inputBar.value.trim() === "") {
        alert("Please enter a task");
        return;
    }

    let task = {
        text: inputBar.value.trim(),
        status: "notStarted"
    };

    tasks.push(task);
    saveTasks();
    renderTasks();
    inputBar.value = "";
}

function updateTaskStatus(taskItem, status) {
    let taskText = taskItem.querySelector("p").innerText;
    let taskIndex = tasks.findIndex(task => task.text === taskText);
    tasks[taskIndex].status = status;
    saveTasks();
    renderTasks();
}

function editTask(taskItem) {
    if (taskItem.classList.contains("completed")) {
        alert("You cannot edit a completed task");
        return;
    }
    let taskTextElement = taskItem.querySelector("p");
    let newTextBox = document.createElement("input");
    newTextBox.type = "text";
    newTextBox.value = taskTextElement.innerText;
    newTextBox.style.flex = "7";

    taskTextElement.replaceWith(newTextBox);
    newTextBox.focus();

    newTextBox.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            if (newTextBox.value.trim() === "") {
                alert("Please enter a task");
                return;
            }
            let updatedText = document.createElement("p");
            updatedText.innerText = newTextBox.value;
            newTextBox.replaceWith(updatedText);

            let taskText = taskTextElement.innerText;
            let taskIndex = tasks.findIndex(task => task.text === taskText);
            tasks[taskIndex].text = newTextBox.value.trim();
            saveTasks();
        }
    });
}

function deleteTask(taskItem) {
    let taskText = taskItem.querySelector("p").innerText;
    tasks = tasks.filter(task => task.text !== taskText);
    saveTasks();
    renderTasks();
}

function filter(event) {
    let filter = event.target.id;
    allBtn.classList.remove("active");
    notStartedBtn.classList.remove("active");
    inProgressBtn.classList.remove("active");
    completedBtn.classList.remove("active");
    event.target.classList.add("active");
    renderTasks(filter);
}

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks(filter = "filter-all") {
    taskList.innerHTML = "";
    tasks.forEach(task => {
        if (filter === "filter-all" || 
            (filter === "filter-notStarted" && task.status === "notStarted") || 
            (filter === "filter-progress" && task.status === "inProgress") || 
            (filter === "filter-completed" && task.status === "completed")) {
            let taskElement = document.createElement("li");
            taskElement.classList.add("task-item", task.status);

            let taskText = document.createElement("p");
            taskText.innerText = task.text;
            taskElement.appendChild(taskText);

            let statusDropdown = document.createElement("div");
            statusDropdown.classList.add("status-dropdown");

            let statusNotStarted = document.createElement("div");
            statusNotStarted.classList.add("status-notStarted");
            statusNotStarted.innerText = "Not Started";

            let statusProgress = document.createElement("div");
            statusProgress.classList.add("status-progress");
            statusProgress.innerText = "In Progress";
            statusProgress.style.visibility = "hidden";

            let statusCompleted = document.createElement("div");
            statusCompleted.classList.add("status-completed");
            statusCompleted.innerText = "Completed";
            statusCompleted.style.visibility = "hidden";

            if (task.status === "notStarted") {
                statusNotStarted.style.visibility = "visible";
            } else if (task.status === "inProgress") {
                statusProgress.style.visibility = "visible";
            } else if (task.status === "completed") {
                statusCompleted.style.visibility = "visible";
            }
            
            if (task.status === "notStarted") {
                statusDropdown.appendChild(statusProgress);
                statusDropdown.appendChild(statusNotStarted);
                statusDropdown.appendChild(statusCompleted);
            }
            else if (task.status === "inProgress") {
                statusDropdown.appendChild(statusNotStarted);
                statusDropdown.appendChild(statusProgress);
                statusDropdown.appendChild(statusCompleted);
            }
            else if (task.status === "completed") {
                statusDropdown.appendChild(statusNotStarted);
                statusDropdown.appendChild(statusCompleted);
                statusDropdown.appendChild(statusProgress);
            }

            taskElement.appendChild(statusDropdown);

            let editDeleteContainer = document.createElement("div");
            editDeleteContainer.classList.add("editDeleteContainer");

            let editButton = document.createElement("button");
            editButton.classList.add("edit-btn");
            editButton.innerText = "Edit";

            let deleteButton = document.createElement("button");
            deleteButton.classList.add("delete-btn");
            deleteButton.innerText = "Delete";

            editDeleteContainer.appendChild(editButton);
            editDeleteContainer.appendChild(deleteButton);

            taskElement.appendChild(editDeleteContainer);

            taskList.appendChild(taskElement);
        }
    });
}

// Initial render
renderTasks();