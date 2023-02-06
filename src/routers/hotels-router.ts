import { Router } from "express";
import { authenticateToken } from "@/middlewares";
import { getAllHotels, getHoteBylId } from "@/controllers/hotels-controller";

const hotelRouter = Router();

hotelRouter
  .all("/*", authenticateToken)
  .get("/", getAllHotels)
  .get("/:hotelId", getHoteBylId);

export { hotelRouter };