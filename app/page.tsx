Your code is mostly solid! Here’s an updated, cleaned-up React version with some important improvements and fixes for React best practices:

* Removed direct DOM manipulations like `document.getElementById` in favor of React refs and state where possible.
* Replaced manual modal display handling with React state and conditional rendering.
* Simplified the animation logic with React state and effects.
* Removed `<html>`, `<head>`, and `<body>` tags inside the component (React components should return elements starting with a single root, usually a div or fragment).
* Cleaned up minor JSX details (like `class` → `className`).
* Moved Bootstrap CSS and JS imports to your `_app.js` or main HTML template as appropriate (not inside component).
* Added keyboard accessibility for modal close.

---

Here’s the updated full React component for your waitlist page with improved React idioms:

```jsx
"use client"

import { useState, useEffect, useRef } from "react"

const Page = () => {
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [modalVisible, setModalVisible] = useState(false)
  const [animatedText, setAnimatedText] = useState("")
  const typingRef = useRef(null)

  // Animate the text like a typewriter effect
  useEffect(() => {
    const text = "Earn Reward in Stable\nSpend in Naira"
    let currentIndex = 0
    let timeoutId

    const typeWriter = () => {
      if (currentIndex <= text.length) {
        // Build string with line breaks replaced
        const currentText = text
          .substring(0, currentIndex)
          .replace(/\n/g, "<br />")

        setAnimatedText(currentText)
        currentIndex++
        timeoutId = setTimeout(typeWriter, 100)
      }
    }

    // Start after a slight delay
    timeoutId = setTimeout(typeWriter, 500)

    return () => clearTimeout(timeoutId)
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!fullName.trim() || !email.trim()) {
      return
    }

    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setIsSubmitting(false)
    setModalVisible(true)
    setFullName("")
    setEmail("")

    console.log("Form submitted:", { fullName, email })
  }

  const closeModal = () => {
    setModalVisible(false)
  }

  // Close modal on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
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
        /* Your CSS styles here, same as before */
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
          align-items: center;
          justify-content: center;
          padding: 2rem 1rem;
          position: relative;
        }

        .brand-section {
          text-align: center;
          margin-bottom: 2rem;
        }

        .brand-name {
          font-size: 2.5rem;
          font-weight: 300;
          letter-spacing: 0.1em;
          margin: 0;
          color: #8B4513;
        }

        .content-section {
          text-align: center;
          margin-bottom: 3rem;
          max-width: 600px;
        }

        .main-heading {
          font-size: 3rem;
          font-weight: 300;
          line-height: 1.2;
          margin-bottom: 1.5rem;
          letter-spacing: -0.02em;
        }

        .animated-text {
          display: inline-block;
          border-right: 2px solid #ffffff;
          animation: blink 1s infinite;
          white-space: pre-line;
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
        }

        .form-section {
          width: 100%;
          max-width: 400px;
          margin-bottom: 2rem;
        }

        .input-group {
          position: relative;
          margin-bottom: 1.5rem;
        }

        .input-icon {
          position: absolute;
          left: 1rem;
          top: 50%;
          transform: translateY(-50%);
          color: #666666;
          font-size: 1rem;
          z-index: 2;
        }

        .form-input {
          width: 100%;
          padding: 1rem 1rem 1rem 3rem;
          background: transparent;
          border: 1px solid #333333;
          border-radius: 8px;
          color: #ffffff;
          font-size: 1rem;
          font-weight: 300;
          transition: all 0.3s ease;
        }

        .form-input:focus {
          outline: none;
          border-color: #8B4513;
          box-shadow: 0 0 0 2px rgba(139, 69, 19, 0.1);
        }

        .form-input::placeholder {
          color: #666666;
          font-weight: 300;
        }

        .submit-btn {
          width: 100%;
          padding: 1rem 2rem;
          background: #ffffff;
          color: #000000;
          border: none;
          border-radius: 8px;
          font-size: 1rem;
          font-weight: 400;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
        }

        .submit-btn:hover:not(:disabled) {
          background: #f0f0f0;
          transform: translateY(-1px);
        }

        .submit-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
          transform: none;
        }

        .modal-backdrop {
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          background: rgba(0, 0, 0, 0.8);
          backdrop-filter: blur(5px);
          z-index: 1050;
          opacity: 1;
          transition: opacity 0.3s ease;
        }

        .modal {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background: linear-gradient(135deg, #1a1a1a 0%, #0d0d0d 100%);
          border: 2px solid #8B4513;
          border-radius: 20px;
          box-shadow: 0 20px 60px rgba(139, 69, 19, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(20px);
          animation: modalSlideIn 0.4s ease-out;
          overflow: hidden;
          z-index: 1055;
          width: 90%;
          max-width: 440px;
          opacity: 1;
          visibility: visible;
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

        .modal-header {
          background: rgba(139, 69, 19, 0.1);
          border-bottom: 1px solid rgba(139, 69, 19, 0.3);
          padding: 1.5rem 2rem 1rem;
          display: flex;
          justify-content: flex-end;
        }

        .btn-close-white {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 50%;
          width: 40px;
          height: 40px;
          opacity: 0.8;
          transition: all 0.3s ease;
          border: none;
          cursor: pointer;
        }

        .btn-close-white:hover {
          background: rgba(255, 255, 255, 0.2);
          opacity: 1;
          transform: rotate(90deg);
        }

        .modal-body {
          padding: 2rem 2.5rem 3rem;
          background: rgba(0, 0, 0, 0.2);
          text-align: center;
        }

        .success-icon-enhanced {
          width: 80px;
          height: 80px;
          background: linear-gradient(135deg, #8B4513 0%, #A0522D 100%);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 2rem;
          box-shadow: 0 10px 30px rgba(139, 69, 19, 0.4), 0 0 0 3px rgba(139, 69, 19, 0.2);
          animation: successPulse 2s ease-in-out infinite;
        }

        @keyframes successPulse {
          0%, 100% {
            transform: scale(1);
            box-shadow: 0 10px 30px rgba(139, 69, 19, 0.4), 0 0 0 3px rgba(139, 69, 19, 0.2);
          }
          50% {
            transform: scale(1.05);
            box-shadow: 0 15px 40px rgba(139, 69, 19, 0.6), 0 0 0 6px rgba(139, 69, 19, 0.3);
          }
        }

        .success-title-enhanced {
          font-size: 2.2rem;
          font-weight: 400;
          margin-bottom: 1.5rem;
          letter-spacing: -0.02em;
          background: linear-gradient(135deg, #ffffff 0%, #cccccc 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: titleGlow 3s ease-in-out infinite;
        }

        @keyframes titleGlow {
          0%, 100% {
            filter: brightness(1);
          }
          50% {
            filter: brightness(1.2);
          }
        }

        .success-message-enhanced {
          font-size: 1.2rem;
          color: #b8b8b8;
          font-weight: 300;
          margin-bottom: 2.5rem;
          line-height: 1.6;
          opacity: 0.9;
        }

        .modal-close-btn {
          background: linear-gradient(135deg, #8B4513 0%, #A0522D 100%);
          color: #ffffff;
          border: none;
          border-radius: 12px;
          padding: 1rem 2.5rem;
          font-size: 1.1rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 8px 25px rgba(139, 69, 19, 0.3);
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .modal-close-btn:hover {
          background: linear-gradient(135deg, #A0522D 0%, #8B4513 100%);
          transform: translateY(-2px);
          box-shadow: 0 12px 35px rgba(139, 69, 19, 0.4);
        }

        /* Responsive design */
        @media (max-width: 768px) {
          .main-heading {
            font-size: 2.5rem;
          }

          .brand-name {
            font-size: 2rem;
          }

          .description {
            font-size: 1.1rem;
          }

          .waitlist-container {
            padding: 1rem;
          }

          .modal-body {
            padding: 1.5rem 2rem 2.5rem;
          }

          .success-title-enhanced {
            font-size: 1.8rem;
          }
        }

        @media (max-width: 480px) {
          .
```
