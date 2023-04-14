//
import { useEffect, useState, useCallback } from "react";
import { RiMailSendFill } from "react-icons/ri";
import { useSelector, useDispatch } from "react-redux";
import { bookingActions } from "../../store/redux-store";
import { sendBooking } from "../../store/reducers/booking-slice";
import { socket } from "../../../helper/socket-connection";
import { DateRange } from "react-date-range";
import { parseISO } from "date-fns";
import { srLatn } from "date-fns/locale";

import NumOfPeople from "./NumOfPeople";
import ShortInputs from "./ShortInputs";

import classes from "./ArticleBooking.module.css";

const ArticleBooking = (props) => {
  const dispatch = useDispatch();
  const { createBooking, formIsValid } = useSelector((state) => state.booking);
  const { article } = useSelector((state) => state.article);
  const { token, isAuthenticated } = useSelector((state) => state.auth);
  const [selectionRange, setSelectionRange] = useState({
    startDate: new Date(Date.now()),
    endDate: new Date(Date.now()),
    key: "selection",
  });
  const [dateRange, setDateRange] = useState([]);
  const [bookedDates, setBookedDates] = useState([]);
  const [firstInit, setFirstInit] = useState(true);

  ////////////////////////////////////////////////////////////////
  // CALCULATE DAYS //////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////
  const dates = useCallback(
    (dateRangeArr, type) => {
      let dateHelper = [...dateRangeArr];
      let helper = [];

      for (
        let i = dateHelper[0].getTime();
        i <= dateRangeArr[1].getTime();
        i += 1 * 24 * 60 * 60 * 1000
      ) {
        if (type === "date-range") {
          console.log(new Date(i).toISOString());
          helper.push(new Date(i).toISOString());
        } else if (type === "booked-dates") {
          setBookedDates((oldState) => [
            ...oldState,
            parseISO(new Date(i).toISOString()),
          ]);
        }
      }

      if (type === "date-range") {
        setSelectionRange({
          startDate: parseISO(helper[0]),
          endDate: parseISO(helper[helper.length - 1]),
          key: "selection",
        });
        dispatch(
          bookingActions.setCheckBookingValidity({
            value: { startingDate: helper[0] },
          })
        );
        dispatch(
          bookingActions.setCheckBookingValidity({
            value: { endingDate: helper[helper.length - 1] },
          })
        );
        setDateRange(helper);
      }
    },
    [dispatch]
  );

  ////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////

  const setMessage = (e) => {
    e.preventDefault();
    dispatch(
      bookingActions.setCheckBookingValidity({
        value: { message: e.target.value },
      })
    );
  };

  useEffect(() => {
    dispatch(bookingActions.setArticle({ value: article._id }));

    if (isAuthenticated) {
      dispatch(bookingActions.setOwner({ value: article.owner._id }));
    }
  }, [dispatch, article, isAuthenticated]);

  console.log(createBooking);

  // //////////////////////////////////////////////////////
  // //////////////////////////////////////////////////////

  // AKO NE BUDE KOD DOLE RADIO OVAJ PREPRAVITI

  // useEffect(() => {
  //   if (article.bookings.length > 0 && firstInit) {
  //     article.bookings.forEach((booking) =>
  //       dates(
  //         [new Date(booking.startingDate), new Date(booking.endingDate)],
  //         "booked-dates"
  //       )
  //     );
  //     setFirstInit(false);
  //   }
  // }, [dispatch, article.bookings, dates, firstInit]);

  useEffect(() => {
    if (article.bookings.length > 0) {
      article.bookings.forEach((booking) =>
        dates(
          [new Date(booking.startingDate), new Date(booking.endingDate)],
          "booked-dates"
        )
      );
    } else {
      setBookedDates([]);
    }
  }, [dispatch, article.bookings, dates]);

  // //////////////////////////////////////////////////////
  // //////////////////////////////////////////////////////

  const submitBooking = (e) => {
    e.preventDefault();
    if (formIsValid) {
      dispatch(
        bookingActions.setCheckBookingValidity({
          value: { price: dateRange.length * article.price },
        })
      );
      console.log(props.data);
      dispatch(sendBooking(createBooking, token));
      socket.emit("notification send", {
        userId: props.data.owner._id,
        type: "booking",
      });
    }
  };

  const handleSelect = (ranges) => {
    const helperStart = ranges.selection.startDate;
    const helperEnd = ranges.selection.endDate;

    // dispatch(
    //   bookingActions.setCheckBookingValidity({
    //     value: { startingDate: helperStart.toISOString() },
    //   })
    // );

    // dispatch(
    //   bookingActions.setCheckBookingValidity({
    //     value: { endingDate: helperEnd.toISOString() },
    //   })
    // );

    dates([helperStart, helperEnd], "date-range");
  };

  // POKUSAJI BOOKING DATUMA
  // POKUSAJI BOOKING DATUMA
  // POKUSAJI BOOKING DATUMA

  // POKUSAJI BOOKING DATUMA
  // POKUSAJI BOOKING DATUMA
  // POKUSAJI BOOKING DATUMA

  return (
    <form
      onSubmit={submitBooking}
      className={`${classes["article__booking-container"]} ${props.class}`}
    >
      {/* <h2>Bookiraj!</h2> */}
      <textarea
        spellCheck={false}
        onChange={setMessage}
        placeholder="Napišite poruku..."
        // value={createBooking.message}
      />
      {/* <ShortInputs /> */}
      <NumOfPeople className={classes["article__booking-nop"]} />
      <DateRange
        rangeColors={["#48a0cf"]}
        className={classes["article__booking-calendar"]}
        locale={srLatn}
        disabledDates={bookedDates}
        ranges={[selectionRange]}
        onChange={handleSelect}
        minDate={new Date(Date.now())}
      />
      <div className={classes["separator"]} />
      <div className={classes["total-price"]}>
        <p>
          ukupno:{" "}
          <span>
            {dateRange.length === 0
              ? article.price
              : dateRange.length * article.price}
          </span>{" "}
          KM
        </p>
      </div>
      <div className={classes["separator"]} />
      {formIsValid && (
        <button className={classes["booking__btn"]} type="submit">
          <p>Pošalji upit</p>
          <RiMailSendFill className={classes["article__booking-icon"]} />
        </button>
      )}
      {!formIsValid && (
        <button type="click" className={classes["inactive-btn"]}>
          <p>Pošalji upit</p>
          <RiMailSendFill className={classes["article__booking-icon"]} />
        </button>
      )}
    </form>
  );
};

export default ArticleBooking;
