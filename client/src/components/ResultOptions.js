import React from "react";
import Select from "react-select";

const ResultOptions = ({ model, setModel }) => {
  const options = [
    { value: "name", label: "Name" },
    { value: "cuisine", label: "Cuisine" },
    { value: "building", label: "Building" },
    { value: "latitude", label: "Latitude" },
    { value: "longitude", label: "Longitude" },
    { value: "street", label: "Street" },
    { value: "zipcode", label: "Zip Code" },
    { value: "restaurant_id", label: "Restaurant ID" },
    { value: "borough", label: "Borough" },
    { value: "grades", label: "Grades" },
  ];

  const _model = {
    name: true,
    cuisine: true,
    building: true,
    latitude: true,
    longitude: true,
    street: true,
    zipcode: true,
    grades: true,
    borough: true,
    restaurant_id: true,
  };

  const updateModel = (choices) => {
    if (choices !== null) {
      let _choices;
      choices.forEach((choice) => {
        _choices = { ..._choices, [choice.value]: true };
      });

      model = { ...model, ..._choices };
      setModel(model);
    } else {
      model = { ...model, ..._model };
      setModel(model);
    }
  };

  return (
    <>
      <Select options={options} isMulti onChange={updateModel} />
    </>
  );
};

export default ResultOptions;
