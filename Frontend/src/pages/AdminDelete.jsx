import { useState } from "react";
import React, { useEffect } from "react";
import axios from "axios";
import SearchBar from "../components/SearchBar";
import MyPagination from "../components/MyPagination";
import AdminList from "../components/AdminList";

const AdminDelete = () => {
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    fetchAllUsers();
  }, []);

  const fetchAllUsers = async () => {
    try {
      //console.log('Mido Khaled')
      const res = await axios.get(
        "http://localhost:3001/api/admin/getAllUsers"
      );

      setSearchResults(res.data);
      // console.log("SEARCH RESULTSSSSSSS", res.data.getAllUsers);
      // console.log(res.data.getAllUsers);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (username) => {
    try {
      const res = await axios.post(
        "http://localhost:3001/api/admin/deleteUser",
        { username: username }
      );

      if (res.status === 200) {
        console.log("USER DELETED");
        fetchAllUsers();

        window.location.reload();
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container">
      <div>
        <div className="delete-admin-page-text-div">
          <h1 className="main-text-class-text">Delete Users</h1>
        </div>

        <div className="container">
          <SearchBar
            UserArr={searchResults}
            onDelete={handleDelete}
            className="delete-admin-page-search-div-searchbar"
          />
        </div>
      </div>
      <div className="container">
        {/* <MyPagination total={totalPages} current={currentPage} onChangePage={handlePageChange} />*/}
      </div>
    </div>
  );
};

export default AdminDelete;
