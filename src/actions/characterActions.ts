import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import axios from "axios";
import { CharacterData } from "../types";

export const GET_CHARACTERS_REQUEST = "GET_CHARACTERS_REQUEST";
export const GET_CHARACTERS_SUCCESS = "GET_CHARACTERS_SUCCESS";
export const GET_CHARACTERS_FAILURE = "GET_CHARACTERS_FAILURE";

export const fetchCharacters = () => {
  return async (dispatch: ThunkDispatch<any, any, AnyAction>) => {
    dispatch({ type: GET_CHARACTERS_REQUEST });
    console.log("fetching.");
    try {
      let page = 1;
      let fetchedCharacters: CharacterData[] = [];

      while (true) {
        const response = await axios.get(
          `https://rickandmortyapi.com/api/character?page=${page}`
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
              type: result.type,
              gender: result.gender,
              origin: result.origin,
              location: result.location,
              episode: result.episode,
            })
          );
          fetchedCharacters = fetchedCharacters.concat(charactersOnPage);
        }

        if (data.info && data.info.next) {
          page++;
        } else {
          break;
        }
      }

      dispatch({
        type: GET_CHARACTERS_SUCCESS,
        payload: fetchedCharacters,
      });
    } catch (error: any) {
      dispatch({ type: GET_CHARACTERS_FAILURE, payload: error.message });
    }
  };
};
