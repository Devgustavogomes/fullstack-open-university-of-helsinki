import z from "zod";
import { Gender } from "../types/types";

export const newEntrySchema = z.object({
    name: z.string(),
    dateOfBirth: z.string().date(),
    ssn: z.string(),
    gender: z.enum(Gender),
    occupation: z.string()
});