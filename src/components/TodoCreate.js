import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { MdAdd } from 'react-icons/md';
import { useTodoDispatch, useTodoNextId } from '../TodoContext';

const CircleButton = styled.button`
    background: #38d9a9;
    &:hover {
        background: #63e6be;
    }
    z-index: 5;
    cursor: pointer;
    width: 80px;
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 60px;
    position: absolute;
    bottom: 0;
    border-radius: 50%;
    left: 50%;
    transform: translate(-50%,50%);
    color: #fff;
    border: none;
    transition: 0.3s;
    //props 받을 거라서 달러 표현식
    ${props=>
        props.open &&
        css`
            background: #ff6b6b;
            &:hover {
                background: #ff8787;
            }
            transform: translate(-50%,50%) rotate(45deg);
        `
    }
`;
const InsertForm = styled.form`
    background: #f8f9fa;
    padding: 32px 32px 72px;
    //모서리 두개만 줄거임!(사각형이 있으면 아래쪽왼쪽/아래쪽오른쪽만 둥글기를 주겠다!)
    border-bottom-left-radius: 16px;
    border-bottom-right-radius: 16px;
    border-top: 1px solid #e9ecef;
`;
const Input = styled.input`
    padding: 14px;
    border-radius: 4px;
    border: 1px solid #dee2e6;
    width: 100%;
    outline: none;
    font-size:18px;
    box-sizing: border-box;
`;

const TodoCreate = () => {
    const [ open, setOpen ] = useState(false);
    const [ value, setValue ] = useState('');       //빈문자열  / input의 값을 state로 받음
    const onToggle = ()=>setOpen(!open);

    const dispatch = useTodoDispatch();
    const nextId = useTodoNextId();
    const onChange = e => {
        setValue(e.target.value);
    }
    // const onChange = e => setValue(e.target.value);      //하나라 중괄호 생략해도 됨!

    const onSubmit = e => {
        e.preventDefault(); //새로고침 방지(원래있던 이벤트를 제거하는거 ->  cf.a태그에 있는거 link제거하는?)
        dispatch({
            type:'CREATE',
            todo: {
                id:nextId.current,
                text: value,            //input의 값을 입력받고 value로 받을거임!
                done: false,
            }
        })
        setValue('');
        setOpen(false);
        nextId.current += 1;
    }
    return (
        <>
            {open && (
                // form태그에 submit해준거
                <InsertForm onSubmit={onSubmit}>
                    {/* <InsertForm> : open이 true일 때만 나타나야함 ->{ opne && } : &&연산자 해주기 */}
                    <Input placeholder='할 일을 입력한 후 Enter누르세요.'
                    value={value} onChange={onChange} />
                </InsertForm>
            )}
            <CircleButton open={open} onClick={onToggle}>
                <MdAdd/>
            </CircleButton>
        </>
    );
};
// 💙preventDefault💙
// https://pa-pico.tistory.com/20
// * e.preventDefault는 고유 동작을 중단시키고, e.stopPropagation 는 상위 엘리먼트들로의 이벤트 전파를 중단시킨다.
// https://programming119.tistory.com/100 [개발자 아저씨들 힘을모아:티스토리]
// a 태그나 submit 태그는 누르게 되면 href 를 통해 이동하거나 , 창이 새로고침하여 실행됩니다.
// preventDefault 를 통해 이러한 동작을 막아줄 수 있습니다.
// 주로 사용되는 경우는
// 1. a 태그를 눌렀을때도 href 링크로 이동하지 않게 할 경우
// 2. form 안에 submit 역할을 하는 버튼을 눌렀어도 새로 실행하지 않게 하고싶을 경우 (submit은 작동됨)



//🧡props로 받은거
// const TodoCreate = (props) => {
//     const [ open, setOpen ] = useState(false);
//     // const onToggle = ()=>{
//     //     setOpen(!open);
//     // }
//     const onToggle = ()=>setOpen(!open);

//     return (
//         <>
//             {open && (
//                 <InsertForm>
//                     {/* <InsertForm> : open이 true일 때만 나타나야함 ->{ opne && } : &&연산자 해주기 */}
//                     <Input placeholder='할 일을 입력한 후 Enter누르세요.' />
//                 </InsertForm>
//             )}
//             <CircleButton open={open} onClick={onToggle}>
//                 <MdAdd/>
//             </CircleButton>
//         </>
//     );
// };

export default TodoCreate;