import { useState } from "react";
import "./App.css";

export default function App() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    guess: "",
    pin: "",
  });

  const [errors, setErrors] = useState({});

  /* ------------  helpers ------------- */
  const onlyDigits = (str) => str.replace(/\D/g, "");
  const isEmail = (val) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim());

  const validate = () => {
    const e = {};

    if (!formData.firstName.trim()) e.firstName = "Required";
    if (!formData.lastName.trim()) e.lastName = "Required";

    const phoneDigits = onlyDigits(formData.phone);
    if (phoneDigits.length !== 10) e.phone = "10‑digit US phone";

    if (!isEmail(formData.email)) e.email = "Invalid email";

    if (!formData.guess || Number(formData.guess) <= 0 || isNaN(Number(formData.guess)))
      e.guess = "Enter a positive number";

    const pinDigits = onlyDigits(formData.pin);
    if (pinDigits.length !== 16)
      e.pin = "Must contain 16 digits";

    return e;
  };

  /* ------------  event handlers ------------- */
  const handleChange = (e) => {
    const { name, value } = e.target;

    // auto‑format PIN ####-####-####-####
    if (name === "pin") {
      const digits = onlyDigits(value).slice(0, 16);
      const formatted = digits.replace(/(\d{4})(?=\d)/g, "$1-");
      setFormData({ ...formData, pin: formatted });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
  e.preventDefault();
  const foundErrors = validate();
  setErrors(foundErrors);

  if (Object.keys(foundErrors).length === 0) {
    console.log("Form data:", formData);
  }
};

  /* ------------  render ------------- */
  return (
    <div className="spidr-layout">
      <div className="image-column" />
      <div className="form-column">
        <div className="form-wrapper">
          <h1>Join the Air Fryer Revolution</h1>

          <form onSubmit={handleSubmit} noValidate>
            <input
              type="text"
              name="firstName"
              placeholder="First name"
              value={formData.firstName}
              onChange={handleChange}
            />
            <div className="error-space">
              {errors.firstName && <small>{errors.firstName}</small>}
            </div>

            <input
              type="text"
              name="lastName"
              placeholder="Last name"
              value={formData.lastName}
              onChange={handleChange}
            />
            <div className="error-space">
              {errors.lastName && <small>{errors.lastName}</small>}
            </div>

            <input
              type="tel"
              name="phone"
              placeholder="Phone number"
              value={formData.phone}
              onChange={handleChange}
            />
            <div className="error-space">
              {errors.phone && <small>{errors.phone}</small>}
            </div>

            <input
              type="email"
              name="email"
              placeholder="Email address"
              value={formData.email}
              onChange={handleChange}
            />
            <div className="error-space">
              {errors.email && <small>{errors.email}</small>}
            </div>

            <input
              type="text"
              name="guess"
              placeholder="Guess the air fryer’s cost ($)"
              value={formData.guess}
              onChange={handleChange}
            />
            <div className="error-space">
            {errors.guess && <small>{errors.guess}</small>}
            </div>

            <input
              type="text"
              name="pin"
              placeholder="Secret Spidr PIN (####-####-####-####)"
              value={formData.pin}
              onChange={handleChange}
            />
            <div className="error-space">
              {errors.pin && <small>{errors.pin}</small>}
            </div>

            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
}
