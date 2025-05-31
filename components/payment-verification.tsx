"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { Lock, CreditCard, CheckCircle } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"

export function PaymentVerification() {
  const router = useRouter()
  const [formStep, setFormStep] = useState(0)
  const [isProcessing, setIsProcessing] = useState(false)
  const [formData, setFormData] = useState({
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvv: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "")
    if (value.length > 16) value = value.slice(0, 16)

    // Add spaces every 4 digits
    value = value.replace(/(\d{4})(?=\d)/g, "$1 ")

    setFormData((prev) => ({ ...prev, cardNumber: value }))
  }

  const handleExpiryDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "")
    if (value.length > 4) value = value.slice(0, 4)

    // Format as MM/YY
    if (value.length > 2) {
      value = value.slice(0, 2) + "/" + value.slice(2)
    }

    setFormData((prev) => ({ ...prev, expiryDate: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (formStep === 0) {
      setFormStep(1)
      return
    }

    // Process the payment verification
    setIsProcessing(true)

    // Simulate API call to Segpay
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setFormStep(2)
    setIsProcessing(false)

    // Redirect to dashboard after successful verification
    setTimeout(() => {
      router.push("/dashboard")
    }, 3000)
  }

  return (
    <Card className="w-full max-w-md mx-auto bg-zinc-800 border-zinc-700 shadow-lg">
      <CardHeader>
        <div className="flex items-center justify-center mb-4">
          {formStep < 2 ? (
            <Lock className="h-10 w-10 text-primary" />
          ) : (
            <CheckCircle className="h-10 w-10 text-green-500" />
          )}
        </div>
        <CardTitle className="text-center text-xl">
          {formStep === 0 && "Verify Your Account"}
          {formStep === 1 && "Add Payment Method"}
          {formStep === 2 && "Verification Complete"}
        </CardTitle>
        <CardDescription className="text-center">
          {formStep === 0 && "We need to verify your account with a payment method, even for free subscriptions."}
          {formStep === 1 && "Your card will not be charged unless you subscribe to paid content."}
          {formStep === 2 && "Thank you! Your account has been verified."}
        </CardDescription>
      </CardHeader>

      <form onSubmit={handleSubmit}>
        <CardContent>
          {formStep === 0 && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
              <div className="space-y-2">
                <div className="rounded-lg p-4 bg-zinc-700/50 border border-zinc-700 text-sm text-white/80">
                  <p>
                    To ensure a safe environment for creators and subscribers, we require payment verification even for
                    free subscriptions.
                  </p>
                  <ul className="list-disc ml-5 mt-2 space-y-1">
                    <li>Your card will not be charged unless you subscribe to paid content</li>
                    <li>This helps us verify your age and prevent spam accounts</li>
                    <li>All card information is securely processed through Segpay</li>
                  </ul>
                </div>
              </div>

              <div className="flex justify-center">
                <div className="bg-zinc-700/50 px-4 py-2 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <svg
                      className="h-5 w-5 text-white"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M22 10V8C22 6.9 21.1 6 20 6H4C2.9 6 2 6.9 2 8V10H22Z" fill="currentColor" />
                      <path d="M2 19V12H22V19C22 20.1 21.1 21 20 21H4C2.9 21 2 20.1 2 19Z" fill="currentColor" />
                      <path d="M16 16.5H18V14.5H16V16.5Z" fill="currentColor" />
                    </svg>
                    <span className="text-sm text-white/80">Processed by Segpay</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {formStep === 1 && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="cardName">Cardholder Name</Label>
                <Input
                  id="cardName"
                  name="cardName"
                  placeholder="John Smith"
                  value={formData.cardName}
                  onChange={handleInputChange}
                  required
                  className="bg-zinc-900 border-zinc-700"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="cardNumber">Card Number</Label>
                <div className="relative">
                  <Input
                    id="cardNumber"
                    name="cardNumber"
                    placeholder="1234 5678 9012 3456"
                    value={formData.cardNumber}
                    onChange={handleCardNumberChange}
                    required
                    maxLength={19}
                    className="bg-zinc-900 border-zinc-700 pl-10"
                  />
                  <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/50" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="expiryDate">Expiry Date</Label>
                  <Input
                    id="expiryDate"
                    name="expiryDate"
                    placeholder="MM/YY"
                    value={formData.expiryDate}
                    onChange={handleExpiryDateChange}
                    required
                    maxLength={5}
                    className="bg-zinc-900 border-zinc-700"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cvv">CVV</Label>
                  <Input
                    id="cvv"
                    name="cvv"
                    type="password"
                    placeholder="123"
                    value={formData.cvv}
                    onChange={handleInputChange}
                    required
                    maxLength={4}
                    className="bg-zinc-900 border-zinc-700"
                  />
                </div>
              </div>

              <div className="mt-6 text-xs text-white/60">
                <p className="flex items-center">
                  <Lock className="h-3 w-3 mr-1" />
                  Your payment information is securely processed by Segpay
                </p>
              </div>
            </motion.div>
          )}

          {formStep === 2 && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center py-6">
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
              <p className="text-white/80">
                Your card has been verified successfully. You can now browse content and subscribe to creators.
              </p>
            </motion.div>
          )}
        </CardContent>

        {formStep < 2 && (
          <CardFooter>
            <Button type="submit" className="w-full bg-primary hover:bg-primary/90" disabled={isProcessing}>
              {isProcessing ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Processing...
                </>
              ) : formStep === 0 ? (
                "Continue"
              ) : (
                "Verify Card"
              )}
            </Button>
          </CardFooter>
        )}
      </form>
    </Card>
  )
}
