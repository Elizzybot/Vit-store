import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const PRODUCTS = [
  {
    id: 1,
    name: "Basic WhatsApp Bot",
    price: 5000,
    image: "/bot_promo.jpg",
    description: "Auto-reply + Menu + Simple Setup"
  },
  {
    id: 2,
    name: "Business WhatsApp Bot",
    price: 15000,
    image: "/bot_promo.jpg",
    description: "Full business automation + Order system"
  },
  {
    id: 3,
    name: "Pro WhatsApp Bot",
    price: 30000,
    image: "/bot_promo.jpg",
    description: "Premium commands, Telegram sync, hosting included"
  }
];

const Store = ({ cart, setCart }) => {
  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
      {PRODUCTS.map((product) => (
        <Card key={product.id} className="rounded-2xl shadow-xl">
          <img src={product.image} alt={product.name} className="rounded-t-2xl w-full h-48 object-cover" />
          <CardContent className="p-4">
            <h2 className="text-xl font-bold">{product.name}</h2>
            <p className="text-sm text-gray-600">{product.description}</p>
            <p className="text-lg font-semibold mt-2">₦{product.price.toLocaleString()}</p>
            <Button onClick={() => addToCart(product)} className="mt-2 w-full">Add to Cart</Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

const Cart = ({ cart }) => {
  const total = cart.reduce((sum, p) => sum + p.price, 0);
  const cartDetails = cart.map((p) => p.name).join(", ");
  const message = encodeURIComponent(`Hello, I want to buy: ${cartDetails} (Total: ₦${total.toLocaleString()})`);
  const whatsappNumber = "YOUR_PHONE_NUMBER";
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${message}`;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul className="list-disc ml-6">
            {cart.map((item, i) => (
              <li key={i}>{item.name} - ₦{item.price.toLocaleString()}</li>
            ))}
          </ul>
          <p className="mt-4 font-semibold">Total: ₦{total.toLocaleString()}</p>
          <Button className="mt-4" onClick={() => window.open(whatsappLink, '_blank')}>Checkout on WhatsApp</Button>
        </>
      )}
    </div>
  );
};

const Auth = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [registered, setRegistered] = useState(() => localStorage.getItem("registered") === "true");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (username.trim()) {
      localStorage.setItem("username", username);
      localStorage.setItem("registered", true);
      onLogin(username);
      navigate("/");
    }
  };

  useEffect(() => {
    if (registered) {
      const savedUser = localStorage.getItem("username");
      if (savedUser) onLogin(savedUser);
      navigate("/");
    }
  }, [registered]);

  return (
    <div className="flex flex-col items-center justify-center h-screen p-4">
      <h1 className="text-3xl font-bold mb-4">Welcome to ELIMINATOR VIT SERVICE</h1>
      <Input
        placeholder="Enter your name"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="mb-4"
      />
      <Button onClick={handleLogin}>Sign Up / Log In</Button>
    </div>
  );
};

const Support = () => {
  const whatsappNumber = "2349033181048";
  const message = encodeURIComponent("Hello, I need support from ELIMINATOR VIT SERVICE");
  const link = `https://wa.me/${whatsappNumber}?text=${message}`;

  return (
    <div className="p-4 text-center">
      <h2 className="text-2xl font-bold mb-2">Support</h2>
      <p className="mb-4">Need help? We're here for you.</p>
      <Button onClick={() => window.open(link, '_blank')}>Chat with Support on WhatsApp</Button>
    </div>
  );
};

export default function App() {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <header className="bg-black text-white p-4 text-center text-2xl font-bold shadow-md">ELIMINATOR VIT SERVICE</header>
        <Routes>
          <Route path="/" element={user ? <Store cart={cart} setCart={setCart} /> : <Auth onLogin={setUser} />} />
          <Route path="/cart" element={<Cart cart={cart} />} />
          <Route path="/support" element={<Support />} />
        </Routes>
        <footer className="bg-black text-white text-center py-2 text-sm mt-auto">© 2025 ELIMINATOR VIT SERVICE</footer>
      </div>
    </Router>
  );
}
