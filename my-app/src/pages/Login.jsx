import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";

// import { toast } from "react-toastify";

// toast.configure();

const Login = () => {
  // const [phone, setPhone] = useState("");
  // const [code, setCode] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/", { replace: true }); // Redirect if token exists
    } else {
      localStorage.removeItem("token"); // Ensure token is removed if manually accessing login page
    }
  }, [navigate]);

  // const handleLogin = async () => {
  //   setError(null); // Clear previous errors

  //   if (phone.length !== 10 || code.length !== 4) {
  //     alert("Enter valid phone number (10 digits) and code (4 digits).");
  //     return;
  //   }

  //   try {
  //     const response = await fetch("http://localhost:8000/api/login", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ phone, password: code }), // 🔹 Sending request to Laravel backend
  //     });

  //     const data = await response.json();

  //     if (!response.ok) {
  //       throw new Error(data.message || "Login failed");
  //     }

  //     // 🔹 Store JWT token in localStorage
  //     localStorage.setItem("token", data.access_token);

  //     alert("Login successful!");
  //     navigate("/"); // Redirect to dashboard
  //   } catch (err) {
  //     setError(err.message);
  //   }
  // };

  async function handleSubmit(formData) {
    const phone = formData.get("phone");
    const password = formData.get("password");
    
    // if (phone.length !== 10 || password.length !== 4) {
    //   alert("Enter valid phone number (10 digits) and code (4 digits).");
    //   return null;
    // }

    try {
      const response = await fetch("http://localhost:8000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phone, password }),
      });
      const data = await response.json();
      setError(data?.messages?.phone?.[0] || data?.message);

      if (response.ok) {
        alert("Login successful!");
        localStorage.setItem("token", data.access_token);
        navigate("/", { replace: true });
      }
    } catch (error) {
      console.log(error, "error-login");
    }
  }

  return (
    <div>
      <h2 >Login</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}
      <form action={handleSubmit} className="login-container">
        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          // value={phone}
          maxLength={10}
          // onChange={(e) => setPhone(e.target.value)}
        />
        <input
          type="password"
          name="password"
          placeholder="Code"
          // value={code}
          maxLength={4}
          // onChange={(e) => setCode(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
