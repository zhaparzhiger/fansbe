/**
 * Watermarking service for protecting media content
 * In a real app, this would be done server-side with a library like Sharp
 * This is a client-side implementation for demonstration purposes
 */

interface WatermarkOptions {
  text: string
  fontSize?: number
  fontFamily?: string
  color?: string
  opacity?: number
  position?: "topLeft" | "topRight" | "bottomLeft" | "bottomRight" | "center"
  margin?: number
  angle?: number
  tiled?: boolean
}

// Default options
const defaultOptions: WatermarkOptions = {
  text: "Fansbe.com",
  fontSize: 20,
  fontFamily: "Arial, sans-serif",
  color: "white",
  opacity: 0.7,
  position: "bottomRight",
  margin: 20,
  angle: 0,
  tiled: false,
}

/**
 * Applies a text watermark to an image
 */
export async function watermarkImage(imageUrl: string, options: Partial<WatermarkOptions> = {}): Promise<string> {
  return new Promise((resolve, reject) => {
    const opts = { ...defaultOptions, ...options }

    // Create a new image
    const img = new Image()
    img.crossOrigin = "anonymous" // Important to avoid CORS issues

    img.onload = () => {
      // Create canvas
      const canvas = document.createElement("canvas")
      canvas.width = img.width
      canvas.height = img.height

      // Get context
      const ctx = canvas.getContext("2d")
      if (!ctx) {
        reject(new Error("Could not get canvas context"))
        return
      }

      // Draw the original image
      ctx.drawImage(img, 0, 0)

      // Set watermark text properties
      ctx.font = `${opts.fontSize}px ${opts.fontFamily}`
      ctx.fillStyle = opts.color || "white"
      ctx.globalAlpha = opts.opacity || 0.7

      // Determine watermark position
      let x = opts.margin || 20
      let y = opts.margin || 20

      const textWidth = ctx.measureText(opts.text).width
      const textHeight = opts.fontSize || 20

      if (opts.position === "topRight" || opts.position === "bottomRight") {
        x = canvas.width - textWidth - (opts.margin || 20)
      }

      if (opts.position === "bottomLeft" || opts.position === "bottomRight") {
        y = canvas.height - textHeight - (opts.margin || 20)
      }

      if (opts.position === "center") {
        x = (canvas.width - textWidth) / 2
        y = (canvas.height - textHeight) / 2
      }

      // Apply rotation if specified
      if (opts.angle && opts.angle !== 0) {
        ctx.save()
        ctx.translate(x + textWidth / 2, y + textHeight / 2)
        ctx.rotate((opts.angle * Math.PI) / 180)
        ctx.fillText(opts.text, -textWidth / 2, -textHeight / 2 + textHeight)
        ctx.restore()
      } else if (opts.tiled) {
        // Tiled watermark
        const tileSize = textWidth + 50
        for (let tileY = 0; tileY < canvas.height; tileY += tileSize) {
          for (let tileX = 0; tileX < canvas.width; tileX += tileSize) {
            ctx.fillText(opts.text, tileX, tileY + textHeight)
          }
        }
      } else {
        // Single watermark
        ctx.fillText(opts.text, x, y + textHeight)
      }

      // Convert canvas to data URL
      try {
        const watermarkedImageUrl = canvas.toDataURL("image/jpeg", 0.95)
        resolve(watermarkedImageUrl)
      } catch (err) {
        reject(err)
      }
    }

    img.onerror = (err) => {
      reject(err)
    }

    img.src = imageUrl
  })
}

/**
 * Applies a watermark to a video (thumbnail only in this demo)
 * In a real app, this would be done server-side on the actual video frames
 */
export async function watermarkVideo(
  videoUrl: string,
  thumbnailUrl: string,
  options: Partial<WatermarkOptions> = {},
): Promise<{ videoUrl: string; thumbnailUrl: string }> {
  // For demonstration, we're just watermarking the thumbnail
  const watermarkedThumbnail = await watermarkImage(thumbnailUrl, options)

  // In a real implementation, the video would be watermarked server-side
  // For now, we just return the original video and the watermarked thumbnail
  return {
    videoUrl: videoUrl,
    thumbnailUrl: watermarkedThumbnail,
  }
}
