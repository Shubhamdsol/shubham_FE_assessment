import React ,{ useCallback, useEffect, useState } from "react";
import { LocalStorageService } from "../../services/LocalStorageService";
import UniversityTable from "../UniversityTable";
import { ApiService } from "../../services/ApiService";
import '../../assets//styles/listing-page.css';

const ListingPageComp = () => {
  const [universities, setUniversities] = useState([]);
  const [filteredUniversities, setFilteredUniversities] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("asc"); // Default sorting order

  useEffect(() => {
    fetchData();
  }, []);


// set the data in local storage
  const fetchData = async () => {
    try {
      const data = await ApiService.fetchUniversities();
      LocalStorageService.setItem("universities", data);
      setUniversities(data);
      setFilteredUniversities(data);
    } catch (error) {
      const universitiesData = LocalStorageService?.getItem("universities");
      if (universitiesData) {
        setUniversities(universitiesData);
        setFilteredUniversities(universitiesData);
      } else {
        window.alert("Error: Unable to fetch data");
      }
    }
  };

  //sort function for sorting a to z and z to a
  const handleSort = useCallback(() => {
    const sortedUniversities = [...filteredUniversities].sort((a, b) => {
      if (sortOrder === "asc") {
        return a.name.localeCompare(b.name);
      } else {
        return b.name.localeCompare(a.name);
      }
    });
    setFilteredUniversities(sortedUniversities);
    // Toggle sorting order
    setSortOrder((prevSortOrder) => (prevSortOrder === "asc" ? "desc" : "asc"));
  }, [filteredUniversities, sortOrder]);


//function for search
  const handleSearch = useCallback(
    (event) => {
      const searchTerm = event.target.value.toLowerCase();
      setSearchTerm(searchTerm);
      const filtered = universities.filter((uni) =>
        uni.name.toLowerCase().includes(searchTerm)
      );
      setFilteredUniversities(filtered);
    },
    [universities]
  );

  // function for delete single selected item
  const handleDelete = useCallback(
    (id) => {
      const updatedUniversities = filteredUniversities.filter(
        (uni) => uni.web_pages[0] !== id
      );
      setFilteredUniversities(updatedUniversities);
      LocalStorageService.setItem("universities", updatedUniversities);
    },
    [filteredUniversities]
  );

  return (
    <div className="container" data-testid="listing-page">
      <h1 className="heading">University Listing</h1>
      <div className="search-container">
        <input
          type="text"
          className="search-bar"
          placeholder="Search universities"
          value={searchTerm}
          onChange={handleSearch}
        />
        <button className="sort-button" onClick={handleSort}>
         {sortOrder === "asc" ? "A-Z ⇧" : "Z-A ⇩"}
        </button>
      </div>

      {/* shows list data */}
      <UniversityTable
        universities={filteredUniversities}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default ListingPageComp;
