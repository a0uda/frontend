import React, { useRef, useState, useEffect } from "react";
import footballcourt from "../assets/transpCourt.svg";
import MatchDetails from "../components/MatchDetails";
import ManchesterUnitedLogo from "../assets/Manchester_United_FC_crest.svg.png";
import LiverpoolLogo from "../assets/Liverpool_FC.svg.png";
import stadLogo from "../assets/stad.png";
import whistle from "../assets/whistle.png";
import sideRefLogo from "../assets/sideRefLogo.png";
import Button from "../components/Button";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import Modal from "react-bootstrap/Modal";
import { useSelector, useDispatch } from "react-redux";
import { setActivePage } from "../features/pageSlice";
import { Formik } from "formik";
import Validation from "../validate/validate.js";

import axios from "axios";

// import Button from 'react-bootstrap/Button';
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { useParams } from "react-router-dom";

function MyVerticallyCenteredModal(props) {
  const validationSchema = Validation("bill");

  // console.log(props.price)

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Checkout Bill
        </Modal.Title>
      </Modal.Header>
      {/* <Modal.Body> */}
      <Formik
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          // Your submit logic can go here
          // For now, let's just log the form values
          props.handlePay();

          console.log(values);
          setSubmitting(false);
        }}
        initialValues={{
          cardHolderName: "",
          cardNumber: "",
          code: "",
          expiryDate: "",
        }}
      >
        {({ handleSubmit, handleChange, values, touched, errors }) => (
          <Form onSubmit={handleSubmit} className="p-1">
            <Form.Group className="mb-3" controlId="formGridAddress1">
              <Form.Label>CARDHOLDERS'S NAME</Form.Label>
              <Form.Control
                isInvalid={!!errors["cardHolderName"]}
                value={values["cardHolderName"]}
                onChange={handleChange}
                name="cardHolderName"
                placeholder="Name on Card"
              />
              <Form.Control.Feedback type="invalid">
                {errors["cardHolderName"]}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGridAddress2">
              <Form.Label>CARD NUMBER</Form.Label>
              <Form.Control
                isInvalid={!!errors["cardNumber"]}
                value={values["cardNumber"]}
                onChange={handleChange}
                name="cardNumber"
                type="number"
                placeholder="--- --- --- ---"
              />
              <Form.Control.Feedback type="invalid">
                {errors["cardNumber"]}
              </Form.Control.Feedback>
            </Form.Group>

            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label>EXPIRY DATE</Form.Label>
                <Form.Control
                  isInvalid={!!errors["expiryDate"]}
                  value={values["expiryDate"]}
                  onChange={handleChange}
                  name="expiryDate"
                  type="date"
                  placeholder="Enter email"
                />
                <Form.Control.Feedback type="invalid">
                  {errors["expiryDate"]}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label>CVV</Form.Label>
                <Form.Control
                  isInvalid={!!errors["code"]}
                  value={values["code"]}
                  onChange={handleChange}
                  name="code"
                  type="number"
                  placeholder="Code"
                />
                <Form.Control.Feedback type="invalid">
                  {errors["code"]}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>

            <div className="bill-paying">
              <span className="bill-span">
                You are buying {props.selectedSeatsLength} tickets with total
                price: EGP {props.selectedSeatsLength * props.price}
              </span>
              <button
                type="submit"
                className="bg-success reservation-bill-butt"
              >
                Pay
              </button>
            </div>
          </Form>
        )}
      </Formik>
      {/* </Modal.Body> */}
      {/* <Modal.Footer> */}
      {/* </Modal.Footer> */}
    </Modal>
  );
}

const Seat = ({ name, className, style, isBooked, colI }) => {
  const userType = useSelector((state) => state.user.value);
  return (
    <>
      <input
        disabled={isBooked || userType == "M"}
        type="checkbox"
        name="seatsgroup"
        value={name}
        id={name}
        className={`d-none`}
        style={style}
      />
      <OverlayTrigger
        placement="right"
        delay={{ show: 250, hide: 400 }}
        overlay={<Tooltip id="button-tooltip"> {name} </Tooltip>}
      >
        {/* <Button variant="success"></Button> */}

        <label htmlFor={name} className={!isBooked ? "seat" : "disabled-seat"}>
          <div className="seat-content"></div>
        </label>
      </OverlayTrigger>
    </>
  );
};

