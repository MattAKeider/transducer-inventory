import { FaSearch } from 'react-icons/fa';

import styles from './Search.module.css';

interface Props {
  searchValue: string;
  onChangeSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Search = ({ searchValue, onChangeSearch }: Props) => {
  return (
    <div className={styles.container}>
      <FaSearch className={styles.icon} />
      <input
        className={styles.search}
        type="search"
        name="search"
        value={searchValue}
        onChange={onChangeSearch}
        placeholder="Search for transducers..."
      />
    </div>
  );
};

export default Search;
