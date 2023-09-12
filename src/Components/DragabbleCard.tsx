import React from "react";
import {Draggable} from "react-beautiful-dnd";
import styled from "styled-components";

const Card = styled.div<{isDragging: boolean}>`
  padding: 5px 10px;
  border-radius: 5px;
  margin-bottom: 5px;
  background-color: ${(props) => props.theme.cardBg};
  box-shadow: ${(props) =>
    props.isDragging ? "5px 3px 3px rgba(0,0,0,0.1)" : "none"};
`;

interface IDraggableCardProps {
  todoText: string;
  todoId: number;
  index: number;
}

function DragabbleCard({todoId, todoText, index}: IDraggableCardProps) {
  return (
    <Draggable key={todoId} draggableId={todoId + ""} index={index}>
      {(magic, snapshot) => (
        <Card
          isDragging={snapshot.isDragging}
          ref={magic.innerRef}
          {...magic.draggableProps}
          {...magic.dragHandleProps}
        >
          {todoText}
        </Card>
      )}
    </Draggable>
  );
}

export default React.memo(DragabbleCard);
