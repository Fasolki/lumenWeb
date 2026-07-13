import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { trackEvent } from '../utils/analytics';

/**
 * Set VITE_FORMSPREE_ENDPOINT (see .env.example) to receive submissions in
 * your inbox. Until it's set, the form falls back to opening the visitor's
 * mail client with everything already filled in, so it is never a dead end.
 */
const ENDPOINT = import.meta.env.VITE_FORMSPREE_ENDPOINT as string | undefined;

type Status = 'idle' | 'submitting' | 'success' | 'error';

interface FormState {
  name: string;
  email: string;
  eventDate: string;
  eventType: string;
  location: string;
  budget: string;
  message: string;
}

const EMPTY: FormState = {
  name: '',
  email: '',
  eventDate: '',
  eventType: '',
  location: '',
  budget: '',
  message: '',
};

export const BookingForm: React.FC = () => {
  const { t, language } = useLanguage();
  const [form, setForm] = useState<FormState>(EMPTY);
  const [status, setStatus] = useState<Status>('idle');
  const [honeypot, setHoneypot] = useState('');

  const f = t.ui.form;

  const update = (field: keyof FormState) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const asPlainText = () =>
    [
      `${f.name}: ${form.name}`,
      `${f.email}: ${form.email}`,
      `${f.eventDate}: ${form.eventDate || '—'}`,
      `${f.eventType}: ${form.eventType || '—'}`,
      `${f.location}: ${form.location || '—'}`,
      `${f.budget}: ${form.budget || '—'}`,
      '',
      form.message,
    ].join('\n');

  const openMailClient = () => {
    const subject = `${f.mailSubject}: ${form.name || '—'}`;
    window.location.href = `mailto:${t.contact.email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(asPlainText())}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (honeypot) return; // bot filled the hidden field

    if (!ENDPOINT) {
      trackEvent('Booking request', { method: 'email', language });
      openMailClient();
      return;
    }

    setStatus('submitting');
    try {
      const response = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ ...form, _language: language }),
      });
      if (!response.ok) throw new Error(`Request failed: ${response.status}`);
      // The conversion that actually matters: a booking enquiry, not a pageview.
      trackEvent('Booking request', {
        method: 'form',
        language,
        eventType: form.eventType || 'unspecified',
      });
      setStatus('success');
      setForm(EMPTY);
    } catch {
      setStatus('error');
    }
  };

  const fieldClass =
    'w-full px-4 py-3 rounded-lg bg-surface/60 border border-white/10 text-text placeholder:text-text/40 focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/40 transition-colors duration-200';

  if (status === 'success') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="glass p-10 rounded-2xl text-center"
        role="status"
      >
        <CheckCircle2 size={48} className="text-accent mx-auto mb-4" />
        <h3 className="font-display text-2xl font-bold text-text mb-2">{f.successTitle}</h3>
        <p className="text-text/80">{f.successBody}</p>
      </motion.div>
    );
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      onSubmit={handleSubmit}
      className="glass p-6 md:p-10 rounded-2xl"
      noValidate={false}
    >
      <h3 className="font-display text-2xl md:text-3xl font-bold text-accent mb-2">{f.title}</h3>
      <p className="text-text/80 mb-8">{f.subtitle}</p>

      {/* Spam trap: hidden from humans, irresistible to bots. */}
      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        value={honeypot}
        onChange={(e) => setHoneypot(e.target.value)}
        className="absolute w-px h-px -left-[9999px] opacity-0"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label htmlFor="bf-name" className="block text-sm font-medium text-text mb-2">
            {f.name} <span className="text-accent">*</span>
          </label>
          <input
            id="bf-name"
            name="name"
            type="text"
            required
            autoComplete="name"
            value={form.name}
            onChange={update('name')}
            className={fieldClass}
          />
        </div>

        <div>
          <label htmlFor="bf-email" className="block text-sm font-medium text-text mb-2">
            {f.email} <span className="text-accent">*</span>
          </label>
          <input
            id="bf-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            value={form.email}
            onChange={update('email')}
            className={fieldClass}
          />
        </div>

        <div>
          <label htmlFor="bf-date" className="block text-sm font-medium text-text mb-2">
            {f.eventDate}
          </label>
          <input
            id="bf-date"
            name="eventDate"
            type="date"
            value={form.eventDate}
            onChange={update('eventDate')}
            className={fieldClass}
          />
        </div>

        <div>
          <label htmlFor="bf-type" className="block text-sm font-medium text-text mb-2">
            {f.eventType}
          </label>
          <select
            id="bf-type"
            name="eventType"
            value={form.eventType}
            onChange={update('eventType')}
            className={fieldClass}
          >
            <option value="">{f.eventTypePlaceholder}</option>
            {f.eventTypes.map((option: string) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="bf-location" className="block text-sm font-medium text-text mb-2">
            {f.location}
          </label>
          <input
            id="bf-location"
            name="location"
            type="text"
            placeholder={f.locationPlaceholder}
            value={form.location}
            onChange={update('location')}
            className={fieldClass}
          />
        </div>

        <div>
          <label htmlFor="bf-budget" className="block text-sm font-medium text-text mb-2">
            {f.budget}
          </label>
          <input
            id="bf-budget"
            name="budget"
            type="text"
            placeholder={f.budgetPlaceholder}
            value={form.budget}
            onChange={update('budget')}
            className={fieldClass}
          />
        </div>
      </div>

      <div className="mt-5">
        <label htmlFor="bf-message" className="block text-sm font-medium text-text mb-2">
          {f.message} <span className="text-accent">*</span>
        </label>
        <textarea
          id="bf-message"
          name="message"
          required
          rows={5}
          placeholder={f.messagePlaceholder}
          value={form.message}
          onChange={update('message')}
          className={`${fieldClass} resize-y`}
        />
      </div>

      {status === 'error' && (
        <div
          role="alert"
          className="mt-6 flex items-start gap-3 rounded-lg border border-red-400/40 bg-red-400/10 p-4"
        >
          <AlertCircle size={20} className="text-red-400 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-text">{f.errorBody}</p>
            <button
              type="button"
              onClick={openMailClient}
              className="mt-2 text-accent font-semibold underline underline-offset-4 hover:text-accent/80"
            >
              {f.errorEmailFallback}
            </button>
          </div>
        </div>
      )}

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="mt-8 w-full md:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-accent text-white font-semibold rounded-lg hover:bg-accent/90 transition-all duration-200 focus-ring disabled:opacity-60 disabled:cursor-not-allowed"
      >
        <Send size={18} />
        {status === 'submitting' ? f.submitting : f.submit}
      </button>

      <p className="mt-4 text-text/60 text-sm">{f.responseNote}</p>
    </motion.form>
  );
};
