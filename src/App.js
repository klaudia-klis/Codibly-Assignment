import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import logo from './images/codibly-logo.png';
import './App.css';

function App() {
  const params = new URLSearchParams(window.location.search)
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState(params.get("id") || "");
  const [currentPage, setCurrentPage] = useState(params.get("page") || 1);
  const [pageCount, setPageCount] = useState(1);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [modalData, setModalData] = useState([])
  
  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = (record) => {
    setModalData(record);
    setShowModal(true);
  }

  useEffect(() => {
    setLoading(true);
    fetch(`https://reqres.in/api/products?per_page=5&page=${currentPage}`)
      .then((response) => response.json())
      .then((response) => {
        setProducts(response.data);
        setPageCount(response.total_pages);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [currentPage]);
  
  const handleChange = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    setSearch(value);
    params.set('page', currentPage)
    params.set('id', value);
    params.toString();
    window.history.replaceState({}, '', window.location.pathname + '?' + params.toString())
  }
 
  const nextPage = () => {
    setCurrentPage((prevState) => prevState + 1);
    params.set('page', currentPage+1);
    window.history.replaceState({}, '', window.location.pathname + '?' + params.toString());
  }
  
  const previousPage = () => {
    setCurrentPage((prevState) => prevState - 1);
    params.set('page', currentPage-1);
    window.history.replaceState({}, '', window.location.pathname + '?' + params.toString());
  }
  
  return (
    <div className="body">
      <div className="main">
        <div className="header">
          <img src={logo} width={150} height={25} />
        </div>

        <input 
          className="search__input"
          type="text"
          id="search"
          onChange={handleChange}
          value={search}
          placeholder="Filter by ID..."
        />
     
        <div className="table">
          <table>  
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Year</th>
              </tr>
            </thead>
            
            <tbody>
            { !loading ? (
              products.filter(function (product) {
                if (search) {
                  return product.id === parseInt(search, 10)  
                } else {
                  return (true);
                }
                }).map((val, key) => {
                return (
                  <tr 
                    key={key} 
                    onClick={() => handleShowModal(val)}  
                    style={{
                      backgroundColor: val.color
                    }}
                  >
                    <td>{val.id}</td>
                    <td>{val.name}</td>
                    <td>{val.year}</td>
                  </tr>
                )
              })
            ) : (
               <></>
             )
              }
            </tbody>
          </table>
        </div>
          
       <Modal show={showModal} onHide={handleCloseModal} animation={false}>
        <Modal.Header>
          <Modal.Title>{modalData.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <table>  
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Year</th>
              <th>Color</th>
              <th>Pantone Value</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{
              backgroundColor: modalData.color
            }}>
              <td>{modalData.id}</td>
              <td>{modalData.name}</td>
              <td>{modalData.year}</td>
              <td>{modalData.color}</td>
              <td>{modalData.pantone_value}</td>
            </tr>
          </tbody>
        </table>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleCloseModal}>Close</Button>
        </Modal.Footer>
      </Modal>
      
        { loading ? (
          <p>Loading...</p>
        ) : (
          <div className="pagination">
            <button
              className="pagination_button"
              disabled={currentPage === 1}
              onClick={previousPage}
            >
            Previous
            </button>
            <button
              className="pagination_button" 
              disabled={currentPage === pageCount}
              onClick={nextPage}
            >
            Next
            </button>
          </div>
        )}
        </div>
        
      <div className="footer">
        Created by <a href="https://github.com/klaudia-klis">Klaudia Kliś</a>.
      </div>
    </div>
  );
}

export default App;
