import { useState } from 'react';
import SearchNavbar from '../../components/SearchNavbar';

type Props = {};

function Organizations({}: Props) {
  const [Organizations, setOrganizations] = useState([]);
  return (
    <div>
      <SearchNavbar setOrganizations={setOrganizations} />
      Organizations Page
    </div>
  );
}

export default Organizations;
