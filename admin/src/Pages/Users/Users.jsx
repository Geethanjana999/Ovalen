import { useState, useEffect } from "react";
import ListUser from "../../Components/ListUsers/ListUser";
import axios from "axios";
import { toast } from "react-toastify";

function Users() {
  const url = "http://localhost:4000";
  const [loading, setLoading] = useState(false); // loading indicator
  const [list, setList] = useState([]); // store users

  // fetch all data
  const fetchList = async () => {
    setLoading(true); // start loading
    try {
      const response = await axios.get(`${url}/api/v1/user/list`);

      if (response.data.success) {
        setList(response.data.data);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      // DEBUG:
      console.log("Error fetching data:", error);
      toast.error(
        error.response?.data?.message || "An unexpected error occurred."
      );
    } finally {
      setLoading(false); // stop loading
    }
  };

  // remove / delete user
  const removeUser = async (userId) => {
    // _id
    try {
      const response = await axios.post(`${url}/api/v1/user/remove`, {
        id: userId,
      }); // _id

      if (response.status === 200) {
        fetchList(); // fetch data after delete user
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      // DEBUG:
      console.log(error);
      toast.error(
        error.response?.data?.message || "An unexpected error occurred."
      );
    }
  };

  // fetch list when webpage is loading
  useEffect(() => {
    fetchList();
    return () => {};
  }, []);

  return (
    <div className="watchList">
      <h1 className="title">Users</h1>

      <div className="scrollArea">
        <div className="scrollAreaContent">
          {loading ? (
            <p>Loading...</p>
          ) : (
            list.map((user, index) => (
              <ListUser key={index} user={user} onDelete={removeUser} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Users;
