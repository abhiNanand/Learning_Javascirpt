//initilizing todo list from local storage.
var todolist = JSON.parse(localStorage.getItem('todolist')) || [];
//save tasks in localstorage
function saveTask() {
    localStorage.setItem('todolist', JSON.stringify(todolist));
}
//getting task from local storage
//add task when pressed enter.
var clickEnter = document.querySelector('#text');
//adding event listener to enter key
clickEnter.addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        event.preventDefault(); //agar ye use nhi karenge too sahi se kaam nhi karta. page ko refresh hone se rokta hai
        addTodo();
    }
});
//function to add task
function addTodo() {
    var input = document.querySelector('#text');
    var itemList = input.value;
    if (itemList.trim() == '') { //trim removes white space
        alert('Task cannot be empty');
        return;
    }
    todolist.push({ task: itemList, c: 'pending' });
    input.value = '';
    saveTask(); //saving task to local storage
    showTask('all');
}
//handling checkbox
function checkFunction(index, id, taskType) {
    var checkbox = document.querySelector("#".concat(id)); //if i use ("#id") there will be error. because id will go as string not value.
    if (checkbox.checked == true) {
        todolist[index].c = 'completed';
    }
    else {
        todolist[index].c = 'pending';
    }
    saveTask(); //updating in localstorage  
    if (taskType != 'all') {
        showTask(taskType);
    }
}
//selecting completed/uncompleted/all task
var taskStatus = document.querySelector("#taskStatus");
taskStatus.addEventListener("change", function () {
    var selectedValue = this.value;
    showTask(selectedValue);
});
//function to delete task
function deleteItems(id, todo_list_index, taskType) {
    var checkbox = document.querySelector("#".concat(id));
    todolist.splice(todo_list_index, 1);
    saveTask();
    showTask(taskType);
}
//edit task
function editTask(id, index) {
    var textfield = document.querySelector("#".concat(id));
    var prevValue = textfield.value;
    textfield.disabled = false;
    textfield.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            textfield.disabled = true;
            if (textfield.value.trim() == '') {
                textfield.value = prevValue;
            }
            else {
                todolist[index].task = textfield.value.trim();
                textfield.setAttribute("value", textfield.value.trim());
                textfield.value = textfield.value.trim();
                saveTask();
            }
        }
    });
}
//showing function on page
function showTask(taskType, edit) {
    var countTask = 0;
    var newhtml = '';
    var inputfiled = document.querySelector('#text');
    var buttonaction = document.querySelector('.btn1');
    if (taskType != 'all') {
        inputfiled.disabled = true;
        buttonaction.disabled = true;
    }
    else {
        inputfiled.disabled = false;
        buttonaction.disabled = false;
    }
    var show = document.querySelector('.showTask');
    for (var i = 0; i < todolist.length; i++) {
        var p = "";
        if (todolist[i].c == 'pending')
            p = "";
        else
            p = "checked";
        var itemsStatus = todolist[i].c;
        if (itemsStatus == taskType || taskType == 'all') {
            var k = "<h1> hello </h1>";
            countTask++;
            newhtml += "<br> <input type=\"checkbox\"  id=\"check".concat(i, "\"  onclick=\"checkFunction( ").concat(i, " ,id,'").concat(taskType, "')\" ").concat(p, "> \n\n      <input type=\"text\"  id=\"tasks").concat(i, "\"  value=\"").concat(todolist[i].task, "\" disabled \n      > \n      \n\n      <button id=\"editTask\" onclick=\"editTask('tasks").concat(i, "',").concat(i, ")\"> Edit </button>\n     <button class='btn-delete' onclick=\"deleteItems('check").concat(i, "',").concat(i, ",'").concat(taskType, "');\"> delete </button>\n    ");
        }
    }
    if (countTask == 0) {
        newhtml = "<h1> no task available </h1>";
    }
    show.innerHTML = newhtml;
}
showTask('all');
