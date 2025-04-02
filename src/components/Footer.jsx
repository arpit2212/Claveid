import React from "react";

const Footer = () => {
  return (
    <footer className="bg-[#3646F5] text-white pt-10">
      <div className="container mx-auto flex flex-col items-center md:items-start md:grid md:grid-cols-5 gap-8 px-4">
        {/* Logo and Description */}
        <div className="col-span-1 text-center md:text-left">
          <h1 className="text-lg font-bold mb-2">ClaveID</h1>
          <p className="text-sm">
          Stronger Passwords, Smarter Protection.Think Your Password is Strong? Let AI Prove It. Make Your Passwords Unbreakable. Try now
          </p>
        </div>

        {/* Page Links */}
        <div className="text-center md:text-left">
          <h2 className="text-md font-semibold mb-2">Password Checker</h2>
          <ul className="text-sm space-y-1">
            <li>
              <a href="/createHackathons">Password Strength Analyzer </a>
            </li>
            <li>
              <a href="/createHackathons">Password Strength Analyzer </a>
            </li>
            <li>
              <a href="/createHackathons">Password Strength Analyzer </a>
            </li>
           
          </ul>
        </div>

        {/* Links */}
        <div className="text-center md:text-left">
          <h2 className="text-md font-semibold mb-2">Time to crack:</h2>
          <ul className="text-sm space-y-1">
            <li>
              <a href="/createProject">Stronger alternatives </a>
            </li>
            <li>
              <a href="/createProject">Stronger alternatives </a>
            </li>
            <li>
              <a href="/createProject">Stronger alternatives </a>
            </li>
            
          </ul>
        </div>

        {/* Services */}
        <div className="text-center md:text-left">
          <h2 className="text-md font-semibold mb-2">FAQ</h2>
          <ul className="text-sm space-y-1">
            <li>
              <a href="/createPartner">Terms and Condition</a>
            </li>
            <li>
              <a href="/createPartner">Terms and Condition</a>
            </li>
            <li>
              <a href="/createPartner">Terms and Condition</a>
            </li>
            
           
          </ul>
        </div>

        {/* Contact Us */}
        <div className="text-center md:text-left">
          <h2 className="text-md font-semibold mb-2">Contact Us</h2>
          <ul className="text-sm space-y-1">
            <li>
              <a href="/">
                <span role="img" aria-label="phone">☎️</span>  9111456393
              </a>
            </li>
            <li>
              <a href="/">
                <span role="img" aria-label="email">📧</span> as5260@srmist.edu.in
              </a>
            </li>
            <li>
              <a href="/">
                <span role="img" aria-label="location">🏢</span> Chennai, India
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Social Icons */}
      <div className="mt-8 text-center">
        <div className="flex justify-center space-x-4">
          <a href="/" className="text-white text-xl">
            <i className="fab fa-pinterest"></i>
          </a>
          <a href="/" className="text-white text-xl">
            <i className="fab fa-facebook"></i>
          </a>
          <a href="/" className="text-white text-xl">
            <i className="fab fa-instagram"></i>
          </a>
          <a href="/" className="text-white text-xl">
            <i className="fab fa-linkedin"></i>
          </a>
        </div>
      </div>

      <div className="p-5 text-center bg-black">
        Designed And Developed by HashMap 💗
      </div>
    </footer>
  );
};

export default Footer;
