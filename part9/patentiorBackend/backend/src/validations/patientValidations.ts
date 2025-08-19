import z from "zod";
import { Gender } from "../types/types";
import { HealthCheckRating } from "../types/types";
export const newEntrySchema = z.object({
    name: z.string(),
    dateOfBirth: z.string().date(),
    ssn: z.string(),
    gender: z.enum(Gender),
    occupation: z.string(),
});

const hospitalEntrySchema = z.object({
  type: z.literal("Hospital"),
  description: z.string(),
  date: z.string(),
  specialist: z.string(),
  diagnosisCodes: z.array(z.string()).optional(),
  discharge: z.object({
    date: z.string(),
    criteria: z.string()
  })
});

const occupationalEntrySchema = z.object({
  type: z.literal("OccupationalHealthcare"),
  description: z.string(),
  date: z.string(),
  specialist: z.string(),
  diagnosisCodes: z.array(z.string()).optional(),
  employerName: z.string(),
  sickLeave: z.object({
    startDate: z.string(),
    endDate: z.string()
  }).optional()
});

const healthCheckEntrySchema = z.object({
  type: z.literal("HealthCheck"),
  description: z.string(),
  date: z.string(),
  specialist: z.string(),
  diagnosisCodes: z.array(z.string()).optional(),
  healthCheckRating: z.enum(HealthCheckRating)
});

export const newEntries = z.discriminatedUnion("type", [
  hospitalEntrySchema,
  occupationalEntrySchema,
  healthCheckEntrySchema
]);