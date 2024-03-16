import React, { useEffect, useState } from "react";
import MyForm from "../components/MyForm";
import Header from "../components/Header";
import Sidebar from "../components/SideBar";
import SidebarData from "../assets/Data/ManagerSideBarData";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setActivePage } from "../features/pageSlice";
import moment from "moment";
import AlertDismissible from "../components/Error";
import { setPopup } from "../features/ErrorPopupSlice";

const EditMatch = () => {
  const dispatch = useDispatch();
  const matchID = window.location.pathname.split("/")[2];
  // console.log(matchID);
  // console.log("AANA FE MATCH EDIT");

  //const [message, setMessage] = useState(null);

  const [referee, setreferee] = useState([]);

  const [values, setValues] = useState({});
  let match = {};
  useEffect(() => {
    const getmatchdetails = async () => {
      try {
        if (matchID) {
          const res = await axios.get(
            `http://localhost:3001/api/match/getMatch/${matchID}`
          );
          console.log(res.data.match);
          console.log("EDIT  MATCH AFTER GETTING MATCH");
          match = res.data.match;

          const date = new Date(match.date);
          const formattedDate = moment(date).format("YYYY-MM-DD");
          setValues({
            matchID: match.matchID,
            HomeTeam: match.hometeam,
            AwayTeam: match.awayteam,
            MatchVenue: match.stadium,
            date: formattedDate,
            time: match.time,
            MainReferee: match.referee,
            Linesman1: match.linesman1,
            Linesman2: match.linesman2,
            Ticketprice: match.ticketprice,
          });
          // console.log("INPCITY", match.city);
          console.log(values);
          console.log("VALUES");
          console.log(match);
          // match = res.data.match;
          // console.log("HAAHAHHAHAHAHAHAHAHAHAHA");
          // console.log(match.username);
        }
      } catch (err) {
        console.log(err);
      }
    };

    dispatch(setActivePage("editmatch"));
    getmatchdetails();
  }, []);

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
      disable: false,
      selected: values.HomeTeam,
    },
    {
      type: "dropdown",
      label: "Away Team",
      placeholder: "Zamalek",
      name: "AwayTeam",
      optionsArr: team,
      disable: false,
      selected: values.AwayTeam,
    },
    {
      type: "dropdown",
      label: "Match Venue",
      placeholder: "Egyptian Army Stadium",
      name: "MatchVenue",
      optionsArr: stadium,
      disable: false,
      selected: values.MatchVenue,
    },
    {
      type: "date",
      label: "Date",
      placeholder: "",
      name: "date",
      disable: false,
    },
    {
      type: "time",
      label: "Time",
      placeholder: "",
      name: "time",
      disable: false,
    },
    {
      type: "dropdown",
      label: "Main Referee",
      placeholder: "Mohamed Adel",
      name: "MainReferee",
      optionsArr: referee,
      disable: false,
      selected: values.MainReferee,
    },
    {
      type: "dropdown",
      label: "Linesman 1",
      placeholder: "",
      name: "Linesman1",
      optionsArr: referee,
      disable: false,
      selected: values.Linesman1,
    },
    {
      type: "dropdown",
      label: "Linesman 2",
      placeholder: "",
      name: "Linesman2",
      optionsArr: referee,
      disable: false,
      selected: values.Linesman2,
    },
    {
      type: "number",
      label: "Ticket Price",
      placeholder: "Ex: 100",
      name: "Ticketprice",
      disable: false,
    },
  ];

  const handleEditMatch = async (values, errors) => {
    console.log("In edit match");
    try {
      console.log("In edit match");
      const res = await axios.post(
        `http://localhost:3001/api/match/editMatch/${matchID}`,
        values
      );
      dispatch(
        setPopup({
          data: "Match updated successfully",
          type: "success",
          show: true,
        })
      );
      setTimeout(() => {
        dispatch(
          setPopup({
            data: "Match updated successfully",
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
    // <<<<<<< HEAD

    // =======
    //     } else {
    //       dispatch(setPopup({data:"Error updating match",type:"danger",show:true}));
    //       setTimeout(() => {
    //         dispatch(setPopup({data:"Error updating match",type:"danger",show:false}));
    //       }, 2000);
    //     }
    // >>>>>>> Errors
  };

  return (
    <div>
      <Header />
      {values.HomeTeam !== undefined ? (
        <>
          <h2 className="match-details-title">Edit Match Details</h2>
          <MyForm
            inputArr={inputArr}
            type="editmatch"
            title="Edit Match"
            buttText="Confirm Edit"
            initVal={values}
            handleSub={handleEditMatch}
            edit="true"
          />
          
        </>
      ) : (
        <h2 className="match-details-title">Edit Match Details</h2>
      )}
    </div>
  );
};

export default EditMatch;
