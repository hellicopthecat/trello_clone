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
const Board = styled.div`
  padding: 30px 10px 20px 10px;
  border-radius: 10px;
  background-color: ${(props) => props.theme.cardBoard};
  min-height: 180px;
`;
const Card = styled.div`
  padding: 5px 10px;
  border-radius: 5px;
  margin-bottom: 5px;
  background-color: ${(props) => props.theme.cardBg};
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
  const onDragEnd = ({draggableId, destination, source}: DropResult) => {
    if (!destination) return;
    setTodos((oldTodos) => {
      const copyTodos = [...oldTodos];
      // 1) Delete itmes on source.index
      copyTodos.splice(source.index, 1);
      // 2) put back in items on the destination.index
      copyTodos.splice(destination?.index, 0, draggableId);
      return copyTodos;
    });
  };
  return (
    <>
      <GlobalStyle />
      <DragDropContext onDragEnd={onDragEnd}>
        <Wrapper>
          <Boards>
            <Droppable droppableId="one">
              {(provide) => (
                <Board ref={provide.innerRef} {...provide.droppableProps}>
                  {toDos.map((todo, index) => (
                    <Draggable key={todo} draggableId={todo} index={index}>
                      {(magic) => (
                        <Card
                          ref={magic.innerRef}
                          {...magic.draggableProps}
                          {...magic.dragHandleProps}
                        >
                          {todo}
                        </Card>
                      )}
                    </Draggable>
                  ))}
                  {provide.placeholder}
                </Board>
              )}
            </Droppable>
          </Boards>
        </Wrapper>
      </DragDropContext>
    </>
  );
}

export default App;
