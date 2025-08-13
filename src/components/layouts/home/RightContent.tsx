import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const RightContent = () => {
  // Array of text objects to animate
  const texts = [
    {
      title1: "Simplified.",
      title2: "Secure.",
      description: "Analytical Staff Data Management",
    },
    {
      title1: "Efficient.",
      title2: "Reliable.",
      description: "Comprehensive HR Solutions for Civil Servants",
    },
    {
      title1: "Dynamic.",
      title2: "Scalable.",
      description: "Tailored Solutions for Civil Service",
    },
    {
      title1: "Innovative.",
      title2: "Flexible.",
      description: "Empowering Administrators with Technology",
    },
 {
  title1:    "Innovating" ,
  title2: "Civil Service",
  description:" Management"
},

  {
  title1: "Simplified",
  title2: "Staff",
  description: " Data Handling" 
  }
  , 
{
       title1:"Optimizing HR",
       title2:   "for Civil Service",
       description: "Empowering Civil Service Through Technology",
}
  ];

  // State to track the index of the current text
  const [currentTextIndex, setCurrentTextIndex] = useState(0);

  useEffect(() => {
    // Set interval to change text every 3 seconds
    const interval = setInterval(() => {
      setCurrentTextIndex((prevIndex) => (prevIndex + 1) % texts.length);
    }, 4000);

    // Cleanup interval on unmount
    return () => clearInterval(interval);
  }, [texts.length]);

  const currentText = texts[currentTextIndex]; // Get the current text

  return (
    <div className="flex justify-center items-center w-1/3 bg-inherit">
      <motion.div
        key={currentTextIndex} // Use key to trigger re-animation
        initial={{ opacity: 0, y: 20 }} // Start off invisible and slightly down
        animate={{ opacity: 1, y: 0 }} // Animate to visible and its original position
        exit={{ opacity: 0, y: -20 }} // Animate out by fading out and moving up
        transition={{ duration: 1 }} // Control animation duration
        className="text-center mt-20"
      >
        <h4 className="text-white text-4xl font-bold">{currentText.title1}</h4>
        <h4 className="text-yellow-400 text-4xl font-bold">{currentText.title2}</h4>
        <h5 className="text-white text-xl mt-4">{currentText.description}</h5>
      </motion.div>
    </div>
  );
};

export default RightContent;
