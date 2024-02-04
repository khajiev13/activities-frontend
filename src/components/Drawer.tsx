import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Drawer,
  // DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { useLocation } from 'react-router-dom';
import NewActivityDrawer from '@/components/ActivitiesPage/NewActivityDrawer';
import { Progress } from './ui/progress';

export function CreateActivity() {
  const location = useLocation();
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline">
          <Plus className="h-8 w-8" />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="h-[90vh]">
        <div className="mx-auto w-full max-w-xl ">
          <DrawerHeader>
            <DrawerTitle>
              {location.pathname === '/activities'
                ? 'Create a new activity'
                : location.pathname === 'teams'
                ? 'Create a team'
                : location.pathname === 'organizations'
                ? 'Create an organization'
                : null}
            </DrawerTitle>
            <DrawerDescription>
              It's going to take few steps. Swipe right for the next step!
            </DrawerDescription>
          </DrawerHeader>
          {location.pathname === '/activities' ? (
            <NewActivityDrawer />
          ) : location.pathname === 'teams' ? (
            'Create a team'
          ) : location.pathname === 'organizations' ? (
            'Create an organization'
          ) : null}
          <DrawerFooter>
            <Progress
              className="fixed bottom-5 sm:w-[300px] md:w-[535px]"
              value={100}
            />
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
