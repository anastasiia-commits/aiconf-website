import { useState, type FormEvent } from 'react'
import './PreregisterForm.css'

interface FormErrors {
  name?: string
  country?: string
  company?: string
  role?: string
  email?: string
  linkedin?: string
  consent?: string
}

const FUNCTION_URL = import.meta.env.VITE_PREREGISTER_FUNCTION_URL || ''
const ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || ''

export default function PreregisterForm() {
  const [formData, setFormData] = useState({
    name: '',
    country: '',
    company: '',
    role: '',
    email: '',
    linkedin: '',
    marketing_consent: false,
  })
  const [consentChecked, setConsentChecked] = useState(false)
  const [errors, setErrors] = useState<FormErrors>({})
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [honeypot, setHoneypot] = useState('')

  function validate(): FormErrors {
    const errs: FormErrors = {}
    if (!formData.name.trim()) errs.name = 'Name is required'
    if (!formData.country.trim()) errs.country = 'Country is required'
    if (!formData.company.trim()) errs.company = 'Company / University is required'
    if (!formData.role.trim()) errs.role = 'Position is required'
    if (!formData.email.trim()) {
      errs.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errs.email = 'Please enter a valid email'
    }
    if (!consentChecked) errs.consent = 'You must consent to data processing'
    return errs
  }

  function handleChange(field: string, value: string) {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [field]: undefined }))
    }
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (honeypot) return

    const errs = validate()
    setErrors(errs)
    if (Object.keys(errs).length > 0) return

    setLoading(true)

    try {
      const res = await fetch(FUNCTION_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${ANON_KEY}`,
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          country: formData.country.trim(),
          company: formData.company.trim(),
          role: formData.role.trim(),
          email: formData.email.trim(),
          linkedin: formData.linkedin.trim(),
          marketing_consent: formData.marketing_consent,
        }),
      })

      if (res.ok) {
        setSuccess(true)
      } else {
        const data = await res.json().catch(() => null)
        if (res.status === 409) {
          setErrors({ email: data?.message || 'This email is already registered.' })
        } else {
          alert('Something went wrong. Please try again.')
        }
      }
    } catch {
      alert('Network error. Please check your connection and try again.')
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="prereg-wrap" id="preregister-form">
        <div className="prereg-success">
          <div className="success-icon" aria-hidden="true">&#10003;</div>
          <h3>You're on the list!</h3>
          <p>We'll notify you when tickets go on sale. Check your inbox for a confirmation.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="prereg-wrap" id="preregister-form">
      <div className="prereg-header">
        <h3>Pre-register Now</h3>
        <p>Fill in the form below to stay tuned and get the best pricing.</p>
      </div>

      <form onSubmit={handleSubmit} noValidate>
        {/* Honeypot */}
        <div className="form-hp" aria-hidden="true" tabIndex={-1}>
          <label htmlFor="website">Website</label>
          <input
            type="text"
            id="website"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            value={honeypot}
            onChange={e => setHoneypot(e.target.value)}
          />
        </div>

        <div className="form-grid">
          <div className="form-group">
            <label htmlFor="prereg-name" className="form-label">
              Name <span className="form-req" aria-label="required">*</span>
            </label>
            <input
              type="text"
              id="prereg-name"
              className={`form-input${errors.name ? ' input-error' : ''}`}
              required
              autoComplete="name"
              placeholder="Ada Lovelace"
              value={formData.name}
              onChange={e => handleChange('name', e.target.value)}
            />
            {errors.name && <span className="form-error" role="alert">{errors.name}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="prereg-email" className="form-label">
              Email <span className="form-req" aria-label="required">*</span>
            </label>
            <input
              type="email"
              id="prereg-email"
              className={`form-input${errors.email ? ' input-error' : ''}`}
              required
              autoComplete="email"
              placeholder="ada@example.com"
              value={formData.email}
              onChange={e => handleChange('email', e.target.value)}
            />
            {errors.email && <span className="form-error" role="alert">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="prereg-country" className="form-label">
              Country <span className="form-req" aria-label="required">*</span>
            </label>
            <input
              type="text"
              id="prereg-country"
              className={`form-input${errors.country ? ' input-error' : ''}`}
              required
              autoComplete="country-name"
              placeholder="Spain"
              value={formData.country}
              onChange={e => handleChange('country', e.target.value)}
            />
            {errors.country && <span className="form-error" role="alert">{errors.country}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="prereg-company" className="form-label">
              Company / University <span className="form-req" aria-label="required">*</span>
            </label>
            <input
              type="text"
              id="prereg-company"
              className={`form-input${errors.company ? ' input-error' : ''}`}
              required
              autoComplete="organization"
              placeholder="Babbage Analytics"
              value={formData.company}
              onChange={e => handleChange('company', e.target.value)}
            />
            {errors.company && <span className="form-error" role="alert">{errors.company}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="prereg-role" className="form-label">
              Position / Role <span className="form-req" aria-label="required">*</span>
            </label>
            <input
              type="text"
              id="prereg-role"
              className={`form-input${errors.role ? ' input-error' : ''}`}
              required
              autoComplete="organization-title"
              placeholder="ML Engineer"
              value={formData.role}
              onChange={e => handleChange('role', e.target.value)}
            />
            {errors.role && <span className="form-error" role="alert">{errors.role}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="prereg-linkedin" className="form-label">
              LinkedIn
            </label>
            <input
              type="url"
              id="prereg-linkedin"
              className="form-input"
              placeholder="linkedin.com/in/ada-lovelace"
              value={formData.linkedin}
              onChange={e => handleChange('linkedin', e.target.value)}
            />
          </div>
        </div>

        <div className="form-checkboxes">
          <label className="form-checkbox">
            <input
              type="checkbox"
              checked={consentChecked}
              onChange={e => {
                setConsentChecked(e.target.checked)
                if (e.target.checked && errors.consent) {
                  setErrors(prev => ({ ...prev, consent: undefined }))
                }
              }}
            />
            <span className="checkbox-mark" />
            <span className="checkbox-text">
              I consent to the collection and processing of my personal data for the purposes of
              registration and participation in the conference, in accordance with
              the <a href="/privacy" className="inline-link" target="_blank" rel="noopener noreferrer">Privacy Policy</a>.
              <span className="form-req" aria-label="required"> *</span>
            </span>
          </label>
          {errors.consent && <span className="form-error" role="alert">{errors.consent}</span>}

          <label className="form-checkbox">
            <input
              type="checkbox"
              checked={formData.marketing_consent}
              onChange={e => setFormData(prev => ({ ...prev, marketing_consent: e.target.checked }))}
            />
            <span className="checkbox-mark" />
            <span className="checkbox-text">
              I consent to receiving marketing communications, including information about future
              events and related activities.
              <span className="checkbox-hint"> You can unsubscribe at any time using the link in our emails.</span>
            </span>
          </label>
        </div>

        <button
          type="submit"
          className={`btn btn-primary btn-lg prereg-submit${loading ? ' is-loading' : ''}`}
          disabled={loading}
        >
          <span className="submit-text">Pre-register</span>
          {loading && <span className="submit-spinner" aria-label="Submitting..." />}
        </button>
      </form>
    </div>
  )
}
