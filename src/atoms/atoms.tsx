import {atom, selector} from "recoil";

// export const minuteState = atom({
//   key: "minutes",
//   default: 0,
// });

// export const hourSelector = selector({
//   key: "hours",
//   get: ({get}) => {
//     const minutes = get(minuteState);
//     return Math.floor(minutes / 60);
//   },
//   set: ({set}, newValue) => {
//     const minutes = Number(newValue) * 60;
//     set(minuteState, minutes);
//   },
// });

export interface ITodo {
  id: number;
  text: string;
}
interface ITodoState {
  [key: string]: ITodo[];
}
export const toDoState = atom<ITodoState>({
  key: "toDo",
  default: {
    to_do: [],
    doing: [],
    done: [],
  },
});
