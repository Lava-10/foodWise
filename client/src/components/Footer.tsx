import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-ocean-900 text-white mt-16">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">foodWise</h3>
            <p className="text-ocean-100">
              Join our mission to save Food and help needy.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/calculator" className="text-ocean-100 hover:text-white">Food conservation calculator</Link></li>
              <li><Link to="/volunteer" className="text-ocean-100 hover:text-white">Volunteer</Link></li>
              <li><Link to="/quiz" className="text-ocean-100 hover:text-white">Quiz</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Resources</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-ocean-100 hover:text-white">Food Conservation Tips</a></li>
              <li><a href="#" className="text-ocean-100 hover:text-white">Guide</a></li>
              <li><a href="#" className="text-ocean-100 hover:text-white">Educational Materials</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-2">
              <li className="text-ocean-100">Email: info@FoodWise.com</li>
              <li className="text-ocean-100">Phone: (555) 123-4567</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-ocean-700 mt-8 pt-8 text-center text-ocean-100">
          <p>&copy; 2025 foodWise. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;