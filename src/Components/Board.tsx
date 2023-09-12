import {Droppable} from "react-beautiful-dnd";
import styled from "styled-components";
import DragabbleCard from "./DragabbleCard";
import {useRef} from "react";
import {useForm} from "react-hook-form";
import {ITodo, toDoState} from "../atoms/atoms";
import {useSetRecoilState} from "recoil";

interface IBoardWrapProps {
  isDraggingOver: boolean;
  isDragginFromThis: boolean;
}

const BoardWrap = styled.div<IBoardWrapProps>`
  padding: 30px 10px 20px 10px;
  margin: 0 5px;
  border-radius: 10px;
  background-color: ${(props) =>
    props.isDraggingOver
      ? "darkgray"
      : props.isDragginFromThis
      ? "gray"
      : props.theme.cardBoard};
  min-height: 180px;
  transition: background 0.5s ease-in-out;
`;
const CardCont = styled.div`
  padding: 20px;
`;

const Form = styled.form`
  display: flex;
  width: 100%;
  margin-bottom: 10px;
  input {
    width: 100%;
  }
`;

interface IBoardProps {
  toDos: ITodo[];
  boardID: string;
}

interface IForm {
  toDo: string;
}

export default function Board({toDos, boardID}: IBoardProps) {
  const setToDos = useSetRecoilState(toDoState);
  const {register, setValue, handleSubmit} = useForm<IForm>();
  const onValid = ({toDo}: IForm) => {
    const newToDo = {
      id: Date.now(),
      text: toDo,
    };
    setToDos((allBoards) => {
      return {
        ...allBoards,
        [boardID]: [...allBoards[boardID], newToDo],
      };
    });
    setValue("toDo", "");
    console.log(toDo);
  };

  return (
    <Droppable droppableId={boardID}>
      {(provide, snapshot) => (
        <BoardWrap
          ref={provide.innerRef}
          {...provide.droppableProps}
          isDraggingOver={snapshot.isDraggingOver}
          isDragginFromThis={Boolean(snapshot.draggingFromThisWith)}
        >
          <h1 style={{marginBottom: "15px"}}>{boardID.toUpperCase()}</h1>
          <CardCont>
            <Form onSubmit={handleSubmit(onValid)}>
              <input
                {...register("toDo", {required: true})}
                type="text"
                placeholder="input text"
              />
            </Form>
            {toDos.map((todo, index) => (
              <DragabbleCard
                key={todo.id}
                index={index}
                todoText={todo.text}
                todoId={todo.id}
              />
            ))}
            {provide.placeholder}
          </CardCont>
        </BoardWrap>
      )}
    </Droppable>
  );
}
