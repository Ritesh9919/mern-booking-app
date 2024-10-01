import express, { Request, Response } from "express";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { Hotel } from "../models/hotel";
import { HotelType } from "../shared/types";
import { verifyToken } from "../middlewares/auth";
import { body } from "express-validator";
const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fieldSize: 5 * 1024 * 1025, // 5mb
  },
});

router.post(
  "/",
  verifyToken,
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("city").notEmpty().withMessage("City is required"),
    body("country").notEmpty().withMessage("Country is required"),
    body("description").notEmpty().withMessage("Description is required"),
    body("type").notEmpty().withMessage("Hotel type is required"),
    body("pricePerNight")
      .notEmpty()
      .isNumeric()
      .withMessage("Price per night is required and must be a number"),
    body("facilities")
      .notEmpty()
      .isArray()
      .withMessage("Facilities are required"),
  ],
  upload.array("imageFiles", 6),
  async (req: Request, res: Response) => {
    try {
      const imageFiles = req.files as Express.Multer.File[];

      const newHotel: HotelType = req.body;

      const uploadPromises = imageFiles.map(async (image) => {
        const b64 = Buffer.from(image.buffer).toString("base64");
        let dataURI = "data:" + image.mimetype + ";base64," + b64;
        const res = await cloudinary.uploader.upload(dataURI);
        return res.url;
      });

      const imageUrls = await Promise.all(uploadPromises);

      newHotel.imageUrls = imageUrls;
      newHotel.lastUpdated = new Date();
      newHotel.userId = req.userId;

      const hotel = new Hotel(newHotel);
      await hotel.save();

      return res.status(201).send(hotel);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Something went wrong!" });
    }
  }
);

router.get("/", verifyToken, async (req: Request, res: Response) => {
  try {
    const hotels = await Hotel.find({ userId: req.userId });
    return res.status(200).json(hotels);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Something went wrong!" });
  }
});

router.get("/:id", verifyToken, async (req: Request, res: Response) => {
  const id = req.params.id.toString();
  try {
    const hetel = await Hotel.findOne({ _id: id, userId: req.userId });
    return res.status(200).json(hetel);
  } catch (error) {
    return res.status(500).json({ message: "Error fetching hotel" });
  }
});

router.put(
  "/:hotelId",
  verifyToken,
  upload.array("imageFiles", 6),
  async (req: Request, res: Response) => {
    try {
      const updatedHotel: HotelType = req.body;
      updatedHotel.lastUpdated = new Date();
      const hotel = await Hotel.findOneAndUpdate(
        { _id: req.params.hotelId, userId: req.userId },
        updatedHotel,
        { new: true }
      );
      if (!hotel) {
        return res.status(404).json({ message: "Hotel not found" });
      }
      const imageFiles = req.files as Express.Multer.File[];
      const uploadPromises = imageFiles.map(async (image) => {
        const b64 = Buffer.from(image.buffer).toString("base64");
        let dataURI = "data:" + image.mimetype + ";base64," + b64;
        const res = await cloudinary.uploader.upload(dataURI);
        return res.url;
      });

      const updatedImageUrls = await Promise.all(uploadPromises);
      hotel.imageUrls = [
        ...updatedImageUrls,
        ...(updatedHotel.imageUrls || []),
      ];
      await hotel.save();
      return res.status(200).json(hotel);
    } catch (error) {
      console.log(error);
      return res.status(200).json({ message: "Something went wrong!" });
    }
  }
);

export default router;
