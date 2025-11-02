import { useState, useEffect } from 'react' 
import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'
import { Link } from 'react-router'

interface NavbarLogoProps {
  logoUrl: string
}

export default function NavbarLogo({ logoUrl }: NavbarLogoProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null // Prevent SSR issues with animations
  }

  return (
    <Link
      to="/"
      className="flex items-center   transition-all duration-300 ease-in-out transform hover:scale-105"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative">
        <motion.img
          src={logoUrl}
          alt=" Logo"
          width={48}
          height={48}
          className="rounded-full border-2 border-none"
          initial={{ rotate: 0 }}
          animate={{ rotate: isHovered ? 360 : 0 }}
          transition={{ duration: 0.5 }}
        />
        {isHovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="absolute -top-1 -right-1"
          >
            <Sparkles className="w-6 h-6 text-blue-700" />
          </motion.div>
        )}
      </div>
      <div className=" flex flex-col   ">
        <motion.span
          className="md:text-2xl text-base  font-bold text-primary tracking-tight"
          style={{ fontFamily: 'Montagu Slab, serif' }}
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          
        >
          {import.meta.env['VITE_SITE_NAME']}
        </motion.span>
        
      </div>
    </Link>
  )
}