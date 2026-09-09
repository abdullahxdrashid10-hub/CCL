/*
 * ════════════════════════════════════════════════════════════════
 * ⚠  WARNING: FORM SUBMISSION IS NOT FUNCTIONAL
 * ════════════════════════════════════════════════════════════════
 *
 * This form currently has NO backend integration.
 * Clicking "Submit" does NOT send data anywhere — it only
 * shows a success animation with a fake delay.
 *
 * DO NOT ship this to production without wiring it to a
 * real delivery endpoint.
 *
 * PLANNED INTEGRATION: Resend (https://resend.com)
 *   - Destination email: BLOCKED / PLACEHOLDER (VITE_CONTACT_EMAIL)
 *   - Note: info@ccl.com is a placeholder, NOT a real inbox. Do not hardcode.
 *   - See handleSubmit() for the integration point
 *
 * TODO / BLOCKERS:
 *   - [ ] [BLOCKER] Awaiting client provision of live company domain & inbox address
 *   - [ ] Set up Resend account, verify domain, and obtain API key
 *   - [ ] Create a server-side API route (or serverless function)
 *         to call Resend's send API with process.env.CONTACT_EMAIL
 *   - [ ] Replace placeholder in handleSubmit() with real fetch() call
 * ════════════════════════════════════════════════════════════════
 */

import { useState, useRef, useCallback, useEffect } from 'react';
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
} from 'motion/react';
import {
  Send,
  User,
  Building2,
  Mail,
  Phone,
  MapPin,
  Package,
  Ship,
  Plane,
  FileText,
  Truck,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Loader2,
  Sparkles,
  Globe,
  ChevronDown,
} from 'lucide-react';

/* ═══════════════════════════════════════════════════════════════
   BRAND COLORS — Extracted from the CCL logo.
   Primary:  Deep Royal Blue  #1A3580
   Accent:   Orange           #F5941E
   ═══════════════════════════════════════════════════════════════ */

const ACCENT = '#F5941E';
const BRAND_BLUE = '#1A3580';
const OBSIDIAN = '#030303';

const STEPS = [
  { id: 0, label: 'You', icon: User, description: 'Your Details' },
  { id: 1, label: 'Shipment', icon: Package, description: 'Cargo Info' },
  { id: 2, label: 'Message', icon: FileText, description: 'Tell Us More' },
];

const SERVICE_OPTIONS = [
  { value: 'ocean-freight', label: 'Ocean Freight', icon: Ship },
  { value: 'air-freight', label: 'Air Freight', icon: Plane },
  { value: 'customs-brokerage', label: 'Customs & Docs', icon: FileText },
  { value: 'warehousing', label: 'Warehousing', icon: Building2 },
  { value: 'land-trucking', label: 'Land / Trucking', icon: Truck },
  { value: 'cargo-insurance', label: 'Cargo Insurance', icon: ShieldCheck },
];

const CARGO_TYPES = [
  'General Cargo',
  'Perishables',
  'Hazardous Materials',
  'Oversized / Project Cargo',
  'Vehicles',
  'Electronics',
  'Textiles & Apparel',
  'Other',
];

/* ═══════════════════════════════════════════════════════════════
   VALIDATION
   ═══════════════════════════════════════════════════════════════ */

const validators = {
  fullName: (v) => {
    if (!v || v.trim().length < 2) return 'Name must be at least 2 characters';
    return null;
  },
  companyName: () => null, // optional
  email: (v) => {
    if (!v) return 'Email is required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) return 'Invalid email format';
    return null;
  },
  phone: (v) => {
    if (!v) return null; // optional
    if (!/^[+]?[\d\s()-]{7,20}$/.test(v)) return 'Invalid phone number';
    return null;
  },
  origin: (v) => {
    if (!v || v.trim().length < 2) return 'Origin port/city is required';
    return null;
  },
  destination: (v) => {
    if (!v || v.trim().length < 2) return 'Destination port/city is required';
    return null;
  },
  service: (v) => {
    if (!v) return 'Please select a service';
    return null;
  },
  cargoType: (v) => {
    if (!v) return 'Please select cargo type';
    return null;
  },
  message: (v) => {
    if (!v || v.trim().length < 10)
      return 'Message must be at least 10 characters';
    return null;
  },
};

function validateStep(step, data) {
  const errors = {};
  if (step === 0) {
    ['fullName', 'email', 'phone'].forEach((f) => {
      const err = validators[f](data[f]);
      if (err) errors[f] = err;
    });
  } else if (step === 1) {
    ['origin', 'destination', 'service', 'cargoType'].forEach((f) => {
      const err = validators[f](data[f]);
      if (err) errors[f] = err;
    });
  } else if (step === 2) {
    const err = validators.message(data.message);
    if (err) errors.message = err;
  }
  return errors;
}

