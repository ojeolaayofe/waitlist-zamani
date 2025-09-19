"use client"

import { useState, useEffect } from "react"

const Page = () => {
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [modalVisible, setModalVisible] = useState(false)
  const [animatedText, setAnimatedText] = useState("")

  // Typewriter animation for the headline text
  useEffect(() => {
    const text = "Earn Reward in Stable\nSpend in Naira"
    let currentIndex = 0
    let timeoutId: NodeJS.Timeout

    const typeWriter = () => {
      if (currentIndex <= text.length) {
        const currentText = text
          .substring(0, currentIndex)
          .replace(/\n/g, "\n") // we'll display with white-space: pre-line later

        setAnimatedText(currentText)
        currentIndex++
        timeoutId = setTimeout(typeWriter, 100)
      }
    }

    timeoutId = setTimeout(typeWriter, 500)

    return () => clearTimeout(timeoutId)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!fullName.trim() || !email.trim()) return

    setIsSubmitting(true)

    // Simulate API call or submission here
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setIsSubmitting(false)
    setModalVisible(true)
    setFullName("")
    setEmail("")
  }

  const closeModal = () => setModalVisible(false)

  // Close modal on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && modalVisible) {
        closeModal()
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [modalVisible])

  return (
    <>
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        body {
          font-family: 'Inter', sans-serif;
          background: #000000;
          color: #ffffff;
          min-height: 100vh;
          overflow-x: hidden;
        }
        .waitlist-container {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 2rem 1rem;
          text-align: center;
          position: relative;
        }
        .brand-name {
          font-size: 2.5rem;
          font-weight: 300;
          letter-spacing: 0.1em;
          color: #8B4513;
          margin-bottom: 2rem;
        }
        .main-heading {
          font-size: 3rem;
          font-weight: 300;
          line-height: 1.2;
          margin-bottom: 1.5rem;
          letter-spacing: -0.02em;
          white-space: pre-line;
          border-right: 2px solid #fff;
          display: inline-block;
          animation: blink 1s infinite;
          max-width: 600px;
        }
        @keyframes blink {
          0%, 50% { border-color: #ffffff; }
          51%, 100% { border-color: transparent; }
        }
        .description {
          font-size: 1.25rem;
          font-weight: 300;
          color: #cccccc;
          line-height: 1.6;
          letter-spacing: 0.01em;
          margin-bottom: 3rem;
          max-width: 600px;
        }
        form {
          width: 100%;
          max-width: 400px;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          margin-bottom: 2rem;
        }
        input {
          padding: 1rem;
          border-radius: 8px;
          border: 1px solid #333;
          background: transparent;
          color: #fff;
          font-size: 1rem;
          font-weight: 300;
          transition: border-color 0.3s ease;
        }
        input::placeholder {
          color: #666;
        }
        input:focus {
          outline: none;
          border-color: #8B4513;
          box-shadow: 0 0 5px rgba(139, 69, 19, 0.7);
        }
        button {
          padding: 1rem;
          background: #fff;
          color: #000;
          font-weight: 500;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          transition: background 0.3s ease;
          font-size: 1rem;
        }
        button:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }
        button:hover:not(:disabled) {
          background: #f0f0f0;
        }
        /* Modal styles */
        .modal-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.8);
          backdrop-filter: blur(5px);
          z-index: 1050;
        }
        .modal {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background: linear-gradient(135deg, #1a1a1a 0%, #0d0d0d 100%);
          border: 2px solid #8B4513;
          border-radius: 20px;
          box-shadow: 0 20px 60px rgba(139, 69, 19, 0.3);
          backdrop-filter: blur(20px);
          width: 90%;
          max-width: 440px;
          padding: 2rem;
          text-align: center;
          z-index: 1055;
          animation: modalSlideIn 0.4s ease-out;
        }
        @keyframes modalSlideIn {
          from {
            opacity: 0;
            transform: translate(-50%, -60%) scale(0.9);
          }
          to {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
          }
        }
        .modal-close-btn {
          margin-top: 2rem;
          padding: 1rem 2.5rem;
          background: linear-gradient(135deg, #8B4513 0%, #A0522D 100%);
          color: #fff;
          border: none;
          border-radius: 12px;
          cursor: pointer;
          font-weight: 600;
          letter-spacing: 0.5px;
          transition: all 0.3s ease;
          text-transform: uppercase;
        }
        .modal-close-btn:hover {
          background: linear-gradient(135deg, #A0522D 0%, #8B4513 100%);
          transform: translateY(-2px);
          box-shadow: 0 12px 35px rgba(139, 69, 19, 0.4);
        }
      `}</style>

      <main className="waitlist-container">
        <h1 className="brand-name">Your Brand</h1>

        <h2 className="main-heading">{animatedText}</h2>

        <p className="description">
          Join our waitlist to earn rewards in stablecoins and spend directly in Naira.
        </p>

        <form onSubmit={handleSubmit} noValidate>
          <input
            type="text"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
            aria-label="Full Name"
          />
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            aria-label="Email Address"
          />
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Join Waitlist"}
          </button>
        </form>

        {modalVisible && (
          <>
            <div
              className="modal-backdrop"
              onClick={closeModal}
              aria-hidden="true"
            />
            <section
              className="modal"
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-title"
            >
              <h3 id="modal-title" style={{ marginBottom: "1rem", color: "#8B4513" }}>
                Thank You!
              </h3>
              <p>Your submission has been received successfully.</p>
              <button
                className="modal-close-btn"
                onClick={closeModal}
                aria-label="Close thank you modal"
              >
                Close
              </button>
            </section>
          </>
        )}
      </main>
    </>
  )
}

export default Page
