import FormData from "form-data";
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const url = "http://localhost:5000/api/v1";

const initialArticleState = {
  error: "",
  allArticles: [],
  currentArticlePage: 1,
  articlesPerPage: 12,
  numOfPages: 1,
  myArticles: [],
  article: {},
  queryStringURL: null,
  imagesForPreview: [],
  createArticle: {
    title: "",
    description: "",
    area: "",
    price: "",
    people: "",
    bed: "",
    city: "",
    street: "",
    category: "",
    balkon: false,
    klima: false,
    internet: false,
    garaza: false,
    kablovska: false,
    renoviran: false,
    novogradnja: false,
    bazen: false,
  },
  currentCategory: "",
  search: "",
  searchFilters: {
    city: false,
    minPrice: 1,
    maxPrice: 100000,
    minArea: 1,
    maxArea: 500,
    people: 1,
    bed: 1,
    klima: false,
    garaza: false,
    kablovska: false,
    internet: false,
    novogradnja: false,
    namjesten: false,
    kratkorocno: false,
    dugorocno: false,
  },
};

const articleSlice = createSlice({
  name: "article",
  initialState: initialArticleState,
  reducers: {
    setError(state, action) {
      state.error = action.payload.value;
    },
    setArticles(state, action) {
      state.allArticles = action.payload.data;
    },
    setArticle(state, action) {
      state.article = action.payload.data;
    },
    setMyArticles(state, action) {
      state.myArticles = action.payload.data;
    },
    pushCreatedArticle(state, action) {
      state.myArticles.push(action.payload.data);
    },
    setCurrentCategory(state, action) {
      state.currentCategory = action.payload.value;
    },
    setImagesForPreview(state, action) {
      state.imagesForPreview.push(action.payload.value);
    },
    resetCreateArticle(state) {
      state.createArticle = {
        title: "",
        description: "",
        area: "",
        price: "",
        city: "",
        bed: "",
        people: "",
        street: "",
        category: "",
        balkon: false,
        klima: false,
        internet: false,
        garaza: false,
        kablovska: false,
        renoviran: false,
        novogradnja: false,
        bazen: false,
      };
    },
    setSearchFilters(state, action) {
      // console.log("hmmmmmmmmmmmmmmmmm", action.payload);
      const key = Object.keys(action.payload);
      const value = action.payload[`${Object.keys(action.payload)}`];

      if (value && value !== "izaberi-grad") state.searchFilters[key] = value;
      if (value === "izaberi-grad") state.searchFilters[key] = false;
      if (!value) state.searchFilters[key] = false;
    },
    setSearch(state, action) {
      state.search = action.payload.value;
    },
    resetSearchFilters(state) {
      state.searchFilters = {
        city: false,
        minPrice: 1,
        maxPrice: 100000,
        minArea: 1,
        maxArea: 500,
        people: 1,
        bed: 1,
        klima: false,
        garaza: false,
        kablovska: false,
        internet: false,
        novogradnja: false,
        namjesten: false,
        kratkorocno: false,
        dugorocno: false,
      };
    },
    setCreateArticle(state, action) {
      const field = Object.keys(action.payload)[0];
      state.createArticle[field] = action.payload[field];
      if (field === "city" && action.payload[field] === "izaberi-grad")
        state.createArticle[field] = "";
    },
    setImages(state, action) {
      state.createArticle.images.push(action.payload.value);
    },
    setCurrentArticlePage(state, action) {
      state.currentArticlePage = +action.payload.value;
    },
    setNumOfPages(state, action) {
      state.numOfPages = Math.ceil(
        action.payload.value / state.articlesPerPage
      );
    },
    setQueryStringURL(state, action) {
      state.queryStringURL = action.payload.value;
    },
  },
});

const fetchArticle = async (
  method,
  urlExt,
  token,
  userInputs = {},
  isMultipartData = false
) => {
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

    if (isMultipartData) {
      axiosOptions.headers["Content-Type"] = "multipart/form-data";
    }

    const response = await axios(axiosOptions);

    return response;
  } catch (err) {
    console.log(err);
  }
};

export const getAllArticles = (userInputs = false) => {
  return async (dispatch) => {
    try {
      let response;
      if (userInputs && userInputs.urlExt) {
        response = await fetchArticle(
          "GET",
          `/articles${userInputs.urlExt}`,
          null
        );
      } else {
        response = await fetchArticle("GET", "/articles", null);
      }
      // console.log(response);

      if (response.statusText === "OK") {
        if (userInputs?.myArticles) {
          dispatch(
            articleSlice.actions.setMyArticles({ data: response.data.data })
          );
        } else {
          dispatch(
            articleSlice.actions.setArticles({ data: response.data.data })
          );
          dispatch(
            articleSlice.actions.setNumOfPages({
              value: response.data.numOfArticles,
            })
          );
        }
      }
    } catch (err) {
      console.log(err);
    }
  };
};

export const getArticle = (articleId) => {
  return async (dispatch) => {
    try {
      const response = await fetchArticle(
        "GET",
        `/articles/${articleId}`,
        null
      );

      if (response.statusText === "OK") {
        dispatch(articleSlice.actions.setArticle({ data: response.data.data }));
      }
    } catch (err) {
      console.log(err);
    }
  };
};

export const createNewArticle = (userInputs, token) => {
  return async (dispatch) => {
    try {
      const response = await fetchArticle(
        "POST",
        "/articles",
        JSON.stringify(token),
        userInputs,
        true
      );

      if (response.statusText === "OK") {
        dispatch(
          articleSlice.actions.pushCreatedArticle({ data: response.data.data })
        );
        dispatch(
          articleSlice.actions.setError({ value: "Greska u kreiranju oglasa!" })
        );
      }
    } catch (err) {
      console.log(err);
    }
  };
};

export default articleSlice;
