# Procedural Zelij: Computational Jacquard Knitting

**Tubular Jacquard Generation | Algorithmic Design | Digital Fabrication**

This project implements a computational pipeline for generating complex Moroccan Zelij patterns and translating them into machine-knittable instructions (Knitout). It addresses the challenge of mapping rigorous geometric tilework onto the constrained grid of a weft-knitted structure while maintaining structural integrity and pattern definition.

## Technical Overview

The core of this project is a procedural generation engine that:
1.  **Pattern Synthesis**: Algorithmically generates families of Zelij patterns based on traditional geometric rules.
2.  **Tubular Jacquard Mapping**: Converts 2D pixel data into a double-bed tubular structure, managing float lengths and color separation automatically.
3.  **Knitout Generation**: Outputs low-level `.knitout` code compatible with industrial flat-bed knitting machines (e.g., Shima Seiki), providing direct control over racking, yarn carriers, and needle selection.

## Key Features

*   **Algorithmic Design**: Parametric generation of tile patterns.
*   **Fabrication-Aware**: Automated handling of knitting constraints (floats, stitch density).
*   **Direct Control**: Bypasses proprietary design software by generating machine code directly.

## Usage

running the generation script (requires Node.js):

```bash
node chamomile.js <input_pattern.png>
```

The output is a `.k` file ready for machine processing.

---
