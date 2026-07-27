"use client";

import { useEffect } from "react";

interface AccessibilityHelperProps {
  children: React.ReactNode;
}

/**
 * Accessibility Improvements Component
 * - Announces page changes to screen readers
 * - Manages focus on route changes
 * - Provides skip navigation link
 */
export default function AccessibilityHelper({ children }: AccessibilityHelperProps) {
  useEffect(() => {
    // Announce page load to screen readers
    const announcePageLoad = () => {
      const announcement = document.createElement("div");
      announcement.setAttribute("role", "status");
      announcement.setAttribute("aria-live", "polite");
      announcement.setAttribute("aria-atomic", "true");
      announcement.className = "sr-only";
      announcement.textContent = "تم تحميل الصفحة";
      document.body.appendChild(announcement);
      
      setTimeout(() => {
        document.body.removeChild(announcement);
      }, 1000);
    };

    // Focus management - move focus to main content on route change
    const handleRouteChange = () => {
      const mainContent = document.querySelector("main");
      if (mainContent && mainContent instanceof HTMLElement) {
        mainContent.setAttribute("tabindex", "-1");
        mainContent.focus();
      }
    };

    announcePageLoad();
    handleRouteChange();

    // Handle keyboard navigation improvements
    const handleKeyDown = (e: KeyboardEvent) => {
      // Skip to main content with Tab key on first focus
      if (e.key === "Tab" && !document.body.classList.contains("keyboard-nav")) {
        document.body.classList.add("keyboard-nav");
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <>
      {/* Skip to main content link for keyboard users */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:right-4 focus:z-[9999] focus:px-4 focus:py-2 focus:bg-gold focus:text-navy focus:rounded-lg focus:font-medium"
      >
        تخطي إلى المحتوى الرئيسي
      </a>
      
      {children}
      
      {/* Screen reader only utility styles */}
      <style jsx global>{`
        .sr-only {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border: 0;
        }
        
        /* Improved focus indicators for keyboard navigation */
        .keyboard-nav *:focus-visible {
          outline: 2px solid #c9a961;
          outline-offset: 2px;
        }
        
        /* Reduced motion preference */
        @media (prefers-reduced-motion: reduce) {
          *,
          *::before,
          *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
            scroll-behavior: auto !important;
          }
        }
      `}</style>
    </>
  );
}
