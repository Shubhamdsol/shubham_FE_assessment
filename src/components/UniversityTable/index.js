import React from "react";
import { Link } from "react-router-dom";
import "../../assets/styles/university-list.css";

const UniversityTable = ({ universities, handleDelete }) => {
  return (
    <ul className="university-list" data-testid="university-list">
      {universities.map((uni, index) => (
        <li key={uni.web_pages[0]} className="university-item">
          <div className="university-info">
            <h3 className="university-name">{uni.name}</h3>
            <p className="university-details">
              {uni.country} |{" "}
              <a href={uni.web_pages[0]} className="university-link">
                Website
              </a>
            </p>
          </div>
          <div className="action-buttons">
            <Link to={`/details/${index}`} className="detail-link">
              View Detail
            </Link>
            <button  className="delete-button" data-testid="delete-button" onClick={() => handleDelete(uni.web_pages[0])}>
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default UniversityTable;
