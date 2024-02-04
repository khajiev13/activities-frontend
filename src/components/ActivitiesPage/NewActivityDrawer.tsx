'use client';
import React, { useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Button } from '@/components/ui/button';
import * as z from 'zod';
import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import SelectCategories from './NewActivityDrawer/SelectCategories';
import { CategoryItem } from './NewActivityDrawer/SelectCategories';
import SelectLocation from '../Map/SelectLocation';
import { LocationDetails } from '../Map/MapFunctions/AddLocation';
import { toast } from 'sonner';
import SelectedLocation from './NewActivityDrawer/SelectedLocation';

const formSchema = z.object({
  title: z.string().min(3, {
    message: 'Title must be at least 3 characters.',
  }),
  description: z.string().min(10),
  is_public: z.boolean(),
  categories: z.array(
    z.object({
      pk: z.string(),
      name: z.string(),
    })
  ),
  date_time: z.date(),
  country: z.string(),
  state: z.string(),
  city: z.string(),
  pk_for_location: z.string().nullable(),
  name_for_location: z.string(),
  duration_in_minutes: z.number(),
  is_competition: z.boolean(),
  team_1: z.string().nullable(),
  team_2: z.string().nullable(),
  is_league: z.boolean(),
  league: z.string().nullable(),
});

const NewActivityDrawer: React.FC = () => {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: 'Chinese speaking activity',
      description: '',
      is_public: true,
      categories: [],
      date_time: new Date(),
      city: 'New York',
      duration_in_minutes: 0,
      is_competition: false,
      team_1: null,
      team_2: null,
      is_league: false,
      league: null,
      pk_for_location: null,
    },
  });
  // Use the watch function to subscribe to the pk_for_location field
  const pkForLocation = useWatch({
    control: form.control,
    name: 'pk_for_location', // Make sure this matches the name used in your form
  });

  useEffect(() => {
    // If pkForLocation has a value, show the toast
    if (pkForLocation) {
      toast('Location has been selected!', {});
    }
  }, [pkForLocation]); // Re-run the effect when pkForLocation changes

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }
  return (
    <div>
      <Carousel className="w-full">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <CarouselContent>
              <CarouselItem key={1}>
                <div className="p-1">
                  <Card>
                    <CardContent className="flex aspect-square items-start p-6  w-full flex-col">
                      {/* In this card, we only put 3 inputs */}
                      <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                          <FormItem className="w-full">
                            <FormLabel>Title</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Write your title"
                                {...field}
                              />
                            </FormControl>
                            <FormDescription></FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                          <FormItem className="w-full h-3/5">
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                              <Textarea
                                className="h-full"
                                placeholder="Type your description here."
                                {...field}
                              />
                            </FormControl>
                            <FormDescription></FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
              <CarouselItem key={2}>
                <SelectCategories
                  setCategories={(newCategories: CategoryItem[]) => {
                    form.setValue('categories', newCategories);
                  }}
                />
              </CarouselItem>
              <CarouselItem key={3}>
                <div className="p-1">
                  <Card>
                    <CardContent className="flex aspect-square items-center justify-center p-6">
                      {form.getValues('pk_for_location') ? (
                        <SelectedLocation
                          country={form.getValues('country')}
                          state={form.getValues('state')}
                          city={form.getValues('city')}
                          location={form.getValues('name_for_location')}
                        />
                      ) : (
                        <SelectLocation
                          setLocation={(LocationDetails: LocationDetails) => {
                            form.setValue('country', LocationDetails.country);
                            form.setValue('state', LocationDetails.state);
                            form.setValue('city', LocationDetails.city);
                            form.setValue(
                              'pk_for_location',
                              LocationDetails.location_pk
                            );
                            form.setValue(
                              'name_for_location',
                              LocationDetails.location_name
                            );
                          }}
                        />
                      )}
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
              <CarouselItem key={4}>
                <div className="p-1">
                  <Card>
                    <CardContent className="flex aspect-square items-center justify-center p-6">
                      Card 4
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
              <CarouselItem key={5}>
                <div className="p-1">
                  <Card>
                    <CardContent className="flex aspect-square items-center justify-center p-6">
                      Card 5
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </form>
        </Form>
      </Carousel>
    </div>
  );
};

export default NewActivityDrawer;
