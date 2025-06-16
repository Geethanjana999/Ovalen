import "./ListUser.css";
function ListUser({ user, onDelete }) {
  return (
    <div className="ListUserWrapper">
      <div className="listUserContainer">
        <p>{user.name}</p>
        <p>{user.email}</p>
        <button className="deleteUser" onClick={() => onDelete(user._id)}>
          Delete
        </button>
      </div>
    </div>
  );
}

export default ListUser;
