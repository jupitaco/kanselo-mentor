import { z } from "zod";

export const BookCallSchema = z.object({
  message: z.string().min(1, "Please enter message for your mentor"),
  session: z.string().min(1, "Please your preferred session"),
  date: z.string().min(1, "Please select date"),
  time: z.string().min(1, "Please select time"),
});

export type BookCallTypeValues = z.infer<typeof BookCallSchema>;

export const TemplateSchema = z.object({
  fileUrl: z.string().min(1, "Please upload template documents"),
  coverImage: z.string().min(1, "Please upload cover image"),
  title: z.string().min(1, "Please select date"),
  price: z
    .number()
    .min(1, "Must be 1 or more")
    .positive("Must be a positive number"),
});

export type TemplateTypeValues = z.infer<typeof TemplateSchema>;
