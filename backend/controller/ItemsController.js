import ItemModel from "../models/itemModel.js";

export const createItemController = async (req, res) => {
    try {
      const { name , price } = req.body;
      if (!name) {
        return res.status(401).send({ message: "Name is required" });
      }
      if (!price) {
        return res.status(401).send({ message: "price is required" });
      }
      const existingItem= await ItemModel.findOne({ name });
      if (existingItem) {
        return res.status(200).send({
          success: false,
          message: "Item Already Exisits",
        });
      }
      const Item = await new ItemModel({
        name,
       
      }).save();
      res.status(201).send({
        success: true,
        message: "new Item  created",
        Item,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        error,
        message: "Error in adding items",
      });
    }
  };
  