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
            Welcome to Ogun State Teaching Service Commission Portal
          </h2>
          <p className="mt-4 text-lg">
            Your all-in-one solution for seamless management of teaching and non-teaching staff. Our
            platform is designed to empower educational institutions by efficiently storing and
            processing all staff-related data while streamlining essential HR business logic. Here's
            how we make managing your workforce a breeze:
          </p>
        </section>

        <section className="mb-8">
          <h3 className="text-xl font-bold text-yellow-600">Simplified Staff Data Management</h3>
          <p className="mt-2 text-base">
            Say goodbye to scattered spreadsheets and manual record-keeping. Our intuitive platform
            centralizes all staff data, providing a comprehensive and organized overview. Easily
            access and update information, from personal details to professional achievements, in
            one secure location.
          </p>
        </section>

        <section className="mb-8">
          <h3 className="text-xl font-bold text-yellow-600">Streamlined HR Processes</h3>
          <p className="mt-2 text-base">
            Optimize your HR operations with our powerful tools that automate key processes. From
            onboarding and attendance tracking to performance evaluations, we've got you covered.
            Spend less time on administrative tasks and more time focusing on what matters –
            delivering quality education.
          </p>
        </section>

        <section className="mb-8">
          <h3 className="text-xl font-bold text-yellow-600">Enhanced Collaboration</h3>
          <p className="mt-2 text-base">
            Foster collaboration among teaching and non-teaching staff members effortlessly. Our
            platform facilitates communication, ensuring everyone stays informed about important
            announcements, events, and updates. Collaborate seamlessly for a more connected and
            engaged workforce.
          </p>
        </section>

        <section className="mb-8">
          <h3 className="text-xl font-bold text-yellow-600">Customizable Business Logic</h3>
          <p className="mt-2 text-base">
            Tailor our platform to meet the unique needs of your institution. Define and implement
            specific business rules and logic for HR processes, ensuring compliance with policies
            and regulations. Our customizable solutions adapt to your workflow, not the other way
            around.
          </p>
        </section>

        <section className="mb-8">
          <h3 className="text-xl font-bold text-yellow-600">Data Security and Compliance</h3>
          <p className="mt-2 text-base">
            Rest easy knowing that your sensitive data is secure. We prioritize data protection and
            compliance with industry standards. Our robust security measures ensure that only
            authorized personnel have access to confidential information.
          </p>
        </section>

        <section className="mb-8">
          <h3 className="text-xl font-bold text-yellow-600">Real-time Analytics and Reporting</h3>
          <p className="mt-2 text-base">
            Make informed decisions with real-time analytics and reporting tools. Track key metrics,
            analyze trends, and generate insightful reports to support strategic planning. Our
            analytics empower your institution to make data-driven decisions for continuous
            improvement.
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
            className="bg-green-500 text-white text-[12px] rounded-full px-8 py-2 hover:bg-black-700 hover:text-white"
          >
            Contact Us
          </Button>
          <Button
            to="#"
            size="sm"
            className="bg-green-500 text-white text-[12px] rounded-full px-8 py-2 hover:bg-black-700 hover:text-white"
          >
            Learn More
          </Button>
        </section>
      </div>
    </div>
  );
};

export default AboutUsHome;