const TicketReservation = () => {
  const dispatch = useDispatch();
  const { matchId } = useParams();
  const [match, setMatch] = useState({});
  const [modalShow, setModalShow] = useState(false);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [reservedSeats, setReservedSeats] = useState([]);
  const seatsRef = useRef();
  let selectedSeatsArr = [];
  const userType = useSelector((state) => state.user.value);

  useEffect(() => {
    dispatch(setActivePage("ticketreservation"));
    // console.log(matchId);
    const getMatch = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3001/api/match/getmatchmid/${matchId}`
        );
        console.log(res);
        if (res.status === 200) {
          setMatch(res.data.match);
          setReservedSeats(res.data.match.reservedSeats);
          // console.log(res.data.match);
        }
      } catch (err) {
        console.log(err);
      }
    };
    getMatch();
  }, []);

  // const seatsRows = 10
  // const seatsCols = 10

  const style = {
    // "width": `calc((100% - ${seatsCols}*5)px/${seatsCols})`,
    "grid-template-columns": `repeat(${match.cols} , minmax(auto,50px))`,
  };
  //match.rows
  //match.cols
  const seatsArr = Array.from({ length: match.rows }, (v, index) =>
    Array.from({ length: match.cols }, (v2, index2) => {
      console.log(reservedSeats);
      let bookedd = reservedSeats.includes(
        `${String.fromCharCode(index + "A".charCodeAt(0))}${index2}`
      );
      return {
        name: `${String.fromCharCode(index + "A".charCodeAt(0))}${index2}`,
        booked: bookedd,
      };
    })
  );

  // const matches =
  // {
  //     homeTeam: "Manchester United",
  //     homeTeamLogo: ManchesterUnitedLogo,
  //     awayTeam: "Liverpool",
  //     awayTeamLogo: LiverpoolLogo,
  //     stadium: "Old Trafford",
  //     date: "2021-10-24",
  //     Time: "12:10",
  //     mainReferee: "Michael Oliver",
  //     linesman1: "Stuart Burt",
  //     linesman2: "Simon Bennett",
  // }

  // console.log(match.ticketPrice)

  const handleOnSubmit = () => {
    selectedSeatsArr = [];

    if (seatsRef.current) {
      const inputs = seatsRef.current.querySelectorAll("input[type=checkbox]");
      inputs.forEach((input) => {
        if (input.checked) {
          selectedSeatsArr.push(input.id);
        }
      });
    }
    if (selectedSeatsArr.length != 0) {
      setSelectedSeats(selectedSeatsArr);
      setModalShow(true);
    }
    // console.log(selectedSeatsArr);
  };

  const handlePay = async () => {
    // console.log(errors)

    try {
      const res = await axios.post(
        `http://localhost:3001/api/match/reservetickets/${matchId}`,
        selectedSeats,
        {
          headers: {
            Authorization: localStorage.getItem("Token"),
          },
        }
      );
      console.log(res);
      if (res.status === 200) {
        console.log("tickets created");
        setReservedSeats(res.data.reservedSeats);
        // console.log(reservedSeats);
        setModalShow(false);
      }
    } catch (err) {
      console.log(err);
    }
    // }
  };
  //   console.log(match);
  //   console.log(match.homeTeam);
  return (
    <>
      <MatchDetails
        matchID={match.matchID}
        homeTeamLogo={match.homeTeamLogo}
        homeTeam={match.homeTeam}
        awayTeamLogo={match.awayTeamLogo}
        awayTeam={match.awayTeam}
        stadium={match.stadium}
        date="2021-10-24"
        Time="12:10"
        mainReferee={match.mainReferee}
        linesman1={match.linesman1}
        linesman2={match.linesman2}
        stadLogo={stadLogo}
        whistle={whistle}
        sideRefLogo={sideRefLogo}
        hideButton={true}
      />
      <div className="d-flex flex-column justify-content-center align-items-center booking-page gap-3">
        {/* hetet abdallah */}

        <h2>Book a Ticket</h2>

        <div className="booking-container">
          <img src={footballcourt} alt="football court" width="100%" />
          <div className="position-relative d-flex justify-content-center">
            <div className="index-seats-alpha pb-md-0 ">
              {seatsArr.map((row, rowI) => (
                <span className="index-alpha">
                  {" "}
                  {String.fromCharCode(rowI + "A".charCodeAt(0))}
                </span>
              ))}
            </div>
            <div ref={seatsRef} className="booking-grid" style={style}>
              {seatsArr.flatMap((row, rowIndex) =>
                row.map((seat, colIndex) => {
                  // console.log(String.fromCharCode(rowIndex + "A".charCodeAt(0)), colIndex);
                  return (
                    <Seat
                      colI={colIndex}
                      isBooked={seat.booked}
                      key={seat.name}
                      name={seat.name}
                      rowNum={seat}
                    />
                  );
                })
              )}

              {/* {seatsArr[0].map((col, rowI) =>

                                <div className='index-numeric  d-none d-lg-block'>{rowI}</div>

                            )} */}
            </div>

            {/* <div className='index-seats-numeric' style={style}>
                            {/* {seatsArr[0].map((col,rowI) => 
                            
                            <span className='index-numeric'>{rowI}</span>
                            
                            )} */}

            {/* </div> */}
          </div>

          <div className="colorguide">
            <div className="onecolorguide">
              <div className="dot bg-secondary"></div>
              <span>Available Seats</span>
            </div>
            <div className="onecolorguide">
              <div className="dot bg-danger"></div>
              <span>Booked Seats</span>
            </div>
            <div className="onecolorguide">
              <div className="dot bg-success"></div>
              <span>Selected Seats</span>
            </div>
          </div>

          {/* <button className=''>Buy Tickets</button> */}
        </div>

        <button
          class={`buyTickets-button type1 ${userType == "M" && "d-none"}`}
          onClick={() => handleOnSubmit()}
        >
          <span class="btn-txt">Buy Tickets</span>
        </button>
      </div>
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        selectedSeatsLength={selectedSeats.length}
        price={match.ticketPrice}
        handlePay={handlePay}
      />
    </>
  );
};

export default TicketReservation;
