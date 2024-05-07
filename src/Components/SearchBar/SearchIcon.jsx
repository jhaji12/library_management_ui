import { MdSearch } from 'react-icons/md';
import { useTheme } from '@chakra-ui/react';

const SearchIcon = () => {
  const theme = useTheme();

  return (
    <MdSearch
      style={{ color: theme.colors.black['200'], height: 20, width: 20 }}
    />
  );
};

export default SearchIcon;
