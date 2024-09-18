import { LeftContent, AboutUsHome, RightContent } from "components/layouts/home";
import { Footer } from "components"; // Import the Footer component

const HomeView = () => {
  return (
    <div className="flex flex-col w-screen overflow-auto bg-black-100">
      <div className="flex flex-row gap-10">
        <LeftContent />
        <AboutUsHome />
        <RightContent /> 
      </div>


      <Footer />
    
    </div>
  );
};

export default HomeView;
