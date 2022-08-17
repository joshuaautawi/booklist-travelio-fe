import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
const BASE_API = "https://www.googleapis.com/books/v1/volumes?q=";
const WISHLISH_API = "https://travellio-wish-list.herokuapp.com/wishlist";

function Added() {
  let { id } = useParams();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    getBookById();
  },[]);
  const getBookById = async (e) => {
    if (e && e.preventDefault) e.preventDefault();
    try {
      const data = await axios.get(BASE_API + id);

      await axios.post(WISHLISH_API, {
        title: data.data.items[0].volumeInfo.title,
        thumbnail: data.data.items[0].volumeInfo.imageLinks.thumbnail,
        authors: data.data.items[0].volumeInfo.authors,
        rating: data.data.items[0].volumeInfo.averageRating || 0,
      });
      setLoading(false);
      navigate("/");
    } catch (e) {
      console.log("error");
    }
  };

  return <div className="App">{loading && <h1>Loading...</h1>}</div>;
}

export default Added;
