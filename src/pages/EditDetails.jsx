import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import MyForm from "../components/MyForm";
import { useSelector, useDispatch } from "react-redux";
import { setActivePage } from "../features/pageSlice";
import axios from "axios";
import moment from "moment";
import Feedback from "react-bootstrap/esm/Feedback";
import AlertDismissible from "../components/Error";
import { setPopup } from "../features/ErrorPopupSlice";
import { setFirstName } from "../features/nameSlice";
const EditDetails = () => {
  const dispatch = useDispatch();
  // const [user, setUser] = useState({});
  const [values, setValues] = useState({});
  //const [message, setMessage] = useState(null);
  let user = {};
  // let values = {};
  useEffect(() => {
    const getUserDetails = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3001/api/user/getDetails",
          {
            headers: {
              Authorization: localStorage.getItem("Token"),
            },
          }
        );

        console.log(res.data.user);
        user = res.data.user;
        const birthdate = new Date(user.birthdate);
        const formattedDate = moment(birthdate).format("YYYY-MM-DD");
        // const gender = user.gender == "M" ? true : false;
        // const role = user.role == "F" ? true : false;
        // console.log(formattedDate);
        // console.log(role);
        // console.log(gender);
        setValues({
          username: user.username,
          firstname: user.firstname,
          lastname: user.lastname,
          password: user.password,
          confirmPassword: user.password,
          dob: formattedDate,
          gender: user.gender,
          city: user.city,
          address: user.address,
          email: user.email,
          role: user.role,
        });
        // console.log("INPCITY", user.city);
        console.log(values);
        console.log(user);
        // user = res.data.user;
        // console.log("HAAHAHHAHAHAHAHAHAHAHAHA");
        // console.log(user.username);
      } catch (err) {
        console.log(err);
      }
    };

    dispatch(setActivePage("editdetails"));
    getUserDetails();
  }, []);

  const inputArr = [
    {
      type: "text",
      label: "Username",
      placeholder: "Username",
      name: "username",
      disable: false,
    },
    {
      type: "password",
      label: "Password",
      placeholder: "********",
      name: "password",
      disable: false,
    },
    {
      type: "password",
      label: "Confirm Password",
      placeholder: "********",
      name: "confirmPassword",
      disable: false,
    },
    {
      type: "text",
      label: "First Name",
      placeholder: "First Name",
      name: "firstname",
      disable: false,
    },
    {
      type: "text",
      label: "Last Name",
      placeholder: "Last Name",
      name: "lastname",
      disable: false,
    },
    {
      type: "date",
      label: "Date of Birth",
      name: "dob",
      disable: true,
    },
    {
      type: "radio",
      name: "gender",
      radioOne: "Male",
      radioTwo: "Female",
      disable: true,
      radioOneChecked: values.gender == "M" ? true : false,
      radioTwoChecked: values.gender == "F" ? true : false,
    },
    {
      type: "dropdown",
      label: "City",
      name: "city",
      optionsArr: [
        "Cairo",
        "Luxor",
        "Aswan",
        "Alexandria",
        "Sharm el Sheikh",
        "Hurghada",
      ],
      disable: false,
      selected: values.city,
    },
    {
      type: "text",
      label: "Address",
      placeholder: "Address",
      name: "address",
      disable: false,
    },
    {
      type: "email",
      label: "Email",
      placeholder: "username@gmail.com",
      name: "email",
      disable: false,
    },
    {
      type: "radio",
      name: "role",
      radioOne: "Fan",
      radioTwo: "Manager",
      disable: true,
      radioOneChecked: values.role == "F" ? true : false,
      radioTwoChecked: values.role == "M" ? true : false,
    },
  ];
  const handleOnSubmit = async (values, errors) => {
    try {
      const res = await axios.post(
        "http://localhost:3001/api/user/editDetails",
        values,
        {
          headers: {
            Authorization: localStorage.getItem("Token"),
          },
        }
      );
      dispatch(
        setPopup({
          data: "User updated successfully",
          type: "success",
          show: true,
        })
      );
      setTimeout(() => {
        dispatch(
          setPopup({
            data: "User updated successfully",
            type: "success",
            show: false,
          })
        );
      }, 2000);
      console.log(res);
      dispatch(setFirstName(values.firstname));
    } catch (err) {
      dispatch(
        setPopup({ data: err.response.data.error, type: "danger", show: true })
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
    }
    // <<<<<<< HEAD

    // =======
    //     } else {
    //       dispatch(setPopup({data:"Error Updating User",type:"danger",show:true}));
    //       setTimeout(() => {
    //         dispatch(setPopup({data:"Error Updating User",type:"danger",show:false}));
    //       }, 2000);
    //     }
    // >>>>>>> Errors
  };
  return (
    <div>
      <Header />
      {values.username !== undefined ? (
        <>
          <h2 className="match-details-title">Edit Your Details</h2>
          <MyForm
            inputArr={inputArr}
            type="editDetails"
            title="Edit Details"
            buttText="Confirm Edit"
            initVal={values}
            handleSub={handleOnSubmit}
            edit="true"
          />
        </>
      ) : (
        <h2 className="match-details-title">Edit Details</h2>
      )}
    </div>
  );
};
export default EditDetails;
