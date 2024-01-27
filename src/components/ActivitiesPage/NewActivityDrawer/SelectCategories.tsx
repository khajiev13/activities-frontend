('use client');
import React from 'react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { HashIcon } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Check, ChevronsUpDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import axiosInstance from '@/axios';
import CategoryLoadingSkeleton from './CategoryLoadingSkeleton';

type Category = {
  pk: string;
  name: string;
  is_indoor: boolean;
  is_outdoor: boolean;
};
export type CategoryItem = {
  pk: string;
  name: string;
};

interface Props {
  categories: CategoryItem[];
  setCategories: (categories: CategoryItem[]) => void;
}

const SelectCategories: React.FC<Props> = ({ categories, setCategories }) => {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState<string[]>([]);
  const [isOutdoor, setIsOutdoor] = React.useState<boolean>(false);
  const [isIndoor, setIsIndoor] = React.useState<boolean>(false);
  const [fetchedCategories, setFetchedCategories] = React.useState<
    CategoryItem[]
  >([]);
  const [loading, setLoading] = React.useState<boolean>(false);

  React.useEffect(() => {
    setLoading(true);
    axiosInstance
      .get(`/api/categories/?is_indoor=${isIndoor}&is_outdoor=${isOutdoor}`)
      .then((response) => {
        const newCategories = response.data.map((category: Category) => ({
          pk: category.pk,
          name: category.name,
        }));
        setFetchedCategories(newCategories);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching categories:', error);
      });
  }, [isIndoor, isOutdoor]);
  return (
    <div className="p-1">
      <Card>
        <CardContent className="flex aspect-square  p-6 flex-col gap-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Switch
                id="outdoor"
                disabled={isIndoor}
                onCheckedChange={() => setIsOutdoor(!isOutdoor)}
              />
              <Label htmlFor="outdoor">Outdoor activity?</Label>
            </div>
            <div className="flex items-center">
              <Switch
                disabled={isOutdoor}
                id="indoor"
                onCheckedChange={() => setIsIndoor(!isIndoor)}
              />
              <Label htmlFor="indoor">Indoor activity?</Label>
            </div>
          </div>
          <ul className="flex">
            <li>
              <Badge className="flex items-center ">
                <HashIcon className="h-5 w-5" />
                category
              </Badge>
            </li>
            <li>
              <Badge className="flex items-center ">
                <HashIcon className="h-5 w-5" />
                category
              </Badge>
            </li>
          </ul>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild className="w-full min-w-full">
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className="w-[200px] justify-between"
              >
                Select categories
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[315px] p-0">
              <Command>
                <CommandInput placeholder="Search categories..." />
                <CommandEmpty>No category found.</CommandEmpty>
                <CommandGroup className="max-h-[200px] overflow-y-auto scroll-auto min-h-fit">
                  {loading && (
                    <>
                      <CategoryLoadingSkeleton />
                      <CategoryLoadingSkeleton />
                      <CategoryLoadingSkeleton />
                      <CategoryLoadingSkeleton />
                      <CategoryLoadingSkeleton />
                    </>
                  )}
                  {fetchedCategories.map((category: CategoryItem) => (
                    <CommandItem
                      key={category.pk}
                      value={category.pk + ' ' + category.name}
                      onSelect={(currentValue) => {
                        const newValue = value.includes(currentValue)
                          ? value.filter((val) => val !== currentValue)
                          : [...value, currentValue];

                        console.log(newValue); // Log the new value
                        const filteredNewValues = newValue.map((val) => {
                          const [pk, name] = val.split(' ');
                          return { pk, name };
                        });
                        console.log(filteredNewValues);

                        setCategories(filteredNewValues); // Update the categories state with the new array

                        setValue(newValue);

                        setOpen(true);
                      }}
                    >
                      <Check
                        className={cn(
                          'mr-2 h-4 w-4',
                          value.includes(category.pk)
                            ? 'opacity-100'
                            : 'opacity-0'
                        )}
                      />
                      {category.name}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>
        </CardContent>
      </Card>
    </div>
  );
};

export default SelectCategories;
