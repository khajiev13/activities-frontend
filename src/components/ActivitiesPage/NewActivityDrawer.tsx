'use client';
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
import { useForm } from 'react-hook-form';
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
  city: z.string(),
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
      title: '',
      description: '',
      is_public: true,
      categories: [
        { pk: 'dsfds', name: 'Category 1' },
        { pk: 'sad', name: 'Category 2' },
      ],
      date_time: new Date(),
      city: 'New York',
      duration_in_minutes: 0,
      is_competition: false,
      team_1: null,
      team_2: null,
      is_league: false,
      league: null,
    },
  });

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
                    <CardContent className="flex aspect-square items-start p-6 w-full flex-col">
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
                  categories={form.getValues('categories')}
                  updateCategories={(newCategories) =>
                    form.setValue('categories', newCategories)
                  }
                />
              </CarouselItem>
              <CarouselItem key={3}>
                <div className="p-1">
                  <Card>
                    <CardContent className="flex aspect-square items-center justify-center p-6">
                      <span className="text-4xl font-semibold">Third step</span>
                      <Button type="submit">Submit</Button>
                      <div className="inline-flex items-center">
                        <div className="relative inline-block w-8 h-4 rounded-full cursor-pointer">
                          <input
                            id="switch-component"
                            type="checkbox"
                            className="absolute w-8 h-4 transition-colors duration-300 rounded-full appearance-none cursor-pointer peer  checked:bg-maincolor peer-checked:border-gray-900 peer-checked:before:bg-background bg-orange-300"
                          />
                          <label
                            htmlFor="switch-component"
                            className="before:content[''] absolute top-2/4 -left-1 h-5 w-5 -translate-y-2/4 cursor-pointer rounded-full border border-blue-gray-100 bg-white shadow-md transition-all duration-300 before:absolute before:top-2/4 before:left-2/4 before:block before:h-10 before:w-10 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity hover:before:opacity-10 peer-checked:translate-x-full peer-checked:border-gray-900 peer-checked:before:bg-gray-900"
                          >
                            <div
                              className="inline-block p-5 rounded-full top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4"
                              data-ripple-dark="true"
                            ></div>
                          </label>
                        </div>
                      </div>
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
