import { ApplicationError } from "@/protocols";

export function paymentRequired(): ApplicationError {
  return {
    name: "PaymentRequired",
    message: "dont have payment yet",
  };
}