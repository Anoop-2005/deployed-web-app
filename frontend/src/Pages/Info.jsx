import React, { useEffect } from 'react';

export default function Info() {
    useEffect(() => { 
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="container py-5" style={{ minHeight: '80vh' }}>
      
      {/* --- ABOUT SECTION --- */}
      <section id="about" className="card p-4 mb-5 shadow-sm">
        <h2 className="mb-3">About Us</h2>
        <p className="card-text">
          Welcome to <strong>Enjoying Computer Science</strong>! We are dedicated to providing the best 
            development articles, and technical insights. Our goal is to make learning 
          computer science engaging, practical, and highly accessible for developers at all levels.
          It is just a demo project.
        </p>
      </section>

      {/* --- PRIVACY POLICY SECTION --- */}
      <section id="privacy" className="card p-4 mb-5 shadow-sm">
        <h2 className="mb-3">Privacy Policy</h2>
        <p className="card-text">
          Your privacy matters to us. This policy details how we handle data:
        </p>
        <ul className="card-text ps-3">
          <li>We do not sell your personal identifying information to any third parties.</li>
          <li>Basic account details (like your profile name) are safely stored securely to manage updates.</li>
          <li>Analytics data is captured only to enhance user experience across our systems.</li>
        </ul>
      </section>

      {/* --- CONTACT SECTION --- */}
      <section id="contact" className="card p-4 shadow-sm">
        <h2 className="mb-3">Contact Us</h2>
        <p className="card-text mb-4">
          Have a question or looking to collaborate? Drop us a quick note below and we will get back to you!
        </p>
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="mb-3">
            <label className="form-label">Your Name</label>
            <input type="text" className="form-control" placeholder="Enter your name" required />
          </div>
          <div className="mb-3">
            <label className="form-label">Email Address</label>
            <input type="email" className="form-control" placeholder="name@example.com" required />
          </div>
          <div className="mb-3">
            <label className="form-label">Message</label>
            <textarea className="form-control" rows="4" placeholder="Type your message here..." required></textarea>
          </div>
          <button type="submit" className="btn btn-primary px-4">Send Message</button>
        </form>
      </section>

    </div>
  );
}