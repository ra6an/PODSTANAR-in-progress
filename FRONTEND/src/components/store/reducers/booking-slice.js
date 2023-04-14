//
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import validator from "validator";

const url = "http://localhost:5000/api/v1";

const initialBookingState = {
  createBooking: {
    message: "",
    startingDate: "",
    endingDate: "",
    owner: "",
    article: "",
    people: 1,
    pets: false,
    price: 0,
  },
  messageIsValid: false,
  startingDateIsValid: false,
  endingDateIsValid: false,
  formIsValid: false,
  currentArticleBookings: [],
  allBookings: [],
  bookings: [],
  myBookings: [],
};

const bookingSlice = createSlice({
  name: "booking",
  initialState: initialBookingState,
  reducers: {
    setAllBookings(state, action) {
      state.allBookings = action.payload.data;
    },
    setOwner(state, action) {
      state.createBooking.owner = action.payload.value;
    },
    setArticle(state, action) {
      state.createBooking.article = action.payload.value;
    },
    setCheckBookingValidity(state, action) {
      let messageIsValid, startingDateIsValid, endingDateIsValid;
      if (Object.keys(action.payload.value)[0] === "price")
        state.createBooking.price = action.payload.value.price;

      if (Object.keys(action.payload.value)[0] === "message") {
        messageIsValid = validator.isLength(action.payload.value.message, {
          min: 1,
          max: 500,
        });
        state.messageIsValid = messageIsValid;
        if (messageIsValid)
          state.createBooking.message = action.payload.value.message;
      }

      if (Object.keys(action.payload.value)[0] === "startingDate") {
        const dateValue = action.payload.value.startingDate;

        // //////////////////////////////////////////////////////////////////
        // console.log(new Date(action.payload.value.startingDate).getTime());
        // console.log(new Date(Date.now()).getTime());
        // //////////////////////////////////////////////////////////////////

        const startingDateIsGreaterThanNow =
          new Date(dateValue).getTime() > new Date(Date.now()).getTime();

        state.startingDateIsValid = startingDateIsGreaterThanNow;
        // console.log(startingDateIsValid);
        state.createBooking.startingDate = new Date(dateValue).toISOString();
      }

      if (Object.keys(action.payload.value)[0] === "endingDate") {
        const dateValue = action.payload.value.endingDate;
        const endingDateIsGreaterThanNow =
          new Date(dateValue).getTime() > new Date(Date.now()).getTime();
        const endingDateGreaterThanStarting =
          new Date(dateValue).getTime() >=
          new Date(state.createBooking.startingDate).getTime();

        state.endingDateIsValid =
          endingDateIsGreaterThanNow && endingDateGreaterThanStarting;
        // console.log(endingDateIsValid);
        state.createBooking.endingDate = new Date(dateValue).toISOString();
      }

      state.messageIsValid &&
      state.startingDateIsValid &&
      state.endingDateIsValid
        ? (state.formIsValid = true)
        : (state.formIsValid = false);
    },
    setBookings(state, action) {
      state.bookings = action.payload.data;
    },
    setMyBookings(state, action) {
      state.myBookings = action.payload.data;
    },
    updateBookings(state, action) {
      const updatedBookings = state.bookings.map((b) => {
        if (b._id === action.payload.id) {
          b.status = action.payload.response;
          return b;
        } else {
          return b;
        }
      });
      console.log(updatedBookings);
      state.bookings = updatedBookings;
    },
    updateMyBookings(state, action) {
      const updatedMyBookings = state.myBookings.map((b) => {
        if (b._id === action.payload.id) {
          b.seen = action.payload.seen;
          return b;
        } else {
          return b;
        }
      });

      state.myBookings = updatedMyBookings;
    },
    clearCreateBooking(state) {
      state.createBooking.message = "";
      state.createBooking.startingDate = "";
      state.createBooking.endingDate = "";
      state.createBooking.people = 1;
      state.createBooking.pets = false;
    },
  },
});

const fetchBooking = async (method, urlExt, token = null, userInputs = {}) => {
  try {
    const axiosOptions = {
      method,
      url: `${url}${urlExt}`,
      withCredentials: true,
    };

    if (userInputs) axiosOptions.data = userInputs;
    if (token) axiosOptions.headers = {};
    axiosOptions.headers.Authorization = `Bearer ${JSON.parse(token)}`;

    const response = await axios(axiosOptions);

    return response;
  } catch (err) {
    throw err;
  }
};

export const sendBooking = (userInputs, token) => {
  return async (dispatch) => {
    try {
      const url = `/articles/${userInputs.article}/bookings`;
      const response = await fetchBooking(
        "POST",
        url,
        JSON.stringify(token),
        userInputs
      );

      if (response.statusText === "OK") {
        dispatch(bookingSlice.actions.clearCreateBooking());
      }
    } catch (err) {
      console.log(err);
    }
  };
};

export const getBookings = (userId, token) => {
  return async (dispatch) => {
    try {
      const response = await fetchBooking(
        "GET",
        `/users/${userId}/bookings/me`,
        JSON.stringify(token)
      );

      if (response.statusText === "OK") {
        dispatch(
          bookingSlice.actions.setBookings({
            data: response.data.data.bookings,
          })
        );
        dispatch(
          bookingSlice.actions.setMyBookings({
            data: response.data.data.myBookings,
          })
        );
      }
    } catch (err) {
      console.log(err);
    }
  };
};

export const respondToBooking = (bookingId, userInputs, token) => {
  return async (dispatch) => {
    const response = await fetchBooking(
      "PATCH",
      `/bookings/${bookingId}`,
      JSON.stringify(token),
      userInputs
    );

    if (response.statusText === "OK") {
      if (userInputs.response) {
        dispatch(
          bookingSlice.actions.updateBookings({
            id: bookingId,
            response: userInputs.response,
          })
        );
      } else if (userInputs.seen) {
        dispatch(
          bookingSlice.actions.updateMyBookings({
            id: bookingId,
            seen: userInputs.seen,
          })
        );
      }
    }
    try {
    } catch (err) {
      console.log(err);
    }
  };
};

export default bookingSlice;
