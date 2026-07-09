import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'urbanist': ['var(--font-urbanist)', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      colors: {
        // PALETA FORMAL Y ELEGANTE
        primary: "#AF7E44",       // Dorado/café elegante (botones principales, acentos)
        secondary: "#6A806C",     // Negro suave (texto principal, elementos importantes)
        accent: "#D4AF37",        // Dorado brillante (detalles premium)
        cream: "#FFFFFF",         // Blanco puro (fondo principal)
        
        // GRISES ELEGANTES
        gray: {
          50: "#F9FAFB",         // Gris muy claro (fondos alternativos)
          100: "#F3F4F6",        // Gris claro (cards, secciones)
          200: "#E5E7EB",        // Gris suave (bordes)
          300: "#D1D5DB",        // Gris medio claro
          400: "#9CA3AF",        // Gris medio
          500: "#6B7280",        // Gris (texto secundario)
          600: "#4B5563",        // Gris oscuro
          700: "#374151",        // Gris muy oscuro
          800: "#1F2937",        // Casi negro
          900: "#111827",        // Negro profundo
        },
        
        // COLORES FUNCIONALES
        textblanco: "#FFFFFF",    // Blanco puro
        textprimario: "#1F2937",  // Gris muy oscuro (mejor contraste)
        textsecundario: "#6B7280", // Gris medio (texto secundario)
        
        // COLORES DE SISTEMA
        darkBg: "#1F2937",        // Fondo oscuro elegante
        border: "#E5E7EB",        // Bordes sutiles
        success: "#10B981",       // Éxito
        warning: "#F59E0B",       // Advertencia
        error: "#EF4444",         // Error
      },
      backgroundImage: {
        // GRADIENTES ELEGANTES Y FORMALES
        "gradient-primary": "linear-gradient(135deg, #AF7E44 0%, #D4AF37 100%)",
        "gradient-secondary": "linear-gradient(135deg, #3f3d38 0%, #1F2937 100%)",
        "gradient-elegant": "linear-gradient(135deg, #FFFFFF 0%, #F9FAFB 100%)",
        "gradient-gold": "linear-gradient(135deg, #6A806C 0%, #AF7E44 100%)",
        "gradient-subtle": "linear-gradient(180deg, #FFFFFF 0%, #F3F4F6 100%)",
      },
      screens: {
        'xs': '320px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
        'landscape': {'raw': '(orientation: landscape)'},
        'portrait': {'raw': '(orientation: portrait)'},
        'h-sm': {'raw': '(max-height: 640px)'},
        'h-md': {'raw': '(max-height: 768px)'},
        'retina': {'raw': '(-webkit-min-device-pixel-ratio: 2)'},
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '92': '23rem',
        '100': '25rem',
        '104': '26rem',
        '108': '27rem',
        '112': '28rem',
        '116': '29rem',
        '120': '30rem',
      },
      fontSize: {
        'xs-mobile': ['0.875rem', { lineHeight: '1.25rem' }],
        'sm-mobile': ['1rem', { lineHeight: '1.5rem' }],
        'base-mobile': ['1.125rem', { lineHeight: '1.75rem' }],
        'lg-mobile': ['1.25rem', { lineHeight: '1.875rem' }],
        'xl-mobile': ['1.375rem', { lineHeight: '2rem' }],
        '2xl-mobile': ['1.5rem', { lineHeight: '2.25rem' }],
        '3xl-mobile': ['1.875rem', { lineHeight: '2.5rem' }],
        '4xl-mobile': ['2.25rem', { lineHeight: '2.75rem' }],
        '5xl-mobile': ['2.75rem', { lineHeight: '3.25rem' }],
        '6xl-mobile': ['3.25rem', { lineHeight: '3.75rem' }],
        'hero-mobile': ['3.5rem', { lineHeight: '4rem' }],
        'hero-sm': ['4rem', { lineHeight: '4.5rem' }],
        'hero-md': ['4.5rem', { lineHeight: '5rem' }],
        'hero-lg': ['5rem', { lineHeight: '5.5rem' }],
      },
      maxWidth: {
        'xs': '20rem',
        'sm-mobile': '24rem',
        'mobile': '28rem',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
        '6xl': '3rem',
      },
      boxShadow: {
        'mobile': '0 2px 8px -2px rgba(0, 0, 0, 0.1)',
        'mobile-lg': '0 4px 16px -4px rgba(0, 0, 0, 0.15)',
        'mobile-xl': '0 8px 32px -8px rgba(0, 0, 0, 0.2)',
        'mobile-inner': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
        // SOMBRAS ELEGANTES
        'elegant': '0 4px 20px -4px rgba(31, 41, 55, 0.1)',
        'elegant-lg': '0 8px 30px -8px rgba(31, 41, 55, 0.15)',
        'primary': '0 4px 16px -4px rgba(175, 126, 68, 0.25)',
        'gold': '0 4px 20px -4px rgba(212, 175, 55, 0.3)',
      },
      animation: {
        'bounce-mobile': 'bounce 1.5s infinite',
        'pulse-mobile': 'pulse 2.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-mobile': 'spin 2s linear infinite',
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      zIndex: {
        '60': '60',
        '70': '70',
        '80': '80',
        '90': '90',
        '100': '100',
      },
      aspectRatio: {
        '4/3': '4 / 3',
        '3/2': '3 / 2',
        '2/3': '2 / 3',
        '9/16': '9 / 16',
      },
      backdropBlur: {
        'xs': '2px',
        '4xl': '72px',
        '5xl': '96px',
      },
    },
  },
  plugins: [
    function({ addUtilities }: { addUtilities: any }) {
      const newUtilities = {
        // TOUCH TARGETS
        '.touch-target': {
          minHeight: '48px',
          minWidth: '48px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        },
        '.touch-target-lg': {
          minHeight: '56px',
          minWidth: '56px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        },
        
        // MOBILE OPTIMIZATIONS
        '.no-zoom': {
          fontSize: '16px !important',
          WebkitTextSizeAdjust: '100%',
          MozTextSizeAdjust: '100%',
          MsTextSizeAdjust: '100%',
          textSizeAdjust: '100%',
        },
        '.scroll-smooth-mobile': {
          scrollBehavior: 'smooth',
          WebkitOverflowScrolling: 'touch',
        },
        '.no-select': {
          WebkitUserSelect: 'none',
          MozUserSelect: 'none',
          MsUserSelect: 'none',
          userSelect: 'none',
        },
        '.gpu-boost': {
          transform: 'translate3d(0, 0, 0)',
          WebkitBackfaceVisibility: 'hidden',
          backfaceVisibility: 'hidden',
          WebkitPerspective: '1000',
          perspective: '1000',
        },
        
        // POSITIONING
        '.center-absolute': {
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        },
        
        // GLASS EFFECT ELEGANTE
        '.glass-effect': {
          backgroundColor: 'rgba(255, 255, 255, 0.7)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(229, 231, 235, 0.5)',
          boxShadow: '0 8px 32px -8px rgba(31, 41, 55, 0.1)',
        },
        
        '.glass-dark': {
          backgroundColor: 'rgba(31, 41, 55, 0.7)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(75, 85, 99, 0.3)',
          boxShadow: '0 8px 32px -8px rgba(0, 0, 0, 0.3)',
        },
        
        // SAFE AREAS
        '.safe-top': {
          paddingTop: 'max(1rem, env(safe-area-inset-top))',
        },
        '.safe-bottom': {
          paddingBottom: 'max(1rem, env(safe-area-inset-bottom))',
        },
        '.safe-left': {
          paddingLeft: 'max(1rem, env(safe-area-inset-left))',
        },
        '.safe-right': {
          paddingRight: 'max(1rem, env(safe-area-inset-right))',
        },
        '.safe-all': {
          padding: 'max(1rem, env(safe-area-inset-top)) max(1rem, env(safe-area-inset-right)) max(1rem, env(safe-area-inset-bottom)) max(1rem, env(safe-area-inset-left))',
        },
        
        // CONTAINER RESPONSIVO
        '.container-responsive': {
          width: '100%',
          maxWidth: '1280px',
          paddingLeft: '1rem',
          paddingRight: '1rem',
          marginLeft: 'auto',
          marginRight: 'auto',
          '@media (min-width: 640px)': {
            paddingLeft: '1.5rem',
            paddingRight: '1.5rem',
          },
          '@media (min-width: 1024px)': {
            paddingLeft: '2rem',
            paddingRight: '2rem',
          },
        },
      }
      
      addUtilities(newUtilities)
    }
  ],
};

export default config;
