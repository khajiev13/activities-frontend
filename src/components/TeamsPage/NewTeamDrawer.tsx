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
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';

type NewTeamDrawerProps = {
  setProgressBar: (progress: number) => void;
};

const formSchema = z.object({
  name: z.string().min(3, {
    message: 'Name must be at least 3 characters.',
  }),
  men_team: z.boolean(),
  founded_at: z.date(),
  belongs_to_organization: z.string(),
  sponsors: z.string(),
  members: z.string(),
  roles: z.string(),
  category: z.string(),
  tshirt_color: z.string(),
  shorts_color: z.string(),
  socks_color: z.string(),
});

const NewTeamDrawer: React.FC<NewTeamDrawerProps> = ({ setProgressBar }) => {
  useEffect(() => {
    setProgressBar(5);
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      men_team: true,
      founded_at: new Date(),
      belongs_to_organization: '',
      sponsors: '',
      members: '',
      roles: '',
      category: '',
      tshirt_color: '',
      shorts_color: '',
      socks_color: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log(values);
  }

  return (
    <div>
      <Carousel className="w-full">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <CarouselContent className="min-h-96 h-full">
              <CarouselItem key={1}>
                <Card className="lg:text-4xl h-full">
                  <CardContent className="flex aspect-square items-start p-6  w-full flex-col ">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Write your team name"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription></FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    {/* Add more FormFields for other properties */}
                  </CardContent>
                </Card>
              </CarouselItem>
              {/* Add more CarouselItems for other properties */}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </form>
        </Form>
      </Carousel>
    </div>
  );
};

export default NewTeamDrawer;
