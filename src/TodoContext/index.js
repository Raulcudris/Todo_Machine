import React, { useState } from 'react';
import { useLocalStorage } from './useLocalStorage';

const TodoContext = React.createContext();

function TodoProvider (props){
    const {
        item: todos,
        saveItem: saveTodos,
        loading,
        error,
      } = useLocalStorage('TODOS_V1',[]);
    
      const [ searchValue, setSearchValue] = useState('');
      const [openModal, setOpenModal ] = React.useState(false);
    
      const completedTodos = todos.filter(todo => !!todo.completed).length;
      const totalTodos = todos.length;
      
      let searchedTodos = [];
    
      if (!searchValue.length >= 1) {
        searchedTodos = todos;
      } else {
        searchedTodos = todos.filter(todo => {
          const todoText = todo.text.toLowerCase();
          const searchText = searchValue.toLowerCase();
          return todoText.includes(searchText);
        });
      }
    
      const addTodo = (text) => {
        const newTodos = [...todos];
        newTodos.push({
          completed: false,
          text,
        });
        saveTodos(newTodos);
      };

      const completeTodo =(text) =>{
        const todoIndex = todos.findIndex(todo => todo.text === text);
        const newTodos = [...todos];
        newTodos[todoIndex].completed = true;
        saveTodos(newTodos);
    
        // todos[todoIndex]= {
        //   text:todos[todoIndex].text,
        //   completed: true,
        // };
      };
    
      const deleteTodo =(text) =>{
        const todoIndex = todos.findIndex(todo => todo.text === text);
        const newTodos = [...todos];
        newTodos.splice(todoIndex,1);
        saveTodos(newTodos);
    
      };
    return(
        <TodoContext.Provider value={{
            error,
            loading,
            totalTodos ,
            completedTodos,
            searchValue,
            setSearchValue,
            searchedTodos,
            completeTodo, 
            deleteTodo,
            openModal,
            setOpenModal,
            addTodo
        }}>
            {props.children}
        </TodoContext.Provider>
    );
}

export {TodoContext , TodoProvider }



