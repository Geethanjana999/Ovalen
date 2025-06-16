import "./LargeItem.css";
import "../../index.css";

function LargeItem({ item }) {
  return (
    <div>
      <div className="itemCard">
        <img src={item.src} alt={item.name} />
      </div>
    </div>
  );
}

export default LargeItem;
