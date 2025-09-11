import React, { useState } from 'react';
import { useI18n } from '../contexts/I18nContext';
import './Contact.css';

const Contact = () => {
  const { t } = useI18n();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    serviceType: '',
    projectType: '',
    budget: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [errors, setErrors] = useState({});

  // Email configuration - easily changeable
  const destinationEmail = 'amesaedits01@gmail.com';
  const webhookUrl = 'https://formspree.io/f/your-form-id'; // Replace with actual endpoint

  const validateField = (name, value) => {
    const newErrors = { ...errors };

    switch (name) {
      case 'name':
        if (!value.trim()) {
          newErrors.name = 'Name is required';
        } else {
          delete newErrors.name;
        }
        break;
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value.trim()) {
          newErrors.email = 'Email is required';
        } else if (!emailRegex.test(value)) {
          newErrors.email = 'Please enter a valid email';
        } else {
          delete newErrors.email;
        }
        break;
      case 'serviceType':
        if (!value) {
          newErrors.serviceType = 'Service type is required';
        } else {
          delete newErrors.serviceType;
        }
        break;
      case 'projectType':
        if (!value) {
          newErrors.projectType = 'Project type is required';
        } else {
          delete newErrors.projectType;
        }
        break;
      case 'budget':
        if (!value) {
          newErrors.budget = 'Budget is required';
        } else {
          delete newErrors.budget;
        }
        break;
      case 'message':
        if (!value.trim()) {
          newErrors.message = 'Project description is required';
        } else {
          delete newErrors.message;
        }
        break;
      default:
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear submit status when user starts typing
    if (submitStatus) {
      setSubmitStatus(null);
    }
    
    // Validate field on change
    validateField(name, value);
  };

  const createMailtoLink = () => {
    const subject = encodeURIComponent(`New Project Inquiry from ${formData.name}`);
    const body = encodeURIComponent(`
Name: ${formData.name}
Email: ${formData.email}
Service Type: ${t(`contact.serviceTypes.${formData.serviceType}`)}
Project Type: ${t(`contact.projectTypes.${formData.projectType}`)}
Budget: ${t(`contact.budgetRanges.${formData.budget}`)}

Project Description:
${formData.message}
    `);
    
    return `mailto:${destinationEmail}?subject=${subject}&body=${body}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    // Validate all fields
    const validations = [
      validateField('name', formData.name),
      validateField('email', formData.email),
      validateField('serviceType', formData.serviceType),
      validateField('projectType', formData.projectType),
      validateField('budget', formData.budget),
      validateField('message', formData.message)
    ];

    if (!validations.every(v => v)) {
      setIsSubmitting(false);
      return;
    }

    try {
      // Try webhook first, fallback to mailto
      if (webhookUrl && !webhookUrl.includes('your-form-id')) {
        const response = await fetch(webhookUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...formData,
            to: destinationEmail,
            subject: `New Project Inquiry from ${formData.name}`,
            serviceTypeLabel: t(`contact.serviceTypes.${formData.serviceType}`),
            projectTypeLabel: t(`contact.projectTypes.${formData.projectType}`),
            budgetLabel: t(`contact.budgetRanges.${formData.budget}`)
          })
        });

        if (response.ok) {
          setSubmitStatus('success');
          setFormData({ name: '', email: '', serviceType: '', projectType: '', budget: '', message: '' });
        } else {
          throw new Error('Network response was not ok');
        }
      } else {
        // Fallback to mailto
        window.location.href = createMailtoLink();
        setSubmitStatus('success');
        setFormData({ name: '', email: '', serviceType: '', projectType: '', budget: '', message: '' });
      }
    } catch (error) {
      console.error('Form submission error:', error);
      // Fallback to mailto on error
      window.location.href = createMailtoLink();
      setSubmitStatus('success');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="contact-section">
      <div className="contact-container">
        <h2 className="contact-title" data-i18n="contact.title">{t('contact.title')}</h2>
        
        <form onSubmit={handleSubmit} className="contact-form" noValidate>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="name" className="form-label" data-i18n="contact.form.name">
                {t('contact.form.name')}
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className={`form-input ${errors.name ? 'error' : ''}`}
                placeholder={t('contact.form.name')}
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? 'name-error' : undefined}
              />
              {errors.name && (
                <span id="name-error" className="error-message" role="alert">
                  {errors.name}
                </span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="email" className="form-label" data-i18n="contact.form.email">
                {t('contact.form.email')}
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`form-input ${errors.email ? 'error' : ''}`}
                placeholder={t('contact.form.email')}
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? 'email-error' : undefined}
              />
              {errors.email && (
                <span id="email-error" className="error-message" role="alert">
                  {errors.email}
                </span>
              )}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="serviceType" className="form-label" data-i18n="contact.form.serviceType">
                {t('contact.form.serviceType')}
              </label>
              <select
                id="serviceType"
                name="serviceType"
                value={formData.serviceType}
                onChange={handleInputChange}
                className={`form-input ${errors.serviceType ? 'error' : ''}`}
                aria-invalid={!!errors.serviceType}
                aria-describedby={errors.serviceType ? 'serviceType-error' : undefined}
              >
                <option value="">{t('contact.form.serviceType')}</option>
                <option value="videoEditing" data-i18n="contact.serviceTypes.videoEditing">
                  {t('contact.serviceTypes.videoEditing')}
                </option>
                <option value="motionGraphics" data-i18n="contact.serviceTypes.motionGraphics">
                  {t('contact.serviceTypes.motionGraphics')}
                </option>
                <option value="logoAnimation" data-i18n="contact.serviceTypes.logoAnimation">
                  {t('contact.serviceTypes.logoAnimation')}
                </option>
                <option value="socialMedia" data-i18n="contact.serviceTypes.socialMedia">
                  {t('contact.serviceTypes.socialMedia')}
                </option>
              </select>
              {errors.serviceType && (
                <span id="serviceType-error" className="error-message" role="alert">
                  {errors.serviceType}
                </span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="projectType" className="form-label" data-i18n="contact.form.projectType">
                {t('contact.form.projectType')}
              </label>
              <select
                id="projectType"
                name="projectType"
                value={formData.projectType}
                onChange={handleInputChange}
                className={`form-input ${errors.projectType ? 'error' : ''}`}
                aria-invalid={!!errors.projectType}
                aria-describedby={errors.projectType ? 'projectType-error' : undefined}
              >
                <option value="">{t('contact.form.projectType')}</option>
                <option value="reel" data-i18n="contact.projectTypes.reel">
                  {t('contact.projectTypes.reel')}
                </option>
                <option value="advertisement" data-i18n="contact.projectTypes.advertisement">
                  {t('contact.projectTypes.advertisement')}
                </option>
                <option value="productVideo" data-i18n="contact.projectTypes.productVideo">
                  {t('contact.projectTypes.productVideo')}
                </option>
                <option value="uiVideo" data-i18n="contact.projectTypes.uiVideo">
                  {t('contact.projectTypes.uiVideo')}
                </option>
                <option value="other" data-i18n="contact.projectTypes.other">
                  {t('contact.projectTypes.other')}
                </option>
              </select>
              {errors.projectType && (
                <span id="projectType-error" className="error-message" role="alert">
                  {errors.projectType}
                </span>
              )}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="budget" className="form-label" data-i18n="contact.form.budget">
              {t('contact.form.budget')}
            </label>
            <select
              id="budget"
              name="budget"
              value={formData.budget}
              onChange={handleInputChange}
              className={`form-input ${errors.budget ? 'error' : ''}`}
              aria-invalid={!!errors.budget}
              aria-describedby={errors.budget ? 'budget-error' : undefined}
            >
              <option value="">{t('contact.form.budget')}</option>
              <option value="under500" data-i18n="contact.budgetRanges.under500">
                {t('contact.budgetRanges.under500')}
              </option>
              <option value="500to1000" data-i18n="contact.budgetRanges.500to1000">
                {t('contact.budgetRanges.500to1000')}
              </option>
              <option value="1000to2500" data-i18n="contact.budgetRanges.1000to2500">
                {t('contact.budgetRanges.1000to2500')}
              </option>
              <option value="2500to5000" data-i18n="contact.budgetRanges.2500to5000">
                {t('contact.budgetRanges.2500to5000')}
              </option>
              <option value="over5000" data-i18n="contact.budgetRanges.over5000">
                {t('contact.budgetRanges.over5000')}
              </option>
              <option value="discuss" data-i18n="contact.budgetRanges.discuss">
                {t('contact.budgetRanges.discuss')}
              </option>
            </select>
            {errors.budget && (
              <span id="budget-error" className="error-message" role="alert">
                {errors.budget}
              </span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="message" className="form-label" data-i18n="contact.form.message">
              {t('contact.form.message')}
            </label>
            <textarea
              id="message"
              name="message"
              rows="6"
              value={formData.message}
              onChange={handleInputChange}
              className={`form-input ${errors.message ? 'error' : ''}`}
              placeholder={t('contact.form.message')}
              aria-invalid={!!errors.message}
              aria-describedby={errors.message ? 'message-error' : undefined}
            />
            {errors.message && (
              <span id="message-error" className="error-message" role="alert">
                {errors.message}
              </span>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="submit-button"
            data-i18n={isSubmitting ? "contact.form.sending" : "contact.form.submit"}
          >
            {isSubmitting ? t('contact.form.sending') : t('contact.form.submit')}
          </button>

          {submitStatus === 'success' && (
            <div className="success-message" role="alert" data-i18n="contact.form.success">
              {t('contact.form.success')}
            </div>
          )}

          {submitStatus === 'error' && (
            <div className="error-message form-error" role="alert" data-i18n="contact.form.error">
              {t('contact.form.error')}
            </div>
          )}
        </form>
      </div>
    </section>
  );
};

export default Contact;