import { AnyAction } from "redux";
import {
  GET_CHARACTERS_REQUEST,
  GET_CHARACTERS_SUCCESS,
  GET_CHARACTERS_FAILURE,
  GET_CHARACTER_BY_ID_REQUEST,
  GET_CHARACTER_BY_ID_SUCCESS,
  GET_CHARACTER_BY_ID_FAILURE,
} from "../actions/characterActions";
import { CharacterData } from "../types";

interface CharacterListState {
  characters: CharacterData[];
  loading: boolean;
  error: string | null;
}

interface CharacterDetailState {
  character: CharacterData | null;
  loading: boolean;
  error: string | null;
}

const initialCharacterListState: CharacterListState = {
  characters: [],
  loading: false,
  error: null,
};

const initialCharacterDetailState: CharacterDetailState = {
  character: null,
  loading: false,
  error: null,
};

export const characterListReducer = (
  state = initialCharacterListState,
  action: AnyAction
) => {
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
        loading: false,
        error: null,
      };
    case GET_CHARACTERS_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export const characterDetailReducer = (
  state = initialCharacterDetailState,
  action: AnyAction
) => {
  switch (action.type) {
    case GET_CHARACTER_BY_ID_REQUEST:
      return { ...state, loading: true, error: null };
    case GET_CHARACTER_BY_ID_SUCCESS:
      return { ...state, character: action.payload, loading: false };
    case GET_CHARACTER_BY_ID_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
