import React from "react";
import Button from "./Button";
import AdminRow from "./AdminRow";
import Paginationn from "../components/Paginationn";
import { useState } from "react";
const AdminList = ({ usersArray, onDelete, onInsert }) => {
  const [activePage, setActivePage] = useState(1); //kont 3amlha 2 leh ya mido AAO
  const pageSize = 5;
  const usersToShow = usersArray.slice(
    (activePage - 1) * pageSize,
    (activePage - 1) * pageSize + pageSize
  );
  return (
    <div>
      <table className="container delete-admin-page-search-div-searchbar-table ">
        <thead>
          <tr>
            <th>Username</th>
            <th>Name</th>
            <th className="col_1">Email</th>
            <th className="col_1">Role</th>
            <th>Insert</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {usersArray.length > 0 ? (
            usersToShow.map((user, index) => (
              <AdminRow
                key={index}
                userArr={user}
                onInsert={onInsert}
                onDelete={onDelete}
              />
            ))
          ) : (
            <tr>
              <td colSpan="6">No users found</td>
            </tr>
          )}
        </tbody>
      </table>
      <div className="pagen">
        <Paginationn
          Arr={usersArray}
          activePage={activePage}
          setActivePage={setActivePage}
          pageSize={pageSize}
        />
      </div>
    </div>
  );
};

export default AdminList;
