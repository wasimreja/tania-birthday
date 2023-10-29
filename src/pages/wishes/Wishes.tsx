import "./Wishes.css";

import { useNavigate, useParams } from "react-router-dom";

import { motion } from "framer-motion";
import { usePalette } from "@roylee1997/react-palette";

import Progress from "../../components/Progress/Progress";
import MusicCard from "../../components/MusicCard/MusicCard";
import TMessagesData from "../../typings/MessagesData";

// albumArts
import firstAlbumArt from "../../assets/albumArts/walk-with-me.png";
import secondAlbumArt from "../../assets/albumArts/cold-mess.png";

// musicFilePaths
import firstMusic from "../../assets/music/walk-with-me.wav";
import secondMusic from "../../assets/music/cold-mess.wav";

// framer transition and variants
const commonTransition = {
  ease: [0.43, 0.13, 0.23, 0.96],
  duration: 0.5,
};

const messageContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
      ease: [0.43, 0.13, 0.23, 0.96],
      duration: 0.5,
    },
  },
};

const messages = {
  hidden: { opacity: 0 },
  show: { opacity: 1 },
};

const sampleMessagesDataArray: TMessagesData[] = [
  {
    albumArt: firstAlbumArt,
    musicName: "Walk With Me - Taba Chake",
    messageInParas: [
      "Tania, Happy Birthday, beautiful soul.",
      "Another year older, and you're still as dazzling as ever. May your day be filled with giggles, sweet treats and endless joy. Just like cupcake with sprinkles, your presence adds a sprinkle of happiness to my life.",
      "You possesses unparalleled beauty, a caring nature and pure innocence. You embodies every aspect of perfection that I could ever dream of. You’ve known me for so long now that you always know when I’m having an off day. Instead of telling me what I want to hear, you tell me what I need to hear. Thank you for being the balance to the emotional mess that I'm sometimes.",
      "Keep shining, and may this year bring you more adventures, laughter, and all the cute moments you deserve.",
    ],
    musicFilePath: firstMusic,
  },
  {
    albumArt: secondAlbumArt,
    musicName: "cold/mess - Prateek Kuhad",
    messageInParas: [
      "Dearest Tania,",
      "As I sit down to write this letter, my heart races with both excitement and trepidation. From the very first moment I saw you, a whirlwind of emotions engulfed me. You're so bubbly, constantly smiling and talking brightly. You've this incredible ability to make my day brighter with just a call. Your voice is that “sajda savera” part from ‘Kun Faya Kun’, and I can listen to it all day.",
      "I want you to know that my affection for you is unwavering. My heart skips a beat every time I think of you, and I can't help but imagine a future where we might be together, sharing our dreams, and making beautiful memories.",
      "I hope this letter conveys the depth of my feelings for you. It's not easy for me to express such vulnerability, but you're worth every word.",
    ],
    musicFilePath: secondMusic,
  },
];

const Wishes = () => {
  const navigate = useNavigate();
  const { id = 0 } = useParams();

  if (Number(id) < 0 || sampleMessagesDataArray[Number(id)] == undefined) {
    return <p>Invalid Wish Message Id</p>;
  }

  const {
    data: colorData,
    loading: colorDataIsLoading,
    error,
  } = usePalette(sampleMessagesDataArray[Number(id)].albumArt);

  if (error) {
    return <h1>Invalid Wish Message Id</h1>;
  }

  return (
    <motion.main
      initial="initial"
      animate="animate"
      exit="exit"
      className="wishes-wrapper h-screen w-screen flex flex-col justify-between items-center"
    >
      <Progress
        primaryColor={colorData?.vibrant}
        secondaryColor={colorData?.darkVibrant}
        messageDataArrayLength={sampleMessagesDataArray.length}
      />
      <motion.div
        className="lg:w-11/12 rounded-t-2xl md:rounded-t-xl flex md:flex-row flex-col-reverse"
        style={{
          backgroundColor: colorDataIsLoading ? "#fff" : colorData?.vibrant,
        }}
        initial={{ y: "1000px" }}
        animate={{ y: "0px" }}
        exit={{ y: "1000px" }}
        transition={commonTransition}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.1}
        onDragEnd={(_, info) => {
          if (info.offset.x > 50) {
            if (Number(id) > 0 && Number(id) < sampleMessagesDataArray.length) {
              navigate(`/wishes/${Number(id) - 1}`);
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              });
            }
          } else if (info.offset.x < -50) {
            if (
              Number(id) >= 0 &&
              Number(id) < sampleMessagesDataArray.length - 1
            ) {
              navigate(`/wishes/${Number(id) + 1}`);
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              });
            }
          } else {
            console.log(null);
          }
        }}
      >
        <motion.div
          className="md:w-1/2"
          initial="hidden"
          animate="show"
          variants={messageContainer}
        >
          {sampleMessagesDataArray[Number(id)].messageInParas.map(
            (eachPara, index) => {
              return (
                <motion.p
                  className="p-8 message text-3xl"
                  variants={messages}
                  key={index + 2045}
                >
                  {eachPara}
                </motion.p>
              );
            }
          )}
        </motion.div>
        <div className="md:w-1/2 h-1/2 md:h-auto flex justify-center items-center">
          <MusicCard
            albumArt={sampleMessagesDataArray[Number(id)].albumArt}
            primaryColor={colorData?.vibrant}
            musicName={sampleMessagesDataArray[Number(id)].musicName}
            musicFilePath={sampleMessagesDataArray[Number(id)].musicFilePath}
          />
        </div>
      </motion.div>
    </motion.main>
  );
};

export default Wishes;
