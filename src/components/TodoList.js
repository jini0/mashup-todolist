import React from 'react';
import styled from 'styled-components';
import TodoItem from './TodoItem';
import { useTodoState } from '../TodoContext';

const TodoListBlock = styled.div`
    padding: 20px 32px;
    overflow-y: auto;
    // background: gray;
    flex: 1;    
    //TodoListBlock이 꽉차게 하고 싶어서!
    //flex: 1; -> 이걸 주면 100%줌! / 자식이 여러개 있으면 알아서 나누어 가짐!!
`;

const TodoList = () => {
    const todos = useTodoState();
    return (
        <TodoListBlock>
            {todos.map(todo=>(
                <TodoItem 
                key={todo.id}
                id={todo.id}
                text={todo.text}
                done={todo.done}
                />
            ))}
        </TodoListBlock>
    );
};

//🧡props로 받은거
// const TodoList = (props) => {
//     return (
//         <TodoListBlock>
//             <TodoItem text="리액트 스타일 공부하기" done={true} />
//             <TodoItem text="캔버스 게임 만들기" done={false} />
//             <TodoItem text="리액트 state, props 공부하기" done={false} />
//         </TodoListBlock>
//     );
// };

export default TodoList;