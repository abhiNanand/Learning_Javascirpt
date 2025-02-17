// Initializing To-Do list from local storage
interface TodoItem {
    task: string;
    c: 'pending' | 'completed';
  }
  
  let todolist: TodoItem[] = JSON.parse(localStorage.getItem('todolist') || '[]');
  
  // Function to save tasks to local storage
  function saveTask(): void {
    localStorage.setItem('todolist', JSON.stringify(todolist));
  }
  
  // Adding event listener to "Enter" key for adding a task
  const clickEnter = document.querySelector<HTMLInputElement>('#text');
  clickEnter?.addEventListener('keypress', (event: KeyboardEvent) => {
    if (event.key === 'Enter') {
      event.preventDefault(); // Prevents page refresh
      addTodo();
    }
  });
  
  // Function to add a task
  function addTodo(): void {
    const input = document.querySelector<HTMLInputElement>('#text');
    const itemList = input?.value.trim();
    
    if (!itemList) {
      alert('Task cannot be empty');
      return;
    }
  
    todolist.push({ task: itemList, c: 'pending' });
    if (input) input.value = ''; // Reset input field
    saveTask();
    showTask('all');
  }
  
  // Function to handle checkbox toggle
  function checkFunction(index: number, id: string, taskType: string): void {
    const checkbox = document.querySelector<HTMLInputElement>(`#${id}`);
  
    if (checkbox?.checked) {
      todolist[index].c = 'completed';
    } else {
      todolist[index].c = 'pending';
    }
  
    saveTask();
  
    if (taskType !== 'all') {
      showTask(taskType);
    }
  }
  
  // Function to delete a task
  function deleteItems(id: string, index: number, taskType: string): void {
    todolist.splice(index, 1);
    saveTask();
    showTask(taskType);
  }
  
  // Function to edit a task
  function editTask(id: string, index: number): void {
    const textField = document.querySelector<HTMLInputElement>(`#${id}`);
    
    if (!textField) return;
    
    let prevValue = textField.value;
    textField.disabled = false;
  
    textField.addEventListener('keypress', (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        textField.disabled = true;
  
        if (textField.value.trim() === '') {
          textField.value = prevValue;
        } else {
          todolist[index].task = textField.value.trim();
          textField.setAttribute("value", textField.value.trim());
          saveTask();
        }
      }
    });
  }
  
  // Function to display tasks
  function showTask(taskType: string): void {
    let countTask = 0;
    let newHtml = '';
  
    const inputField = document.querySelector<HTMLInputElement>('#text');
    const buttonAction = document.querySelector<HTMLButtonElement>('.btn1');
  
    if (taskType !== 'all') {
      if (inputField) inputField.disabled = true;
      if (buttonAction) buttonAction.disabled = true;
    } else {
      if (inputField) inputField.disabled = false;
      if (buttonAction) buttonAction.disabled = false;
    }
  
    const show = document.querySelector<HTMLDivElement>('.showTask');
  
    todolist.forEach((task, i) => {
      let checked = task.c === 'completed' ? "checked" : "";
      if (task.c === taskType || taskType === 'all') {
        countTask++;
        newHtml += `
          <br> 
          <input type="checkbox" id="check${i}" onclick="checkFunction(${i}, 'check${i}', '${taskType}')" ${checked}>
          <input type="text" id="tasks${i}" value="${task.task}" disabled>
          <button id="editTask" onclick="editTask('tasks${i}', ${i})">Edit</button>
          <button class="btn-delete" onclick="deleteItems('check${i}', ${i}, '${taskType}')">Delete</button>
        `;
      }
    });
  
    if (countTask === 0) {
      newHtml = `<h1>No tasks available</h1>`;
    }
  
    if (show) show.innerHTML = newHtml;
  }
  
  // Initialize the page with all tasks
  showTask('all');