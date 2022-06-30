import React from 'react';
import styled from 'styled-components';
import { useTodoState } from '../TodoContext';

//이런 방식이 3. styled-components
const TodoHeadBlock = styled.div`
    padding: 48px 32px 24px;
    border-bottom: 1px solid #e9ecef;
    h1 {
        font-size: 36px;
        color: #343a40;
    }
    .day {
        margin-top: 4px;
        color: #868e96;
        font-size: 21px;
    }
    .tasks-left {
        color: #20c997;
        font-size: 18px;
        margin-top: 40px;
        font-weight: bold;
    }
`;
//6.27
const TodoHead = () => {
    //*context를 사용하여 state값을 반환함
    const todos = useTodoState();
    // console.log(todos);      //항목 잘 배열에 담기는지 찍어본거임
    //*todos배열 항목 중 done값이 false인 항목만 새배열로 반환해서
    // undoneTasks에 담음    (false여야 아직 안한거라서 -> 할일의 갯수가 됨)
    //- 배열이라서 filter()사용 가능! -> todo.done이 !(false)인 애들만 새로운 배열이 될거임
    const undoneTasks = todos.filter(todo => !todo.done );
    const today = new Date();
    const dateString = today.toLocaleDateString('ko-KR', {                  //'ko-KR' 한국시간으로
        year: 'numeric',
        month: 'long',
        day: 'numeric'
        //mdn - toLocalDateString 검색해서 '표기법' 찾아보기!
    });
    const dayname = today.toLocaleDateString('ko-KR', { weekday: 'long'});          //'ko-KR' 한국시간으로 / 길게 받겠다!
    //요일 이렇게 해줘도 되고!
    //switch문으로 각각 요일마다 case로 줘서 해도됨
    return (
        <TodoHeadBlock>
            <h1>{dateString}</h1>
            <div className='day'>{dayname}</div>
            <div className='tasks-left'>할 일 {undoneTasks.length}개 남음</div>
        </TodoHeadBlock>
    );
};


//🧡props로 받은거
// const TodoHead = (props) => {
//     return (
//         <TodoHeadBlock>
//             <h1>2022년 6월 23일</h1>
//             <div className='day'>목요일</div>
//             <div className='tasks-left'>할 일 2개 남음</div>
//         </TodoHeadBlock>
//     );
// };

export default TodoHead;