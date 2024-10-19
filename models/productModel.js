import mongoose from "mongoose";
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  price: {
    type: Number,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },
  images: [String],
},
 {
  timestamps: true,
}
);

const Product = mongoose.model("product", productSchema);
export default Product;
