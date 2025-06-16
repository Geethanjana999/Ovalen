import "./WatchList.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import ExploreMenu from "../../Components/ExploreMenu/ExploreMenu";
import ListWatchItem from "../../Components/ListWatchItem/ListWatchItem";

function WatchList() {
  const url = "http://localhost:4000";

  const [loading, setLoading] = useState(false); // optional - implement loading indicator
  const [category, setCategory] = useState("All");
  const [list, setList] = useState([]); // store watch items

  // fetch all data
  const fetchList = async () => {
    setLoading(true); // Start loading
    try {
      const response = await axios.get(`${url}/api/v1/watch/list`);
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
      setLoading(false); // Stop loading
    }
  };

  // remove / delete item
  const removeItem = async (itemId) => {
    // _id
    try {
      const response = await axios.post(`${url}/api/v1/watch/remove`, {
        id: itemId,
      }); // _id

      if (response.status === 200) {
        fetchList(); // fetch data after delete
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

  // update item

  // fetch list when webpage is loading
  useEffect(() => {
    fetchList();
    return () => {};
  }, []);

  return (
    <div className="watchList">
      <h1 className="title">Watches</h1>
      <ExploreMenu category={category} setCategory={setCategory} />
      <div className="scrollArea">
        <div className="scrollAreaContent">
          {loading ? (
            <p>Loading...</p>
          ) : (
            list
              .filter(
                (item) => item.category === category || category === "All"
              )
              .map((item, index) => (
                <ListWatchItem
                  key={index}
                  item={item}
                  url={url}
                  onDelete={removeItem}
                />
              ))
          )}
        </div>
      </div>
    </div>
  );
}

export default WatchList;
