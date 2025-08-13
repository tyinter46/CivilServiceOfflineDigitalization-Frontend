// import LeftContent from "./LeftContent";
// import RightContent from "./RightContent";
import { Button } from "components/widgets";
import { SIGNUP } from "routes/CONSTANTS";
const AboutUsHome = () => {
  return (
    <div className="flex flex-row h-screen w-screen mt-2">
      <div className="flex flex-col w-full p-10 bg-white text-black overflow-auto">
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-green-700">
            Welcome to Ogun State Civil Service Commission Portal
          </h2>
                   <h3 className="text-xl font-bold text-yellow-600">
           Your all-in-one solution for seamless management of civil service personnel.
           </h3>
          <p className="mt-4 text-lg">
            Our
            platform is designed to empower government ministries, departments, and agencies (MDAs)
            by efficiently storing and processing all staff-related data while streamlining
            essential HR business processes. Here’s how we make managing your workforce easier and
            more effective:
          </p>
        </section>

        <section className="mb-8">
          <h3 className="text-xl font-bold text-yellow-600">
            Centralized Personnel Data Management
          </h3>
          <p className="mt-2 text-base">
            Say goodbye to fragmented files and manual record-keeping. Our intuitive platform
            consolidates all personnel records into a single, secure system, providing a
            comprehensive and organized view. Easily access and update details — from personal
            information to service history and professional milestones — all in one place.
          </p>
        </section>

        <section className="mb-8">
          <h3 className="text-xl font-bold text-yellow-600">Streamlined HR Operations</h3>
          <p className="mt-2 text-base">
            Enhance your human resource management with automated workflows for critical processes.
            From recruitment and postings to leave management, promotions, and performance reviews,
            our tools simplify and accelerate administrative tasks, freeing you to focus on service
            delivery and policy execution.
          </p>
        </section>

        <section className="mb-8">
          <h3 className="text-xl font-bold text-yellow-600">
            Improved Communication and Collaboration
          </h3>
          <p className="mt-2 text-base">
            Foster better collaboration among staff across units, departments, and locations. Our
            platform facilitates timely communication of circulars, memos, policy updates, and event
            notifications — ensuring that everyone stays informed and aligned.
          </p>
        </section>

        <section className="mb-8">
          <h3 className="text-xl font-bold text-yellow-600">
            Customizable Workflows and Policy Compliance
          </h3>
          <p className="mt-2 text-base">
            Adapt the system to your specific operational requirements. Define and implement rules
            that reflect your institution’s HR policies, statutory guidelines, and service
            regulations. Our customizable framework ensures your processes remain compliant and
            efficient.
          </p>
        </section>

        <section className="mb-8">
          <h3 className="text-xl font-bold text-yellow-600">
            Data Security and Regulatory Compliance
          </h3>
          <p className="mt-2 text-base">
            Protecting sensitive government data is our top priority. We employ robust security
            protocols to ensure only authorized personnel can access confidential information, while
            maintaining compliance with relevant civil service regulations and data protection laws.
          </p>
        </section>

        <section className="mb-8">
          <h3 className="text-xl font-bold text-yellow-600">
            Real-time Insights and Decision Support
          </h3>
          <p className="mt-2 text-base">
            Empower leadership with real-time analytics and comprehensive reports. Monitor key
            workforce metrics, identify trends, and generate insights to guide workforce planning,
            budgeting, and policy formulation. Our analytics tools turn data into actionable
            strategies for improved public service delivery.
          </p>
        </section>

        <section className="flex justify-around mt-5">
          <Button
            to={SIGNUP}
            size="sm"
            className="bg-yellow-400 text-black text-[12px] rounded-full px-8 py-2 hover:bg-black hover:text-white"
          >
            Get Started
          </Button>
          <Button
            to="#"
            size="sm"
            className="bg-green-500 text-white text-[12px] rounded-full px-8 py-2 hover:bg-black-700 hover:bg-black hover:text-white"
          >
            Contact Us
          </Button>
          <Button
            to="#"
            size="sm"
            className="bg-green-500 text-white text-[12px] rounded-full px-8 py-2 hover:bg-black-700 hover:bg-black hover:text-white"
          >
            Learn More
          </Button>
        </section>
      </div>
    </div>
  );
};

export default AboutUsHome;
