import React, { useEffect } from "react";
import Header from "../components/Header";
import MyForm from "../components/MyForm";
import { useSelector, useDispatch } from "react-redux";
import { setActivePage } from "../features/pageSlice";
import { setFirstName } from "../features/nameSlice";
import { setUserType } from "../features/userSlice";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { setPopup } from "../features/ErrorPopupSlice";
const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(setActivePage("register"));
  }, []);

  const inputArr = [
    {
      type: "text",
      label: "Username",
      placeholder: "username",
      name: "username",
      // optionsArr:
      // radioOne:
      // radioTwo:
    },
    {
      type: "password",
      label: "Password",
      placeholder: "********",
      name: "password",
    },
    {
      type: "text",
      label: "First Name",
      placeholder: "Ahmed",
      name: "firstName",
      // optionsArr:
      // radioOne:
      // radioTwo:
    },
    {
      type: "text",
      label: "Last Name",
      placeholder: "Toaima",
      name: "lastName",
      // optionsArr:
      // radioOne:
      // radioTwo:
    },
    {
      type: "date",
      label: "Date of Birth",
      // placeholder: "username@gmail.com",
      name: "dob",
      // optionsArr:
      // radioOne:
      // radioTwo:
    },
    {
      type: "radio",
      // label: "",
      // placeholder: "username@gmail.com",
      name: "gender",
      // optionsArr:
      radioOne: "Male",
      radioTwo: "Female",
    },
    {
      type: "dropdown",
      label: "City",
      // placeholder: "username@gmail.com",
      name: "city",
      optionsArr: [
        "Cairo",
        "Luxor",
        "Aswan",
        "Alexandria",
        "Sharm el Sheikh",
        "Hurghada",
      ],
      // radioOne:
      // radioTwo:
    },
    {
      type: "text",
      label: "Address",
      placeholder: "8138 Mokattam",
      name: "address",
      // optionsArr:
      // radioOne:
      // radioTwo:
    },
    {
      type: "email",
      label: "Email",
      placeholder: "username@gmail.com",
      name: "email",
      // optionsArr:
      // radioOne:
      // radioTwo:
    },
    {
      type: "radio",
      // label: "",
      // placeholder: "username@gmail.com",
      name: "type",
      // optionsArr:
      radioOne: "Fan",
      radioTwo: "Manager",
    },
  ];

  const handleOnSubmit = async (values) => {
    try {
      const res = await axios.post(
        "http://localhost:3001/api/user/register",
        values
      );
      console.log(res);
      if (res.status === 200) {
        localStorage.setItem("Token", res.data.Token);
        // localStorage.setItem("Role", "G");
        dispatch(setUserType("G"));
        console.log("ANA HENAA ANAAA FE REG");
        // localStorage.setItem("Role", res.data.Role);
        // setFirstName(res.data.firstName);
        // console.log("HANDLEEEEEEEEEEE");
        // console.log(res.data.firstName);
        navigate("/home");
      }
    } catch (err) {
      console.log(err.response.data.error);
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
    }

    // }
  };

  return (
    <div>
      <Header />

      <MyForm
        type="register"
        inputArr={inputArr}
        title="Register"
        buttText="Register"
        handleSub={handleOnSubmit}
      />
    </div>
  );
};

export default Register;
