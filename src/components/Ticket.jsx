import React from "react";
import seat from "../assets/seat.png";
import stadLogo from "../assets/stad.png";
import whistle from "../assets/whistle.png";
import sideRefLogo from "../assets/sideRefLogo.png";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setPopup } from "../features/ErrorPopupSlice";
// import Button from './Button'
import ZamalekLogo from "../assets/ZamalekSC.png";
import AlAhlyLogo from "../assets/AlAhly.png";
import PyramidsLogo from "../assets/Pyramids_FC.png";
import Ceramica from "../assets/CCFC.png";
import Future from "../assets/FutureFc.png";
import Masry from "../assets/Al_Masry_SC.png";
import Bank from "../assets/NBA.png";

import Mok from "../assets/Mok.png";
import TalGeesh from "../assets/TalGeesh.png";
import Alex from "../assets/Alex.png";
import Phar from "../assets/Phar.png";
import Smouha from "../assets/Smo.png";
import Enp from "../assets/Enp.png";
import Zed from "../assets/ZED.png";
import Ismaily from "../assets/Ism.png";
import Mahla from "../assets/Bald.png";
import Dakh from "../assets/Dakh.png";
import Gouna from "../assets/Go.png";
const Ticket = ({
  homeTeamLogo,
  homeTeam,
  awayTeamLogo,
  awayTeam,
  stadium,
  date,
  Time,
  mainReferee,
  linesman1,
  linesman2,
  seatt,
  ticketId,
  ticketPrice,

  disableButt,
}) => {
  //data{ticketid , seatt , matchid}
  const dispatch = useDispatch();
  const handleCancelTicket = async (ticketId) => {
    try {
      const res = await axios.post(
        "http://localhost:3001/api/ticket/cancelticket",
        { ticketId: ticketId },
        {
          headers: {
            Authorization: localStorage.getItem("Token"),
          },
        }
      );
      console.log(res);
      if (res.status == 200) {
        console.log("Ticket Cancelled Successfully");
        dispatch(
          setPopup({
            data: "Ticket Cancelled Successfully",
            type: "success",
            show: true,
          })
        );
        setTimeout(() => {
          dispatch(
            setPopup({
              data: "Ticket Cancelled Successfully",
              type: "success",
              show: false,
            })
          );
        }, 2000);
        window.location.reload();
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

  return (
    <>
      <div className="match-details-container">
        <div className="upper-match-div">
          {new Date(date).toLocaleDateString("en-US", { weekday: "long" })}{" "}
          {new Date(date).toLocaleDateString()}
        </div>
        <div className="main-match-div">
          <div className="home-team-pack">
            <img
              src={
                homeTeamLogo == 0
                  ? ZamalekLogo
                  : homeTeamLogo == 1
                  ? AlAhlyLogo
                  : homeTeamLogo == 2
                  ? PyramidsLogo
                  : homeTeamLogo == 3
                  ? Ceramica
                  : homeTeamLogo == 4
                  ? Future
                  : homeTeamLogo == 5
                  ? Masry
                  : homeTeamLogo == 6
                  ? Bank
                  : homeTeamLogo == 7
                  ? Mok
                  : homeTeamLogo == 8
                  ? TalGeesh
                  : homeTeamLogo == 9
                  ? Alex
                  : homeTeamLogo == 10
                  ? Phar
                  : homeTeamLogo == 11
                  ? Smouha
                  : homeTeamLogo == 12
                  ? Enp
                  : homeTeamLogo == 13
                  ? Zed
                  : homeTeamLogo == 14
                  ? Ismaily
                  : homeTeamLogo == 15
                  ? Mahla
                  : homeTeamLogo == 16
                  ? Dakh
                  : homeTeamLogo == 17
                  ? Gouna
                  : ""
              }
              alt={homeTeam}
              className="team-logo home-logo"
            />
            <div className="home-club-name">{homeTeam} (H)</div>
          </div>
          <div className="time-container">
            {(() => {
              const [hours, minutes] = Time.split(":").map(Number);
              const formattedHours =
                hours === 0 ? 12 : hours > 12 ? hours - 12 : hours;
              const amPm = hours >= 12 ? "PM" : "AM";
              return `${formattedHours}:${minutes
                .toString()
                .padStart(2, "0")} ${amPm}`;
            })()}
          </div>

          <div className="away-team-pack">
            <img
              src={
                awayTeamLogo == 0
                  ? ZamalekLogo
                  : awayTeamLogo == 1
                  ? AlAhlyLogo
                  : awayTeamLogo == 2
                  ? PyramidsLogo
                  : awayTeamLogo == 3
                  ? Ceramica
                  : awayTeamLogo == 4
                  ? Future
                  : awayTeamLogo == 5
                  ? Masry
                  : awayTeamLogo == 6
                  ? Bank
                  : awayTeamLogo == 7
                  ? Mok
                  : awayTeamLogo == 8
                  ? TalGeesh
                  : awayTeamLogo == 9
                  ? Alex
                  : awayTeamLogo == 10
                  ? Phar
                  : awayTeamLogo == 11
                  ? Smouha
                  : awayTeamLogo == 12
                  ? Enp
                  : awayTeamLogo == 13
                  ? Zed
                  : awayTeamLogo == 14
                  ? Ismaily
                  : awayTeamLogo == 15
                  ? Mahla
                  : awayTeamLogo == 16
                  ? Dakh
                  : awayTeamLogo == 17
                  ? Gouna
                  : ""
              }
              alt={awayTeam}
              className="team-logo away-logo"
            />
            <div className="away-club-name">{awayTeam} (A)</div>
          </div>
        </div>

        <div className="your-tickets">
          <div className="d-flex justify-content-center align-items-center flex-column">
            <img src={whistle} alt={mainReferee} width="50px" height="auto" />
            <div className="refName">{mainReferee}</div>
          </div>
          <div className="d-flex justify-content-center align-items-center flex-column">
            <img src={stadLogo} alt={stadium} width="40px" height="auto" />
            <div>{stadium}</div>
          </div>
          <div className="d-flex justify-content-center align-items-center flex-column">
            <img src={sideRefLogo} alt={linesman1} width="30px" height="auto" />
            <div>
              {linesman1}
              <br />
              {linesman2}
            </div>
          </div>
          {/* </div>
        <div className="your-tickets"> */}
          <div className="d-flex justify-content-center align-items-center gap-1">
            <label>Ticket ID:</label>
            <div className="ticketid">{ticketId}</div>
          </div>
          <div className="d-flex justify-content-center align-items-center gap-1">
            <img src={seat} alt="chair" width="25px" height="auto" />
            <div className="refName">{seatt}</div>
          </div>
          <button
            disabled={disableButt}
            onClick={(e) => {
              handleCancelTicket(ticketId);
            }}
            className={
              disableButt
                ? "danger-butt-disabled rounded-pill"
                : "danger-butt rounded-pill"
            }
          >
            Cancel
          </button>
        </div>

        {/* <Button className={hideButton && "d-none"} buttText={"Get Ticket"} /> */}
      </div>
    </>
  );
};

export default Ticket;
