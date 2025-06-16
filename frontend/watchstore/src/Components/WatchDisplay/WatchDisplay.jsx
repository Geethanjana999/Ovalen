import { useContext } from "react";
import { StoreContext } from "../../Context/StoreContextProvider";
import WatchItem from "./WatchItem";
import "./WatchDisplay.css";

function WatchDisplay({ category }) {
  const { watchItems } = useContext(StoreContext);

  return (
    <div>
      <section className="watchDisplaySection">
        <h1 className="title">{category}</h1>
        <section className="watchItemsWrapper">
          <div className="watchItemContainer">
            {watchItems
              .filter(
                (item) => item.category === category || category === "All"
              )
              .map((item, index) => {
                return <WatchItem item={item} key={index} />;
              })}
          </div>
        </section>
      </section>
    </div>
  );
}

export default WatchDisplay;
