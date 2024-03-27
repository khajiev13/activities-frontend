import SearchNavbar from '@/components/SearchNavbar';
import TeamListingCard from '@/components/TeamsPage/TeamListingCard';

const Teams: React.FC = () => {
  return (
    <>
      <SearchNavbar search_for="teams" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-center items-center">
        <TeamListingCard />
      </div>
    </>
  );
};

export default Teams;
