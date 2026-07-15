import { useState } from "react";
import "../styles/Contact.css";

function Contact() {

  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const submitForm = (e) => {

    e.preventDefault();

    alert("Thank you! Your message has been received.");

    setForm({
      name: "",
      email: "",
      message: "",
    });

  };

  return (

    <div className="contact-container">

      <div className="contact-card">

        <h1>📞 Contact Us</h1>

        <p>
          We'd love to hear from you.
        </p>

        <div className="contact-info">

          <p>📧 support@quickloanai.com</p>

          <p>📱 +91 98765 43210</p>

          <p>📍 Trivandrum, Kerala, India</p>

          <p>🕒 Monday - Friday : 9 AM - 6 PM</p>

        </div>

        <form onSubmit={submitForm}>

          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={form.name}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={form.email}
            onChange={handleChange}
            required
          />

          <textarea
            rows="5"
            name="message"
            placeholder="Your Message"
            value={form.message}
            onChange={handleChange}
            required
          />

          <button type="submit">
            Send Message
          </button>

        </form>

      </div>

    </div>

  );

}

export default Contact;