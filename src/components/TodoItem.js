import React from 'react';
import styled,{ css } from 'styled-components';
import { MdDone, MdDelete } from 'react-icons/md';
// 쓸 아이콘 { MdDone, MdDelete } / react-icons/md : md -> Material Design icons 아이콘 이름을 저렇게 적어주면 됨!
// 쓰는 법 다 적혀있음
// https://react-icons.github.io/react-icons/
// https://react-icons.github.io/react-icons/icons?name=md
// 터미널에 yarn add react-icons styled-components 해줘야함
import { useTodoDispatch } from '../TodoContext';

const Remove = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    color: #dee2e6;
    font-size: 24px;
    cursor: pointer;
    // 마우스 올렸을 때 색상바뀌는거(삭제버튼의!)
    &:hover {
        color: #ff6b6b;
    }
    display: none;
`;
const TodoItemBlock = styled.div`
    display: flex;
    align-items: center;
    padding-top: 12px;
    padding-bottom: 12px;
    &:hover {
        ${Remove}{
            display: initial;
            //원본으로 지정?
        }
    }
`;
const CheckCircle = styled.div`
    width: 32px;
    height: 32px;
    border-radius: 50%;
    border: 1px solid #ced4da;
    font-size: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 20px;
    cursor: pointer;
    ${props => 
        props.done &&
        css`
            border: 1px solid #38d9a9;
            color: #38d9a9;
        `
    }
    // add class와 유사!
    // props.done이 true면 css가 적용 / false면 css적힌거 적용안됨(백틱안에 내용)  
`;
const Text = styled.div`
    flex: 1;
    font-size: 21px;
    color: #495057;
    ${props =>
        props.done &&
        css`
            color: #ced4da;
        `
    }
`;
const TodoItem = ({id, done, text}) => {
    const dispatch = useTodoDispatch();
    //목록(항목(circle))을 클릭했을때 실행
    const onToggle = () => dispatch({type:'TOGGLE', id:id });            //id도 전달해줘야함
    const onRemove = () => dispatch({type:'REMOVE', id:id })             //id도 전달해줘야함
    return (
        <TodoItemBlock>
            {/* 삼항연산자 대신에 &&연산자 사용한거 -> 하나가 false면 결과가 나옴!
            done이 false면 <MdDone/>까지 가지 않음! */}
            <CheckCircle done={done} onClick={onToggle}>{done && <MdDone/>}</CheckCircle>
            <Text done={done}>{text}</Text>
            <Remove onClick={onRemove}>
                <MdDelete/>
            </Remove>
        </TodoItemBlock>
    );
};

//🧡props로 받은거
// const TodoItem = ({id, done, text}) => {
//     return (
//         <TodoItemBlock>
//             {/* 삼항연산자 대신에 &&연산자 사용한거 -> 하나가 false면 결과가 나옴!
//             done이 false면 <MdDone/>까지 가지 않음! */}
//             <CheckCircle done={done}>{done && <MdDone/>}</CheckCircle>
//             <Text done={done}>{text}</Text>
//             <Remove>
//                 <MdDelete/>
//             </Remove>
//         </TodoItemBlock>
//     );
// };

export default TodoItem;