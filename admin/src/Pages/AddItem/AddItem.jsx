import "./AddItem.css";
import uploadArea from "../assets/uploadArea.png";
import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

function AddItem() {
  const url = "http://localhost:4000";

  const [image, setImage] = useState(false); // store image in the state variable

  const [data, setData] = useState({
    name: "",
    price: "",
    category: "New Arrival",
    inStock: "no",
    tags: "",
  }); // store other data

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setData((prev) => ({ ...prev, [name]: value })); // set data to the object
  };

  // to make api call
  const onSubmitHandler = async (event) => {
    event.preventDefault();

    const formData = new FormData(); // FormData is required to upload files
    formData.append("name", data.name);
    formData.append("price", Number(data.price));
    formData.append("category", data.category);
    formData.append("inStock", data.inStock === "yes" ? true : false);
    formData.append("tags", data.tags);
    formData.append("image", image); // image state

    // api call
    const response = await axios.post(`${url}/api/v1/watch/add`, formData); // end point
    // reset data to default
    if (response.data.success) {
      setData({
        name: "",
        price: "",
        category: "New Arrival",
        inStock: "no",
        tags: "",
      });
      setImage(false);
      toast.success(response.data.message);
    } else {
      toast.error(response.data.message);
    }
  };

  return (
    <div className="addWatch">
      <h1 className="title">Add Item</h1>
      <section className="scrollArea">
        <div className="scrollAreaContent">
          <form className="addItemForm" onSubmit={onSubmitHandler}>
            <div className="addImageUpload">
              <h4>Upload Image</h4>
              <label htmlFor="image">
                <img
                  src={image ? URL.createObjectURL(image) : uploadArea}
                  alt="upload"
                  className="uploadAreaImg"
                />
              </label>
              <input
                type="file"
                name="image"
                id="image"
                hidden
                required
                onChange={(e) => setImage(e.target.files[0])}
              />
            </div>
            <div className="addProductName">
              <h4>Watch Name</h4>
              <input
                type="text"
                name="name"
                id=""
                placeholder="Type Here"
                required
                onChange={onChangeHandler}
                value={data.name}
              />
            </div>
            <div className="addProductPrice">
              <h4>Price</h4>
              <input
                type="number"
                name="price"
                id=""
                placeholder="Type Here"
                min="0"
                step="0.01"
                required
                onChange={onChangeHandler}
                value={data.price}
              />
            </div>

            <div className="addProductCategory">
              <h4>Category</h4>
              <select
                name="category"
                id="category"
                required
                onChange={onChangeHandler}
                value={data.category || ""}
              >
                <option value="" disabled selected>
                  Select an option
                </option>
                <option value="New Arrival">New Arrival</option>
                <option value="Modern">Modern</option>
                <option value="Limited Edition">LimitedEdition</option>
                <option value="Chronographs">Chronographs</option>
                <option value="Classic">Classic</option>
                <option value="Luxury">Luxury</option>
                <option value="Smart Watches">Smart Watches</option>
                <option value="Sports">Sports</option>
                <option value="Digital">Digital</option>
                <option value="Automatic">Automatic</option>
                <option value="Vintage">Vintage</option>
                <option value="Diving Watches">Diving Watches</option>
                <option value="Pilot Watches">Pilot Watches</option>
                <option value="Skeleton">Skeleton</option>
              </select>
            </div>
            <div className="addProductInStock">
              <h4>In Stock</h4>
              <select
                name="inStock"
                id="inStock"
                required
                onChange={onChangeHandler}
                value={data.inStock || ""}
              >
                <option value="" disabled selected>
                  Select an option
                </option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>
            <div className="addProductTags">
              <h4>Tags</h4>
              <input
                type="text"
                name="tags"
                id=""
                placeholder="Type Here"
                required
                onChange={onChangeHandler}
                value={data.tags}
              />
            </div>
            <button type="submit" className="addProdcutSubmitButton">
              Add
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}

export default AddItem;
