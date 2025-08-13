// import { whitePolygon, yellowPolygon } from "assets/logos";
// import { adireBg } from "assets/backgrounds";
import { Button } from "components/widgets/button";
import { SIGNUP } from "routes/CONSTANTS";

const LeftContent = () => {
  return (
    <div className="flex flex-col justify-center items-center w-1/3 h-screen bg-gradient-to-r from-yellow-900 to-black-100">
      <div className="text-center mt-20">
        <h4 className="text-white text-4xl font-bold">Simplified.</h4>
        <h4 className="text-yellow-400 text-4xl font-bold">Secure.</h4>
        <h5 className="text-white text-xl mt-4">Analytical Staff Data Management</h5>
      </div>
      <div className="mt-15 flex gap-4">
        {/* <img src={yellowPolygon} alt="yellowPolygon" className="w-16 h-16" />
        <img src={whitePolygon} alt="whitePolygon" className="w-16 h-16" /> */}
      </div>
      <div className="mt-10 text-center gap-[50px]">
        <p className="text-white text-lg">
          Unlock Efficiency with Our Advanced Staff Management Platform
        </p>
        <br />
        <Button
          to={SIGNUP}
          variant="outline"
          className="mt-0 bg-yellow-400 text-base text-black rounded-full px-8 py-2 hover:bg-black hover:text-white"
        >
          Get Started
        </Button>
      </div>
    </div>
  );
};

export default LeftContent;
