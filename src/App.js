import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import './App.css';

function App() {
  const [error, setError] = useState(null);
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetch(`https://reqres.in/api/products?per_page=5&page=${page}`)
      .then((response) => response.json())
      .then((response) => {
        setProducts([...response.data]);
        setError(null);
      })
      .catch(setError);
  }, []);
  
  const handleChange = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    setSearch(value);
  }
  
  return (
    <div className="main">
      <h1>Codibly Application</h1>
      
     <input 
       className="search__input"
       type="text"
       id="search"
       onChange={handleChange}
       value={search}
       placeholder="Search"
     />
    
      <table>  
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Year</th>
          </tr>
        </thead>
        
        <tbody>
          {products.filter(function (product) {
            if (search) {
              return product.id === parseInt(search, 10)  
            } else {
              return true;
            }
            }).map((val, key) => {
            return (
              <tr key={key}>
                <td>{val.id}</td>
                <td>{val.name}</td>
                <td>{val.year}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
      
      <button onClick={setPage} value={2}>
        Click me!!!
      </button>
    </div>
  );
}

export default App;
