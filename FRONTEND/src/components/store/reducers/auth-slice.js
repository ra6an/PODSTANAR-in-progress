import FormData from "form-data";
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import validator from "validator";

import socketCon from "../../../helper/socket-connection";

const url = "http://localhost:5000/api/v1";

const initialAuthState = {
  // AUTH STORE USER /////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////
  user: {},
  articles: [],
  isAuthenticated: false,
  token: "",

  // AUTH INPUTS AND VALIDATION///////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////
  username: "",
  usernameIsValid: false,
  email: "",
  emailIsValid: false,
  phone: "",
  phoneIsValid: false,
  city: "",
  password: "",
  passwordIsValid: false,
  oldPassword: "",
  oldPasswordIsValid: false,
  confirmPassword: "",
  confirmPasswordIsValid: false,
  formIsValid: false,

  // MESSAGES & BOOKINGS & NOTIFICATIONS//////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////
  messages: [],
  conversations: [],
  currentConversation: {},
  currentChatId: "",
  currentUserForChat: "",
  // newMessageReceived: 0,
  // bookings: [],
  notifications: [],
  newMessage: [],
  newNotification: [],
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    ////////////////////////////////////////////////////////////////////////////////////
    // AUTH REDUCERS ///////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    setUser(state, action) {
      console.log(action.payload.data);
      state.user = action.payload.data;
    },
    setToken(state, action) {
      state.token = action.payload.data.token;
      localStorage.setItem("token", JSON.stringify(state.token));
      localStorage.setItem("token-exp", action.payload.data.expiresIn);
    },
    setLogin(state, action) {
      state.isAuthenticated = true;
    },
    setSignup(state, action) {
      state.user = action.payload.data.data;
      state.isAuthenticated = true;
      socketCon();
    },
    setLogout(state) {
      state.user = {};
      state.bookings = [];
      state.articles = [];
      state.messages = [];
      state.notifications = [];
      state.token = "";
      state.isAuthenticated = false;
    },
    setUserData(state, action) {
      state.user = action.payload.data.data;
      state.bookings = action.payload.data.data.bookings;
      state.articles = action.payload.data.data.articles;
      state.messages = action.payload.data.data.messages;
      state.notifications = action.payload.data.data.notifications;
    },

    ////////////////////////////////////////////////////////////////////////////////////
    // AUTH INPUTS AND VALIDATION REDUCERS /////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    setUsername(state, action) {
      state.username = action.payload.value;

      const usernameIsAlphanumeric = validator.isAlphanumeric(state.username);
      const usernameIsLength = validator.isLength(state.username, {
        min: 1,
        max: 20,
      });

      if (usernameIsAlphanumeric && usernameIsLength) {
        state.usernameIsValid = true;
      } else if (!usernameIsAlphanumeric || !usernameIsLength) {
        state.usernameIsValid = false;
      }
    },
    setEmail(state, action) {
      state.email = action.payload.value;
      const emailIsValid = validator.isEmail(state.email);

      if (emailIsValid) {
        state.emailIsValid = true;
      } else {
        state.emailIsValid = false;
      }
    },
    setPassword(state, action) {
      state.password = action.payload.value;

      const passwordIsValid = validator.isLength(state.password, {
        min: 8,
        max: 30,
      });

      if (passwordIsValid) {
        state.passwordIsValid = true;
      } else {
        state.passwordIsValid = false;
      }

      if (state.password === state.confirmPassword) {
        state.confirmPasswordIsValid = true;
      }
    },
    setConfirmPassword(state, action) {
      state.confirmPassword = action.payload.value;

      const confirmPasswordIsValid = action.payload.value === state.password;
      if (confirmPasswordIsValid) {
        state.confirmPasswordIsValid = true;
      } else {
        state.confirmPasswordIsValid = false;
      }
    },
    clearAuthInputs(state) {
      state.username = "";
      state.email = "";
      state.password = "";
      state.confirmPassword = "";
    },
    updateUser(state, action) {
      const updatedFields = Object.keys(action.payload.data);

      console.log(updatedFields, "💰");
      console.log(action.payload.data, "💰");

      updatedFields.forEach(
        (field) => (state.user[field] = action.payload.data[field])
      );
    },

    ////////////////////////////////////////////////////////////////////////////////////
    // MESSAGE REDUCERS/////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    setNewMessage(state, action) {
      state.newMessage.push(action.payload.value);
    },
    setSeenMessages(state, action) {
      const convId = action.payload.value;
      console.log(convId);
      state.newMessage = state.newMessage.filter((msg) => msg !== convId);
    },
    setNewNotification(state, action) {
      state.newNotification.push(action.payload.value);
    },

    // setConversations(state, action) {
    //   state.conversations = action.payload.data;
    // },
    setMessages(state, action) {
      state.messages = action.payload.data;
    },
    pushMessages(state, action) {
      const data = action.payload.data.msg;
      const convId = action.payload.data.conversationId;
      state.messages.map((conv) => {
        if (conv._id === convId) {
          return conv.messages.push(data);
        } else {
          return conv;
        }
      });
    },
    setCurrentConversation(state, action) {
      state.currentConversation = action.payload.data;
    },
    setCurrentUserForChat(state, action) {
      state.currentUserForChat = action.payload.value;
    },
    setCurrentChatId(state, action) {
      state.currentChatId = action.payload.value;
    },
    setNewMessageReceived(state) {
      state.newMessageReceived++;
    },
    pushCurrentConversation(state, action) {
      state.currentConversation.messages.push(action.payload.data);
    },
  },
});

