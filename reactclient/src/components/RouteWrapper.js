import React from 'react';
import { Outlet, useLocation } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import { AnimatePresence, motion } from "framer-motion";
import '../App.css'

export default function RouteWrapper() {
	// let location = useLocation();
	// match = true;

	// return <CSSTransition in={match != null} classNames="page" timeout={1000} unmountOnExit>
	// 	{ component }
	// </CSSTransition>
	return <motion.div
	initial="initial"
	animate="in"
	exit="out"
	variants={{
	  initial: {
		opacity: 0
	  },
	  in: {
		opacity: 1
	  },
	  out: {
		opacity: 0
	  }
	}}
	transition={{
	  type: "spring",
	  damping: 10,
	  stiffness: 50
	}}
  >
	<Outlet />
  </motion.div>
}