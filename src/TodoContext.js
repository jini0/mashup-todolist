//6.27 만듬
//💚useContext를 이용
import React, { createContext, useContext, useReducer, useRef } from 'react';
//초기값 만들어주기!
const initialTodos = [
    {
        id:1,
        text: '프로젝트 생성하기',
        done: false
    },
    {
        id:2,
        text: '컴포넌트 스타일링하기',
        done: true
    },
    {
        id:3,
        text: 'Context만들기',
        done: false
    },
    {
        id:4,
        text: '기능구현하기',
        done: false
    },
];
//reduce함수
function todoReducer(state, action){
    switch(action.type){
        //action타입이 CREATE면 action객체의 todo를 
        //state 배열에 추가하기
        case 'CREATE':
        return state.concat(action.todo);
        //action타입이 TOGGLE이면 action객체의 id를
        //받아와서 state항목의 id와 일치하면 
        //일치하는 항목의 done을 반전(true면 false로 / false면 true로)
        case 'TOGGLE':
        return state.map(todo=>
            todo.id === action.id ? {...todo, done: !todo.done} : todo
        );
        //action타입이 REMOVE이면 action객체의 id를
        //state배열 항목의 id와 비교하여
        //일치하지 않는 항목만 새배열로 반환해줌
        case 'REMOVE':
        return state.filter(todo=> action.id !== todo.id );
        default:
        return state;
    }
}
//컨텐스트(컨텍스트) 생성
//- value값은 초기값으로 아무것도 안줌 : ()
//- Provider의 value값으로 각각 줄거라서? ex> value={state} / value={dispatch} / value={nextId}
const TodoStateContext = createContext();
const TodoDispatchContext = createContext();
const TodoNextIdContext = createContext();


export function TodoProvider({ children }){
    const [ state, dispatch ] = useReducer(todoReducer, initialTodos);
    const nextId = useRef(5);
    return (
        <TodoStateContext.Provider value={state}>
            <TodoDispatchContext.Provider value={dispatch}>
                <TodoNextIdContext.Provider value={nextId}>
                {children};
                </TodoNextIdContext.Provider>
            </TodoDispatchContext.Provider>
        </TodoStateContext.Provider>
    )
}
//{children} 은 App.js를 보면 <TodoProvider></TodoProvider> 안에 있는 것들이 다 children임!!
// <GlobalStyle />
// <TodoTemplate>
// <TodoHead/>
// <TodoList/>
// <TodoCreate/>
// </TodoTemplate>          //얘네들 다!



//커스텀 Hook
//- 이렇게 써도 되고 compontent에서 useState()로 써도 됨!
//- useTodoState() / useTodoDispatch() / useTodoNextId() 얘를 한 번 return해주는 애를 만든거임!
//* useContext 대신에 useTodoState() 등 얘네들을 사용해주려고!!(커스텀hook을 만듬)
//* useContext를 리턴해주는 함수를 만들어준거임! -hook(어디서든 쓸 수 있게 내보내기를 해준거임!)
export function useTodoState(){
    return useContext(TodoStateContext);
}
export function useTodoDispatch(){
    return useContext(TodoDispatchContext);
}
export function useTodoNextId(){
    return useContext(TodoNextIdContext);
}



//🧡설명 - 메모장 참고!(6.27)🧡
// ✔컨텍스트 값 사용하기
// const user = useContext(MyContext);
// import { useContext } from 'react';
// import { TodoStateContext, TodoDispatchContext } from ''
// function Sample(){
// 	const state = useContext(TodoStateContext);
// 	const dispatch = useContext(TodoDispatchContext);
// 	return <div>Sample</div>
// }

// ✔이렇게 하던걸 밑에처럼 바꿈
// import { useTodoState, useTodoDispatch } from '../TodoContext';			//얘로 바로 import해주는거!!
// function Sample(){
// 	const state = useTodoState();
// 	const dispatch = useTodoDispatch();
// }