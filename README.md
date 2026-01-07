# Zelix: Computational Zelij for Machine Knitting

This project focuses on the procedural generation of complex Moroccan Zelij patterns for tubular jacquard machine knitting. It leverages algorithmic design to map geometric tiles onto knit structures, specifically targeting the generation of `.knitout` files for industrial knitting machines (like Shima Seiki).

## Overview

Zelij is a style of mosaic tilework made from individually hand-chiseled geometric tiles set into a plaster base. This project translates the intricate symmetry and logic of traditional Moroccan tilework into the domain of computational fabrication.

## Features

- **Procedural Pattern Generation**: Algorithms to generate symmetric and complex geometric motifs.
- **Tubular Jacquard Mapping**: Specialized mapping for double-bed jacquard knitting to ensure structural integrity and pattern definition.
- **Knitout Output**: Direct generation of `.knitout` code for seamless fabrication.

## Files

- `chamomile.js`: The core procedural generation and knit-mapping script.
- `zellij.k`: A sample generated knitout file representing a complex pattern.
- `images/`: Visual references and generated pattern previews.

## Usage

The generation script requires Node.js and depends on common image processing libraries like `pngjs` for tile-based input (if used).

```bash
node chamomile.js <pattern_input.png>
```

---
*Developed as part of Marouan El-Asery's work in Computational Textiles.*
