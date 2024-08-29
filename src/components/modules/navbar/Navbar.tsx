import { Link, useLocation } from "react-router-dom";
import { HOME, LOGIN, SIGNUP } from "routes/CONSTANTS";
import { Button } from "components/widgets/button";
import { useAppSelector, useAppDispatch } from "hooks";
import { logout } from "../../../redux/slices/auth.slice";
import { motion, useCycle, AnimatePresence } from "framer-motion";
import { Drawer } from "../drawer";
import { Menu } from "components/widgets";
import { TesLogout } from "components/icons";



// interface Props {
//     transparent?: boolean;
// }
import { ogLogo } from "assets/logos";
import NavLink from "./NavLink";
import { toast } from "react-toastify";

const rollAnimation = {
  rotate: [0, 360], // Rotate from 0 to 360 degrees
  transition: {
      repeat: Infinity, // Repeat forever
      repeatType: 'loop' as const, // Correct type for repeatType
      duration: 2, // Duration of one rotation in seconds
      ease: 'linear' // Linear easing for smooth continuous rotation
  }
};



const Navbar = () => {
  const dispatch = useAppDispatch()
  const {isLoggedIn} = useAppSelector((state)=> state.auth)
  const location = useLocation();
  const [open, toggle] = useCycle(false, true);

  

  const handleLogout =  ()=>{
    try {
      void dispatch (logout())
    } catch (error: any) {
      toast.error(error)
    }
   
  }
  return (
    <motion.div
    initial={false}
    animate={open ? "open" : "closed"}
    // className={`${
    //   transparent && y <= 40 ? "hidden" : "bg-inherit"
    // } fixed lg:relative top-0 left-0 right-0 text-black z-50`}
  >
    <div
      className={
        location.pathname === "/"
          ? "flex flex-row items-center top-0 absolute w-3/4 right-0 h-16 justify-between opacity-100 bg-inherit border-b-2 border-b-primary"
          : "flex flex-row items-center top-0 absolute w-full right-0 h-16 justify-between opacity-90 bg-green border-b-2 border-b-primary"
      }
    >
      <div className="flex flex-row justify-start">
        <Link to={HOME}>
        <motion.img   src={ogLogo} alt="logo here"  animate={rollAnimation} />
        </Link>
      </div>
      {!isLoggedIn ? (
      <div className="flex flex-row justify-end mt-0">
        <div className="flex flex-row justify-end w-80 gap-4">
          <div
            className={location.pathname === "/login" ? "display-hidden" : "mt-2 hover:text-green"}
          >
            <NavLink to={LOGIN} >Log In</NavLink>
          </div>
          <Button
            to={SIGNUP}
            variant="full"
            className={
              location.pathname === "/auth/register"
                ? "hidden"
                : "bg-yellow text-black border border-black-200 hover:bg-black-100 hover:text-white rounded-full mt-0.7"
            }
          >
            Sign Up
          </Button>
        </div>
      </div>) : <>
      <div
            className={!isLoggedIn  ? "display-hidden" : "color-white text-white mt-2 hover:text-red"}
          >
        <TesLogout size={32} color ="white" onClick ={handleLogout} className="hidden md:block color-white" />
          </div></>
            }
            <div className="flex items-center lg:hidden">
            <Menu toggle={toggle} />
          </div>
    </div>
    <AnimatePresence>{open && <Drawer open={open} />}</AnimatePresence>
    </motion.div>
  );
};

export default Navbar;
