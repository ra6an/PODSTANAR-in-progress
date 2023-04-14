const queryStrCreator = (currentPage = 1, obj, category = "", search = "") => {
  // const str = {};
  // Object.keys(obj).forEach((key) => {
  //   if (!obj[key]) return;
  //   if (obj[key]) return (str[key] = obj[key]);
  // });

  let queryStr = `?page=${currentPage}`;

  const final = Object.entries(obj).forEach((e) => {
    const numberFields = ["minPrice", "maxPrice", "minArea", "maxArea"];
    const includes = numberFields.includes(e[0]);

    if (includes && e[1] !== false && e[1] !== "0") {
      const field = e[0].slice(3, e[0].length).toLowerCase();
      const action = e[0].includes("min") ? "[gte]" : "[lte]";
      queryStr = queryStr + `&${field}${action}=${e[1]}`;
    }

    if (!includes && e[1] !== false) {
      queryStr = queryStr + `&${e[0].toLowerCase()}=${e[1]}`;
    }
  });

  if (category !== "") {
    queryStr = queryStr + `&category=${category}`;
  }

  if (search !== "") {
    queryStr = queryStr + `&search=${search.split(" ").join("-")}`;
  }

  return queryStr;
  // return queryStr.length === 1 ? queryStr : queryStr.slice(0, -1);
};

export default queryStrCreator;
