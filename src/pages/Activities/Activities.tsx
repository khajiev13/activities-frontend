import ListActivityCard from '@/components/ActivitiesPage/ListActivityCard';
import { ActivityCardProps } from '@/components/ActivitiesPage/ListActivityCard';
import { useEffect, useState } from 'react';
import axiosInstance from '@/axios';
import { Skeleton } from '@/components/ui/skeleton';
import SearchNavbar from '@/components/SearchNavbar';

const Activities = () => {
  const [activities, setActivities] = useState<ActivityCardProps[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      return;
      try {
        setLoading(true);
        const response = await axiosInstance.get('/api/activities/');
        setActivities(response.data);
        console.log(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch activities', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <SearchNavbar
        search_for="activities"
        setActivities={(activities: ActivityCardProps[]) =>
          setActivities(activities)
        }
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ">
        {loading && <Skeleton />}
        {/* Map through the activities and display also pagination should be implemented */}
        {activities.map((activity) => (
          <ListActivityCard {...activity} key={activity.pk} />
        ))}
      </div>
    </>
  );
};

export default Activities;