/* ═══════════════════════════════════════════════════════════════
   FLUID INPUT — Micro-bounce label, ACCENT glow, shake on error
   ═══════════════════════════════════════════════════════════════ */

function FluidInput({
  label,
  name,
  type = 'text',
  value,
  onChange,
  error,
  icon: Icon,
  placeholder = '',
  required = false,
}) {
  const [focused, setFocused] = useState(false);
  const hasValue = value && value.length > 0;
  const isFloating = focused || hasValue;
  const [shakeKey, setShakeKey] = useState(0);

  useEffect(() => {
    if (error) setShakeKey((k) => k + 1);
  }, [error]);

  return (
    <motion.div
      key={`shake-${name}-${shakeKey}`}
      className="relative w-full"
      animate={
        error && shakeKey > 0 ? { x: [0, -8, 8, -6, 6, -3, 3, 0] } : { x: 0 }
      }
      transition={{ duration: 0.5, ease: 'easeInOut' }}
    >
      {/* Container */}
      <div
        className="relative rounded-2xl transition-all duration-500"
        style={{
          background: focused ? '#0a0a0a' : '#080808',
          border: `1.5px solid ${
            error
              ? '#FF4060'
              : focused
                ? `${ACCENT}60`
                : hasValue
                  ? `${ACCENT}20`
                  : '#1a1a1a'
          }`,
          boxShadow: focused
            ? `0 0 30px ${ACCENT}12, 0 0 60px ${ACCENT}06, inset 0 0 30px ${ACCENT}03`
            : error
              ? '0 0 20px #FF406015'
              : 'none',
        }}
      >
        {/* Icon */}
        {Icon && (
          <div className="pointer-events-none absolute left-4 top-1/2 z-10 -translate-y-1/2">
            <Icon
              size={16}
              strokeWidth={1.5}
              style={{
                color: focused ? ACCENT : error ? '#FF4060' : '#555',
                transition: 'color 0.3s ease',
              }}
            />
          </div>
        )}

        {/* Floating label */}
        <motion.label
          htmlFor={name}
          className="pointer-events-none absolute z-10 font-medium"
          animate={{
            top: isFloating ? '8px' : '50%',
            y: isFloating ? 0 : '-50%',
            fontSize: isFloating ? '10px' : '14px',
            letterSpacing: isFloating ? '0.1em' : '0.02em',
            color: error ? '#FF4060' : focused ? ACCENT : '#666',
          }}
          transition={{
            type: 'spring',
            stiffness: 400,
            damping: 25,
            mass: 0.8,
          }}
          style={{
            left: Icon ? '44px' : '18px',
            textTransform: isFloating ? 'uppercase' : 'none',
          }}
        >
          {label}
          {required && (
            <span style={{ color: error ? '#FF4060' : ACCENT, marginLeft: 2 }}>
              *
            </span>
          )}
        </motion.label>

        {/* Input */}
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder={focused ? placeholder : ''}
          className="w-full bg-transparent font-body text-[15px] text-white outline-none"
          style={{
            padding: Icon ? '24px 44px 10px 44px' : '24px 44px 10px 18px',
            height: '62px',
          }}
          autoComplete="off"
        />

        {/* Validation Progress Checkmark */}
        <AnimatePresence>
          {hasValue && !error && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 500, damping: 25 }}
              className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-emerald-400"
            >
              <CheckCircle2 size={16} strokeWidth={2.5} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Error message */}
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -5, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -5, height: 0 }}
            className="ml-1 mt-1.5 text-[12px] font-medium"
            style={{ color: '#FF4060' }}
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   FLUID TEXTAREA
   ═══════════════════════════════════════════════════════════════ */

