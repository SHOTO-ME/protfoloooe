"use client"

import { useRef } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Download, CheckCircle } from "lucide-react"

export default function HeroAnimation() {
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <motion.div
      ref={containerRef}
      className="relative h-[400px] md:h-[500px] w-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="absolute top-0 left-0 w-full h-full">
        <motion.div
          className="absolute top-[10%] left-[10%] z-10 shadow-xl rounded-lg overflow-hidden"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <Image
            src="/placeholder.svg?height=300&width=250"
            alt="Resume Preview"
            width={250}
            height={300}
            className="object-cover"
          />
        </motion.div>

        <motion.div
          className="absolute top-[5%] right-[15%] z-20 shadow-xl rounded-lg overflow-hidden"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <Image
            src="/placeholder.svg?height=280&width=220"
            alt="Portfolio Preview"
            width={220}
            height={280}
            className="object-cover"
          />
        </motion.div>

        <motion.div
          className="absolute bottom-[15%] right-[10%] z-30 shadow-xl rounded-lg overflow-hidden"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
        >
          <Image
            src="/placeholder.svg?height=250&width=200"
            alt="Mobile Preview"
            width={200}
            height={250}
            className="object-cover"
          />
        </motion.div>

        {/* Floating elements */}
        <motion.div
          className="absolute top-[40%] left-[30%] z-40 bg-emerald-500 text-white p-3 rounded-lg shadow-lg"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.9, duration: 0.5 }}
        >
          <Download className="h-6 w-6" />
        </motion.div>

        <motion.div
          className="absolute bottom-[30%] left-[20%] z-40 bg-white p-3 rounded-lg shadow-lg"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.1, duration: 0.5 }}
        >
          <CheckCircle className="h-6 w-6 text-emerald-500" />
        </motion.div>
      </div>
    </motion.div>
  )
}
