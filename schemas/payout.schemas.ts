import { z } from "zod";

export const PayoutSchema = z.object({
  accountNumber: z.string().min(1, "Please enter account number"),
  accountName: z.string().min(1, "Please enter account name"),
  bankName: z.string().min(1, "Please select bank"),
});

export type PayoutTypeValues = z.infer<typeof PayoutSchema>;
