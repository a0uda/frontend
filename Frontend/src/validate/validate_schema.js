import * as yup from "yup";

export const validateSchema = {
  firstName: yup
    .string()
    .required("First Name is required")
    .min(3, "First name should have more than 3 characters")
    .max(30, "First name cannot exceed 30 characters"),
  lastName: yup
    .string()
    .required("Last Name is required")
    .min(3, "Last name should have more than 3 characters")
    .max(30, "Last name cannot exceed 30 characters"),
  username: yup
    .string()
    .required("Username is required")
    .min(3, "Username should have more than 3 characters")
    .max(30, "Username cannot exceed 30 characters"),
  email: yup.string().required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character [@$!%*?&#]"
    )
    .min(8, "Password must be at least 8 characters")
    .max(20, "Password must be at most 20 characters"),
  city: yup
    .string()
    .required("City is required")
    .min(3, "City should have more than 3 characters")
    .max(30, "City cannot exceed 30 characters"),
  //address: yup.string().required("Address is required"),
  // password: yup.string().required("Password is required"),
  dob: yup
    .date()
    .required("Date of Birth is required")
    .max(new Date(), "Date of Birth cannot be in the future"),
  gender: yup.string().required("Please select an option"),
  type: yup.string().required("Please select an option"),
  confirmPassword: yup
    .string()
    .required("Confirm Password is required")
    .oneOf([yup.ref("password"), null], "Passwords must match"),

  StadName: yup.string().required("Stadium name is required"),
  StadRows: yup
    .number()
    .positive()
    .integer()
    .required("Number of seats is required"),
  StadCity: yup.string().required("Please select a city"),
  StadSeats: yup
    .number()
    .positive()
    .integer()
    .required("Number of seats is required"),
  HomeTeam: yup.string().required("Please select an option"),
  AwayTeam: yup
    .string()
    .required("Please select an option")
    .test(
      "not-equal",
      "AwayTeam must be different from HomeTeam",
      function (value) {
        const field1Value = this.parent.HomeTeam;
        return field1Value !== value;
      }
    ),
  MatchVenue: yup.string().required("Please select an option"),
  date: yup
    .date()
    .required("Match date is required")
    .min(new Date(), "Match Date cannot be in the past"),
  time: yup.string().required("Match time is required"),
  MainReferee: yup.string().required("Please select an option"),
  Linesman1: yup
    .string()
    .required("Please select an option")
    .test(
      "not-equal",
      "Linesman1 must be different from MainReferee",
      function (value) {
        const field1Value = this.parent.MainReferee;
        return field1Value !== value;
      }
    ),
  Linesman2: yup
    .string()
    .required("Please select an option")
    .test(
      "not-equal",
      "Linesman2 must be different from MainReferee",
      function (value) {
        const field1Value = this.parent.MainReferee;
        return field1Value !== value;
      }
    )
    .test(
      "not-equal",
      "Linesman2 must be different from Linesman1",
      function (value) {
        const field2Value = this.parent.Linesman1;
        return field2Value !== value;
      }
    ),
  Ticketprice: yup
    .number()
    .positive()
    .integer()
    .required("Ticket price is required"),
  cardHolderName: yup.string().required("Name is required"),
  cardNumber: yup
    .string()
    .required("Credit card number is required")
    .test(
      "luhn-algorithm",
      "Invalid credit card number",
      function isValidCreditCardNumber(cardNumber) {
        const cleanedCardNumber = cardNumber.replace(/\D/g, "");

        if (!/^\d+$/.test(cleanedCardNumber)) {
          return false;
        }

        let sum = 0;
        let double = false;

        for (let i = cleanedCardNumber.length - 1; i >= 0; i--) {
          let digit = parseInt(cleanedCardNumber.charAt(i), 10);

          if (double) {
            digit *= 2;
            if (digit > 9) {
              digit -= 9;
            }
          }

          sum += digit;
          double = !double;
        }

        return sum % 10 === 0;
      }
    ),

  expiryDate: yup
    .date()
    .required("Expiry date is required")
    .min(new Date(), "Card Expired"),
  code: yup
    .string()
    .required("CCV is required")
    .matches(/^\d{3,4}$/, "CCV must be a string of 3 or 4 numbers"),
};
