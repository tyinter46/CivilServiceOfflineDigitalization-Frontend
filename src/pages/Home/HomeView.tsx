import { LeftContent, AboutUsHome, RightContent } from "components/layouts/home";
import { Footer } from "components"; // Import the Footer component

const HomeView = () => {
  return (
    <div className="flex flex-col overflow-auto bg-black-100">
      <div className="flex flex-row gap-10">
        <LeftContent />
        <AboutUsHome />
        <RightContent /> 
      </div>

      {/* Add Footer at the bottom */}
      <Footer />
    </div>
  );
};

export default HomeView;
