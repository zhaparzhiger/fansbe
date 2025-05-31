"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { UploadCloud, Check, AlertCircle, FileText, Camera, Shield } from "lucide-react"

export function ModelVerification() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadedFiles, setUploadedFiles] = useState({
    id: false,
    selfie: false,
  })

  const handleFileUpload = (type: "id" | "selfie") => {
    setIsUploading(true)

    // Simulate upload
    setTimeout(() => {
      setUploadedFiles((prev) => ({ ...prev, [type]: true }))
      setIsUploading(false)
    }, 2000)
  }

  const handleSubmit = () => {
    // Move to confirmation step
    setCurrentStep(2)

    // Simulate verification process (would normally be done on the server)
    setTimeout(() => {
      // Navigate to dashboard after verification
      router.push("/dashboard")
    }, 5000)
  }

  return (
    <Card className="w-full max-w-lg mx-auto bg-zinc-800 border-zinc-700 shadow-lg">
      <CardHeader>
        <div className="flex items-center justify-center mb-4">
          <Shield className="h-10 w-10 text-primary" />
        </div>
        <CardTitle className="text-center text-xl">Model Verification</CardTitle>
        <CardDescription className="text-center">
          {currentStep === 1
            ? "Complete verification to start posting content and receiving tips."
            : "Your verification is being processed."}
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        {currentStep === 1 ? (
          <>
            <div className="space-y-4">
              <div className="bg-zinc-700/50 rounded-lg p-4 text-sm text-white/80">
                <h3 className="font-medium text-white mb-2 flex items-center">
                  <AlertCircle className="h-4 w-4 mr-2 text-yellow-400" />
                  Why we verify models
                </h3>
                <p>Verification helps ensure that:</p>
                <ul className="list-disc ml-5 mt-2 space-y-1">
                  <li>All models are of legal age (18+)</li>
                  <li>Models are who they claim to be</li>
                  <li>Content is original and authentic</li>
                  <li>Our platform remains safe and compliant</li>
                </ul>
              </div>

              <div className="rounded-lg border border-zinc-700 overflow-hidden">
                <div className="bg-zinc-700/30 px-4 py-3">
                  <h3 className="font-medium flex items-center">
                    <FileText className="h-4 w-4 mr-2" />
                    Step 1: Upload Identification
                  </h3>
                </div>
                <div className="p-4 space-y-3">
                  <p className="text-sm text-white/80">
                    Please upload a clear photo of your government-issued ID (passport, driver's license, etc.)
                  </p>

                  <div className="flex justify-between items-center">
                    <div className="text-sm">
                      {uploadedFiles.id ? (
                        <Badge
                          variant="outline"
                          className="bg-green-500/10 text-green-400 hover:bg-green-500/20 border-green-500/30"
                        >
                          <Check className="h-3 w-3 mr-1" />
                          ID Uploaded
                        </Badge>
                      ) : (
                        <span className="text-white/60">No file selected</span>
                      )}
                    </div>

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleFileUpload("id")}
                      disabled={isUploading || uploadedFiles.id}
                      className="text-white bg-zinc-700 hover:bg-zinc-600 border-zinc-600"
                    >
                      {isUploading && !uploadedFiles.id ? (
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
                          Uploading...
                        </>
                      ) : (
                        <>
                          <UploadCloud className="h-4 w-4 mr-2" />
                          Upload ID
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </div>

              <div className="rounded-lg border border-zinc-700 overflow-hidden">
                <div className="bg-zinc-700/30 px-4 py-3">
                  <h3 className="font-medium flex items-center">
                    <Camera className="h-4 w-4 mr-2" />
                    Step 2: Take a Verification Selfie
                  </h3>
                </div>
                <div className="p-4 space-y-3">
                  <p className="text-sm text-white/80">
                    Take a clear selfie holding your ID next to your face. Make sure both are clearly visible.
                  </p>

                  <div className="flex justify-between items-center">
                    <div className="text-sm">
                      {uploadedFiles.selfie ? (
                        <Badge
                          variant="outline"
                          className="bg-green-500/10 text-green-400 hover:bg-green-500/20 border-green-500/30"
                        >
                          <Check className="h-3 w-3 mr-1" />
                          Selfie Uploaded
                        </Badge>
                      ) : (
                        <span className="text-white/60">No file selected</span>
                      )}
                    </div>

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleFileUpload("selfie")}
                      disabled={isUploading || uploadedFiles.selfie}
                      className="text-white bg-zinc-700 hover:bg-zinc-600 border-zinc-600"
                    >
                      {isUploading && !uploadedFiles.selfie ? (
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
                          Uploading...
                        </>
                      ) : (
                        <>
                          <Camera className="h-4 w-4 mr-2" />
                          Upload Selfie
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col space-y-3">
              <Button
                onClick={handleSubmit}
                disabled={!uploadedFiles.id || !uploadedFiles.selfie}
                className="w-full bg-primary hover:bg-primary/90"
              >
                Submit for Verification
              </Button>

              <div className="text-center text-xs text-white/60">
                Verification usually takes 24 hours or less. We'll notify you by email when it's complete.
              </div>
            </div>
          </>
        ) : (
          <div className="text-center py-6 space-y-4">
            <div className="flex justify-center mb-4">
              <div className="rounded-full bg-primary/20 p-4">
                <svg
                  className="animate-spin h-10 w-10 text-primary"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              </div>
            </div>

            <h3 className="text-lg font-medium text-white">Verification in Progress</h3>

            <p className="text-white/80">
              Thanks for submitting your verification documents! Our team is reviewing your information.
            </p>

            <div className="bg-zinc-700/30 rounded-lg p-4 text-sm text-white/80 mt-4">
              <h4 className="font-medium text-white mb-2">What happens next?</h4>
              <ul className="list-disc ml-5 space-y-1">
                <li>We'll review your documents within 24 hours</li>
                <li>You'll receive an email notification when verification is complete</li>
                <li>Once verified, you can start posting content and receiving tips</li>
              </ul>
            </div>

            <Button
              onClick={() => router.push("/dashboard")}
              variant="outline"
              className="mt-4 bg-zinc-700 hover:bg-zinc-600 border-zinc-600"
            >
              Return to Dashboard
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
