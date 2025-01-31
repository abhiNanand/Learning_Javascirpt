let todolist = [

 

];

 



const clickEnter = document.querySelector('#text');
clickEnter.addEventListener("keypress",


  function (event) {
    if (event.key === 'Enter') {
      event.preventDefault();//agar ye use nhi karenge too sahi se kaam nhi karta
      addTodo();
    }
  }
);





displayItems();


function addTodo() {
  const input = document.querySelector('#text');
  const itemList = input.value;
  if (itemList.trim() == '')      //trim removes white space
  {

    alert('Task cannot be empty');
    return;

  }

  todolist.push({task:itemList,c:0});

  input.value = '';
  displayItems();
}


function checkFunction(index, id) {

  const checkbox = document.querySelector(`#${id}`);  //if i use ("#id") there will be error. because id will go as string not value.
   
  if (checkbox.checked == true) {
     todolist[index].c=1;
     console.log(todolist[index].c);
  }
  else {
    todolist[index].c=0;
  }

}

const taskStatus = document.querySelector("#taskStatus");


taskStatus.addEventListener("change", function() {
  const selectedValue = this.value;  
  if (selectedValue === "completed") {
   
      showComplete(1);
  } else if (selectedValue === "nocompleted") {
    
    showComplete(0);
  } else {
     
    showComplete(2);
  }
});


 

//showing complete , not complete, showall
function showComplete(flag)
{

        let newhtml='';
        const show = document.querySelector('.showTask');
  for (let i = 0; i < todolist.length; i++) {



  let p="";
  if(flag==1)
   p="checked";
 else if(flag==0)
   p="";
 else
 {
    if(todolist[i].c==0)
      p="";
    else
    p="checked"; 
 }

    let items = todolist[i].c;
    
    if(items ==flag || flag==2){
    newhtml += `<br>  <input type="checkbox" id="check${i}"  onClick="checkFunction( ${i} ,id)" ${p}>   ${todolist[i].task}
     <button class='btn-delete' onclick="todolist.splice(${i}, 1);
       displayItems(todolist);"> <i class="material-icons">delete</i> </button>
    `
    }
  }
  show.innerHTML = newhtml;

}

 


function displayItems() {
  let newhtml = '';
  const show = document.querySelector('.showTask');
  for (let i = 0; i < todolist.length; i++) {
    let items = todolist[i].task;
    
    newhtml += `<br>  <input type="checkbox" id="check${i}"  onClick="checkFunction( ${i} ,id)" >   ${items}
     <button class='btn-delete' onclick="todolist.splice(${i}, 1);
       displayItems(todolist);"> <i class="material-icons">delete</i> </button>
    `
  }
  show.innerHTML = newhtml;

}







