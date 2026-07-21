# Deploy the updated portfolio

The ready-to-upload production files are inside `dist/`.

## Fastest deployment method
1. Open `Nahid-Rahman/Nahid-Rahman.github.io` on GitHub.
2. Switch to the `gh-pages` branch.
3. Remove the existing published files from the branch root.
4. Upload the **contents inside `dist/`** directly into the branch root.
   - Upload `index.html`, `404.html`, `favicon.svg`, `.nojekyll`, `assets/`, and `cv/`.
   - Do **not** upload the parent `dist` folder itself.
5. Commit the upload. GitHub Pages will serve the updated build shortly afterward.

## Keep for future edits
Keep the project files outside `dist/` locally. Edit the source, run `npm run build`, then upload the new `dist/` contents to `gh-pages` again.

## Formspree note
The form endpoint is already connected. If Formspree asks to verify the recipient email after the first submission, complete that verification in the Formspree dashboard.
