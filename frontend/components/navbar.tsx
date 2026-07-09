'use client';
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { itemsNavbar } from "@/data";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { cloneElement } from "react";

const fadeIn = (position: "right" | "bottom") => {
  return {
    hidden: {
      y: position === "bottom" ? 80 : 0,
      x: position === "right" ? 80 : 0,
      opacity: 0,
    },
    visible: {
      y: 0,
      x: 0,
      opacity: 1,
      transition: {
        type: "tween",
        duration: 1.2,
        delay: 0.3,
        ease: [0.25, 0.25, 0.25, 0.75],
      },
    },
  };
};

const Navbar = () => {
  const [mounted, setMounted] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const pathname = usePathname();
  const timeoutRefs = useRef<Map<string, NodeJS.Timeout>>(new Map());

  useEffect(() => {
    setMounted(true);
    
    const getWindowWidth = () => {
      if (typeof window !== 'undefined') {
        return window.innerWidth;
      }
      return 0;
    };

    setWindowWidth(getWindowWidth());

    const handleResize = () => {
      setWindowWidth(getWindowWidth());
    };

    if (typeof window !== 'undefined') {
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  useEffect(() => {
    return () => {
      timeoutRefs.current.forEach(timeout => clearTimeout(timeout));
      timeoutRefs.current.clear();
    };
  }, []);

  if (!mounted) return null;

  const isSmallMobile = windowWidth < 400;
  const isMobile = windowWidth < 768;
  const isTablet = windowWidth < 1024;

  // Si es móvil o tablet, navbar fijo SIN animación - SIEMPRE VISIBLE
  if (isMobile || isTablet) {
    return (
      <nav
        style={{
          position: 'fixed',
          top: '80px',
          left: 0,
          right: 0,
          zIndex: 9998,
          backgroundColor: 'rgba(255, 255, 255, 0.98)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          boxShadow: '0 2px 20px rgba(0, 0, 0, 0.08)',
          borderBottom: '1px solid rgba(0, 0, 0, 0.05)',
        }}
      >
        <div
          style={{
            maxWidth: '100%',
            margin: '0 auto',
            padding: '0 8px',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: isSmallMobile ? '2px' : '4px',
              height: '56px',
            }}
          >
            {itemsNavbar.map((item) => (
              <Link href={item.link} key={item.id}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: isSmallMobile ? '3px' : '4px',
                    fontSize: isSmallMobile ? '10px' : '12px',
                    fontWeight: '500',
                    color: pathname === item.link ? '#6A806C' : '#4A4A4A',
                    cursor: 'pointer',
                    letterSpacing: '0.2px',
                    transition: 'all 0.3s ease',
                    padding: isSmallMobile ? '6px 4px' : '8px 8px',
                    borderRadius: '10px',
                    backgroundColor: pathname === item.link ? 'rgba(106, 128, 108, 0.1)' : 'transparent',
                    whiteSpace: 'nowrap',
                  }}
                >
                  <div 
                    style={{ 
                      fontSize: isSmallMobile ? '16px' : '18px',
                      display: 'flex', 
                      alignItems: 'center',
                      flexShrink: 0,
                    }}
                  >
                    {cloneElement(item.icon as React.ReactElement, { 
                      color: pathname === item.link ? '#6A806C' : '#6A806C',
                      size: isSmallMobile ? 16 : 18
                    })}
                  </div>
                  {item.title && (
                    <span style={{ 
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      maxWidth: isSmallMobile ? '60px' : '80px',
                    }}>{item.title}</span>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </nav>
    );
  }

  // Para desktop, mostrar navbar horizontal CON animación
  return (
    <AnimatePresence mode="wait">
      <motion.nav
        key={pathname}
        variants={fadeIn("bottom")}
        initial="hidden"
        animate="visible"
        exit="hidden"
        style={{
          position: 'fixed',
          top: '110px',
          left: 0,
          right: 0,
          zIndex: 9998,
          backgroundColor: 'rgba(255, 255, 255, 0.98)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          boxShadow: '0 2px 20px rgba(0, 0, 0, 0.08)',
          borderBottom: '1px solid rgba(0, 0, 0, 0.05)',
        }}
      >
        <div
          style={{
            maxWidth: '1400px',
            margin: '0 auto',
            padding: '0 32px',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '40px',
              height: '64px',
            }}
          >
            {itemsNavbar.map((item) => (
              <div
                key={item.id}
                style={{ position: 'relative' }}
                onMouseEnter={() => setOpenDropdown(String(item.id))}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <Link href={item.link}>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      fontSize: '15px',
                      fontWeight: '500',
                      color: pathname === item.link ? '#6A806C' : '#4A4A4A',
                      cursor: 'pointer',
                      letterSpacing: '0.3px',
                      transition: 'all 0.3s ease',
                      padding: '12px 16px',
                      borderRadius: '12px',
                      backgroundColor: pathname === item.link ? 'rgba(106, 128, 108, 0.1)' : 'transparent',
                    }}
                    onMouseEnter={(e) => {
                      if (pathname !== item.link) {
                        e.currentTarget.style.color = '#6A806C';
                        e.currentTarget.style.backgroundColor = 'rgba(106, 128, 108, 0.05)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (pathname !== item.link) {
                        e.currentTarget.style.color = '#4A4A4A';
                        e.currentTarget.style.backgroundColor = 'transparent';
                      }
                    }}
                  >
                    <div 
                      style={{ 
                        fontSize: '20px', 
                        display: 'flex', 
                        alignItems: 'center',
                      }}
                    >
                      {cloneElement(item.icon as React.ReactElement, { 
                        color: pathname === item.link ? '#6A806C' : '#6A806C'
                      })}
                    </div>
                    {item.title && (
                      <span>{item.title}</span>
                    )}
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </motion.nav>
    </AnimatePresence>
  );
};

export default Navbar;
