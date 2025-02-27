import { useState, useEffect } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import "./ProductList.css";
// import "../style.css"
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";

const ProductList = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [currentPage, setCurrentPage] = useState(Number(searchParams.get("page")) || 1);
  const [totalPages, setTotalPages] = useState(1);

  // Fetch Products from API
  const fetchProducts = async (page = 1) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("User not authenticated! Please log in.");
      navigate("/login");
      return;
    }

    try {
      const response = await fetch(`http://localhost:8000/api/products?page=${page}`, {
        method: "GET",
        headers: {
          "Accept": "application/json",
          "Authorization": `Bearer ${token}`
        }
      });

      const data = await response.json();
      if (response.ok) {
        setProducts(data.data);
        setCurrentPage(data.current_page);
        setTotalPages(data.last_page);
      } else {
        alert(data.message || "Failed to fetch products");
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts(currentPage);
  }, [currentPage]);

  //Navigate handler
  const prevPageHandler = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const nextPageHandler = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  // Delete Product
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
  
    const token = localStorage.getItem("token");
  
    try {
      const response = await fetch(`http://localhost:8000/api/products/${id}`, {
        method: "DELETE",
        headers: {
          "Accept": "application/json",
          "Authorization": `Bearer ${token}`
        }
      });
  
      if (response.ok) {
        alert("Product deleted successfully!");
  
        // Check if the deleted product is the last one on the page
        if (products.length === 1 && currentPage > 1) {
          setCurrentPage(currentPage - 1); // Navigate to the previous page
        } else {
          fetchProducts(currentPage); // Refresh the current page
        }
      } else {
        const data = await response.json();
        alert(data.message || "Failed to delete product.");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };
  
  // Update Product 
  const handleSaveEdit = async (updatedProduct) => {
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(`http://localhost:8000/api/products/${updatedProduct.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(updatedProduct)
      });

      if (response.ok) {
        alert("Product updated successfully!");
        setProducts((prevProducts) =>
          prevProducts.map((product) =>
            product.id === updatedProduct.id ? updatedProduct : product
          )
        );
        setEditingProduct(null); // Close modal
      } else {
        const data = await response.json();
        alert(data.message || "Failed to update product.");
      }
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  // const prevPageHandler = () => {
  //   if (currentPage > 1) setCurrentPage(currentPage - 1);
  // };

  // const nextPageHandler = () => {
  //   if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  // };

  return (
    <>
      <Link to="/" className="btn">Add Product</Link>
      <div className="product-list">
      <h2 className="title" style={{ textAlign: "center" }}>List of Products</h2>


        <div className="table-container">
          <table className="styled-table">
            <thead>
              <tr>
                <th style={{ width: "200px"}}>Name</th>
                <th style={{ width: "200px"}}>Category</th>
                <th style={{ width: "200px"}}>Price</th>
                <th style={{ width: "200px"}}>Action</th>
              </tr>
            </thead>
            <tbody>
              {products.length > 0 ? (
                products.map((p) => (
                  <tr key={p.id}>
                    <td>{p.product_name}</td>
                    <td>{p.category}</td>
                    <td>{p.price}</td>
                    <td>
                      <button className="edit-btn" onClick={() => setEditingProduct(p)}>
                        <EditIcon />
                      </button>
                      <button className="delete-btn" onClick={() => handleDelete(p.id)}>
                        <DeleteIcon />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4">No products available</td>
                </tr>
              )}
            </tbody>
          </table>

          {products.length > 0 && (
            <div className="pagination">
              <button onClick={prevPageHandler} disabled={currentPage === 1}>
                <NavigateBeforeIcon />
              </button>
              <span>Page {currentPage} of {totalPages}</span>
              <button onClick={nextPageHandler} disabled={currentPage === totalPages}>
                <NavigateNextIcon />
              </button>
            </div>
          )}
        </div>
      </div>

      {editingProduct && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Edit: {editingProduct.product_name}</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSaveEdit(editingProduct);
              }}
            >
              <label>Name:</label>
              <input
                type="text"
                name="product_name"
                value={editingProduct.product_name}
                onChange={(e) =>
                  setEditingProduct({ ...editingProduct, product_name: e.target.value })
                }
                required
              />

              <label>Category:</label>
              <input
                type="text"
                name="category"
                value={editingProduct.category}
                onChange={(e) =>
                  setEditingProduct({ ...editingProduct, category: e.target.value })
                }
                required
              />

              <label>Price:</label>
              <input
                type="number"
                name="price"
                value={editingProduct.price}
                onChange={(e) =>
                  setEditingProduct({ ...editingProduct, price: e.target.value })
                }
                required
              />

              <div className="modal-actions">
                <button type="submit" className="save-btn">Save</button>
                <button type="button" className="close-btn" onClick={() => setEditingProduct(null)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductList;
