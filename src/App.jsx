import { useState } from 'react';
import './App.css';

function App() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    guess: '',
    pin: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Auto-format PIN with dashes ####-####-####-####
    if (name === 'pin') {
      const digitsOnly = value.replace(/\D/g, '').slice(0, 16);
      const formatted = digitsOnly.replace(/(\d{4})(?=\d)/g, '$1-');
      setFormData({ ...formData, [name]: formatted });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="spidr-layout">
    <div className="image-column"></div>
    <div className="form-column">
    <div className="form-wrapper">
      <h1>Join the Air Fryer Revolution</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="firstName" placeholder="First name" onChange={handleChange} />
        <input type="text" name="lastName" placeholder="Last name" onChange={handleChange} />
        <input type="tel" name="phone" placeholder="Phone number" onChange={handleChange} />
        <input type="email" name="email" placeholder="Email address" onChange={handleChange} />
        <input type="text" name="guess" placeholder="Guess the air fryer’s cost ($)" onChange={handleChange} />
        <input type="text" name="pin" placeholder="Secret Spidr PIN (####-####-####-####)" value={formData.pin} onChange={handleChange} />

        <button type="submit">Submit</button>
      </form>
    </div>
    </div>
    </div>
  );
}

export default App;
