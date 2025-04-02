import React from "react";



const Landingheader = () => {
  return (
    <div 
      className="relative bg-black text-white flex items-center justify-center h-screen overflow-hidden"
      style={{
        backgroundImage: `url(/logo.png)`,
        backgroundSize: "cover",
        backgroundPosition: "center"
      }}
    >
      {/* Content */}
      <div className="relative z-10 text-center px-4 text-white">
        <h1 className="text-4xl md:text-5xl  font-bold">
          Welcome to ClaveAI <span className="text-[#3646F5]">The Future of</span>
          <br /> Password Security  
        </h1>
        <p className="text-gray-100 mt-10 max-w-2xl mx-auto">
        Stronger Passwords, Smarter Protection.Think Your Password is Strong? Let AI Prove It. Make Your Passwords Unbreakable. Try now        </p>
        <button
          className="mt-6 inline-flex items-center justify-center w-24 h-16 border-2 border-white hover:bg-[#3646F5] hover:border-[#3646F5] hover:text-white"
          onClick={() => {
            const section = document.getElementById("Password-analyser");
            if (section) {
              const offsetTop = section.offsetTop;
              window.scrollTo({
                top: offsetTop - 120,
                behavior: "smooth",
              });
            }
          }}
        >
          <span className="text-3xl">↓</span>
        </button>
      </div>
    </div>
  );
};

export default Landingheader;