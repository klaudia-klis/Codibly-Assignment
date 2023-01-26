const SearchBar = ({products, setInputNumber})=> {
    const handleSubmit = (e) => e.preventDefault()
    
    const handleSearchChange = (e) => {
      if (!e.target.value) return setSearchResults(products)
      
      const resultsArray = products.filter(product => product.title.includes(e.target.value) || procuct.body.includes(e.target.value))
    }
    
  return (
    <header>
      <form className="search" onSubmit={handleSubmit}>
        <input 
          className="search_input"
          type="number"
          id="search"
          onChange={handleSearchChange} 
      </form>
    </header>
  )
}

export default SearchBar