import { useState } from "react";
import Input from "./Input";

function AddTask({ onAddTaskSubmit }) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    return (
       <div className="space-y-4 bg-slate-400 rounded-md shadow flex flex-col p-6">
       <Input 
         type="text"
         placeholder="Digite o título da tarefa"
         value={title}
         onChange={(event) => setTitle(event.target.value)}
         />

         <Input 
         type="text"
         placeholder="Digite a descrição da tarefa"
         value={description}
         onChange={(event) => setDescription(event.target.value)}
         />

         <button onClick={() => {
           if(!title.trim() || !description.trim()) {
            return alert("Preencha o titulo e a descrição da tarefa");
           }
           onAddTaskSubmit(title,description);
           setTitle("");
           setDescription("");
          }}  className="bg-slate-500 text-white px-4 py-2 rounded-md font-medium">Adicionar</button>
       </div>
    )
}


export default AddTask