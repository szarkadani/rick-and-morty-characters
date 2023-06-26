import { AnyAction } from "redux";
import {
  GET_CHARACTERS_REQUEST,
  GET_CHARACTERS_SUCCESS,
  GET_CHARACTERS_FAILURE,
} from "../actions/characterActions";
import { CharacterData } from "../types";

interface CharacterState {
  characters: CharacterData[];
  loading: boolean;
  error: string | null;
}

const initialState: CharacterState = {
  characters: [],
  loading: false,
  error: null,
};

const characterReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case GET_CHARACTERS_REQUEST:
      return { ...state, loading: true, error: null };
    case GET_CHARACTERS_SUCCESS:
      const { payload } = action;
      const existingIds = state.characters.map((character) => character.id);
      const newCharacters = payload.filter(
        (character: CharacterData) => !existingIds.includes(character.id)
      );
      return {
        ...state,
        characters: [...state.characters, ...newCharacters],
      };
    case GET_CHARACTERS_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default characterReducer;
