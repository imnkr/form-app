# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:


---

## Quick Start — run the application

1. Open a terminal in the project root (where `package.json` is).
2. Install dependencies (only once):

```bash
npm install
```

3. Start the Vite dev server (development mode with HMR):

```bash
npm run dev
```

4. Open the URL printed by Vite (commonly http://localhost:5173) in your browser.

To create a production build and preview it locally:

```bash
npm run build
npm run preview
```

If you use yarn or pnpm, replace `npm` with `yarn`/`pnpm` in the commands above.

---

## Form JSON schema (what the component expects)

The dynamic form component expects a `FormConfig` object with this shape:

- `title` (string): form title shown above the fields.
- `fields` (array of field objects): each field has the following properties:
  - `name` (string) — required: the canonical identifier used as the form key.
  - `label` (string) — required: text shown next to the control.
  - `type` (string) — required: one of:
    - `text`, `email`, `password`, `number` — standard single-line inputs
    - `textarea` — multi-line text input
    - `select` or `dropdown` — single-choice select box
    - `multiselect` — multiple-choice select; value will be an array of strings
    - `date` — date input
    - `checkbox` — boolean input (true/false)
  - `options` (string[]) — required for `select`, `dropdown`, and `multiselect`; the list of option values/labels.
  - `required` (boolean) — optional: whether the field must be filled before submit.
  - `placeholder` (string) — optional: input placeholder text for text-like inputs.
  - `validation` (object) — optional: additional validation rules:
    - `pattern` (string) — a RegExp string to validate the value (used for text-like inputs)
    - `message` (string) — error message shown when pattern doesn't match

Notes about types and returned values:
- Single-choice inputs (`text`, `email`, `date`, `select`) return a `string`.
- `multiselect` returns a `string[]` (array of selected values).
- `checkbox` returns a `boolean`.

The component stores the submitted values as `Record<string, unknown>`; you should narrow/cast values when using them (for example, treat `hobbies` as `string[]`).

---

## Example JSON config

Here is a full example (this same example is used in the app's `App.tsx`):

```json
{
  "title": "User Registration",
  "fields": [
    { "label": "Full Name", "name": "fullName", "type": "text", "required": true },
    {
      "label": "Email",
      "name": "email",
      "type": "text",
      "required": true,
      "validation": { "pattern": "^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$", "message": "Invalid email address" }
    },
    { "label": "Date of Birth", "name": "dob", "type": "date" },
    { "label": "Gender", "name": "gender", "type": "dropdown", "options": ["Male", "Female", "Other"], "required": true },
    { "label": "Hobbies", "name": "hobbies", "type": "multiselect", "options": ["Reading", "Sports", "Music", "Travel"] },
    { "label": "Subscribe to newsletter", "name": "subscribe", "type": "checkbox" },
    { "label": "About Yourself", "name": "about", "type": "textarea" }
  ],
  "submitButtonText": "Register"
}
```

---

## Example output (what the handler receives on submit)

The `DynamicForm` passes a `Record<string, unknown>` to the `onSubmit` handler. For the example form above, if a user enters values and submits, you might see a logged object like:

```json
{
  # My Form App

  Minimal README with only the requested sections: how to run the app, the JSON schema the form accepts, and an example output.

  ## Steps to run the application

  1. Open a terminal in the project root (the folder that contains `package.json`).
  2. Install dependencies (run once):

  ```bash
  npm install
  ```

  3. Start the development server (Vite with HMR):

  ```bash
  npm run dev
  ```

  4. Open the URL printed by Vite (commonly http://localhost:5173) in your browser.

  Optional: build and preview a production bundle:

  ```bash
  npm run build
  npm run preview
  ```

  If you use `yarn` or `pnpm`, replace `npm` with the appropriate command.

  ---

  ## JSON schema format (what the component expects)

  The form component accepts a single JSON object with this shape:

  - `title` (string): the form title shown at the top.
  - `fields` (array): list of field objects. Each field object may contain:
    - `name` (string, required): the identifier used as the key in the submitted data.
    - `label` (string, required): text shown next to the field.
    - `type` (string, required): one of:
      - `text`, `email`, `password`, `number` — single-line inputs
      - `textarea` — multi-line input
      - `select` or `dropdown` — single-choice select
      - `multiselect` — multiple-choice select (value will be an array)
      - `date` — date input
      - `checkbox` — boolean input
    - `options` (array of strings): required for `select`, `dropdown`, and `multiselect` types.
    - `required` (boolean): optional, whether the field must be filled.
    - `placeholder` (string): optional placeholder for text-like inputs.
    - `validation` (object): optional validation rules:
      - `pattern` (string): regex to validate text-like values.
      - `message` (string): error message when pattern fails.

  Notes:
  - Values returned on submit are typed as `Record<string, unknown>`; you should narrow/cast them to the expected types (string, string[], boolean) before use.

  ---

  ## Example output

  Given a form configured like the example below, the object passed to the `onSubmit` handler might look like this:

  ```json
  {
    "fullName": "Alex Example",
    "email": "alex@example.com",
    "dob": "1990-05-01",
    "gender": "Other",
    "hobbies": ["Reading", "Music"],
    "subscribe": true,
    "about": "I love building forms."
  }
  ```

  - `hobbies` is an array because it's a multiselect.
  - `subscribe` is a boolean because it's a checkbox.

  If you want, I can add a short example `onSubmit` handler showing safe TypeScript narrowing for these fields.
      // other options...
    },
  },
])
```
