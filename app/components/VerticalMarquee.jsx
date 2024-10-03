"use client";

import Image from "next/image";
import React, { useRef, useState, useEffect } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion";

const Logos = [
  { img: "/logo1.svg", title: "Optimism" },
  { img: "/logo2.svg", title: "Base" },
  { img: "/logo3.svg", title: "Solana" },
  { img: "/logo4.svg", title: "Polygon" },
  { img: "/logo5.svg", title: "Ethereum" },
  { img: "/logo6.svg", title: "Cosmos" },
  { img: "/logo7.svg", title: "BNB Smart Chain" },
  { img: "/logo8.svg", title: "Stargaze" },
  { img: "/logo9.svg", title: "ZetaChain Mainnet" },
  { img: "/logo10.svg", title: "Blast Mainnet" },
  { img: "/logo11.svg", title: "Polygon" },
  { img: "/logo12.svg", title: "Arbitrum" },
  { img: "/logo13.svg", title: "Avalanche" },
  { img: "/logo14.svg", title: "Bitcoin" },
  { img: "/logo15.svg", title: "THORChain" },
  { img: "/logo16.svg", title: "Tron" },
];

const Colors = [
  "#fbef93",
  "#fed4e2",
  "#a0c6f5",
  "#e5f3e8",
  "#527156",
  "#fe796f",
  "#ff5d50",
  "#b2d0f6",
  "#e6f3e9",
  "#9ea7a0",
];

export default function Component() {
  const baseVelocity = 40;
  const [marqueeHeight, setMarqueeHeight] = useState(0);
  const marqueeRef = useRef(null);
  const containerRef = useRef(null);
  const movingUp = useRef(false);

  useEffect(() => {
    const updateHeight = () => {
      if (marqueeRef.current) {
        setMarqueeHeight(marqueeRef.current.offsetHeight);
      }
    };
    updateHeight();
    window.addEventListener("resize", updateHeight);
    return () => {
      window.removeEventListener("resize", updateHeight);
    };
  }, []);

  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 200,
  });

  const velocityFactor = useTransform(
    smoothVelocity,
    [-500, 0, 500],
    [10, 0, 10]
  );

  const y = useMotionValue(0);
  const yAbs = useMotionValue(0);

  useAnimationFrame((_, delta) => {
    if (scrollVelocity.get() !== 0 && Math.abs(scrollVelocity.get()) > 100) {
      movingUp.current = scrollVelocity.get() > 0 ? false : true;
    }

    if (marqueeRef.current) {
      let moveBy = baseVelocity * (delta / 1000);

      moveBy *= movingUp.current ? 1 : -1;

      if (velocityFactor.get() !== 0) {
        moveBy += moveBy * velocityFactor.get();
      }

      y.set(y.get() + moveBy);
      yAbs.set(yAbs.get() + moveBy);

      if (y.get() < -marqueeHeight) {
        y.set(marqueeHeight);
      } else if (y.get() > marqueeHeight) {
        y.set(-marqueeHeight);
      }
      if (yAbs.get() < -marqueeHeight * 2) {
        yAbs.set(0);
      } else if (yAbs.get() > 0) {
        yAbs.set(-marqueeHeight * 2);
      }
    }
  });

  const LogoElements = ({ item, index }) => {
    const bgColor = Colors[index % Colors.length];
    const logoRef = useRef(null);

    const yPosition = useTransform(y, (value) => {
      if (!logoRef.current || !containerRef.current) return 0;

      const { top: containerTop } =
        containerRef.current.getBoundingClientRect();

      const { top, height } = logoRef.current.getBoundingClientRect();
      const centerScreenY = window.innerHeight / 2;
      const logoCenterY = top + height / 2;

      const distanceFromCenter = Math.abs(
        logoCenterY - centerScreenY - containerTop
      );

      return distanceFromCenter;
    });

    const x = useTransform(yPosition, [0, marqueeHeight / 2], [0, 330]);

    return (
      <motion.div
        ref={logoRef}
        style={{ x }}
        key={index}
        className="my-3 flex items-center gap-5 h-fit"
      >
        <div
          style={{ background: bgColor }}
          className="w-12 h-12 sm:w-16 sm:h-16 border-2 border-black rounded-full grid place-content-center"
        >
          <Image
            src={item.img}
            alt={item.title}
            width={28}
            height={28}
            className="w-6 sm:w-7"
          />
        </div>
        <h3 className="text-4xl sm:text-5xl font-medium">{item.title}</h3>
      </motion.div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{duration:1,ease:"easeIn"}}
      className="h-screen w-full flex max-sm:flex-col"
    >
      <div className="w-full sm:w-1/2 flex flex-col sm:items-end justify-center px-6 sm:px-12 py-12">
        <div className="flex flex-col items-start justify-center gap-6">
          <h1 className="font-medium text-6xl">
            2,100+ chains.
            <br />
            One wallet.
          </h1>
          <p className="w-[32ch] text-[#5a585a] font-medium text-xl">
            Ctrl Wallet supports millions of assets and NFTs on 2,100+
            blockchains.
          </p>
          <input
            type="text"
            placeholder="Search"
            className="mt-4 bg-[#eee] w-full sm:w-[min(28vw,450px)] focus:bg-white rounded-full py-4 px-8 border-2 border-black text-2xl outline-none"
          />
        </div>
      </div>
      <div className="relative w-full sm:w-1/2 flex justify-start overflow-hidden">
        <div ref={containerRef} className="relative max-sm:-top-[12rem] h-fit">
          <motion.div
            ref={marqueeRef}
            className="px-6 sm:px-12 flex flex-col h-fit items-start justify-center"
            style={{ y }}
          >
            {[...Logos, ...Logos].map((item, index) => {
              return <LogoElements item={item} index={index} key={index} />;
            })}
          </motion.div>
          <motion.div
            className="px-6 sm:px-12 absolute top-full w-full flex flex-col h-full items-start justify-center"
            style={{ y: yAbs }}
          >
            {[...Logos, ...Logos].map((item, index) => {
              return <LogoElements item={item} index={index} key={index} />;
            })}
          </motion.div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background pointer-events-none opacity-70"></div>
      </div>
    </motion.div>
  );
}
