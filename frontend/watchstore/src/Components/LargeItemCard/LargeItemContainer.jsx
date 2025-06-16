import "./LargeItem.css";
import "../../index.css";
import LargeItem from "./LargeItem.jsx";
import { LargeItemData } from "../../Data/LargeItem.js";
import { useRef } from "react";

function LargeItemContainer() {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      console.log(scrollLeft, clientWidth);

      const scrollAmount = clientWidth;
      scrollRef.current.scrollTo({
        left:
          direction === "next"
            ? scrollLeft + scrollAmount / 4
            : scrollLeft - scrollAmount / 4,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="largeItemContainer">
      <section className="LargeItemCardSection" ref={scrollRef}>
        {LargeItemData.map((item, index) => (
          <LargeItem item={item} key={index} />
        ))}
      </section>
      <div className="scrollbuttonSection">
        <button
          className="scrollButton prevButton"
          onClick={() => scroll("prev")}
        >
          <i className="bx bx-chevron-left"></i>
        </button>
        <button
          className="scrollButton nextButton"
          onClick={() => scroll("next")}
        >
          <i className="bx bx-chevron-right"></i>
        </button>
      </div>
    </div>
  );
}

export default LargeItemContainer;
