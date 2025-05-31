"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Eye, EyeOff, User, Camera, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { cn } from "@/lib/utils"

export default function RegisterPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    role: "subscriber", // Default role
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleRoleChange = (value: string) => {
    setFormData((prev) => ({ ...prev, role: value }))
  }

  const handleNextStep = () => {
    setStep(step + 1)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // In a real app, you would send the data to your backend
    console.log("Registration data:", formData)

    // Redirect to the appropriate page based on role
    if (formData.role === "model") {
      router.push("/dashboard/verification")
    } else {
      router.push("/dashboard")
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-zinc-900 to-zinc-950">
      <header className="py-6 px-4 border-b border-zinc-800">
        <div className="container mx-auto">
          <Link href="/" className="text-2xl font-bold">
            <span className="text-primary">Fans</span>be
          </Link>
        </div>
      </header>

      <main className="flex-grow flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <div className="bg-zinc-800 rounded-lg shadow-xl border border-zinc-700 overflow-hidden">
            <div className="p-6">
              <h1 className="text-2xl font-bold mb-1">Create your account</h1>
              <p className="text-white/60 mb-6">Join Fansbe to connect with creators and fans</p>

              <form onSubmit={handleSubmit}>
                {step === 1 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-4"
                  >
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        placeholder="your@email.com"
                        className="bg-zinc-700 border-zinc-600"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="username">Username</Label>
                      <Input
                        id="username"
                        name="username"
                        type="text"
                        value={formData.username}
                        onChange={handleInputChange}
                        required
                        placeholder="Choose a unique username"
                        className="bg-zinc-700 border-zinc-600"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="password">Password</Label>
                      <div className="relative">
                        <Input
                          id="password"
                          name="password"
                          type={showPassword ? "text" : "password"}
                          value={formData.password}
                          onChange={handleInputChange}
                          required
                          placeholder="Create a strong password"
                          className="bg-zinc-700 border-zinc-600 pr-10"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute inset-y-0 right-0 pr-3 flex items-center text-white/50 hover:text-white"
                        >
                          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                      </div>
                    </div>

                    <Button type="button" onClick={handleNextStep} className="w-full bg-primary hover:bg-primary/90">
                      Continue
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>

                    <div className="text-center mt-4">
                      <p className="text-white/60 text-sm">
                        Already have an account?{" "}
                        <Link href="/login" className="text-primary hover:underline">
                          Sign in
                        </Link>
                      </p>
                    </div>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <div>
                      <h2 className="text-lg font-medium mb-4">I want to join Fansbe as a:</h2>

                      <RadioGroup value={formData.role} onValueChange={handleRoleChange} className="space-y-4">
                        <div
                          className={cn(
                            "flex items-center space-x-3 rounded-lg border p-4 cursor-pointer transition-colors",
                            formData.role === "subscriber"
                              ? "border-primary bg-primary/10"
                              : "border-zinc-700 bg-zinc-700/50 hover:bg-zinc-700",
                          )}
                          onClick={() => handleRoleChange("subscriber")}
                        >
                          <RadioGroupItem value="subscriber" id="subscriber" className="text-primary" />
                          <Label htmlFor="subscriber" className="flex-1 cursor-pointer">
                            <div className="flex items-center">
                              <User className="h-5 w-5 mr-2 text-primary" />
                              <div>
                                <div className="font-medium">Subscriber</div>
                                <div className="text-sm text-white/60">I want to follow and support creators</div>
                              </div>
                            </div>
                          </Label>
                        </div>

                        <div
                          className={cn(
                            "flex items-center space-x-3 rounded-lg border p-4 cursor-pointer transition-colors",
                            formData.role === "model"
                              ? "border-primary bg-primary/10"
                              : "border-zinc-700 bg-zinc-700/50 hover:bg-zinc-700",
                          )}
                          onClick={() => handleRoleChange("model")}
                        >
                          <RadioGroupItem value="model" id="model" className="text-primary" />
                          <Label htmlFor="model" className="flex-1 cursor-pointer">
                            <div className="flex items-center">
                              <Camera className="h-5 w-5 mr-2 text-primary" />
                              <div>
                                <div className="font-medium">Content Creator</div>
                                <div className="text-sm text-white/60">I want to create and share content</div>
                              </div>
                            </div>
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>

                    {formData.role === "model" && (
                      <div className="rounded-lg bg-zinc-700/50 p-4 text-sm">
                        <p className="text-white/80">
                          <strong>Note:</strong> As a content creator, you'll need to verify your identity before you
                          can start posting content.
                        </p>
                      </div>
                    )}

                    <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
                      Create Account
                    </Button>

                    <div className="text-center">
                      <button
                        type="button"
                        onClick={() => setStep(1)}
                        className="text-white/60 hover:text-white text-sm"
                      >
                        Back to previous step
                      </button>
                    </div>
                  </motion.div>
                )}
              </form>
            </div>

            <div className="px-6 py-4 bg-zinc-900 border-t border-zinc-700 text-xs text-white/60">
              By creating an account, you agree to our{" "}
              <Link href="/terms" className="text-primary hover:underline">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link href="/privacy" className="text-primary hover:underline">
                Privacy Policy
              </Link>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  )
}
