function SearchBar({ placeholder = 'Search', value, onChange }) {
  return (
    <label className="searchbar" aria-label="Search">
      <span>⌕</span>
      <input
        type="search"
        placeholder={placeholder}
        value={value ?? ''}
        onChange={onChange}
      />
    </label>
  );
}

export default SearchBar;
