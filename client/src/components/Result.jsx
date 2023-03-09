import React, { useEffect, useState } from 'react'
import axios from "axios"
import "./Result.css"

const Result = () => {
    const [urls, setUrls] = useState([]);

    useEffect(() => {
      const fetchUrlAndSetUrl = async () => {
        const result = await axios.get("http://localhost:3333/all");
        setUrls(result.data);
      };
      fetchUrlAndSetUrl();
      console.log("Hello");
    }, [urls]);
  //Obtains the latest URL
  const latestUrl = urls[urls.length-1];
  return (
    // Added https:// so that it doesnt use the base URL of the page as root of link
    <div class="result">
      <a href={`https://${latestUrl?.origUrl}`}>{latestUrl?.shortUrl}</a> 
    </div>
  );
}

export default Result;