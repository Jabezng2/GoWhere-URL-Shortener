import React, { useState } from 'react'
import axios from "axios";
import "./Home.css"

const Home = () => {
    const [url, setUrl] = useState("");

    const onSubmit = (e)=> {
        e.preventDefault();

        if (!url) {
          alert("Input field is empty");
          return;
        }

        axios
          .post("http://localhost:3333/short", {origUrl: url})
          .then(res => {
            console.log(res.data);
          })
          .catch(err => {
            console.log(err.message);
          });

        setUrl("")
    }
    console.log(url)

  return (
    <div className="home-container">
      <div className="home">
        <h1>URL Shortener</h1>
        <form className="url-form" onSubmit={onSubmit}>
          <input
            className="url-input"
            type="text"
            placeholder="e.g www.google.com"
            value={url}
            onChange={e => setUrl(e.target.value)}
          />
          <button type="submit" className="submit-button">
            Shorten!
          </button>
        </form>
      </div>
    </div>
  );
}

export default Home;