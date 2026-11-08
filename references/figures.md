# Figures

> 中文版: [figures.zh.md](figures.zh.md)

## Rules

1. **Vector first**: PDF/SVG for plots and diagrams. Raster only when the source is
   inherently an image; note it in the caption if it is.
2. **One message per figure**. If the caption needs two "and", split the figure.
3. **Caption = takeaway**, not panel inventory. First sentence: what the reader
   should conclude. Then enough method to read the axes.
4. **Check at 100%**: render the page and read the smallest tick label. If it is
   illegible, the figure is too large for its content, not too small on the page.
5. **Figure size is page budget**: shrinking a figure buys lines; it also shrinks
   every font inside. Prefer cutting prose or table spacing first.
6. **Fonts in the figure**: match the paper (Times-like); avoid bold everywhere;
   keep tick labels >= 7 pt at final size.
7. **Color**: use a perceptually ordered palette for magnitudes; do not encode a
   third variable in hue when a position works. Check grayscale printing.
8. **No duplicated in-figure legends** that the caption already states; overlapping
   labels are a defect, not a style.
9. **Reproduce from a script**: keep the plotting script in the repository and the
   data beside it. A figure that cannot be regenerated is a screenshot.
10. **Floats**: full-width figures are placed at page top/bottom by the class;
    two consecutive full-width figures on facing pages read as one block —
    separate them by a page of text when possible, but never at the cost of body
    readability.

## Workflow

- Sketch with placeholders; write the caption before the data.
- Generate at final width, not wider; scaling in LaTeX changes effective font size.
- After inserting, run the page audit (`scripts/page_audit.py`): page count,
  overfull boxes, figure pages.
- If two figures compete for the same page, decide which claim is central and
  move the other one page away.

## Related skills

- `schematic-figure` — concept/architecture diagrams as vector SVG/PDF.
- `dataviz` — chart form, color, and annotation rules.
- `pdf-figure-vector` — redraw an existing PDF figure as vector.
