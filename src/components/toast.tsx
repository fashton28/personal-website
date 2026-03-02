"use client";

import * as React from "react";
import { Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { IOSpinner } from "./spinner";

interface ToastProps {
  state: "initial" | "loading" | "success";
  onReset?: () => void;
  onSave?: () => void;
}

const InfoIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 18 18"
    className="text-white"
    aria-hidden
  >
    <title>circle-info</title>
    <g fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" stroke="currentColor">
      <circle cx="9" cy="9" r="7.25" />
      <line x1="9" y1="12.819" x2="9" y2="8.25" />
      <path
        d="M9,6.75c-.552,0-1-.449-1-1s.448-1,1-1,1,.449,1,1-.448,1-1,1Z"
        fill="currentColor"
        stroke="none"
      />
    </g>
  </svg>
);

const springConfig = {
  type: "spring" as const,
  stiffness: 500,
  damping: 30,
  mass: 1
};

export function Toast({ state = "initial", onReset, onSave }: ToastProps) {
  const commonClasses =
    "h-10 bg-[#131316] rounded-[99px] shadow-[0px_32px_64px_-16px_rgba(0,0,0,0.30)] shadow-[0px_16px_32px_-8px_rgba(0,0,0,0.30)] shadow-[0px_8px_16px_-4px_rgba(0,0,0,0.24)] shadow-[0px_4px_8px_-2px_rgba(0,0,0,0.24)] shadow-[0px_-8px_16px_-1px_rgba(0,0,0,0.16)] shadow-[0px_2px_4px_-1px_rgba(0,0,0,0.24)] shadow-[0px_0px_0px_1px_rgba(0,0,0,1.00)] shadow-[inset_0px_0px_0px_1px_rgba(255,255,255,0.08)] shadow-[inset_0px_1px_0px_0px_rgba(255,255,255,0.20)] justify-center items-center inline-flex overflow-hidden";

  return (
    <motion.div
      className={commonClasses}
      initial={false}
      animate={{ width: "auto" }}
      transition={springConfig}
    >
      <div className="flex h-full items-center justify-between px-3">
        <AnimatePresence mode="wait">
          <motion.div
            key={state}
            className="flex items-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0 }}
          >
            {state === "loading" && (
              <>
                <IOSpinner />
                <div className="whitespace-nowrap text-[13px] font-normal leading-tight text-white">
                  Saving
                </div>
              </>
            )}
            {state === "success" && (
              <>
                <div className="flex items-center justify-center gap-1.5 overflow-hidden rounded-[99px] border border-white/25 bg-white/25 p-0.5 shadow-[0px_2px_4px_-1px_rgba(0,0,0,0.06)] shadow-[0px_1px_2px_-0.5px_rgba(0,0,0,0.06)] shadow-[0px_0px_0px_1px_rgba(0,0,0,0.16)]">
                  <Check className="h-3.5 w-3.5 text-white" />
                </div>
                <div className="whitespace-nowrap text-[13px] font-normal leading-tight text-white">
                  Changes Saved
                </div>
              </>
            )}
            {state === "initial" && (
              <>
                <InfoIcon />
                <div className="whitespace-nowrap text-[13px] font-normal leading-tight text-white">
                  Unsaved changes
                </div>
              </>
            )}
          </motion.div>
        </AnimatePresence>
        <AnimatePresence>
          {state === "initial" && (
            <motion.div
              className="ml-2 flex items-center gap-2"
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: "auto" }}
              exit={{ opacity: 0, width: 0 }}
              transition={{ ...springConfig, opacity: { duration: 0 } }}
            >
              <button
                type="button"
                onClick={onReset}
                className="flex items-center justify-center rounded-[99px] px-3 transition-colors hover:bg-white/[0.08]"
              >
                <div className="text-[13px] font-normal leading-tight text-white">Reset</div>
              </button>
              <button
                type="button"
                onClick={onSave}
                className="inline-flex h-7 items-center justify-center overflow-hidden rounded-[99px] bg-gradient-to-b from-[#7c5aff] to-[#6c47ff] px-3 shadow-[inset_0px_1px_0px_0px_rgba(255,255,255,0.16),0px_1px_2px_0px_rgba(0,0,0,0.20)] transition-all duration-200 hover:from-[#8f71ff] hover:to-[#7c5aff] active:from-[#6c47ff] active:to-[#5835ff]"
              >
                <div className="text-[13px] font-medium leading-tight text-white">Save</div>
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
