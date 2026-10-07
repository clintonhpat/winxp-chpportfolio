import React, { useState } from 'react';
import { portfolioData } from '../../../data/desktopData';
import './ContentStyles.css';

/**
 * Contact Content Component
 * Contact form and information in XP style
 */
function Contact() {
  const { personal, social } = portfolioData;
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, you'd send this to a backend or email service
    console.log('Form submitted:', formData);
    setSubmitted(true);
    
    // Alternatively, open mailto link
    const mailtoLink = `mailto:${personal.email}?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(`From: ${formData.name} (${formData.email})\n\n${formData.message}`)}`;
    window.location.href = mailtoLink;
  };

  return (
    <div className="contact-content">
      <div className="contact-container">
        <div className="contact-header">
          <div className="email-icon">📧</div>
          <div>
            <h1>Get in Touch</h1>
            <p>I'd love to hear from you!</p>
          </div>
        </div>

        {submitted ? (
          <div className="contact-success">
            <div className="success-icon">✅</div>
            <h2>Message Received!</h2>
            <p>Your email client should open shortly. If not, feel free to email me directly at {personal.email}</p>
            <button 
              className="xp-button" 
              onClick={() => setSubmitted(false)}
            >
              Send Another Message
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-row">
              <label htmlFor="name">Your Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                className="xp-input"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-row">
              <label htmlFor="email">Your Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                className="xp-input"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-row">
              <label htmlFor="subject">Subject:</label>
              <input
                type="text"
                id="subject"
                name="subject"
                className="xp-input"
                value={formData.subject}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-row">
              <label htmlFor="message">Message:</label>
              <textarea
                id="message"
                name="message"
                className="xp-input message-input"
                value={formData.message}
                onChange={handleChange}
                rows={6}
                required
              />
            </div>
            
            <div className="form-actions">
              <button type="submit" className="xp-button">
                📤 Send Message
              </button>
            </div>
          </form>
        )}

        <div className="contact-divider">
          <span>Or connect with me on</span>
        </div>

        <div className="social-links">
          <a 
            href={social.github} 
            target="_blank" 
            rel="noopener noreferrer"
            className="social-link github"
          >
            <span className="social-icon">🐙</span>
            <span>GitHub</span>
          </a>
          <a 
            href={social.linkedin} 
            target="_blank" 
            rel="noopener noreferrer"
            className="social-link linkedin"
          >
            <span className="social-icon">💼</span>
            <span>LinkedIn</span>
          </a>
          <a 
            href={social.twitter} 
            target="_blank" 
            rel="noopener noreferrer"
            className="social-link twitter"
          >
            <span className="social-icon">🐦</span>
            <span>Twitter</span>
          </a>
          <a 
            href={`mailto:${personal.email}`}
            className="social-link email"
          >
            <span className="social-icon">📧</span>
            <span>Email</span>
          </a>
        </div>
      </div>
    </div>
  );
}

export default Contact;
