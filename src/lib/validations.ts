import { z } from "zod";
import { DEFAULT_PET_IMGAGE } from "./constants";

export const petIdSchema = z.string().cuid();

export const petFormSchema = z
  .object({
    name: z.string().trim().min(1, { message: "Name is required" }).max(100),
    ownerName: z
      .string()
      .trim()
      .min(1, { message: "Owner Name is required" })
      .max(100),
    imageUrl: z.union([
      z.literal(""),
      z
        .string()
        .transform((value) => value.replace(/\s+/g, ""))
        .pipe(
          z.string().url().startsWith("https://bytegrad.com/", {
            message:
              "Image  sources allowed: 'https://bytegrad.com/', https://images.unsplash.com/",
          })
        ),
      z
        .string()
        .transform((value) => value.replace(/\s+/g, ""))
        .pipe(
          z.string().url().startsWith("https://images.unsplash.com/", {
            message:
              "Image  sources allowed: 'https://bytegrad.com/', https://images.unsplash.com/",
          })
        ),
      // z.string().trim().url().startsWith("https://images.unsplash.com/", {
      //   message:
      //     "Image  sources allowed: 'https://bytegrad.com/', https://images.unsplash.com/",
      // }),
    ]),
    // imageUrl: z.union([
    //   z.literal(""),
    //   z.string().trim().url({ message: "Image url must be a valid url" }),
    // ]),
    age: z.coerce.number().int().positive().max(99999),
    notes: z.union([z.literal(""), z.string().trim().max(1000)]),
  })
  .transform((data) => ({
    ...data,
    imageUrl: data.imageUrl || DEFAULT_PET_IMGAGE,
  }));

export type TPetForm = z.infer<typeof petFormSchema>;

export const authSchema = z.object({
  email: z.string().email().max(100),
  password: z.string().max(100),
});

export type TAuth = z.infer<typeof authSchema>;
