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

const search = (searchTerms, page, pageSize) => {
  let _searchTerms = Object.entries(searchTerms);
  _searchTerms = _searchTerms.map((term) => `${term[0]}=${term[1]}&&`);
  _searchTerms = _searchTerms.join("");
  const response = http.get(
    `/restaurants?${_searchTerms}page=${page}&&pageSize=${pageSize}`
  );
  return response;
};

export default {
  getAll,
  get,
  create,
  update,
  search,
};
