import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Table from "./Table";
import './App.css';

function App() {
  const [show, setShow] = useState(false);
  const [error, setError] = useState(null);
  const [products, setProducts] = useState([]);
  const [input, setInputNumber] = useState([]);
  
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
  
  const handleChange = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    setInputNumber(value);
    if (!e.target.value) return setInputNumber(value)
    const resultsArray = products.filter(product => product.id == e.target.value);
  };
  
  return (
    <div className="main">
      <h1>Codibly Application</h1>
      
      <div className="searchbox">
        <input
          value={input}
          onChange={handleChange}
          placeholder="Search here" />
      </div>
    
      <table>  
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Year</th>
        </tr>
      
      {products.map((val, key) => {
        return (
          <tr key={key} onClick={handleShow}>
            <td>{val.id}</td>
            <td>{val.name}</td>
            <td>{val.year}</td>
          </tr>
        )
      })}
      </table>
     
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Name</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleClose}>Close</Button>
        </Modal.Footer>
      </Modal>
      
    </div>
  );
}

export default App;
