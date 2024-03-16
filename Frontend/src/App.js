import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/layout.css";
import NavBar from "./components/NavBar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Navigate } from "react-router-dom";

import AlertDismissible from "./components/Error";

import { store } from "./store";
import { Provider } from "react-redux";
import MatchDetails from "./components/MatchDetails";
import EditMatch from "./pages/EditMatch";
import {
  AddStadium,
  CreateMatch,
  EditDetails,
  Home,
  Login,
  Manager,
  Register,
  TicketReservation,
  ViewMatches,
  YourTickets,
} from "./pages";
import AdminDelete from "./pages/AdminDelete";
import Admin from "./pages/Admin";
// import  from 'react-redux'
// import { setActivePage } from './features/pageSlice'
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUserType } from "./features/userSlice";

function App() {
  const userType = useSelector((state) => state.user.value);
  const dispatch = useDispatch();
  const [userT, setUserT] = useState();
  useEffect(() => {
    const getRole = async () => {
      try {
        console.log(localStorage.getItem("Token"));
        const res = await axios.get("http://localhost:3001/api/user/getRole", {
          headers: {
            Authorization: localStorage.getItem("Token"),
          },
        });
        console.log(res);
        if (res.status === 200) {
          dispatch(setUserType(res.data.Role));
          console.log("ana henaaa");

          // dispatch(setUserType(res.data.Role));
          // localStorage.setItem("Role", res.data.Role);
        }
      } catch (err) {
        console.log(err);
        // localStorage.setItem("Role", "G");
        // dispatch(setUserType("G"));
        dispatch(setUserType("G"));
      }
    };
    getRole();
    console.log(userT);
  }, []);
  const errorpopup = useSelector((state) => state.errorpopup.data);
  console.log(errorpopup);
  return (
    // <Provider store={store}>
    <div className="App">
      {/* <Login /> */}

      <Router>
        <NavBar />
        <Routes>
          {userType == "F" && (
            <>
              <Route path="/home" element={<Home />} />
              <Route path="/editdetails" element={<EditDetails />} />
              <Route path="/viewmatches" element={<ViewMatches />} />
              <Route path="/yourtickets" element={<YourTickets />} />
              <Route
                path="/ticketreservation/:matchId"
                element={<TicketReservation />}
              />
              {/* <Route path="*" element={<Home />} /> */}
              <Route path="*" element={<Navigate to="/home" />} />
            </>
          )}

          {userType == "A" && (
            <>
              <Route path="/admin" element={<Admin />} />
              <Route path="/admindelete" element={<AdminDelete />} />
              <Route path="*" element={<Navigate to="/admin" />} />
            </>
          )}

          {userType == "M" && (
            <>
              <Route path="/home" element={<Home />} />
              <Route path="/creatematch" element={<CreateMatch />} />
              <Route path="/addstadium" element={<AddStadium />} />
              <Route path="/viewmatches" element={<ViewMatches />} />
              <Route path="/editmatch/:matchID" element={<EditMatch />} />
              <Route
                path="/ticketreservation/:matchId"
                element={<TicketReservation />}
              />
              <Route path="*" element={<Navigate to="/home" />} />
            </>
          )}

          {userType == "G" && (
            <>
              <Route path="/home" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="*" element={<Navigate to="/home" />} />
            </>
          )}
          {/* <Route path="/manager" element={<Manager />} /> */}

          {/* <Route path="/matchdetails" element={<MatchDetails />} /> */}
          {/* <Route path="*" element={<Home />} /> */}
        </Routes>
      </Router>
      <AlertDismissible
        message={errorpopup.data}
        variant={errorpopup.type}
        trigger={errorpopup.show}
        
      />
    </div>
    // </Provider>
  );
}

export default App;
