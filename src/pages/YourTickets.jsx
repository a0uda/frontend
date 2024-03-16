import React, { useEffect, useState } from "react";
import seat from "../assets/seat.png";
// import Button from '../components/Button'
import Ticket from "../components/Ticket";

import Header from "../components/Header";
import ManchesterUnitedLogo from "../assets/Manchester_United_FC_crest.svg.png";
import LiverpoolLogo from "../assets/Liverpool_FC.svg.png";
import ZamalekLogo from "../assets/ZamalekSC.png";
import AlAhlyLogo from "../assets/AlAhly.png";

import { useDispatch } from "react-redux";
import { setActivePage } from "../features/pageSlice";
import axios from "axios";
const YourTickets = () => {
  const dispatch = useDispatch();
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    dispatch(setActivePage("yourtickets"));
    const fetchTickets = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3001/api/ticket/gettickets",
          {
            headers: {
              Authorization: localStorage.getItem("Token"),
            },
          }
        );
        console.log(res);
        setTickets(res.data.output);
      } catch (err) {
        console.log(err);
      }
    };

    fetchTickets();
  }, []);

  // const tickets =
  return (
    <div>
      <Header />
      <h2 className="match-details-title">Tickets</h2>
      {tickets &&
        tickets.map((ticket) => {
          const date = new Date(ticket.match.date);
          const targetDate = new Date(date.getTime() - 3 * 24 * 60 * 60 * 1000); //
          const currentDate = new Date();
          console.log(currentDate > targetDate);
          {
            /* console.log(targetDate > Date.now()); */
          }
          console.log("targetDate");
          console.log(targetDate);
          console.log("currentDate");
          console.log(currentDate);
          console.log("TICKET");
          console.log(ticket.match.date);

          return (
            <Ticket
              homeTeamLogo={ticket.match.homeTeamLogo}
              homeTeam={ticket.match.homeTeam}
              awayTeamLogo={ticket.match.awayTeamLogo}
              awayTeam={ticket.match.awayTeam}
              stadium={ticket.match.stadium}
              date={ticket.match.date}
              Time={ticket.match.Time}
              mainReferee={ticket.match.mainReferee}
              linesman1={ticket.match.linesman1}
              linesman2={ticket.match.linesman2}
              seatt={ticket.seat}
              ticketId={ticket.ticketId}
              ticketPrice={ticket.match.ticketPrice}
              disableButt={currentDate > targetDate}
            />
          );
        })}
      ;
    </div>
  );
};

export default YourTickets;
