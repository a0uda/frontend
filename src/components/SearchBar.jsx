import React, { useState } from "react";
import Button from "./Button";
import SearchBarCompList from "./SearchBarCompList";
import { useEffect } from "react";
import axios from "axios";
import MyPagination from "../components/MyPagination";
import AdminList from "../components/AdminList";

const SearchBar = ({ UserArr, onDelete }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = () => {
    console.log("ANAAA USER ARRRAY", UserArr);
    if (UserArr) {
      const results = UserArr.filter((user) =>
        user.firstname.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSearchResults(results);
    }
  };

  // useEffect(() => {
  //   fetchAllUsers();
  // }, []);

  // const fetchAllUsers = async () => {
  //   try {
  //     const res = await axios.get('http://localhost:3001/api/admin/getAllUsers');
  //     setSearchResults(res.data.fetchAllUsers);
  //   } catch (err) {
  //     console.error(err);
  //   }
  //   handleSearch();
  // };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value === "") {
      setSearchResults([]);
    } else {
      handleSearch();
    }
  };

  return (
    <div>
      <div className="searchbar">
        <div className="searchbar-nafso">
          <input
            type="text"
            placeholder="Search by Name.."
            value={searchTerm}
            onChange={handleInputChange}
          />
        </div>
        <Button buttText="Search" onClick={handleInputChange} />
      </div>

      <div>
        <table className="container delete-admin-page-search-div-searchbar-table">
          <thead>
            <tr>
              <th>Username</th>
              <th>Name</th>
              <th className="col_1">Email</th>
              <th className="col_1">Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <SearchBarCompList
            searchResults={searchResults}
            onDelete={onDelete}
          />
        </table>
      </div>
    </div>
  );
};

export default SearchBar;
