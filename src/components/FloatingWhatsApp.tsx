import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { WhatsAppIcon } from "./WhatsAppIcon";
import { waLink } from "../lib/data";

/** Botão flutuante de WhatsApp — o mesmo recurso que entrego nos projetos. */
export function FloatingWhatsApp() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.a
          href={waLink()}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Conversar no WhatsApp"
          initial={{ opacity: 0, scale: 0.6, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 12 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.94 }}
          className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-copper-500 text-forest-950 shadow-xl shadow-copper-600/40"
        >
          <WhatsAppIcon className="h-7 w-7" />
        </motion.a>
      )}
    </AnimatePresence>
  );
}
