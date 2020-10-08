import http from "../http-common";

const getAll = () => {
  return http.get("/restaurants");
};

const get = (restaurant_id) => {
  return http.get(`/restaurants/${restaurant_id}`);
};

const create = (data) => {
  return http.post("/restaurants", data);
};

const update = (id, data) => {
  return http.put(`/restaurants/${id}`, data);
};

const remove = (id) => {
  return http.delete(`/restaurants/${id}`);
};

const removeAll = () => {
  return http.delete(`/restaurants`);
};

const search = (searchTerms) => {
  // dynamic build string here
  // let _searchTerms = searchTerms.map((term) => `${term}=${term.value}&&`);
  let _searchTerms = Object.entries(searchTerms);
  _searchTerms = _searchTerms.map((term) => `${term[0]}=${term[1]}&&`);
  _searchTerms = _searchTerms.join("").slice(0, -2);
  const response = http.get(`/restaurants?${_searchTerms}`);
  console.log(response);
  return response;
};

export default {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  search,
};
