import { LeftContent,  AboutUsHome } from "components/layouts/home";
const HomeView = () => {
  return (
    <div className="flex flex-row gap-10 overflow-auto bg-black-100">
      <LeftContent />
        <AboutUsHome />  
       {/* <RightContent/> */}
    </div>
  );
};
export default HomeView;
// Our innovative platform is designed to empower Ogun State Teaching Service Commission with
// a comprehensive solution for efficient staff management
