import { notFoundError, paymentRequired } from "@/errors";
import enrollmentRepository from "@/repositories/enrollment-repository";
import hotelRepository from "@/repositories/hotel-repository";
import ticketRepository from "@/repositories/ticket-repository";

export async function findALL(userId: number) {
  const enrollment = await enrollmentRepository.findUserId(userId);

  if (!enrollment) {
    throw notFoundError();
  }

  const ticket = await ticketRepository.findTicketByEnrollmentId(enrollment.id);

  if (!ticket) {
    throw notFoundError();
  }

  if (ticket.status !== "PAID" || !ticket.TicketType.includesHotel || ticket.TicketType.isRemote) {
    throw paymentRequired();
  }

  return await hotelRepository.findManyHotels();
}

export async function findFirst(id: number, userId: number) {
  const hotel = await hotelRepository.findUniqueHotel(id);

  if (!hotel) {
    throw notFoundError();
  }

  const enrollment = await enrollmentRepository.findUserId(userId);

  if (!enrollment) {
    throw notFoundError();
  }

  const ticket = await ticketRepository.findTicketByEnrollmentId(enrollment.id);

  if (ticket.status !== "PAID") {
    throw paymentRequired();
  }

  return hotel;
}

const hotelService = {
  findALL,
  findFirst,
};

export default hotelService;