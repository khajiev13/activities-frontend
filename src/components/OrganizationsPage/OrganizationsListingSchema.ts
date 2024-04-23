import { z } from 'zod';

export const OrganizationListingSchema = z.object({
  pk: z.string(),
  name: z.string(),
  created_at: z.date(),
  location: z.object({
    name: z.string(),
    pk: z.string(),
    points: z.object({
      latitude: z.number(),
      longitude: z.number(),
    }),
  }),
  number_of_people_joined: z.number(),
  people_joined: z.array(
    z.object({
      first_name: z.string().nullable(),
      image_url: z.string().nullable(),
      last_name: z.string().nullable(),
    })
  ),
  state: z.object({
    name: z.string(),
    pk: z.string(),
  }),
  city: z.object({
    name: z.string(),
    pk: z.string(),
  }),
  image_url: z.string().nullable(),
  teams_count: z.number(),
  hosting_leagues_count: z.number(),
  hosting_activities_count: z.number(),
});

export type OrganizationListingType = z.infer<typeof OrganizationListingSchema>;
