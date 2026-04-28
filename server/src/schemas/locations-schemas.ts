import { number, z } from "zod"

export const createLocationSchema = z.object({
    locationName: z.string().min(1, "Location name is required").max(100),
    lat: z.number().min(-90).max(90),
    lng: z.number().min(-180).max(180),
    image:        z.string().min(1, "Image is required"),
    imageName:    z.string().optional(),
    imageType:    z.string().optional(),
})

export const locationPaginationSchema = z.object({
    limit:  z.coerce.number().int().min(1).max(50).default(9),
    offset: z.coerce.number().int().min(0).default(0),
})