function FluidTextarea({
  label,
  name,
  value,
  onChange,
  error,
  required = false,
}) {
  const [focused, setFocused] = useState(false);
  const hasValue = value && value.length > 0;
  const isFloating = focused || hasValue;
  const [shakeKey, setShakeKey] = useState(0);

  useEffect(() => {
    if (error) setShakeKey((k) => k + 1);
  }, [error]);

  const charCount = value ? value.length : 0;

  return (
    <motion.div
      key={`shake-ta-${shakeKey}`}
      className="relative w-full"
      animate={
        error && shakeKey > 0 ? { x: [0, -8, 8, -6, 6, -3, 3, 0] } : { x: 0 }
      }
      transition={{ duration: 0.5, ease: 'easeInOut' }}
    >
      <div
        className="relative rounded-2xl transition-all duration-500"
        style={{
          background: focused ? '#0a0a0a' : '#080808',
          border: `1.5px solid ${
            error
              ? '#FF4060'
              : focused
                ? `${ACCENT}60`
                : hasValue
                  ? `${ACCENT}20`
                  : '#1a1a1a'
          }`,
          boxShadow: focused
            ? `0 0 30px ${ACCENT}12, 0 0 60px ${ACCENT}06, inset 0 0 30px ${ACCENT}03`
            : error
              ? '0 0 20px #FF406015'
              : 'none',
        }}
      >
        <motion.label
          htmlFor={name}
          className="pointer-events-none absolute left-[18px] z-10 font-medium"
          animate={{
            top: isFloating ? '12px' : '20px',
            fontSize: isFloating ? '10px' : '14px',
            letterSpacing: isFloating ? '0.1em' : '0.02em',
            color: error ? '#FF4060' : focused ? ACCENT : '#666',
          }}
          transition={{
            type: 'spring',
            stiffness: 400,
            damping: 25,
            mass: 0.8,
          }}
          style={{ textTransform: isFloating ? 'uppercase' : 'none' }}
        >
          {label}
          {required && <span style={{ color: ACCENT, marginLeft: 2 }}>*</span>}
        </motion.label>

        <textarea
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          rows={5}
          className="w-full resize-none bg-transparent font-body text-[15px] text-white outline-none"
          style={{ padding: '30px 18px 12px 18px' }}
        />

        {/* Character counter & Valid checkmark */}
        <div className="absolute bottom-3 right-4 flex items-center gap-2">
          {hasValue && !error && charCount >= 10 && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="text-emerald-400"
            >
              <CheckCircle2 size={14} strokeWidth={2.5} />
            </motion.div>
          )}
          <span
            className="font-mono text-[11px]"
            style={{ color: charCount > 500 ? '#FF4060' : '#555' }}
          >
            {charCount}/500
          </span>
        </div>
      </div>

      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -5, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -5, height: 0 }}
            className="ml-1 mt-1.5 text-[12px] font-medium"
            style={{ color: '#FF4060' }}
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   FLUID SELECT
   ═══════════════════════════════════════════════════════════════ */

