## Project Description

A website that explains Design Patterns and Object-Oriented Designs according to Lymeng Naret.

## Project Design

This diagram represents a high-level view of the architecture.

```mermaid
graph TD
    index_html["index.html"] -->|uses| style_css_common["style (CSS)"]

    index_html -->|depends on| js_data["javascript/data.js"]
    index_html -->|depends on| js_main["javascript/main.js"]
    index_html -->|depends on| js_pagination["javascript/pagination.js"]

    index_html -->|links to| ext_prism["Prism.js (Syntax Highlighting)"]
    index_html -->|links to| ext_mermaid["Mermaid.js (Diagrams)"]

    js_data -->|fetch from| json_data["persist/ (JSON Data)"]
    js_main -->|interacts with| js_pagination

    js_main -->|uses| python_scripts["python/ "]
    python_scripts -->|subdirectories| py_behavioral["python/behavioral/"]
    python_scripts -->|subdirectories| py_creational["python/creational/"]
    python_scripts -->|subdirectories| py_oods["python/oods/"]
    python_scripts -->|subdirectories| py_structural["python/structural/"]

    classDef html fill:#f9f,stroke:#333,stroke-width:4px;
    classDef css fill:#ccf,stroke:#333,stroke-width:4px;
    classDef js fill:#ffc,stroke:#333,stroke-width:4px;
    classDef json fill:#cfc,stroke:#333,stroke-width:4px;
    classDef python fill:#fcf,stroke:#333,stroke-width:4px;
    classDef ext fill:#cff,stroke:#333,stroke-width:4px;

    class index_html html;
    class style_css_common,style_css_main,style_css_toc css;
    class js_data,js_main,js_pagination js;
    class json_data json;
    class py_behavioral,py_creational,py_oods,py_structural python;
    class ext_prism,ext_mermaid ext;
```
