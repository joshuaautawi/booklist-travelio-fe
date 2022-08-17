import React from "react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
const BASE_API = "https://www.googleapis.com/books/v1/volumes?q=";
const WISHLISH_API = "https://travellio-wish-list.herokuapp.com/wishlist";
const axios = require("axios");

function Home() {
  const [booklists, setBookList] = useState([]);
  const [param, setParam] = useState("");
  const [newWishlist, setNewWishlist] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    GetBookList();
  }, []);

  const GetBookList = async () => {
    const data = await axios.get(BASE_API + "coffee");
    setBookList(data.data);
    setLoading(false);
  };

  const addToWishlish = async (title, thumbnail, authors, rating) => {
    await axios.post(WISHLISH_API, {
      title,
      thumbnail,
      authors,
      rating,
    });
  };
  return (
    <div className="App">
      {loading && <h1>Loading mass...</h1>}
      <form className="search-form" target="_blank">
        <input
          className="input"
          placeholder="input"
          value={param}
          onChange={(e) => setParam(e.target.value)}
        ></input>
        <button type="submit" className="button">
          Search
        </button>
      </form>
      {!loading && (
        <div className="booklists">
          {booklists.items.map((list, index) => {
            console.log({ id: list });
            return (
              <div className="booklist" key={list._id}>
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

                  <Link
                    className="add-button"
                    key={list.id}
                    to={`/success/${list.id}`}
                  >
                    Add to Wishlish{" "}
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
      )
    </div>
  );
}

export default Home;
