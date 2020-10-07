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
  const response = http.get(`/restaurants?restaurant_id=${restaurant_id}`);
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
  findByTitle,
};
