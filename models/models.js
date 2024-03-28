import mongoose from "mongoose";

const carSchema = new mongoose.Schema({
  car_name: { type: String, required: true },
  engine: { type: String, required: true },
  drive: { type: String, required: true },
  transmission: { type: String, required: true },
  body: { type: String, required: true },
  price: { type: String, required: true },
});

//Structure what the data we get from the user should look like
const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  cars: [carSchema],
});

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  author: { type: String, required: true },
  date: { type: String, required: true },
  category: { type: String, required: true },
  image: { type: String, required: true },
});

export const UserModel = mongoose.model("users", UserSchema);
export const CarModel = mongoose.model("cars", carSchema);
export const BlogModel = mongoose.model("blog", blogSchema);
