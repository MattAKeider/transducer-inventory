import { useRef } from 'react';
import { FaSearch } from "react-icons/fa";

import styles from './Search.module.css';

type SearchProps = {
  onClickSearch: (searchValue: string) => void;
};

const Search = ({ onClickSearch }: SearchProps) => {
  const inputRef = useRef<HTMLInputElement>();

  return (
    <search className={styles.container}>
      <FaSearch className={styles.search_button} type="button" onClick={() => onClickSearch(inputRef.current.value)} />
      <input className={styles.search} ref={inputRef} type="search" name="search" placeholder="Search for transducers..."/>
    </search>
  );
};

export default Search;