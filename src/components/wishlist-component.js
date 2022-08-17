import axios from "axios";
import React, { useEffect, useState } from "react";
const BASE_API = "https://travellio-wish-list.herokuapp.com/wishlist";
function Wishlist() {
  const [wishlists, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    GetWishlist();
  }, []);

  const GetWishlist = async () => {
    const data = await axios.get(BASE_API);
    setWishlist(data.data.data);
    setLoading(false);
  };
  return (
    <div className="App">
      {loading && <h1>Loading mass...</h1>}
      {!loading && (
        <div className="wishlists">
          {wishlists.map((list) => {
            return (
              <div className="wishlist" key={list._id}>
                <div className="thumbnail">
                  <img src={list.thumbnail} alt="book_image"></img>
                </div>
                <div>
                  <h2 className="title"> {list.title} </h2>
                  <p className="author">Author : {list.author.join(", ")}</p>
                  <p className="rating"> Rating : {list.rating || 0}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Wishlist;