function FluidSelect({
  label,
  name,
  value,
  onChange,
  options,
  error,
  icon: Icon,
  required,
}) {
  const [focused, setFocused] = useState(false);
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const [shakeKey, setShakeKey] = useState(0);

  useEffect(() => {
    if (error) setShakeKey((k) => k + 1);
  }, [error]);

  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const selectedOption = options.find((o) => o.value === value);

  return (
    <motion.div
      key={`shake-sel-${name}-${shakeKey}`}
      ref={ref}
      className="relative w-full"
      animate={
        error && shakeKey > 0 ? { x: [0, -8, 8, -6, 6, -3, 3, 0] } : { x: 0 }
      }
      transition={{ duration: 0.5, ease: 'easeInOut' }}
    >
      <div
        className="relative cursor-pointer rounded-2xl transition-all duration-500"
        onClick={() => setOpen(!open)}
        style={{
          background: open ? '#0a0a0a' : '#080808',
          border: `1.5px solid ${
            error
              ? '#FF4060'
              : open
                ? `${ACCENT}60`
                : value
                  ? `${ACCENT}20`
                  : '#1a1a1a'
          }`,
          boxShadow: open
            ? `0 0 30px ${ACCENT}12, 0 0 60px ${ACCENT}06`
            : 'none',
          height: '62px',
          padding: Icon ? '0 18px 0 44px' : '0 18px',
        }}
      >
        {Icon && (
          <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2">
            <Icon
              size={16}
              strokeWidth={1.5}
              style={{
                color: open ? ACCENT : error ? '#FF4060' : '#555',
                transition: 'color 0.3s',
              }}
            />
          </div>
        )}

        <motion.span
          className="pointer-events-none absolute font-medium"
          animate={{
            top: value ? '8px' : '50%',
            y: value ? 0 : '-50%',
            fontSize: value ? '10px' : '14px',
            letterSpacing: value ? '0.1em' : '0.02em',
            color: error ? '#FF4060' : open ? ACCENT : '#666',
          }}
          transition={{
            type: 'spring',
            stiffness: 400,
            damping: 25,
            mass: 0.8,
          }}
          style={{
            left: Icon ? '44px' : '18px',
            textTransform: value ? 'uppercase' : 'none',
          }}
        >
          {label}
          {required && <span style={{ color: ACCENT, marginLeft: 2 }}>*</span>}
        </motion.span>

        {selectedOption && (
          <span className="absolute bottom-[12px] font-body text-[15px] text-white">
            {selectedOption.label}
          </span>
        )}

        <ChevronDown
          size={16}
          className="absolute right-4 top-1/2 -translate-y-1/2 transition-transform duration-300"
          style={{
            color: open ? ACCENT : '#555',
            transform: open
              ? 'translateY(-50%) rotate(180deg)'
              : 'translateY(-50%)',
          }}
        />
      </div>

      {/* Dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 4, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.97 }}
            transition={{ duration: 0.25, ease: [0.19, 1, 0.22, 1] }}
            className="absolute z-50 w-full overflow-hidden rounded-2xl"
            style={{
              background: '#0d0d0d',
              border: `1.5px solid ${ACCENT}20`,
              boxShadow: `0 20px 60px rgba(0,0,0,0.8), 0 0 30px ${ACCENT}08`,
            }}
          >
            {options.map((opt) => {
              const OptIcon = opt.icon;
              return (
                <motion.div
                  key={opt.value}
                  className="flex cursor-pointer items-center gap-3 px-5 py-3.5 transition-all duration-200"
                  onClick={() => {
                    onChange({ target: { name, value: opt.value } });
                    setOpen(false);
                  }}
                  whileHover={{
                    backgroundColor: `${ACCENT}08`,
                  }}
                  style={{
                    background:
                      value === opt.value ? `${ACCENT}10` : 'transparent',
                  }}
                >
                  {OptIcon && (
                    <OptIcon
                      size={15}
                      strokeWidth={1.5}
                      style={{
                        color: value === opt.value ? ACCENT : '#666',
                      }}
                    />
                  )}
                  <span
                    className="text-[14px] font-medium"
                    style={{
                      color: value === opt.value ? ACCENT : '#ccc',
                    }}
                  >
                    {opt.label}
                  </span>
                  {value === opt.value && (
                    <CheckCircle2
                      size={14}
                      className="ml-auto"
                      style={{ color: ACCENT }}
                    />
                  )}
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -5, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -5, height: 0 }}
            className="ml-1 mt-1.5 text-[12px] font-medium"
            style={{ color: '#FF4060' }}
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   STEP INDICATOR — Horizontal progress bar
   ═══════════════════════════════════════════════════════════════ */

function StepIndicator({ currentStep, totalSteps }) {
  return (
    <div className="mb-10 flex w-full items-center gap-2">
      {STEPS.map((step, i) => {
        const StepIcon = step.icon;
        const isActive = i === currentStep;
        const isCompleted = i < currentStep;

        return (
          <div
            key={step.id}
            className="flex flex-1 items-center last:flex-none"
          >
            {/* Step circle */}
            <motion.div
              className="relative flex items-center justify-center rounded-xl"
              style={{
                width: 44,
                height: 44,
                background: isCompleted
                  ? `${ACCENT}15`
                  : isActive
                    ? `${ACCENT}10`
                    : '#0a0a0a',
                border: `1.5px solid ${
                  isCompleted
                    ? `${ACCENT}50`
                    : isActive
                      ? `${ACCENT}40`
                      : '#1a1a1a'
                }`,
                boxShadow: isActive ? `0 0 25px ${ACCENT}15` : 'none',
                flexShrink: 0,
              }}
              animate={{
                scale: isActive ? [1, 1.06, 1] : 1,
              }}
              transition={{
                duration: 2,
                repeat: isActive ? Infinity : 0,
                ease: 'easeInOut',
              }}
            >
              {isCompleted ? (
                <CheckCircle2 size={18} style={{ color: ACCENT }} />
              ) : (
                <StepIcon
                  size={17}
                  strokeWidth={1.5}
                  style={{
                    color: isActive ? ACCENT : '#555',
                    transition: 'color 0.3s',
                  }}
                />
              )}
            </motion.div>

            {/* Label */}
            <div className="ml-2.5 hidden sm:block" style={{ flexShrink: 0 }}>
              <p
                className="font-mono text-[10px] font-medium uppercase tracking-[0.15em]"
                style={{
                  color: isActive
                    ? ACCENT
                    : isCompleted
                      ? `${ACCENT}80`
                      : '#555',
                }}
              >
                Step {i + 1}
              </p>
              <p
                className="text-[13px] font-medium"
                style={{ color: isActive || isCompleted ? '#ddd' : '#666' }}
              >
                {step.description}
              </p>
            </div>

            {/* Connector line */}
            {i < STEPS.length - 1 && (
              <div
                className="mx-3 h-[1.5px] flex-1 overflow-hidden rounded-full"
                style={{ background: '#1a1a1a' }}
              >
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: ACCENT }}
                  initial={{ width: '0%' }}
                  animate={{ width: isCompleted ? '100%' : '0%' }}
                  transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   STEP 0 — Your Details
   ═══════════════════════════════════════════════════════════════ */

function StepYourDetails({ data, errors, onChange }) {
  return (
    <motion.div
      key="step-0"
      initial={{ opacity: 0, x: 50, filter: 'blur(10px)' }}
      animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
      exit={{ opacity: 0, x: -50, filter: 'blur(10px)' }}
      transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
      className="space-y-5"
    >
      <FluidInput
        label="Full Name"
        name="fullName"
        value={data.fullName}
        onChange={onChange}
        error={errors.fullName}
        icon={User}
        placeholder="e.g. Ahmed Khan"
        required
      />

      <FluidInput
        label="Company Name"
        name="companyName"
        value={data.companyName}
        onChange={onChange}
        error={errors.companyName}
        icon={Building2}
        placeholder="e.g. Khan Industries"
      />

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <FluidInput
          label="Email Address"
          name="email"
          type="email"
          value={data.email}
          onChange={onChange}
          error={errors.email}
          icon={Mail}
          placeholder="you@company.com"
          required
        />
        <FluidInput
          label="Phone / WhatsApp"
          name="phone"
          type="tel"
          value={data.phone}
          onChange={onChange}
          error={errors.phone}
          icon={Phone}
          placeholder="+92 300 1234567"
        />
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   STEP 1 — Shipment Info
   ═══════════════════════════════════════════════════════════════ */

function StepShipmentInfo({ data, errors, onChange }) {
  const cargoOptions = CARGO_TYPES.map((c) => ({
    value: c
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, ''),
    label: c,
    icon: Package,
  }));

  return (
    <motion.div
      key="step-1"
      initial={{ opacity: 0, x: 50, filter: 'blur(10px)' }}
      animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
      exit={{ opacity: 0, x: -50, filter: 'blur(10px)' }}
      transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
      className="space-y-5"
    >
      {/* Route */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <FluidInput
          label="Origin Port / City"
          name="origin"
          value={data.origin}
          onChange={onChange}
          error={errors.origin}
          icon={MapPin}
          placeholder="e.g. Karachi, PK"
          required
        />
        <FluidInput
          label="Destination Port / City"
          name="destination"
          value={data.destination}
          onChange={onChange}
          error={errors.destination}
          icon={Globe}
          placeholder="e.g. Dubai, AE"
          required
        />
      </div>

      {/* Route arrow visual */}
      <div className="flex items-center justify-center py-2">
        <div className="flex items-center gap-3">
          <div className="h-[1px] w-12" style={{ background: `${ACCENT}30` }} />
          <motion.div
            animate={{ x: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ArrowRight size={16} style={{ color: ACCENT }} />
          </motion.div>
          <div className="h-[1px] w-12" style={{ background: `${ACCENT}30` }} />
        </div>
      </div>

      <FluidSelect
        label="Service Required"
        name="service"
        value={data.service}
        onChange={onChange}
        options={SERVICE_OPTIONS}
        error={errors.service}
        icon={Ship}
        required
      />

      <FluidSelect
        label="Cargo Type"
        name="cargoType"
        value={data.cargoType}
        onChange={onChange}
        options={cargoOptions}
        error={errors.cargoType}
        icon={Package}
        required
      />
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   STEP 2 — Message
   ═══════════════════════════════════════════════════════════════ */

function StepMessage({ data, errors, onChange }) {
  return (
    <motion.div
      key="step-2"
      initial={{ opacity: 0, x: 50, filter: 'blur(10px)' }}
      animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
      exit={{ opacity: 0, x: -50, filter: 'blur(10px)' }}
      transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
      className="space-y-5"
    >
      <FluidTextarea
        label="Your Message"
        name="message"
        value={data.message}
        onChange={onChange}
        error={errors.message}
        required
      />

      {/* Summary preview */}
      <div
        className="rounded-2xl p-5"
        style={{
          background: `${ACCENT}04`,
          border: `1px solid ${ACCENT}10`,
        }}
      >
        <p
          className="mb-3 font-mono text-[10px] font-semibold uppercase tracking-[0.15em]"
          style={{ color: ACCENT }}
        >
          Submission Preview
        </p>
        <div className="grid grid-cols-2 gap-3">
          {[
            { label: 'Name', value: data.fullName },
            { label: 'Email', value: data.email },
            {
              label: 'Route',
              value:
                data.origin && data.destination
                  ? `${data.origin} → ${data.destination}`
                  : '—',
            },
            {
              label: 'Service',
              value:
                SERVICE_OPTIONS.find((s) => s.value === data.service)?.label ||
                '—',
            },
          ].map((item) => (
            <div key={item.label}>
              <p className="font-mono text-[10px] uppercase tracking-[0.1em] text-neutral-600">
                {item.label}
              </p>
              <p className="truncate text-[13px] font-medium text-neutral-300">
                {item.value || '—'}
              </p>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SUCCESS PANEL — Geometric morph confirmation
   ═══════════════════════════════════════════════════════════════ */

function SuccessPanel({ data, onReset }) {
  return (
    <motion.div
      key="success-panel"
      className="relative flex flex-col items-center justify-center py-10 text-center"
      initial={{ opacity: 0, scale: 0.85, rotateY: 90, filter: 'blur(20px)' }}
      animate={{ opacity: 1, scale: 1, rotateY: 0, filter: 'blur(0px)' }}
      exit={{ opacity: 0, scale: 0.85, rotateY: -90, filter: 'blur(20px)' }}
      transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
    >
      {/* Animated geometric success badge */}
      <div className="relative mb-8">
        {/* Outer rotating ring */}
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            width: 120,
            height: 120,
            border: `1.5px dashed ${ACCENT}30`,
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        />
        {/* Middle pulse ring */}
        <motion.div
          className="absolute rounded-full"
          style={{
            width: 120,
            height: 120,
            border: `1px solid ${ACCENT}20`,
          }}
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0, 0.3],
          }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        />
        {/* Inner solid circle */}
        <motion.div
          className="relative flex items-center justify-center rounded-full"
          style={{
            width: 120,
            height: 120,
            background: `radial-gradient(circle, ${ACCENT}15, ${ACCENT}05)`,
            border: `2px solid ${ACCENT}40`,
            boxShadow: `0 0 60px ${ACCENT}15, inset 0 0 40px ${ACCENT}05`,
          }}
          animate={{
            boxShadow: [
              `0 0 60px ${ACCENT}15, inset 0 0 40px ${ACCENT}05`,
              `0 0 80px ${ACCENT}25, inset 0 0 60px ${ACCENT}10`,
              `0 0 60px ${ACCENT}15, inset 0 0 40px ${ACCENT}05`,
            ],
          }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        >
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{
              delay: 0.4,
              duration: 0.8,
              type: 'spring',
              stiffness: 200,
            }}
          >
            <CheckCircle2
              size={48}
              strokeWidth={1.5}
              style={{ color: ACCENT }}
            />
          </motion.div>
        </motion.div>
      </div>

      {/* Text content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
      >
        <h3 className="mb-3 font-display text-3xl font-bold text-white">
          Message Received
        </h3>
        <p className="mx-auto mb-2 max-w-sm text-[15px] leading-relaxed text-neutral-400">
          Your shipment inquiry from{' '}
          <span style={{ color: ACCENT }}>{data.origin || 'Origin'}</span> to{' '}
          <span style={{ color: ACCENT }}>
            {data.destination || 'Destination'}
          </span>{' '}
          has been logged.
        </p>
        <p className="text-[13px] text-neutral-500">
          Our team will respond within{' '}
          <span className="font-semibold text-white">2 business hours</span>.
        </p>
      </motion.div>

      {/* Tracking ID */}
      <motion.div
        className="mt-8 rounded-xl px-6 py-3"
        style={{
          background: `${ACCENT}06`,
          border: `1px solid ${ACCENT}15`,
        }}
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.5 }}
      >
        <p className="mb-1 font-mono text-[10px] uppercase tracking-[0.15em] text-neutral-500">
          Reference ID
        </p>
        <p
          className="font-mono text-lg font-semibold tracking-wider"
          style={{ color: ACCENT }}
        >
          CCL-{Date.now().toString(36).toUpperCase().slice(-6)}
        </p>
      </motion.div>

      {/* Decorative corner brackets */}
      {[
        'top-0 left-0',
        'top-0 right-0 rotate-90',
        'bottom-0 left-0 -rotate-90',
        'bottom-0 right-0 rotate-180',
      ].map((pos, i) => (
        <motion.div
          key={i}
          className={`absolute ${pos} pointer-events-none h-8 w-8`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ delay: 0.8 + i * 0.1 }}
        >
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <path d="M0 12V0H12" stroke={ACCENT} strokeWidth="1" />
          </svg>
        </motion.div>
      ))}

      {/* Reset button */}
      <motion.button
        className="mt-8 rounded-xl px-6 py-3 font-display text-sm font-semibold"
        style={{
          background: 'transparent',
          border: `1.5px solid #333`,
          color: '#888',
        }}
        whileHover={{
          borderColor: `${ACCENT}40`,
          color: ACCENT,
          boxShadow: `0 0 20px ${ACCENT}10`,
        }}
        whileTap={{ scale: 0.97 }}
        onClick={onReset}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        Send Another Inquiry
      </motion.button>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   MAIN EXPORT — FluidContactForm
   ═══════════════════════════════════════════════════════════════ */

export default function FluidContactForm({ initialService = '' }) {
  const [step, setStep] = useState(0);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const [formData, setFormData] = useState({
    fullName: '',
    companyName: '',
    email: '',
    phone: '',
    origin: '',
    destination: '',
    service: initialService || '',
    cargoType: '',
    message: '',
  });

  useEffect(() => {
    if (initialService) {
      setFormData((prev) => ({ ...prev, service: initialService }));
    }
  }, [initialService]);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => {
      const next = { ...prev };
      delete next[name];
      return next;
    });
  }, []);

  const handleNext = useCallback(() => {
    const stepErrors = validateStep(step, formData);
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
      return;
    }
    setErrors({});
    setStep((s) => Math.min(s + 1, 2));
  }, [step, formData]);

  const handleBack = useCallback(() => {
    setErrors({});
    setStep((s) => Math.max(s - 1, 0));
  }, []);

  const handleSubmit = useCallback(async () => {
    const stepErrors = validateStep(2, formData);
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    /*
     * ⚠ PLACEHOLDER — NOT A REAL SUBMISSION.
     *
     * This fakes a 2s delay then shows a success panel.
     * Data is logged to console but goes NOWHERE.
     *
     * TO WIRE TO RESEND:
     * 1. Create a server-side API route that calls Resend's API:
     *    POST https://api.resend.com/emails
     *    Headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}` }
     *    Body: { from: 'noreply@yourdomain.com', to: process.env.CONTACT_EMAIL (UNSET / BLOCKER), subject, html }
     *
     * 2. Replace the block below with:
     *    const res = await fetch('/api/contact', {
     *      method: 'POST',
     *      headers: { 'Content-Type': 'application/json' },
     *      body: JSON.stringify(formData),
     *    });
     *    if (!res.ok) throw new Error('Submission failed');
     *
     * 3. Add error handling for network failures.
     */
    console.warn(
      '[FluidContactForm] ⚠ SUBMISSION IS NOT FUNCTIONAL.',
      'Data logged below but NOT sent anywhere.',
      'Wire to Resend before shipping to production.'
    );
    console.table(formData);

    // Fake delay — remove once real API is connected
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    setIsSuccess(true);
  }, [formData]);

  const handleReset = useCallback(() => {
    setStep(0);
    setErrors({});
    setIsSuccess(false);
    setIsSubmitting(false);
    setFormData({
      fullName: '',
      companyName: '',
      email: '',
      phone: '',
      origin: '',
      destination: '',
      service: '',
      cargoType: '',
      message: '',
    });
  }, []);

  return (
    <section
      id="contact-form"
      className="relative overflow-hidden bg-obsidian py-24 md:py-32"
      style={{ background: OBSIDIAN }}
    >
      {/* Background decorations */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(ellipse 50% 60% at 50% 100%, ${ACCENT}03, transparent 70%)`,
          }}
        />
        {/* Grid */}
        <svg className="absolute inset-0 h-full w-full opacity-[0.015]">
          <defs>
            <pattern
              id="contact-grid"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 40 0 L 0 0 0 40"
                fill="none"
                stroke={ACCENT}
                strokeWidth="0.5"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#contact-grid)" />
        </svg>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-12">
        {/* Section header */}
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
        >
          <motion.div
            className="mb-6 inline-flex items-center gap-2 rounded-full px-4 py-1.5"
            style={{
              background: `${ACCENT}08`,
              border: `1px solid ${ACCENT}15`,
            }}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <Sparkles size={12} style={{ color: ACCENT }} />
            <span
              className="font-mono text-[11px] font-medium uppercase tracking-[0.2em]"
              style={{ color: ACCENT }}
            >
              Get in Touch
            </span>
          </motion.div>

          <h2 className="mb-6 font-display text-4xl font-bold leading-[1.1] text-white md:text-6xl">
            Let's Move Your <span className="text-gradient-ACCENT">Cargo</span>
          </h2>

          <p className="mx-auto max-w-xl text-base leading-relaxed text-neutral-500 md:text-lg">
            Tell us about your shipment. Our logistics specialists will craft a
            tailored solution and respond within hours.
          </p>
        </motion.div>

        {/* Form card */}
        <motion.div
          className="mx-auto max-w-2xl"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ delay: 0.2, duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
        >
          <div
            className="relative overflow-hidden rounded-3xl"
            style={{
              background: '#080808',
              border: `1px solid ${ACCENT}10`,
              boxShadow: `0 40px 100px rgba(0,0,0,0.6), 0 0 60px ${ACCENT}04`,
              perspective: '1200px',
            }}
          >
            {/* Inner glow line at top */}
            <div
              className="absolute left-0 right-0 top-0 h-[1px]"
              style={{
                background: `linear-gradient(90deg, transparent, ${ACCENT}30, transparent)`,
              }}
            />

            <div className="p-8 md:p-10">
              <AnimatePresence mode="wait">
                {isSuccess ? (
                  <SuccessPanel data={formData} onReset={handleReset} />
                ) : (
                  <motion.div
                    key="form-content"
                    initial={{ opacity: 1 }}
                    exit={{
                      opacity: 0,
                      scale: 0.9,
                      rotateY: -15,
                      filter: 'blur(15px)',
                    }}
                    transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
                  >
                    {/* Step indicator */}
                    <StepIndicator currentStep={step} totalSteps={3} />

                    {/* Step content */}
                    <AnimatePresence mode="wait">
                      {step === 0 && (
                        <StepYourDetails
                          data={formData}
                          errors={errors}
                          onChange={handleChange}
                        />
                      )}
                      {step === 1 && (
                        <StepShipmentInfo
                          data={formData}
                          errors={errors}
                          onChange={handleChange}
                        />
                      )}
                      {step === 2 && (
                        <StepMessage
                          data={formData}
                          errors={errors}
                          onChange={handleChange}
                        />
                      )}
                    </AnimatePresence>

                    {/* Navigation buttons */}
                    <div className="mt-10 flex items-center justify-between">
                      {/* Back */}
                      <div>
                        {step > 0 && (
                          <motion.button
                            className="flex items-center gap-2 rounded-xl px-5 py-3 font-display text-sm font-semibold"
                            style={{
                              background: 'transparent',
                              border: `1.5px solid #222`,
                              color: '#888',
                            }}
                            whileHover={{
                              borderColor: `${ACCENT}30`,
                              color: '#ccc',
                            }}
                            whileTap={{ scale: 0.97 }}
                            onClick={handleBack}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                          >
                            <ArrowLeft size={15} />
                            <span>Back</span>
                          </motion.button>
                        )}
                      </div>

                      {/* Next / Submit */}
                      <motion.button
                        className="group relative flex items-center gap-2 overflow-hidden rounded-xl px-8 py-3.5 font-display text-sm font-semibold"
                        style={{
                          background: `linear-gradient(135deg, ${ACCENT}20, ${ACCENT}08)`,
                          border: `1.5px solid ${ACCENT}40`,
                          color: ACCENT,
                        }}
                        whileHover={{
                          scale: 1.03,
                          boxShadow: `0 0 40px ${ACCENT}20`,
                        }}
                        whileTap={{ scale: 0.97 }}
                        onClick={step < 2 ? handleNext : handleSubmit}
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2
                              size={16}
                              className="animate-spin"
                              style={{ color: ACCENT }}
                            />
                            <span>Transmitting...</span>
                          </>
                        ) : step < 2 ? (
                          <>
                            <span>Continue</span>
                            <ArrowRight
                              size={15}
                              className="transition-transform duration-300 group-hover:translate-x-1"
                            />
                          </>
                        ) : (
                          <>
                            <Send size={15} />
                            <span>Submit Inquiry</span>
                          </>
                        )}

                        {/* Hover fill */}
                        <div
                          className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                          style={{
                            background: `linear-gradient(135deg, ${ACCENT}10, ${ACCENT}05)`,
                          }}
                        />
                      </motion.button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Bottom glow line */}
            <div
              className="absolute bottom-0 left-0 right-0 h-[1px]"
              style={{
                background: `linear-gradient(90deg, transparent, ${ACCENT}15, transparent)`,
              }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
