import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface SelectedLocationProps {
  country: string;
  state: string;
  city: string;
  location: string;
}

export function SelectedLocation({
  country,
  state,
  city,
  location,
}: SelectedLocationProps) {
  return <div className="flex flex-col gap-14"></div>;
}

export default SelectedLocation;
