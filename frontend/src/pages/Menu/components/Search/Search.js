import React, { useState } from 'react';
import classes from "./search.module.css";
import { useNavigate, useParams } from 'react-router-dom';

Search.defaultProps = {
  searchRoute: '/search/',
  defaultRoute: '/',
};

export default function Search({ searchRoute, defaultRoute, margin }) {
  const [term, setTerm] = useState('');
  const navigate = useNavigate();
  const { searchTerm } = useParams();

  const search = async () => {
    term? navigate(searchRoute + term) : navigate(defaultRoute);
  };

  return (
    <div className={classes.container} style={{margin}}>
      <input type="text"
        placeholder="Search our menu!"
        onChange={e => setTerm(e.target.value)}
        onKeyUp={ e => e.key === "Enter" && search()}
        defaultValue={searchTerm}
      />
      <button onClick={search}>Search</button>
    </div>
  );
}
