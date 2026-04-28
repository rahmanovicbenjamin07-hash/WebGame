import z from "zod";

export const createGuessSchema = z.object({
    locationId:  z.number().int().positive(),
    guessedLat: z.number().min(-90).max(90),
    guessedLng: z.number().min(-180).max(180),
    missMeters:  z.number().min(0),
})