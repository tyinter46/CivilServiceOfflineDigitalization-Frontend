const Footer = () => {
  return (
    <footer className="w-full h-full bg-black text-white py-2 px-4">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
        {/* Left Section: Company Information */}
        <div className="flex flex-col items-center md:items-start">
         <div><h4 className="text-yellow-400 font-bold text-xl">Ogun State Teaching Service Commission</h4></div> 
         <div> <p className="mt-2 text-white text-gray-400 text-sm text-center md:text-left">
            Empowering educational institutions through data-driven management.
          </p>
          </div>
        </div>

        {/* Center Section: Navigation Links */}
        <div className="flex flex-row gap-8 text-center text-white">
          <a href="#" className="text-white hover:text-yellow-400 text-sm">
            About Us
          </a>
          <a href="#" className="text-white hover:text-yellow-400 text-sm">
           Contact
          </a>
          <a href="#" className="text-white hover:text-yellow-400 text-sm">
            Terms of Service
          </a>
        </div>

        {/* Right Section: Social Icons */}
        <div className="flex flex-row gap-4">
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-twitter text-white hover:text-yellow-400 text-2xl"></i>
          </a>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-facebook-f text-white hover:text-yellow-400 text-2xl"></i>
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-linkedin text-white hover:text-yellow-400 text-2xl"></i>
          </a>
        </div>
        
      <div className="mt-8 text-center text-yellow text-sm">
        <p> <a href="https://wa.me/+2348123283709">Developed by Teewhy </a>  </p>
      </div>
      </div>



      <div className="mt-8 text-center text-gray-500 text-sm">
        <p>&copy; {new Date().getFullYear()} Ogun State Teaching Service Commission. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;

  