////////////////////////////////////////////////////////////////////////////////////
// FETCH DATA //////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////

const fetchAuth = async (method, urlExt, token, userInputs = {}) => {
  try {
    const axiosOptions = {
      method,
      url: url + urlExt,
      data: userInputs,
    };

    if (token !== null) {
      axiosOptions.headers = {};
      axiosOptions.headers.Authorization = `Bearer ${JSON.parse(token)}`;
      axiosOptions.withCredentials = true;
    }

    const response = await axios(axiosOptions);

    return response;
  } catch (err) {
    console.log(err, "💣");
    throw err;
  }
};

export const login = (userInputs) => {
  return async (dispatch) => {
    try {
      const response = await fetchAuth(
        "POST",
        "/users/login",
        null,
        userInputs
      );

      if (response.statusText === "OK") {
        dispatch(authSlice.actions.setLogin({ data: response.data.data }));
        dispatch(authSlice.actions.setToken({ data: response.data.token }));
        dispatch(authSlice.actions.setUserData({ data: response.data }));
        dispatch(authSlice.actions.clearAuthInputs());
      }
    } catch (err) {
      console.log(err);
    }
  };
};

export const signup = (userInputs) => {
  return async (dispatch) => {
    try {
      const response = await fetchAuth(
        "POST",
        "/users/signup",
        null,
        userInputs
      );

      if (response.statusText === "OK") {
        dispatch(authSlice.actions.setSignup({ data: response.data }));
        dispatch(
          authSlice.actions.setToken({ data: response.data.token.token })
        );
        dispatch(authSlice.actions.clearAuthInputs());
      }
    } catch (err) {
      console.log(err);
    }
  };
};

export const getMyData = (token) => {
  return async (dispatch) => {
    try {
      const response = await fetchAuth("GET", "/users/me", token);

      // state.token = JSON.stringify(action.payload.data.token.token);

      if (response.statusText === "OK") {
        dispatch(authSlice.actions.setUserData({ data: response.data }));
        dispatch(
          authSlice.actions.setToken({
            data: { token: JSON.parse(localStorage.getItem("token")) },
          })
        );
        // dispatch(authSlice.actions.setLogin());
        // dispatch(authSlice.actions.setLogin({ data: response.data }));
      }
    } catch (err) {
      console.log(err);
    }
  };
};

export const getAllMessages = (userId, token) => {
  return async (dispatch) => {
    try {
      const response = await fetchAuth(
        "GET",
        `/users/${userId}/messages`,
        token
      );

      if (response.statusText === "OK") {
        dispatch(authSlice.actions.setMessages({ data: response.data.data }));
      }
    } catch (err) {
      console.log(err);
    }
  };
};

export const updateMe = (userInputs, token) => {
  return async (dispatch) => {
    try {
      const response = await fetchAuth(
        "PATCH",
        "/users/me",
        JSON.stringify(token),
        userInputs
      );

      if (response.statusText === "OK") {
        const updatedFields = {};

        console.log(response.data.data.image);
        updatedFields.username = response.data.data.username;
        updatedFields.email = response.data.data.email;
        response.data.data.city
          ? (updatedFields.city = response.data.data.city)
          : (updatedFields.city = "");
        response.data.data.firstName
          ? (updatedFields.firstName = response.data.data.firstName)
          : (updatedFields.firstName = "");
        response.data.data.lastName
          ? (updatedFields.lastName = response.data.data.lastName)
          : (updatedFields.lastName = "");
        updatedFields.image = response.data.data.image;

        console.log(updatedFields);

        dispatch(
          authSlice.actions.updateUser({
            data: updatedFields,
          })
        );
      }
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };
};

export const fetchMessage = (userId, userInputs, token) => {
  return async (dispatch) => {
    const response = fetchAuth(
      "POST",
      `/users/${userId}/messages`,
      JSON.stringify(token),
      userInputs
    );

    try {
    } catch (err) {
      console.log(err);
    }
  };
};

export default authSlice;
