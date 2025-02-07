

interface TODO 
{

    task:string;
    c:'pending'|'completed';

}

let todolist: TODO[] =[];
todolist.push({task:"hello",c:2});
todolist.push({task:"llo",c:0});
todolist.push({task:"heo",c:1});
todolist.push({task:1,c:0});

console.log(todolist);