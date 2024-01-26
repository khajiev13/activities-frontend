import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { useLocation } from 'react-router-dom';
import NewActivityDrawer from '@/components/ActivitiesPage/NewActivityDrawer';

export function CreateActivity() {
  const location = useLocation();
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline">
          <Plus className="h-8 w-8" />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-md min-h-4/5">
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
            <DrawerDescription>It's going to take few steps.</DrawerDescription>
          </DrawerHeader>
          {location.pathname === '/activities' ? (
            <NewActivityDrawer />
          ) : location.pathname === 'teams' ? (
            'Create a team'
          ) : location.pathname === 'organizations' ? (
            'Create an organization'
          ) : null}
          <DrawerFooter>
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
