# PowerPoint (PPT) Integration Guide

This project uses `pptxgenjs` to generate PowerPoint presentations directly in the browser.

## How it Works

1.  **Library Loading**:
    *   We load `pptxgenjs` via a CDN script in `app/layout.tsx` using `next/script`.
    *   This avoids server-side build issues with Node.js built-ins (`fs`, `https`) that `pptxgenjs` tries to use.
    *   The library is available globally as `window.PptxGenJS`.

2.  **Generator Function**:
    *   Located in `lib/ppt-generator.ts`.
    *   Checks for `window.PptxGenJS` before running.
    *   Creates a new presentation instance.
    *   Defines a Master Slide for consistent branding (header/footer).
    *   Adds slides for Title, About Us, Sustainability, Collections, and Contact.
    *   Uses data from `lib/data.ts` to populate the Collections slide dynamically.

3.  **Usage**:
    *   Import `generateCompanyPresentation` from `@/lib/ppt-generator`.
    *   Call it in an `onClick` handler (e.g., on a button).
    *   Wrap in a try/catch block to handle errors and show toast notifications.

## Adding New Slides

To add a new slide, modify `lib/ppt-generator.ts`:

```typescript
// Create a new slide using the Master template
const slide = pptx.addSlide({masterName: 'MASTER_SLIDE'});

// Add a title
slide.addText('New Slide Title', {
  x: 0.5, y: 1.0, w: '90%', h: 0.5,
  fontSize: 32, color: '0F172A', fontFace: 'Times New Roman', bold: true
});

// Add content (Text, Shapes, Images, Charts, Tables)
slide.addText('Content goes here...', {
  x: 0.5, y: 2.0, w: 8, h: 1, fontSize: 14, color: '334155'
});
```

## Troubleshooting

*   **"PptxGenJS not loaded"**: Ensure the CDN script in `app/layout.tsx` has loaded. The script uses `strategy="lazyOnload"`, so it might take a moment after initial page load.
*   **Build Errors**: If you see errors about `fs` or `https` during build, ensure you are NOT importing `pptxgenjs` directly at the top level of your files. Use the `window.PptxGenJS` approach.
