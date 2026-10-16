import React, { useState } from 'react';
import Link from 'next/link';

// In-memory widget open state: persists across SPA client-side page transitions,
// but automatically resets to true whenever the user refreshes or reloads the browser tab.
let isWidgetOpen: boolean = true;

export default function EventWidget() {
  const [isOpen, setIsOpen] = useState(isWidgetOpen);

  const handleClose = () => {
    isWidgetOpen = false;
    setIsOpen(false);
  };

  const handleOpen = () => {
    isWidgetOpen = true;
    setIsOpen(true);
  };

  return (
    <>
      {/* Floating Widget Panel */}
      <div
        className={`event-widget-panel${isOpen ? ' open' : ''}`}
        role="complementary"
        aria-label="EuroTier 2026 Event Notification"
      >
        {/* Header bar */}
        <div className="event-widget-header">
          <div className="event-widget-badge">
            <i className="bi bi-calendar-event-fill" />
            <span>Meet Us At EuroTier</span>
          </div>
          <button
            className="event-widget-close"
            onClick={handleClose}
            aria-label="Close event notification"
          >
            <i className="bi bi-x-lg" />
          </button>
        </div>

        {/* Body */}
        <div className="event-widget-body">
          <div className="event-widget-icon-wrap">
            <i className="bi bi-geo-alt-fill event-widget-geo" />
          </div>
          <p className="event-widget-message">
            VISIT US @{' '}
            <strong className="event-widget-highlight">EUROTIER 2026</strong>
            <br />
            BOOTH D33, HALL 23
          </p>
        </div>

        {/* Footer CTA */}
        <Link href="/contact" className="event-widget-cta" tabIndex={isOpen ? 0 : -1}>
          <i className="bi bi-send-fill" /> Get in Touch
        </Link>
      </div>

      {/* Collapsed Floating Icon */}
      {!isOpen && (
        <button
          className="event-widget-fab"
          onClick={handleOpen}
          aria-label="Open EuroTier 2026 event notification"
          title="VISIT US @ EUROTIER 2026 - BOOTH D33, HALL 23"
        >
          <i className="bi bi-calendar-event-fill event-widget-fab-icon" />
          <span className="event-widget-fab-pulse" />
        </button>
      )}
    </>
  );
}
