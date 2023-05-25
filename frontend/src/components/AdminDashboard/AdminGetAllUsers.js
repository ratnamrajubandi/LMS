import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";

import "./AdminGetAllUsers.css";
import { url } from "../../utils";

const AdminGetAllUsers = () => {
  const [userslist, setUsersList] = useState([]);
  //////////////////////
  const [status, setStatus] = useState("");

  const userRole = useSelector((state) => state.login.role);

  const getUsers = async () => {
    const response = await axios.get("http://localhost:4001/users");
    
    console.log(response);
    setUsersList(response.data);
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        await getUsers();
      } catch (err) {
        console.error(err);
      }
    };

    fetchUsers();
  }, []);

  ///////////////////////
  const handleToggle = (userId) => {
    axios
      .post(`${url}user/toggleRole`, { userId })
      .then(async (response) => {
        setStatus(response.data.message);
        await getUsers();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="getusers">
      <div className="text-div">
        <div className="d-flex justify-content-between pt-5 fw-bolder border-bottom">
          <p className="p-2">User Email</p>
          <p className="p-2">User Role</p>
          <p className="p-2 m-2">Change Role</p>
        </div>

        {userslist.map((user) => (
          <div className="d-flex justify-content-between pt-2">
            <p className="p-2">{user.email}</p>
            <p className="p-2">{user.role}</p>

            <button
              className="p-2 m-2 btn btn-primary border rounded-pill"
              onClick={() => {
                handleToggle(user.email);
              }}
            >
              Change Role
            </button>
          </div>
        ))}
      </div>
      <div className="text-end pb-1 pr-5 mx-5 mt-4 pt-4">
        {/* <Link className="text-decoration-none" to="/admindashboard">
            <p>Return to Dashboard</p>
          </Link> */}
        <Link
          className="text-decoration-none"
          to={
            userRole === "superadmin" ? "/admindashboard" : "/admin2dashboard"
          }
        >
          <p className="mt-3">Return to Dashboard</p>
        </Link>
      </div>
    </div>
  );
};

export default AdminGetAllUsers;
