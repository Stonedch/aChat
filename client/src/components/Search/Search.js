import React from "react"

import search from './searching.svg'
import styles from './Search.module.css';



function Search() {
  return (
    <div className={styles.container}>
      <img src={search} alt="search" />
    </div>
  )
}

export default Search
