import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FormField } from "../lib/supabase";
import { FileUpload } from "./FileUpload";
import { Loader2, CheckCircle2 } from "lucide-react";

interface FormRendererProps {
  fields: FormField[];
  onSubmit: (data: Record<string, any>) => void;
  submitLabel?: string;
  isSubmitting?: boolean;
  defaultValues?: Record<string, any>;
}

export function FormRenderer({
  fields,
  onSubmit,
  submitLabel = "Submit",
  isSubmitting = false,
  defaultValues = {},
}: FormRendererProps) {
  const [formData, setFormData] = useState<Record<string, any>>(defaultValues);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    setFormData(defaultValues);
  }, [defaultValues]);

  const handleChange = (fieldId: string, value: any) => {
    setFormData((prev) => ({ ...prev, [fieldId]: value }));
    if (errors[fieldId]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[fieldId];
        return newErrors;
      });
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    fields.forEach((field) => {
      const value = formData[field.id];
      if (field.required && (!value || value === "")) {
        newErrors[field.id] = `${field.label} is required`;
        return;
      }
      if (value && field.validation) {
        const { min, max, pattern, message } = field.validation;
        if (field.type === "number") {
          const numValue = Number(value);
          if (min !== undefined && numValue < min)
            newErrors[field.id] = message || `Minimum value is ${min}`;
          if (max !== undefined && numValue > max)
            newErrors[field.id] = message || `Maximum value is ${max}`;
        }
        if (["text", "textarea"].includes(field.type)) {
          if (min !== undefined && value.length < min)
            newErrors[field.id] = message || `Minimum length is ${min}`;
          if (max !== undefined && value.length > max)
            newErrors[field.id] = message || `Maximum length is ${max}`;
        }
        if (pattern) {
          const regex = new RegExp(pattern);
          if (!regex.test(value)) newErrors[field.id] = message || "Invalid format";
        }
      }
      if (field.type === "email" && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) newErrors[field.id] = "Invalid email address";
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3000);
    }
  };

  const baseInput =
    "w-full rounded-lg border border-gray-300 bg-white px-4 pt-4 pb-2 text-gray-900 placeholder-transparent focus:border-blue-500 focus:ring-2 focus:ring-blue-500 outline-none transition";

  const renderField = (field: FormField) => {
    const value = formData[field.id] || "";
    const hasError = !!errors[field.id];

    switch (field.type) {
      case "textarea":
        return (
          <textarea
            id={field.id}
            value={value}
            onChange={(e) => handleChange(field.id, e.target.value)}
            placeholder={field.placeholder || field.label}
            rows={4}
            required={field.required}
            className={`${baseInput} resize-none ${hasError ? "border-red-500 ring-red-400" : ""}`}
          />
        );
      case "select":
        return (
          <select
            id={field.id}
            value={value}
            onChange={(e) => handleChange(field.id, e.target.value)}
            required={field.required}
            className={`${baseInput} ${hasError ? "border-red-500 ring-red-400" : ""}`}
          >
            <option value="">Select an option</option>
            {field.options?.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        );
      case "radio":
        return (
          <div className="flex flex-wrap gap-3">
            {field.options?.map((option) => (
              <label
                key={option}
                className={`flex items-center gap-2 px-3 py-2 border rounded-lg cursor-pointer ${
                  value === option
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-300 hover:border-gray-400"
                }`}
              >
                <input
                  type="radio"
                  name={field.id}
                  value={option}
                  checked={value === option}
                  onChange={(e) => handleChange(field.id, e.target.value)}
                  className="text-blue-600 focus:ring-blue-500"
                />
                <span className="text-gray-700">{option}</span>
              </label>
            ))}
          </div>
        );
      case "checkbox":
        return (
          <div className="flex flex-wrap gap-3">
            {field.options?.map((option) => (
              <label key={option} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  value={option}
                  checked={(value as string[])?.includes(option) || false}
                  onChange={(e) => {
                    const currentValues = (value as string[]) || [];
                    const newValues = e.target.checked
                      ? [...currentValues, option]
                      : currentValues.filter((v) => v !== option);
                    handleChange(field.id, newValues);
                  }}
                  className="text-blue-600 focus:ring-blue-500 rounded"
                />
                <span className="text-gray-700">{option}</span>
              </label>
            ))}
          </div>
        );
      case "file":
        return <FileUpload onUpload={(url) => handleChange(field.id, url)} currentUrl={value} />;
      default:
        return (
          <input
            type={field.type}
            id={field.id}
            value={value}
            onChange={(e) => handleChange(field.id, e.target.value)}
            placeholder={field.placeholder || field.label}
            required={field.required}
            className={`${baseInput} ${hasError ? "border-red-500 ring-red-400" : ""}`}
          />
        );
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {fields.map((field) => {
        const hasError = !!errors[field.id];
        return (
          <div key={field.id} className="flex flex-col gap-1">
            <label htmlFor={field.id} className="text-gray-700 font-medium">
              {field.label}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </label>
            {renderField(field)}
            {hasError && <p className="text-red-600 text-sm">{errors[field.id]}</p>}
          </div>
        );
      })}

      <button
        type="submit"
        disabled={isSubmitting}
        className="flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 py-3 text-white font-semibold shadow hover:opacity-90 transition disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="animate-spin w-5 h-5" /> Submitting...
          </>
        ) : (
          submitLabel
        )}
      </button>

      {submitted && (
        <div className="flex items-center gap-2 text-green-600 justify-center font-medium mt-2">
          <CheckCircle2 className="w-5 h-5" /> Form submitted successfully!
        </div>
      )}
    </form>
  );
}
