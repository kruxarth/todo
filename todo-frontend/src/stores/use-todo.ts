import {create} from "zustand"

type Todo = {
    id: number,
    text: string,
    status?: boolean
}


interface TodoState{
    todos: Todo[],
    Add: (text: string)=> void,
    Remove: (id: number) => void,
}

const useTodo = create<TodoState>((set)=> ({
    todos: [],
    Add: (text: string)=> 
        set((state)=> ({
            todos: [...state.todos, {id: Date.now(), text}]
        })),
    Remove: (id: number)=> 
        set((state)=> ({
            todos: state.todos.filter( todo => todo.id !== id)
        })),
}))




export default useTodo;

















