//initilizing todo list from local storage.
let todolist = JSON.parse(localStorage.getItem('todolist')) || [];

//save tasks in localstorage
function saveTask() {
  localStorage.setItem('todolist', JSON.stringify(todolist));
}

//getting task from local storage
//add task when pressed enter.
const clickEnter:string = document.querySelector('#text');
//adding event listener to enter key
clickEnter.addEventListener('keypress', function (event) {
  if (event.key === 'Enter') {
    event.preventDefault();//agar ye use nhi karenge too sahi se kaam nhi karta. page ko refresh hone se rokta hai
    addTodo();
  }
}
);

//function to add task
function addTodo() {
  const input:string = document.querySelector('#text');
  const itemList = input.value;
  if (itemList.trim() == '') {      //trim removes white space
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
  let checkbox = document.querySelector(`#${id}`);  //if i use ("#id") there will be error. because id will go as string not value.
  if (checkbox.checked == true) {
    todolist[index].c = 'completed';
  }
  else {
    todolist[index].c = 'pending';
  }
  saveTask();   //updating in localstorage  
  if (taskType != 'all') {
    showTask(taskType);
  }
}

//selecting completed/uncompleted/all task
const taskStatus = document.querySelector("#taskStatus");
taskStatus.addEventListener("change", function () {
  const selectedValue = this.value;
  showTask(selectedValue);
});
//function to delete task
function deleteItems(id, todo_list_index, taskType) {
  const checkbox = document.querySelector(`#${id}`);
 
    todolist.splice(todo_list_index, 1);
  saveTask();
  showTask(taskType);
}

//edit task
function editTask(id,index)
{
  const textfield= document.querySelector(`#${id}`);
  let prevValue=textfield.value;
  textfield.disabled=false;


textfield.addEventListener('keypress', function (event) {
  if (event.key === 'Enter') {
    event.preventDefault();
    textfield.disabled=true;

    if(textfield.value.trim()=='')
    {
      textfield.value=prevValue;
    
    }
     
    else
   { 
    todolist[index].task=textfield.value.trim();
    textfield.setAttribute("value",textfield.value.trim());
    textfield.value=textfield.value.trim();   
    saveTask();
   }

     
  }
}
);


}
 


//showing function on page
function showTask(taskType , edit) {
  let countTask = 0;
  let newhtml = '';
 
  const inputfiled = document.querySelector('#text');
  const buttonaction = document.querySelector('.btn1');

  if (taskType != 'all') {
    inputfiled.disabled = true;
    buttonaction.disabled = true;
  }
  else {
    inputfiled.disabled = false;
    buttonaction.disabled = false;
  }

  const show = document.querySelector('.showTask');
  for (let i = 0; i < todolist.length; i++) {
    let p = "";
    if (todolist[i].c == 'pending')
      p = "";
    else
      p = "checked";
    let itemsStatus = todolist[i].c;
    if (itemsStatus == taskType || taskType == 'all') {
      let k = `<h1> hello </h1>`
      countTask++;
      newhtml += `<br> <input type="checkbox"  id="check${i}"  onclick="checkFunction( ${i} ,id,'${taskType}')" ${p}> 

      <input type="text"  id="tasks${i}"  value="${todolist[i].task}" disabled 
      > 
      

      <button id="editTask" onclick="editTask('tasks${i}',${i})"> Edit </button>
     <button class='btn-delete' onclick="deleteItems('check${i}',${i},'${taskType}');"> delete </button>
    `
    }
  }
  if (countTask == 0) {
  
    newhtml = `<h1> no task available </h1>`
  }
  show.innerHTML = newhtml;
}
showTask('all');


