import React, { useState, useEffect } from "react";
import MyForm from "../components/MyForm";
import Header from "../components/Header";
import Sidebar from "../components/SideBar";
import SidebarData from "../assets/Data/ManagerSideBarData";
import { useSelector, useDispatch } from "react-redux";
import { setPopup } from "../features/ErrorPopupSlice";
import { setActivePage } from "../features/pageSlice";
import axios from "axios";
import AlertDismissible from "../components/Error";

const AddStadium = () => {
  //const [message, setMessage] = useState(null);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setActivePage("addstadium"));
  }, []);

  const inputArr = [
    {
      type: "text",
      label: "Name",
      placeholder: "Ex: Borg el-Arab Stadium",
      name: "StadName",
    },
    {
      type: "number",
      label: "Number of rows",
      placeholder: "Ex: 5",
      name: "StadRows",
    },
    {
      type: "number",
      label: "Number of seats per row",
      placeholder: "Ex: 20",
      name: "StadSeats",
    },
  ];

  const handleAddStadium = async (values, errors) => {
    // if (Object.keys(errors).length === 0) {
    try {
      const res = await axios.post(
        "http://localhost:3001/api/stadium/addstadium",
        values
      );
      dispatch(
        setPopup({
          data: "Stadium added successfully",
          type: "success",
          show: true,
        })
      );
      setTimeout(() => {
        dispatch(
          setPopup({
            data: "Stadium added successfully",
            type: "success",
            show: false,
          })
        );
      }, 2000);

      console.log(res);
    } catch (err) {
      dispatch(
        setPopup({
          data: err.response.data.error,
          type: "danger",
          show: true,
        })
      );
      setTimeout(() => {
        dispatch(
          setPopup({
            data: err.response.data.error,
            type: "danger",
            show: false,
          })
        );
      }, 2000);

      console.log(err);
    }
    // } else {
    //   dispatch(
    //     setPopup({ data: "Error adding Stadium", type: "danger", show: true })
    //   );
    //   setTimeout(() => {
    //     dispatch(
    //       setPopup({
    //         data: "Error adding Stadium",
    //         type: "danger",
    //         show: false,
    //       })
    //     );
    //   }, 2000);
    // }
  };

  return (
    <div>
      {/* <Sidebar SidebarData={SidebarData}/> */}
      <Header />
      <MyForm
        inputArr={inputArr}
        type="addstadium"
        title="Add Stadium"
        buttText="Add Stadium"
        handleSub={handleAddStadium}
      />
    </div>
  );
};

export default AddStadium;
