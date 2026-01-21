import { z } from "zod";

export const BookCallSchema = z.object({
  message: z.string().min(1, "Please enter message for your mentor"),
  session: z.string().min(1, "Please your preferred session"),
  date: z.string().min(1, "Please select date"),
  time: z.string().min(1, "Please select time"),
});

export type BookCallTypeValues = z.infer<typeof BookCallSchema>;
