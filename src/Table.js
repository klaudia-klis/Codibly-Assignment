import React, { useState, useEffect } from 'react';

function Table() {
  const [show, setShow] = useState(false);
  
  const [inputNumber, setInputNumber] = useState();
  const handleChange = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    setInputNumber(value);
  };
  
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  
  const handleClose = () => setShow(false);
  const handleShow= () => setShow(true);
  
  useEffect(() => {
    fetch("https://reqres.in/api/products")
      .then((response) => response.json())
      .then((response) => {
        setProducts(response.data);
        setError(null);
      })
      .catch(setError);
  }, []);
  
  if (error) { 
    return 
      <p>"An error occurred"</p>
    }
  return (
  <table>  
      <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Year</th>
      </tr>
    
    {products.map((val, key) => {
      return (
        <tr key={key} onClick={() => handleShow(val)}>
          <td>{val.id}</td>
          <td>{val.name}</td>
          <td>{val.year}</td>
        </tr>
      )
    })}
    </table>
  )}