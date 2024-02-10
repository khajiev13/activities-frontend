import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Drawer,
  DrawerClose,
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
import { useState } from 'react';
import NewOrganizationDrawer from '@/components/OrganizationsPage/NewOrganizationDrawer';

export function Create() {
  const location = useLocation();

  const [progressBar, setProgressBar] = useState<number>(0);

  return (
    <Drawer
      shouldScaleBackground
      dismissible={location.pathname === '/activities' ? false : true}
    >
      <DrawerTrigger asChild>
        <Button variant="outline">
          <Plus className="h-8 w-8" />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="h-[95vh] ">
        <div className="mx-auto w-full max-w-xl ">
          <DrawerHeader>
            <DrawerTitle>
              {location.pathname === '/activities'
                ? 'Create a new activity'
                : location.pathname === '/teams'
                ? 'Create a new team'
                : location.pathname === '/organizations'
                ? 'Create a new organization'
                : null}
            </DrawerTitle>
            <DrawerDescription>
              {location.pathname === '/activities'
                ? "It's going to take few steps. Swipe right for the next step!"
                : location.pathname === '/teams'
                ? 'Fill in the forms to create a new team! Scroll down as you fill in the forms!'
                : location.pathname === '/organizations'
                ? 'Fill in the forms to create a new team! Scroll down as you fill in the forms!'
                : null}
            </DrawerDescription>
          </DrawerHeader>
          <div>
            {location.pathname === '/activities' ? (
              <NewActivityDrawer setProgressBar={setProgressBar} />
            ) : location.pathname === 'teams' ? (
              'Create a team'
            ) : location.pathname === 'organizations' ? (
              <NewOrganizationDrawer />
            ) : null}
          </div>

          {location.pathname === '/activities' ? (
            <DrawerFooter>
              <Progress
                className=" sm:w-[300px] md:w-[535px]"
                value={progressBar}
              />
              <DrawerClose className="w-full">
                <Button variant={'outline'} className="w-full">
                  Close
                </Button>
              </DrawerClose>
            </DrawerFooter>
          ) : null}
        </div>
      </DrawerContent>
    </Drawer>
  );
}
