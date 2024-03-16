import React, { useEffect } from "react";
import MyForm from "../components/MyForm";
import Header from "../components/Header";
import { setUserType } from "../features/userSlice";
import { useSelector, useDispatch } from "react-redux";
import { setActivePage } from "../features/pageSlice";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { setFirstName } from "../features/nameSlice";
import { setPopup } from "../features/ErrorPopupSlice";
const Login = () => {
  // type, label, placeholder, name, optionsArr, radioOne, radioTwo
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(setActivePage("login"));

    // Example data to send in the request body
    // const requestData = {
    //   email: "ahmedkhaled1029@gmail.com",
    //   password: "1234",
    // };

    // Using fetch to make a POST request
    // .then((data) => {
    //   // Handle the JSON data returned from the server
    //   console.log('Response data:', data);
    // })
    // .catch((error) => {
    //   // Handle any errors that occurred during the fetch
    //   console.error('Fetch error:', error);
    // });

    // fetchData()
    console.log("login");
  }, []);

  // const handleLoginSubmit = async (values) => {
  //   try {
  //     const res = await axios.post(
  //       "http://localhost:3001/api/user/login",
  //       values
  //     );
  //     // console.log(res);
  //     if (res.status === 200) {
  //       localStorage.setItem("Token", res.data.Token);
  //       // localStorage.setItem("Role", res.data.Role);
  //       navigate("/home");
  //     }
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // }, [])

  const handleLoginSubmit = async (values) => {
    try {
      console.log(values);
      const res = await axios.post(
        "http://localhost:3001/api/user/login",
        values
      );
      // console.log(res);
      if (res.status === 200) {
        localStorage.setItem("Token", res.data.Token);
        // localStorage.setItem("Role", res.data.Role);
        dispatch(setUserType(res.data.Role));
        dispatch(setFirstName(res.data.firstName));
        // setFirstName(res.data.firstName);
        console.log("HANDLEEEEEEEEEEE LOGIN");
        console.log(res.data.firstName);

        navigate("/home");
      }
    } catch (err) {
      console.log(err);
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
  };

  const inputArr = [
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
      type: "password",
      label: "Password",
      placeholder: "********",
      name: "password",
    },
  ];

  return (
    <div>
      <Header />

      <MyForm
        handleSub={handleLoginSubmit}
        type="login"
        inputArr={inputArr}
        title="Login"
        buttText="Login"
      />
    </div>
  );
};

export default Login;
