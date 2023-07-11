import React, { useState, useEffect } from "react";
import MySelect from "./MySelect";
import axios from "axios";
import { components } from "react-select";

const Option = (props) => {
  return (
    <div>
      <components.Option {...props}>
        <input
          type="checkbox"
          checked={props.isSelected}
          onChange={() => null}
        />{" "}
        <label>{props.label}</label>
      </components.Option>
    </div>
  );
};

const MultiValue = (props) => (
  <components.MultiValue {...props}>
    <span>{props.data.label}</span>
  </components.MultiValue>
);

const MulitSelectOptions = () => {
  const [optionSelected, setOptionSelected] = useState(null);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/users"
        );
        setUsers(
          response.data.map((user) => ({
            label: user.name,
            value: user.id.toString(),
          }))
        );
      } catch (error) {
        console.log("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleChange = (selected) => {
    setOptionSelected(selected);
  };

  return (
    <MySelect
      options={users}
      isMulti
      closeMenuOnSelect={false}
      hideSelectedOptions={false}
      components={{ Option, MultiValue }}
      onChange={handleChange}
      allowSelectAll={true}
      value={optionSelected}
    />
  );
};
export default MulitSelectOptions;
