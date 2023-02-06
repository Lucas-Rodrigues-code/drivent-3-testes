import { Router } from "express";
import { authenticateToken } from "@/middlewares";
import { getHotels, getHotelId } from "@/controllers/hotels-controller";

const hotelRouter = Router();

hotelRouter
  .all("/*", authenticateToken)
  .get("/", getHotels)
  .get("/:hotelId", getHotelId);

export { hotelRouter };