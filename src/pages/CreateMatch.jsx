import React, { useEffect, useState } from "react";
import MyForm from "../components/MyForm";
import Header from "../components/Header";
import Sidebar from "../components/SideBar";
import SidebarData from "../assets/Data/ManagerSideBarData";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setActivePage } from "../features/pageSlice";
import AlertDismissible from "../components/Error";
import { setPopup } from "../features/ErrorPopupSlice";

const CreateMatch = () => {
  const dispatch = useDispatch();

  //const [message, setMessage] = useState(null);

  const [referee, setreferee] = useState([]);

  useEffect(() => {
    const getreferees = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3001/api/match/viewReferee"
        );

        if (res.status === 200) {
          setreferee(res.data.refreesname);
          console.log(res.data.refreesname);
        }
      } catch (err) {
        console.log(err);
      }
    };
    getreferees();
    console.log(referee);
  }, []);

  const [team, setteam] = useState([]);

  useEffect(() => {
    const getteam = async () => {
      try {
        const res = await axios.get("http://localhost:3001/api/match/viewTeam");

        if (res.status === 200) {
          setteam(res.data.teamsname);
          console.log(res.data.teamsname);
        }
      } catch (err) {
        console.log(err);
      }
    };
    getteam();
    console.log(team);
  }, []);

  const [stadium, setstadium] = useState([]);

  useEffect(() => {
    const getstadium = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3001/api/match/viewStadium"
        );

        if (res.status === 200) {
          setstadium(res.data.stadiumname);
          console.log(res.data.stadiumname);
        }
      } catch (err) {
        console.log(err);
      }
    };
    getstadium();
    console.log(stadium);
  }, []);

  const inputArr = [
    {
      type: "dropdown",
      label: "Home Team",
      placeholder: "Al Ahly",
      name: "HomeTeam",
      optionsArr: team,
    },
    {
      type: "dropdown",
      label: "Away Team",
      placeholder: "Zamalek",
      name: "AwayTeam",
      optionsArr: team,
    },
    {
      type: "dropdown",
      label: "Match Venue",
      placeholder: "Egyptian Army Stadium",
      name: "MatchVenue",
      optionsArr: stadium,
    },
    {
      type: "date",
      label: "Date",
      placeholder: "",
      name: "date",
    },
    {
      type: "time",
      label: "Time",
      placeholder: "",
      name: "time",
    },
    {
      type: "dropdown",
      label: "Main Referee",
      placeholder: "Mohamed Adel",
      name: "MainReferee",
      optionsArr: referee,
    },
    {
      type: "dropdown",
      label: "Linesman 1",
      placeholder: "",
      name: "Linesman1",
      optionsArr: referee,
    },
    {
      type: "dropdown",
      label: "Linesman 2",
      placeholder: "",
      name: "Linesman2",
      optionsArr: referee,
    },
    {
      type: "number",
      label: "Ticket Price",
      placeholder: "Ex: 100",
      name: "Ticketprice",
    },
  ];

  useEffect(() => {
    dispatch(setActivePage("creatematch"));
  }, []);
  const handleAddMatch = async (values) => {
    try {
      const res = await axios.post(
        "http://localhost:3001/api/match/creatematch",
        values
      );
      //setMessage("Match added successfully");
      dispatch(
        setPopup({
          data: "Match added successfully",
          type: "success",
          show: true,
        })
      );
      setTimeout(() => {
        dispatch(
          setPopup({
            data: "Match added successfully",
            type: "success",
            show: false,
          })
        );
      }, 2000);
      console.log(res);
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
      console.log(err);
    }
  };

  //   } else {
  //     dispatch(setPopup({data:"Error adding Match",type:"danger",show:true}));
  //     setTimeout(() => {
  //       dispatch(setPopup({data:"Error adding Match",type:"danger",show:false}));
  //     }, 2000);
  //   }
  // };

  return (
    <div>
      {/* <Sidebar SidebarData={SidebarData}/> */}
      <Header />
      <MyForm
        inputArr={inputArr}
        type="creatematch"
        title="Create Match"
        buttText="Create Match"
        handleSub={handleAddMatch}
      />
    </div>
  );
};

export default CreateMatch;
