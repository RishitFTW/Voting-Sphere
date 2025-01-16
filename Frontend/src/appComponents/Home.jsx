import React from 'react'
import { NavLink } from 'react-router'

function Home() {
  return (
    <div class="bg-gray-100 font-sans">
      {/* <!-- Hero Section --> */}
  <section class="bg-gray-900 text-white text-center py-24">
    <h1 class="text-4xl font-bold mb-4">Welcome to the Voting App</h1>
    <p class="text-xl mb-6">A secure and easy way to participate in elections online.</p>
    <NavLink
      to="/leaderboards"
      className="bg-white text-gray-900 px-6 py-3 rounded-full text-lg font-semibold hover:bg-blue-100"
    >
      Get Started
    </NavLink>
  </section>

{/*  <!-- About Section --> */}
  <section id="about" class="py-16 text-center bg-white">
    <div class="max-w-4xl mx-auto">
      <h2 class="text-3xl font-bold text-gray-900 mb-6">About Our Voting App</h2>
      <p class="text-lg text-gray-700">
        Our app makes voting simple, secure, and accessible. Whether you're casting a vote in an election or participating in a poll, our platform ensures your vote is counted and protected.
      </p>
    </div>
  </section>

  {/* <!-- Features Section --> */}
  <section id="features" class="py-16 bg-gray-100">
    <div class="max-w-4xl mx-auto text-center">
      <h2 class="text-3xl font-bold text-gray-900 mb-8">Features</h2>
      <div class="grid md:grid-cols-3 gap-12">
        <div class="bg-white p-6 rounded-lg shadow-lg">
          <h3 class="text-xl font-semibold mb-4">Secure Voting</h3>
          <p class="text-gray-700">Our platform uses encryption and authentication methods to ensure your vote remains private and secure.</p>
        </div>
        <div class="bg-white p-6 rounded-lg shadow-lg">
          <h3 class="text-xl font-semibold mb-4">Easy Access</h3>
          <p class="text-gray-700">Vote from anywhere, on any device. All you need is an internet connection to cast your vote.</p>
        </div>
        <div class="bg-white p-6 rounded-lg shadow-lg">
          <h3 class="text-xl font-semibold mb-4">Real-Time Results</h3>
          <p class="text-gray-700">View live results and track progress throughout the voting process with up-to-the-minute updates.</p>
        </div>
      </div>
    </div>
  </section>

  {/* <!-- Contact Section --> */}
  <section id="contact" class="py-16 bg-gray-900 text-white text-center">
    <h2 class="text-3xl font-bold mb-4">Contact Us</h2>
    <p class="text-lg mb-6">Have any questions or suggestions? We're here to help.</p>
    <a href="mailto:support@votingapp.com" class="bg-white text-gray-700 px-6 py-3 rounded-full text-lg font-semibold hover:bg-blue-100">Email Us</a>
  </section>

  {/* <!-- Footer --> */}
  <footer class="bg-gray-800 text-white py-6 text-center">
    <p>&copy; 2025 Voting App. All Rights Reserved.</p>
  </footer>
    </div>
  )
}

export default Home