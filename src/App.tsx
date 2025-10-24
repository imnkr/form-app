import './App.css'
import DynamicForm from './components/DynamicForm'
import './components/DynamicForm.css'
import type { FormConfig } from './components/DynamicForm'

function App() {
  const formConfig: FormConfig = {
    title: "User Registration",
    fields: [
      { label: "Full Name", name: "fullName", type: "text", required: true },
      {
        label: "Email",
        name: "email",
        type: "text",
        required: true,
        validation: { pattern: '^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$', message: 'Invalid email address' }
      },
      { label: "Date of Birth", name: "dob", type: "date" },
      { label: "Gender", name: "gender", type: "dropdown", options: ["Male", "Female", "Other"], required: true },
      { label: "Hobbies", name: "hobbies", type: "multiselect", options: ["Reading", "Sports", "Music", "Travel"] },
      { label: "Subscribe to newsletter", name: "subscribe", type: "checkbox" },
      { label: "About Yourself", name: "about", type: "textarea" }
    ],
    submitButtonText: "Register"
  };

  const handleSubmit = (formData: Record<string, unknown>) => {
    console.log('Form submitted:', formData);
  };

  return (
    <div className="app">
      <DynamicForm config={formConfig} onSubmit={handleSubmit} />
    </div>
  )
}

export default App
