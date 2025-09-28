import { useState, useEffect } from "react";
import axios from "axios";

const API_URL = 'http://localhost:5000/api/todos'; 

interface Todo {
 
    _id: string; 
    text: string;
}

function TodoPage(){
    const [input, setInput] = useState('');
    const [todos, setTodos] = useState<Todo[]>([]);
    

    useEffect(()=>{
        const fetchTodos = async()=> {
            try{
                const response = await axios.get(API_URL);
                setTodos(response.data);
            }catch(error){
                console.error("Error fetching todos:", error);
            }
        };
        fetchTodos();
    }, [])

 
    const handleAdd = async() => {
        if (!input.trim()) return;

        try{
 
            const response = await axios.post<Todo>(API_URL, {text: input});
            setTodos(prevTodos => [...prevTodos, response.data]);
            setInput('');
        }catch(error){
            console.error("Error adding todo:", error);
        }
    }


    const handleRemove = async (_id: string): Promise<void> => {
        try{
            await axios.delete(`${API_URL}/${_id}`);
    
            setTodos(prevTodos => prevTodos.filter((todo) => todo._id !== _id)); 
        }catch(error){
            console.error("Error removing todo: ", error);
        }
    }

    return(
        <>
        <input 
            value={input} 
            onChange={(e) => setInput(e.target.value)} 
            type="text"
        />
        <button onClick={handleAdd} >  Add </button>


        {todos.map(singleTodo=> (
        
            <div key={singleTodo._id} >
                {singleTodo.text} <br />
      
                <button onClick={() => handleRemove(singleTodo._id)} > X </button>
            </div>
        ))}

        </>
    )
}


export default TodoPage;