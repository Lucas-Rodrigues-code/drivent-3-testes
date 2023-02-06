import { AuthenticatedRequest } from "@/middlewares";
import { Response } from "express";
import httpStatus from "http-status";
import hotelService from "@/services/hotels-service";

export async function getAllHotels(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;

  try {
    const hotels = await hotelService.findALL(userId);
    res.send(hotels);
    return;
  } catch (error) {
    if (error.name === "NotFoundError") {
      res.sendStatus(httpStatus.NOT_FOUND);
      return;
    }

    if (error.name === "UnauthorizedError") {
      res.sendStatus(httpStatus.UNAUTHORIZED);
      return;
    }

    if (error.name === "PaymentRequired") {
      res.sendStatus(httpStatus.PAYMENT_REQUIRED);
    }

    res.sendStatus(httpStatus.BAD_REQUEST);
    return;
  }
}

export async function getHoteBylId(req: AuthenticatedRequest, res: Response) {
  const id = Number(req.params.hotelId);
  const { userId } = req;

  try {
    const hotel = await hotelService.findFirst(id, userId);
    res.status(200).send(hotel);
    return;
  } catch (error) {
    if (error.name === "NotFoundError") {
      res.sendStatus(httpStatus.NOT_FOUND);
      return;
    }

    if (error.name === "PaymentRequired") {
      res.sendStatus(httpStatus.PAYMENT_REQUIRED);
    }

    res.sendStatus(httpStatus.BAD_REQUEST);
    return;
  }
}