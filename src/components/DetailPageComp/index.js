import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const DetailPageComp = () => {
  const [item, setItem] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("universities"));
    if (storedData && storedData[id]) {
      setItem(storedData[id]);
    }
  }, [id]);


  // shows detail of university
  return (
    <div>
      <div className="details-container">
        <h2>University Details</h2>
        <p>Name: {item?.name}</p>
        <p>Country: {item?.country}</p>
        <p>Website: {item?.web_pages[0]}</p>
      </div>
    </div>
  );
};

export default DetailPageComp;
