import "./ExploreMenu.css";
import { exploreMenuList } from "./ExploreMenuList";

function ExploreMenu({ category, setCategory }) {
  return (
    <div>
      <div className="menuWrapper">
        <div className="menuContainer">
          <div className="menulist">
            {exploreMenuList.map((item, index) => (
              <div
                className={`menuItem ${category === item.name ? "active" : ""}`}
                key={index}
                onClick={() =>
                  setCategory((prev) =>
                    prev === item.name ? "All" : item.name
                  )
                }
              >
                <h4> {item.name}</h4>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ExploreMenu;
