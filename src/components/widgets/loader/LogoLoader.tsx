import { motion} from "framer-motion";
import { ogLogoBg } from "assets/logos";
const rollAnimation = {
    rotate: [0, 360], // Rotate from 0 to 360 degrees
    transition: {
        repeat: Infinity, // Repeat forever
        repeatType: 'loop' as const, // Correct type for repeatType
        duration: 2, // Duration of one rotation in seconds
        ease: 'linear' // Linear easing for smooth continuous rotation
    }
  };

  const LogoLoader = () => {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-100">
        <motion.img
          src={ogLogoBg}
          alt="logo here"
          animate={rollAnimation}
          // className="w-32 h-32" // Adjust size as needed
        />
      </div>
    );
  };

  export default LogoLoader