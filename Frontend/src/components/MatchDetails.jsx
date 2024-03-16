import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Button from "./Button";
import stadLogo from "../assets/stad.png";
import whistle from "../assets/whistle.png";
import sideRefLogo from "../assets/sideRefLogo.png";
import { useDispatch, useSelector } from "react-redux";
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
const MatchDetails = ({
  matchID,
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
  handleButt,
  hideButton,
}) => {
  console.log("ANA FE MATCH DETAILS ", matchID);
  const userType = useSelector((state) => state.user.value);
  // const [activePage, setActivePage] = useState("viewmatches");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
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
            } //AAO
            alt={homeTeam}
            className="team-logo home-logo"
          />
          <div className="home-club-name">{homeTeam} (H)</div>
        </div>
        <div className="time-container">
          {Time &&
            (() => {
              const [hours, minutes] = Time.split(":").map(Number);
              const formattedHours =
                hours === 0 ? 12 : hours > 12 ? hours - 12 : hours;
              const amPm = hours >= 12 ? "PM" : "AM";
              return `${formattedHours}:${minutes
                .toString()
                .padStart(2, "0")} ${amPm}`;
            })()}
          {/* {Time} */}
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

      <div className="match-info">
        <div className="stadPack">
          <img src={stadLogo} alt={stadium} className="stadLogo" />
          <div className="stadName">{stadium}</div>
        </div>
      </div>
      <div className="allRefPack">
        <div className="refPack">
          <img src={whistle} alt={mainReferee} className="refLogo" />
          <div className="refName">{mainReferee}</div>
        </div>
        <div className="sideRefPack">
          <img src={sideRefLogo} alt={linesman1} className="sideRefLogo" />
          <div className="sideRefName">
            {linesman1}
            <br />
            {linesman2}
          </div>
        </div>
      </div>
      <Button
        // className={userType == "G" && "d-none"}
        // buttText={userType == "F" ? "Get Ticket" : "View Reserved Seats"}
        className={
          (userType == "G" || userType == "A" || hideButton) && "d-none"
        }
        buttText={userType == "F" ? "Get Ticket" : "View Reserved Seats"}
        onClick={() => {
          navigate(`/ticketreservation/${matchID}`);
        }}
      />
      <br />
      <Button
        className={
          (userType === "F" || userType === "G" || userType === "A" || hideButton) && "d-none"
        }
        buttText="Edit Match"
        onClick={() => navigate(`/editmatch/${matchID}`)} //AAO
      >
        {/* <Link to="/edit-match" style={{ textDecoration: 'none', color: 'inherit' }}>
          Edit Match
        </Link> */}
      </Button>
    </div>
  );
};

export default MatchDetails;
