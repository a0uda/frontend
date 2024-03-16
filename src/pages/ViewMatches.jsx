import React, { useEffect, useState } from "react";
import MatchDetails from "../components/MatchDetails";
import Header from "../components/Header";
import ManchesterUnitedLogo from "../assets/Manchester_United_FC_crest.svg.png";
import LiverpoolLogo from "../assets/Liverpool_FC.svg.png";
import ZamalekLogo from "../assets/ZamalekSC.png";
import AlAhlyLogo from "../assets/AlAhly.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setActivePage } from "../features/pageSlice";
import Paginationn from "../components/Paginationn";
// const teamLogoMapping = [
//   ManchesterUnitedLogo,
//   LiverpoolLogo,
//   ZamalekLogo,
//   AlAhlyLogo,
// ];
const ViewMatches = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [matches, setMatches] = useState([]);
  const [activePage, setActivePage] = useState(1); //kont 3amlha 2 leh ya mido AAO
  const pageSize = 3;
  const matchesToShow = matches.slice(
    (activePage - 1) * pageSize,
    (activePage - 1) * pageSize + pageSize
  );
  useEffect(() => {
    //dispatch(setActivePage("viewmatches")); //A
    const getMatches = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3001/api/match/viewMatches"
        );

        if (res.status === 200) {
          setMatches(res.data.matches);

          console.log("MATCHES", matches);
          // console.log(res.data.matches);
        }
      } catch (err) {
        console.log(err);
        navigate("/home");
      }
    };
    getMatches();
  }, []);
  // bn;

  return (
    <>
      <div>
        <Header />
        <h2 className="match-details-title">Matches</h2>
        {matches.length > 0 ? (
          matchesToShow.map((match) => (
            <MatchDetails
              matchID={match.matchID}
              homeTeamLogo={match.homeTeamLogo}
              homeTeam={match.homeTeam}
              awayTeamLogo={match.awayTeamLogo}
              awayTeam={match.awayTeam}
              stadium={match.stadium}
              date={match.date}
              Time={match.time}
              mainReferee={match.mainReferee}
              linesman1={match.linesman1}
              linesman2={match.linesman2}
            />
          ))
        ) : (
          <p>No matches available</p>
        )}
      </div>
      <div className="pagen">
        <Paginationn
          Arr={matches}
          activePage={activePage}
          setActivePage={setActivePage}
          pageSize={pageSize}
        />
      </div>
    </>
  );
};

export default ViewMatches;
