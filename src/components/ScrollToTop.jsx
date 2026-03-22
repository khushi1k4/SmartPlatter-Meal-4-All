import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

const ScrollToTop = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show after 1/2 screen height
      if (window.scrollY > window.innerHeight*0.5) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-6 right-6 z-50 
      bg-white hover:bg-green-200 border border-3 border-green-900
      text-green-800 p-2 rounded-full shadow-lg 
      transition-all duration-300 
      ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5 pointer-events-none"}`}
    >
      <ArrowUp size={20} />
    </button>
  );
};

export default ScrollToTop;