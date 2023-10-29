import "./Home.css";
import mainImage from "../../assets/main-image.png";

import Marquee from "../../components/Marquee/Marquee";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const transition = { duration: 0.65, ease: [0.43, 0.13, 0.23, 0.96] };

const Home = () => {
  return (
    <main className="main-wrapper h-screen w-screen flex flex-col justify-center items-center overflow-hidden">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute top-0 mt-12 text-center"
      >
        <p>To the girl more beautiful than a flower</p>
        <p>Tania 🌻</p>
      </motion.div>
      {/* Mobile */}
      <div
        className="w-48 md:w-72 overflow-hidden rounded-xl md:hidden"
      >
        <motion.img
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          whileHover={{ scale: 1.1 }}
          transition={transition}
          src={mainImage}
          alt="Birthday person"
          className="select-none cursor-pointer rounded-xl"
        />
      </div>
      {/* Mobile */}
      <div
        className="w-48 md:w-72 overflow-hidden rounded-xl hidden md:block"
      >
        <motion.img
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          whileHover={{ scale: 1.1 }}
          transition={transition}
          src={mainImage}
          alt="Birthday person"
          className="select-none cursor-pointer rounded-xl"
        />
      </div>
      <Marquee
        transition={{ ...transition }}
        message="Happy Birthday."
        small={false}
      />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute bottom-0 mb-12 text-center"
      >
        <Link to={"/wishes"} className="hover:underline">
          Surprise here 🎁
        </Link>
      </motion.div>
    </main>
  );
};

export default Home;
