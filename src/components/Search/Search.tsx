import React, { useRef } from 'react';
import { FaSearch } from "react-icons/fa";

import styles from './Search.module.css';

type SearchProps = {
  searchValue: string;
  onChangeSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const Search = ({ searchValue, onChangeSearch }: SearchProps) => {
  const inputRef = useRef<HTMLInputElement>();

  return (
    <search className={styles.container}>
      <FaSearch />
      <input className={styles.search} type="search" name="search" value={searchValue} onChange={onChangeSearch} placeholder="Search for transducers..."/>
    </search>
  );
};

export default Search;