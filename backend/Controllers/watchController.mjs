import { log } from "node:console";
import watchModel from "../Models/watchModel.mjs";
import fs from "node:fs";

// add Watch item
const addWatch = async (c, s) => {
  // get image file
  let imageFilename = c.file ? c.file.filename : null;

  const { name, price, category, inStock, tags } = c.body;

  const watch = new watchModel({
    name: name, // string
    image: imageFilename, // string
    price: Number(price), // number
    category: category, // number
    inStock: inStock === "true" || inStock === true, // Ensure boolean
    tags: Array.isArray(tags) ? tags : tags.split(",").map((tag) => tag.trim()), // String Array
  });

  try {
    await watch.save(); // save item in the DB
    s.json({ success: true, message: "Watch Added" });
  } catch (error) {
    log(error);
    s.json({ success: false, message: "Error" });
  }
};

// get list of watch items
const listWatches = async (c, s) => {
  try {
    const watches = await watchModel.find({}).sort({ createdAt: 1 }); // Ascending order by createdAt
    s.json({ success: true, data: watches, message: "Watch list is fetched" }); // here data -> Object Array
  } catch (error) {
    log(error);
    s.json({ success: false, message: "Error" });
  }
};

// remove watch item
const removeWatch = async (c, s) => {
  try {
    const id = c.body.id; // item id comes from frontend

    const watch = await watchModel.findById(id); // find that item from DB

    // remove image form the uploads folder
    fs.unlink(`./Uploads/${watch.image}`, (error) => {
      if (error) {
        throw error;
      }
      // DEBUG: console.log("file was deleted");
    });

    // delete item from the DB
    await watchModel.findByIdAndDelete(id);
    s.json({ success: false, message: "Watch Removed" });
  } catch (error) {
    log(error);
    s.json({ success: false, message: "Error" });
  }
};

// update watch item
const updateWatch = async (c, s) => {
  try {
    const { id } = c.params;
    const { name, price, category, inStock, tags } = c.body;
    const newImage = c.file ? c.file.filename : null;

    // Find the existing watch in DB
    const watch = await watchModel.findById(id);

    if (!watch) {
      s.json({ success: false, message: "Watch not found" });
    }

    // If new image is uploaded, delete the old one
    if (newImage && watch.image) {
      fs.unlinkSync(`./Uploads/${watch.image}`); // Remove previous file
    }

    // Update watch fields
    watch.name = name || watch.name;
    watch.price = price ? Number(price) : watch.price;
    watch.category = category || watch.category;
    watch.inStock = inStock === "true" || inStock === true;
    watch.tags = tags ? tags.split(",").map((tag) => tag.trim()) : watch.tags;
    watch.image = newImage || watch.image;

    await watch.save(); // Save updated watch

    s.json({ success: true, message: "Watch Updated" });
  } catch (error) {
    log(error);
    s.json({ success: false, message: "Error" });
  }
};

// get single watch item
const getWatchById = async (c, s) => {
  const { id } = c.params;

  try {
    const watch = await watchModel.findById(id);

    if (!watch) {
      return s.json({ success: false, message: "Watch not found" });
    }

    s.json({ success: true, message: "Get Single Watch Item", data: watch });
  } catch (error) {
    log(error);
    s.json({ success: false, message: "Error" });
  }
};

export { addWatch, listWatches, removeWatch, updateWatch, getWatchById };
