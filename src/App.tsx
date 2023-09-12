import React from "react";
import {GlobalStyle} from "./theme/reset";
import {useRecoilState, useRecoilValue} from "recoil";

import {
  DragDropContext,
  Draggable,
  DropResult,
  Droppable,
} from "react-beautiful-dnd";
import {styled} from "styled-components";
import {toDoState} from "./atoms/atoms";
import Board from "./Components/Board";

const Wrapper = styled.div`
  display: flex;
  max-width: 600px;
  width: 100%;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;
const Boards = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(3, 1fr);
`;

function App() {
  // const [minutes, setMinutes] = useRecoilState(minuteState);
  // const [hours, setHours] = useRecoilState(hourSelector);
  // const minutesChange = (event: React.FormEvent<HTMLInputElement>) => {
  //   //+를 붙이면 string에서 넘어오는 것을 number로 바꿔준다.
  //   setMinutes(+event.currentTarget.value);
  // };
  // const onHourChange = (event: React.FormEvent<HTMLInputElement>) => {
  //   setHours(+event.currentTarget.value);
  // };
  const [toDos, setTodos] = useRecoilState(toDoState);
  const onDragEnd = (info: DropResult) => {
    const {draggableId, destination, source} = info;
    if (!destination) return;
    if (destination?.droppableId === source.droppableId) {
      setTodos((oldTodos) => {
        const boardCopy = [...oldTodos[source.droppableId]];
        const taskObj = boardCopy[source.index];
        // 1) Delete itmes on source.index
        boardCopy.splice(source.index, 1);
        // 2) put back in items on the destination.index
        boardCopy.splice(destination?.index, 0, taskObj);
        return {
          ...oldTodos,
          [source.droppableId]: boardCopy,
        };
      });
    }
    if (destination.droppableId !== source.droppableId) {
      //cross board
      setTodos((allBoard) => {
        const sourceBoard = [...allBoard[source.droppableId]];
        const targetBoard = [...allBoard[destination.droppableId]];
        const taskObj = sourceBoard[source.index];
        sourceBoard.splice(source.index, 1);
        targetBoard.splice(destination?.index, 0, taskObj);
        return {
          ...allBoard,
          [source.droppableId]: sourceBoard,
          [destination.droppableId]: targetBoard,
        };
      });
    }
  };

  return (
    <>
      <GlobalStyle />
      <DragDropContext onDragEnd={onDragEnd}>
        <Wrapper>
          <Boards>
            {Object.keys(toDos).map((boardID) => (
              <Board boardID={boardID} toDos={toDos[boardID]} key={boardID} />
            ))}
          </Boards>
        </Wrapper>
      </DragDropContext>
    </>
  );
}

export default App;
