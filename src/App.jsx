import { useEffect, useState } from "react";
import AddTask from "./components/AddTask";
import Tasks from "./components/Tasks";
import {v4} from 'uuid';
import Title from "./components/Tile";

function App(){
  const [tasks, setTasks] = useState(JSON.parse(localStorage.getItem("tasks")) || [])

function onTaskClick(taskId) {
  const newTasks = tasks.map(task => {
    //preciso atualizar a tarefa
    if(task.id === taskId) {
      return {...task, isCompleted: !task.isCompleted}
    }
    //não preciso atualizar essa tarefa
    return task;
  });
  setTasks(newTasks);
}

function onDeleteTaskClick(taskId) {
  const newTasks = tasks.filter((task) => task.id !== taskId)
  setTasks(newTasks)
}

useEffect(() => {
   localStorage.setItem("tasks",JSON.stringify(tasks))
},[tasks])

useEffect(() => {
 const fetchTasks = async () => {
  const response = await fetch(
    "https://jsonplaceholder.typicode.com/todos?_limit=10",
    {
      method: "GET",
    }
  );
  //pegar os dados da api
  const data = await response.json();
  //armazenar no state
  setTasks(data)
 };
 //sequise pode chamar api para pegar as tarefas
 //fetchTasks()
},[])

function onAddTaskSubmit(title, description) {
  const newTask = {
    id: tasks.length + 1,
    title,
    description,
    isCompleted: false,
  };
  setTasks([...tasks, newTask]);
}


return (
  <div className="w-screen min-h-screen bg-slate-500 flex justify-center pe-6">
    <div className="w-[500px] space-y-4">
     <Title>
      Gerenciador de Tarefas
     </Title>
      <AddTask onAddTaskSubmit={onAddTaskSubmit} />

      <Tasks tasks={tasks} onTaskClick={onTaskClick} onDeleteTaskClick={onDeleteTaskClick} />
    </div>
  </div>
);


}

export default App