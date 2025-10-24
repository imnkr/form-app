import React, { useState } from 'react';
import type { FormEvent, ChangeEvent } from 'react';

export interface FormField {
  name: string;
  label: string;
  type:
    | 'text'
    | 'email'
    | 'password'
    | 'number'
    | 'select'
    | 'textarea'
    | 'date'
    | 'checkbox'
    | 'dropdown'
    | 'multiselect';
  options?: string[];
  required?: boolean;
  placeholder?: string;
  validation?: { pattern?: string; message?: string };
}

export interface FormConfig {
  title: string;
  fields: FormField[];
  submitButtonText?: string;
}

interface DynamicFormProps {
  config: FormConfig;
  onSubmit: (formData: Record<string, unknown>) => void;
}

const DynamicForm: React.FC<DynamicFormProps> = ({ config, onSubmit }) => {
  const [formData, setFormData] = useState<Record<string, unknown>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  const getKey = (field: FormField) => field.name;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    for (const field of config.fields) {
      const key = getKey(field);
      const value = formData[key];

      if (field.required) {
        if (field.type === 'multiselect') {
          if (!Array.isArray(value) || value.length === 0) {
            newErrors[key] = `${field.label} is required`;
            continue;
          }
        } else if (field.type === 'checkbox') {
          if (value !== true) {
            newErrors[key] = `${field.label} is required`;
            continue;
          }
        } else if (!value && value !== 0) {
          newErrors[key] = `${field.label} is required`;
          continue;
        }
      }

      if (field.validation?.pattern && typeof value === 'string') {
        try {
          const re = new RegExp(field.validation.pattern);
          if (!re.test(value)) {
            newErrors[key] = field.validation.message || `${field.label} is invalid`;
          }
        } catch {
          newErrors[key] = `Invalid validation pattern for ${field.label}`;
        }
      }
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    onSubmit(formData);
  };

  const handleChangeEvent = (
    field: FormField,
    e: ChangeEvent<HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const key = getKey(field);

    if (field.type === 'checkbox') {
      setFormData(prev => ({ ...prev, [key]: (e.target as HTMLInputElement).checked }));
      setErrors(prev => { const c = { ...prev }; delete c[key]; return c; });
      return;
    }

    if (field.type === 'multiselect') {
      const select = e.target as HTMLSelectElement;
      const selected = Array.from(select.selectedOptions).map(o => o.value);
      setFormData(prev => ({ ...prev, [key]: selected }));
      setErrors(prev => { const c = { ...prev }; delete c[key]; return c; });
      return;
    }

    setFormData(prev => ({ ...prev, [key]: e.target.value }));
    setErrors(prev => { const c = { ...prev }; delete c[key]; return c; });
  };

  return (
    <form onSubmit={handleSubmit} className="dynamic-form" noValidate>
      <h2>{config.title}</h2>

      {config.fields.map((field) => {
        const key = getKey(field);
        const value = formData[key];
        const error = errors[key];

        const renderType = field.type === 'dropdown' ? 'select' : field.type;

        return (
        <div key={key} className="form-field">
      <label htmlFor={key}>{field.label}{field.required ? ' *' : ''}</label>

            {renderType === 'select' && field.options ? (
              <select
                id={key}
                value={String(value ?? '')}
                onChange={(e) => handleChangeEvent(field, e)}
                required={field.required}
              >
                <option value="">Select an option</option>
                {field.options.map(opt => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            ) : renderType === 'multiselect' ? (
              <select
                id={key}
                multiple
                value={(Array.isArray(value) ? value : []) as string[]}
                onChange={(e) => handleChangeEvent(field, e)}
                required={field.required}
              >
                {field.options?.map(opt => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            ) : renderType === 'textarea' ? (
              <textarea
                id={key}
                value={String(value ?? '')}
                onChange={(e) => handleChangeEvent(field, e)}
                placeholder={field.placeholder}
                required={field.required}
              />
            ) : renderType === 'checkbox' ? (
              <input
                id={key}
                type="checkbox"
                checked={Boolean(value)}
                onChange={(e) => handleChangeEvent(field, e)}
              />
            ) : renderType === 'date' ? (
              <input
                id={key}
                type="date"
                value={String(value ?? '')}
                onChange={(e) => handleChangeEvent(field, e)}
                required={field.required}
              />
            ) : (
              <input
                id={key}
                type={renderType as unknown as React.HTMLInputTypeAttribute}
                value={String(value ?? '')}
                onChange={(e) => handleChangeEvent(field, e)}
                placeholder={field.placeholder}
                required={field.required}
              />
            )}

            {error && <div style={{ color: 'crimson', marginTop: 6 }}>{error}</div>}
          </div>
        );
      })}

      <button type="submit">
        {config.submitButtonText || 'Submit'}
      </button>
    </form>
  );
};

export default DynamicForm;