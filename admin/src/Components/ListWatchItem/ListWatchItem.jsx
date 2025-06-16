import { useNavigate } from "react-router-dom";
import "./ListWatchItem.css";

function ListWatchItem({ item, url, onDelete }) {
  const navigate = useNavigate();

  return (
    <div className="ListWatchItemWrapper">
      <div className="ListWatchItemContainer">
        <img src={`${url}/images/` + item.image} alt={item.name} />
        <p>{item.name}</p>
        <p>$ {item.price}</p>
        <p>{item.category}</p>
        <div>
          {item.inStock === true ? <p>In Stock</p> : <p>Out of Stock</p>}
        </div>
        <p>{item.tags}</p>
        <button
          className="updateWatchItem"
          onClick={() => navigate(`/update-watch/${item._id}`)}
        >
          Update
        </button>
        <button className="deleteWatchItem" onClick={() => onDelete(item._id)}>
          Delete
        </button>
      </div>
    </div>
  );
}

export default ListWatchItem;
