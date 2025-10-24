# My Form App

## Steps to run the application

1. Open a terminal in the project root (the folder that contains `package.json`).
2. Install dependencies (run once):

  ```bash
  npm install
  ```

3. Start the development server:

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

- `title` (string): the form title.
- `fields` (array): list of field objects. Each field object may contain:
  - `name` (string, required): key in the submitted data.
  - `label` (string, required): text shown next to the field.
  - `type` (string, required): one of:
   - `text`, `email`, `password`, `number`
   - `textarea`
   - `select` or `dropdown`
   - `multiselect`
   - `date`
   - `checkbox`
  - `options` (array of strings): required for `select`, `dropdown`, and `multiselect`.
  - `required` (boolean): optional.
  - `placeholder` (string): optional.
  - `validation` (object): optional:
   - `pattern` (string): regex for validation.
   - `message` (string): error message.

Notes:
- Values returned on submit are typed as `Record<string, unknown>`; narrow/cast them to the expected types before use.

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

