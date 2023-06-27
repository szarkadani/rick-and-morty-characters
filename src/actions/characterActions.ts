import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import axios from "axios";
import { CharacterData } from "../types";

export const GET_CHARACTERS_REQUEST = "GET_CHARACTERS_REQUEST";
export const GET_CHARACTERS_SUCCESS = "GET_CHARACTERS_SUCCESS";
export const GET_CHARACTERS_FAILURE = "GET_CHARACTERS_FAILURE";
export const GET_CHARACTER_BY_ID_REQUEST = "GET_CHARACTER_BY_ID_REQUEST";
export const GET_CHARACTER_BY_ID_SUCCESS = "GET_CHARACTER_BY_ID_SUCCESS";
export const GET_CHARACTER_BY_ID_FAILURE = "GET_CHARACTER_BY_ID_FAILURE";

export const fetchCharacters = (page = 1, pageSize = 20) => {
  return async (dispatch: ThunkDispatch<any, any, AnyAction>) => {
    dispatch({ type: GET_CHARACTERS_REQUEST });
    try {
      const response = await axios.get(
        `https://rickandmortyapi.com/api/character?page=${page}&pageSize=${pageSize}`
      );

      const data = response.data;

      if (data.results) {
        const charactersOnPage: CharacterData[] = data.results.map(
          (result: CharacterData) => ({
            id: result.id,
            name: result.name,
            image: result.image,
            species: result.species,
            status: result.status,
          })
        );

        dispatch({
          type: GET_CHARACTERS_SUCCESS,
          payload: charactersOnPage,
        });

        if (data.info && data.info.next) {
          const nextPage = page + 1;
          dispatch(fetchCharacters(nextPage, pageSize)); // Fetch next page recursively
        }
      } else {
        dispatch({
          type: GET_CHARACTERS_SUCCESS,
          payload: [],
        });
      }
    } catch (error: any) {
      dispatch({ type: GET_CHARACTERS_FAILURE, payload: error.message });
    }
  };
};

export const fetchCharacterById = (id: number) => {
  return async (dispatch: ThunkDispatch<any, any, AnyAction>) => {
    dispatch({ type: GET_CHARACTER_BY_ID_REQUEST });
    try {
      const response = await axios.get(
        `https://rickandmortyapi.com/api/character/${id}`
      );

      const characterData: CharacterData = {
        id: response.data.id,
        name: response.data.name,
        image: response.data.image,
        species: response.data.species,
        status: response.data.status,
        type: response.data.type,
        gender: response.data.gender,
        origin: response.data.origin,
        location: response.data.location,
        episode: response.data.episode,
      };

      dispatch({
        type: GET_CHARACTER_BY_ID_SUCCESS,
        payload: characterData,
      });
    } catch (error: any) {
      dispatch({ type: GET_CHARACTER_BY_ID_FAILURE, payload: error.message });
    }
  };
};
