import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./productcreate.css"; // Ensure this file exists and is properly linked

const ProductCreate = () => {
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("User not authenticated! Redirecting to login...");
      navigate("/login", { replace: true });
    }
  }, [navigate]);

  async function handleSubmit(formData) {
    const productName = formData.get("product_name");
    const category = formData.get("category");
    const price = formData.get("price");

    if (!productName || !category || !price) {
      alert("All fields are required!");
      return;
    }

    const token = localStorage.getItem("token"); // Retrieve token from local storage
    if (!token) {
      alert("User not authenticated! Please log in.");
      navigate("/login");
      return;
    }

    try {


      const response = await fetch("http://localhost:8000/api/product/create", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`, // Send the JWT token
        },
        body: formData, // Using FormData instead of JSON
      });

      const data = await response.json();
      setError(data?.message);

      if (response.ok) {
        alert("Product Created Successfully!");
        document.getElementById("product-form").reset(); // Reset form inputs
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong!");
    }
  }

  return (
    <>
      <div className="product-container">
        <h2>Create Product</h2>
        {/* {error && <p style={{ color: "red" }}>{error}</p>} */}
        <form action={handleSubmit} id="product-form" className="product-form">
          <input type="text"
            name="product_name"
            placeholder="Product Name" /> <br />
          <input type="text" name="category" placeholder="Product Category" /> <br />
          <input type="number" name="price" placeholder="Product Price" /> <br />
          <button type="submit">Create Product</button>
        </form>
      </div>
    </>
  );
};

export default ProductCreate;
