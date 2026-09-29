"use client";

import React from "react";
import { SocialCloud } from "@/components/ui/footer-section-1-utils/social-cloud";
import { motion, Variants, useReducedMotion } from "motion/react";

export const SolaceUILogo = ({ className }: { className?: string }) => {
  return (
    <svg
      className={className}
      width="64"
      height="38"
      viewBox="0 0 64 38"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0 20.1032L39.8387 20.1032C44.7808 20.1032 48.7871 24.1095 48.7871 29.0516C48.7871 33.9937 44.7808 38 39.8387 38L1.56459e-06 38L0 20.1032Z"
        fill="currentColor"
      />
      <path
        d="M63.4968 17.8968L23.6581 17.8968C18.716 17.8968 14.7097 13.8904 14.7097 8.94839C14.7097 4.00633 18.716 0 23.6581 0L63.4968 0V17.8968Z"
        fill="currentColor"
      />
    </svg>
  );
};

export interface FooterNavItem {
  label: string;
  href: string;
}

export interface Footer1Props {
  className?: string;
  logo?: React.ReactNode;
  navItems?: (string | FooterNavItem)[];
  copyrightText?: string;
  brandName?: string;
}

const defaultNavLinks = [
  "Products",
  "Solution",
  "Company",
  "About",
  "Blog",
  "Terms",
];

export default function Footer1({
  className = "",
  logo,
  navItems = defaultNavLinks,
  copyrightText,
  brandName = "SolaceUI",
}: Footer1Props) {
  const shouldReduceMotion = useReducedMotion();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20,
      },
    },
  };

  return (
    <footer className={`w-full py-12 bg-background text-foreground overflow-hidden ${className}`}>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "0px 0px -80px 0px" }}
        variants={containerVariants}
        className="container mx-auto px-4 flex flex-col items-center gap-8 sm:gap-10 mb-10 sm:mb-12"
      >
        {/* Logo */}
        <motion.div variants={itemVariants} className="flex justify-center">
          {logo || <SolaceUILogo className="h-9 sm:h-10 w-auto text-foreground" />}
        </motion.div>

        {/* Navigation Links */}
        <motion.nav
          variants={itemVariants}
          aria-label="Footer Navigation"
          className="flex flex-wrap justify-center gap-x-6 sm:gap-x-8 gap-y-3 sm:gap-y-4 text-sm sm:text-base font-medium relative z-10"
        >
          {navItems.map((item) => {
            const label = typeof item === "string" ? item : item.label;
            const href = typeof item === "string" ? "#" : item.href;

            return (
              <motion.a
                key={label}
                href={href}
                className="relative px-2.5 py-1 group rounded-md outline-hidden focus-visible:ring-2 focus-visible:ring-zinc-400"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10 group-hover:text-foreground text-zinc-600 dark:text-zinc-400 transition-colors duration-200">
                  {label}
                </span>
                <motion.span
                  className="absolute inset-0 bg-accent rounded-md -z-0 origin-center"
                  initial={{ scale: 0, opacity: 0 }}
                  whileHover={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                />
              </motion.a>
            );
          })}
        </motion.nav>

        {/* Improvised Social Cloud with Continuous Looping Physics */}
        <motion.div variants={itemVariants} className="w-full flex justify-center">
          <SocialCloud className="text-foreground" />
        </motion.div>
      </motion.div>

      {/* Continuously Looping Conveyor Divider (Infinite Seamless Loop) */}
      <motion.div
        aria-hidden="true"
        className="w-full h-10 sm:h-12 border-y border-foreground/10 opacity-20 bg-[repeating-linear-gradient(315deg,currentColor_0,currentColor_1px,transparent_0,transparent_50%)]"
        style={{ backgroundSize: "20px 20px" }}
        animate={
          shouldReduceMotion
            ? { backgroundPositionX: "0px" }
            : { backgroundPositionX: ["0px", "40px"] }
        }
        transition={{
          ease: "linear",
          duration: 3,
          repeat: Infinity,
        }}
      />

      {/* Copyright */}
      <motion.div
        className="container mx-auto px-4 mt-6 sm:mt-8 text-center text-xs sm:text-sm text-muted-foreground"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={itemVariants}
      >
        <p>
          &copy; {new Date().getFullYear()} {copyrightText || `${brandName}, All rights reserved.`}
        </p>
      </motion.div>
    </footer>
  );
}

export { Footer1 };
