import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getMyData } from "./components/store/reducers/auth-slice";
import { getBookings } from "./components/store/reducers/booking-slice";
import { authActions } from "./components/store/redux-store";
import { socket } from "./helper/socket-connection";
import socketCon from "./helper/socket-connection";

// CSS for mapbox, calendar
import "mapbox-gl/dist/mapbox-gl.css";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file

import classes from "./App.css";

// KOMPONENTE
import Header from "./components/header/Header";
import Articles from "./pages/Articles";
import Article from "./pages/Article";
import Auth from "./pages/Auth";
import Messages from "./pages/Messages";
import Notifications from "./pages/Notifications";
import CreateArticle from "./pages/CreateArticle";
import MyProfile from "./pages/MyProfile";
import MyArticles from "./pages/MyArticles";

function App() {
  const dispatch = useDispatch();
  const [msg, setMsg] = useState();
  const [notify, setNotify] = useState([]);
  const [sck, setSck] = useState(null);
  const [canConnect, setCanConnect] = useState(false);
  const { isAuthenticated, user, token, currentConversation } = useSelector(
    (state) => state.auth
  );
  // const { allArticles } = useSelector((state) => state.article);

  // const currentTime = new Date(Date.now());
  // const tokenExpiresTime = {};

  useEffect(() => {
    if (localStorage.getItem("token") && !isAuthenticated) {
      dispatch(getMyData(localStorage.getItem("token")));
      dispatch(authActions.setLogin());
      setCanConnect(true);
    }
  }, [dispatch, isAuthenticated]);

  useEffect(() => {
    if (token) dispatch(getBookings(user._id, token));
  }, [user._id, token, dispatch]);

  // useEffect(() => {
  //   console.log(sck);
  // }, [canConnect, sck]);

  // socket.on("message recieve", (data) => {
  //   console.log(data);
  // });

  useEffect(() => {
    if (canConnect && user._id) {
      socketCon({ id: user._id });
      setSck(socket);
      setCanConnect(false);
    }
    // return () => socket.close();
  }, [canConnect, user._id]);

  useEffect(() => {
    if (sck) setSck(socket);
    sck?.on("message receive", (data) => {
      console.log("poruka stigla");
      setMsg(data);
    });
    sck?.on("notification receive", (data) => {
      console.log(data);
      setNotify((oldState) => [...oldState, data.type]);
    });
  }, [sck]);

  useEffect(() => {
    if (msg && msg.text) {
      dispatch(
        authActions.pushMessages({
          data: {
            conversationId: msg.conversationId,
            msg: {
              creator: msg.creator,
              text: msg.text,
              createdAt: msg.createdAt,
              recipient: user._id,
              seen: false,
              _id: Math.random(),
            },
          },
        })
      );
      dispatch(authActions.setNewMessageReceived());
      if (currentConversation._id === msg.conversationId) {
        dispatch(
          authActions.pushCurrentConversation({
            data: {
              creator: msg.creator,
              text: msg.text,
              createdAt: msg.createdAt,
              recipient: user._id,
              seen: false,
              _id: Math.random(),
            },
          })
        );
      }
      dispatch(
        authActions.setNewMessage({
          value: msg.conversationId,
        })
      );
    }
  }, [currentConversation._id, dispatch, user._id, msg]);

  useEffect(() => {
    if (notify.length > 0) {
      if (notify[notify.length - 1] === "booking") {
        dispatch(getBookings(user._id, token));
        dispatch(
          authActions.setNewNotification({ value: { type: "booking" } })
        );
      } else if (notify[notify.length - 1] === "booking-response") {
        console.log("dosla");
        dispatch(getBookings(user._id, token));
        dispatch(
          authActions.setNewNotification({
            value: { type: "booking-response" },
          })
        );
      } else if (notify[notify.length - 1] === "review") {
        dispatch(getMyData(token));
      }
    }
  }, [dispatch, token, user._id, notify]);

  return (
    <div className={classes.container}>
      <Header />
      <Routes>
        <Route path="/" element={<Articles />} />
        <Route path="/oglasi" element={<Articles />} />
        <Route path="/oglasi/:kategorija" element={<Articles />} />
        <Route path="/oglasi/:kategorija/:articleId" element={<Article />} />
        <Route path="/poruke/:conversationId" element={<Messages />} />
        <Route path="/poruke" element={<Messages />} />
        <Route path="/notifikacije/*" element={<Notifications />} />
        <Route path="/moj-profil" element={<MyProfile />} />
        <Route path="/moji-oglasi" element={<MyArticles />} />
        <Route path="/objavi-oglas" element={<CreateArticle />} />
        <Route path="/auth/*" element={<Auth />} />
      </Routes>
      {/* <button
        onClick={(e) => {
          e.preventDefault();
          socket.emit("message", { data: "lol", message: "radi fkt" });
        }}
      >
        puljka
      </button> */}
    </div>
  );
}

export default App;
