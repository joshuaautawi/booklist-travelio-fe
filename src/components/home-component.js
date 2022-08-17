import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const BASE_API = "https://www.googleapis.com/books/v1/volumes?q=";

const WISHLISH_API = "https://travellio-wish-list.herokuapp.com/wishlist";
const axios = require("axios");

function Home() {
  const [booklists, setBookList] = useState([]);
  let [param, setParam] = useState("");
  let [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(true);
  const [loadingButton, setLoadingButton] = useState(false);
  useEffect(() => {
    GetBookList();
  }, [inputValue]);

  const GetBookList = async () => {
    if (!inputValue) inputValue = "a";
    const data = await axios.get(BASE_API + inputValue);
    setBookList(data.data);
    setLoading(false);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    
    setInputValue(e.target[0].value);
    setParam("")
  };

  const filtered = async (id) => {
    const filterValue = booklists.items.find((e) => e.id === id);
    try {
      setLoadingButton(true);
      console.log(filterValue.volumeInfo)
      await axios.post(WISHLISH_API, {
        title: filterValue.volumeInfo.title,
        thumbnail: filterValue.volumeInfo.imageLinks.thumbnail,
        author: filterValue.volumeInfo.authors,
        rating: filterValue.volumeInfo.averageRating || 0,
      });
    } catch (e) {
      console.log("error");
    } finally {
      setLoadingButton(false);
    }
  };

  return (
    <div className="App">
      {loading && <h1>Loading...</h1>}
      <form className="search-form" onSubmit={onSubmit}>
        <input
          className="input"
          placeholder="input"
          value={param}
          onChange={(e) => setParam(e.target.value)}
        ></input>
        <button type="submit" className="button" >
          Search
        </button>
      </form>
      {!loading && (
        <div className="booklists">
          {booklists.items.map((list, index) => {
            return (
              <div className="booklist" key={list.id}>
                <div className="thumbnail">
                  <img
                    src={list.volumeInfo.imageLinks.thumbnail}
                    alt="book_image"
                  ></img>
                </div>
                <div>
                  <h2 className="title"> {list.volumeInfo.title} </h2>
                  <p className="author">Author : {list.volumeInfo.authors}</p>
                  <p className="rating">
                    {" "}
                    Rating : {list.volumeInfo.averageRating || 0}
                  </p>

                  <button className="add-wishlist-button" onClick={() => filtered(list.id)}>
                    {loadingButton ? "loading..." : "Add"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Home;
