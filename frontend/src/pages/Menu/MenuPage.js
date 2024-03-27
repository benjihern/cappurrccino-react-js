import { type } from "@testing-library/user-event/dist/type";
import { getAll, getAllTags, search, getAllByTag } from "../../services/foodService";
import React, { useReducer, useEffect } from "react";
import Thumbnails from "./components/Thumbnails/Thumbnails";
import { useParams } from "react-router-dom";
import Search from "./components/Search/Search";
import Tags from "./components/Tags/Tags";

const initialState = { foods: [], tags: [] };

const reducer = (state, action) => {
  switch (action.type) {
    case "FOODS_LOADED":
      return { ...state, foods: action.payload };
    case "TAGS_LOADED":
      return { ...state, tags: action.payload };
    default:
      return state;
  }
};

export default function HomePage() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { foods, tags } = state;
  const { searchTerm, tag } = useParams();

  useEffect(() => {
    getAllTags().then(tags => dispatch({ type: 'TAGS_LOADED', payload: tags }));


    const loadFoods = tag? getAll(tag) : searchTerm
      ? search(searchTerm) : getAll();

      loadFoods.then(foods => dispatch({ type: "FOODS_LOADED", payload: foods }));
  }, [searchTerm, tag]);

  return (
    <>
      <Search />
      <Tags tags={tags}/>
      <Thumbnails foods={foods} />
    </>
  );
}
