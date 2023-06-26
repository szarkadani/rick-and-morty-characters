import { combineReducers } from "redux";
import {
  characterListReducer,
  characterDetailReducer,
} from "./characterReducer";

const rootReducer = combineReducers({
  characters: characterListReducer,
  character: characterDetailReducer,
});

export default rootReducer;
