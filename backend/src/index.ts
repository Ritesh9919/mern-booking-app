import express, { Request, Response } from "express";
import path from "path";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth";
import userRouter from "./routes/users";
import myHotelRouter from "./routes/my-hotels";
import bookingRouter from "./routes/my-bookings";
import hotelRouter from "./routes/hotel";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

mongoose.connect(process.env.MONGO_URI as string);

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);
app.use(cookieParser());

app.use(express.static(path.join(__dirname, "../../frontend/dist")));

app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/my-hotels", myHotelRouter);
app.use("/api/hotels", hotelRouter);
app.use("/api/my-bookings", bookingRouter);

app.get("*", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "../../frontend/dist/index.html"));
});

app.listen(7000, () => {
  console.log(`Server is running on port:7000`);
});
