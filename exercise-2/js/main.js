

var taskInput = document.getElementById("new-task");
var addButton = document.getElementsByTagName("button")[0];
var incompleteTasksHolder = document.getElementById("incomplete-tasks");
var completedTasksHolder = document.getElementById("completed-tasks");

let taskID = 0;

const createNewTaskElement = function (taskString) {
    listItem = document.createElement("li");
    checkBox = document.createElement("input");
    label = document.createElement("label");
    editInput = document.createElement("input");
    editButton = document.createElement("button");
    deleteButton = document.createElement("button");

    checkBox.type = "checkbox";
    editInput.type = "text";
    editButton.innerText = "Edit";
    editButton.className = "edit";
    deleteButton.innerText = "Delete";
    deleteButton.className = "delete";
    label.innerText = taskString;

    listItem.appendChild(checkBox);
    listItem.appendChild(label);
    listItem.appendChild(editInput);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);

    localStorage.setItem('Task ' + taskID, taskString);
    taskID++;
    return listItem;
};

const addTask = function () {
    var listItemName = taskInput.value;

    if(listItemName){
        listItem = createNewTaskElement(listItemName);
        incompleteTasksHolder.appendChild(listItem);
        bindTaskEvents(listItem, taskCompleted);
        taskInput.value = "";
    } else {
        alert('You can not add an empty Item!')
        taskInput.classList.add('error');
    }

    taskInput.onclick = function() {
        const isActive = taskInput.classList.contains("error");
        if(isActive == true){
            taskInput.classList.remove('error')
        }
    }

};

const editTask = function () {
    var listItem = this.parentNode;
    var editInput = listItem.querySelectorAll("input[type=text")[0];
    var label = listItem.querySelector("label");
    var button = listItem.getElementsByTagName("button")[0];

    var containsClass = listItem.classList.contains("editMode");
    if (containsClass) {
        label.innerText = editInput.value
        button.innerText = "Edit";
    } else {
        editInput.value = label.innerText
        button.innerText = "Save";
    }

    listItem.classList.toggle("editMode");
};

const deleteTask = function () {
    var listItem = this.parentNode;
    var ul = listItem.parentNode;
    ul.removeChild(listItem);

    
};

const taskCompleted = function () {
    var listItem = this.parentNode;
    completedTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskIncomplete);
};

const taskIncomplete = function () {
    var listItem = this.parentNode;
    incompleteTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);
};

const bindTaskEvents = function (taskListItem, checkBoxEventHandler) {
    var checkBox = taskListItem.querySelectorAll("input[type=checkbox]")[0];
    var editButton = taskListItem.querySelectorAll("button.edit")[0];
    var deleteButton = taskListItem.querySelectorAll("button.delete")[0];
    editButton.onclick = editTask;
    deleteButton.onclick = deleteTask;
    checkBox.onchange = checkBoxEventHandler;
};

addButton.addEventListener("click", addTask);

for (var i = 0; i < incompleteTasksHolder.children.length; i++) {
    bindTaskEvents(incompleteTasksHolder.children[i], taskCompleted);
}

for (var i = 0; i < completedTasksHolder.children.length; i++) {
    bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}

taskInput.onkeydown = function(e) {
    if (e.key == "Enter") {
        document.getElementById('add-b').click();
    }
}

function savedToDo(){
    const keys = Object.keys(localStorage);
    let i = keys.length;
    var itemName;
    for (j = 0; j < i; j++) {
        itemName = localStorage.getItem(keys[j]);
        oldItem = createNewTaskElement(itemName);
        incompleteTasksHolder.appendChild(oldItem);
        bindTaskEvents(listItem, taskCompleted);
    }
}

savedToDo();
