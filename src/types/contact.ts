/**
 * Contact form types used by both the page UI and the API handler.
 */

export interface ContactFormPayload {
  name: string;
  email: string;
  message: string;
}

export type ContactFormStatus = 'idle' | 'submitting' | 'success' | 'error';
