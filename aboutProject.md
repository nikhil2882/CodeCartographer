### **Product Requirements Document: Code Cartographer**

- **Project Title:** Code Cartographer
    
- **Version:** 1.2 (Detailed)
    
- **Status:** Vision & Engineering Handoff
    

### **1. Vision & Mission**

**1.1. The Problem:** Code is invisible architecture. Developers cannot see the connections, the stress points, or the historical evolution of their work. This blindness leads to slow onboarding, risky refactoring, and inevitable architectural decay.

**1.2. The Vision:** To create an indispensable tool for developers that transforms invisible codebases into living, interactive, and insightful maps.

**1.3. The Mission:** We will empower developers to navigate, understand, and improve their code architecture with confidence and clarity by visualizing dependencies, revealing historical patterns, and actively guarding architectural integrity.

### **2. Core Principles**

1. **Insight, Not Just Information:** The tool must interpret data for the user. A big node means "pay attention here." A red line means "this is a problem."
    
2. **Clarity by Default, Complexity on Demand:** The initial view is always the simplest. The user must actively choose to reveal more detail.
    
3. **Fluid Exploration:** The user experience should feel like exploring a physical map—panning, zooming, and drilling down should be effortless and instant.
    
4. **Workflow Native:** The tool must feel like a natural extension of the developer's environment (IDE, Git, CI/CD), not a separate destination.
    

### **3. Detailed Feature Specification**

This specification is broken down into four primary Epics, which will be executed in phases.

---

#### **EPIC 1: The Cartographer (The Foundational Map)**

**Goal:** To provide the core, multi-layered visualization of the codebase. This is the foundation of the entire product.

- **Feature 1.1: Hierarchical Dependency Graph**
    
    - **User Story:** As a developer, I want to see a high-level graph of folder dependencies so that I can understand the project's macro-architecture at a glance.
        
    - **Functional Requirements:**
        
        - Upon loading a repository, the default view will be the "Folder View."
            
        - Each node in this view represents a directory in the codebase.
            
        - An edge (a connecting line) will be drawn from Folder A to Folder B if any file within Folder A (or its subdirectories) imports any file from within Folder B.
            
        - The graph layout will be a force-directed graph, ensuring nodes dynamically arrange themselves to minimize overlap.
            
        - Nodes representing `node_modules`, `dist`, build output folders, and dot-folders (e.g., `.git`) will be excluded by default.
            
- **Feature 1.2: Interactive Graph Navigation**
    
    - **User Story:** As a developer, I want to fluidly navigate the graph so that I can explore the codebase intuitively.
        
    - **Functional Requirements:**
        
        - **Pan:** The user can click and drag on the background of the canvas to move the entire graph.
            
        - **Zoom:** The user can use the mouse wheel or trackpad to zoom in and out of the graph.
            
        - **Node Dragging:** The user can click and drag any node to manually reposition it. The connected edges will follow.
            
- **Feature 1.3: Drill-Down & Abstraction Layer**
    
    - **User Story:** As a developer, I want to drill down into a folder so that I can explore its internal file-level dependencies without losing context.
        
    - **Functional Requirements:**
        
        - Double-clicking a folder node will transition the view to show the contents of that folder.
            
        - The new view will display nodes representing the immediate files and sub-folders within the selected directory.
            
        - If a file inside this view imports from a file _outside_ the current folder scope (e.g., from `../utils/` or another top-level folder), the graph will show an edge pointing to a single, collapsed node representing that entire external folder (e.g., a "utils" node). Double-clicking this external node would then navigate the view to _that_ folder.
            
        - A persistent breadcrumb navigation UI element (e.g., `root > src > components`) must be visible, allowing the user to navigate back up the hierarchy with a single click.
            
- **Feature 1.4: Node & Edge Information**
    
    - **User Story:** As a developer, I want to get contextual information about any element on the graph just by interacting with it.
        
    - **Functional Requirements:**
        
        - **Hover:** Hovering over any node (file or folder) will display a tooltip showing its full, relative path.
            
        - **Single Click:** A single click on any node will select it and open a dedicated "Details Panel."
            
        - **Details Panel (Folder):** For a folder, the panel will display its name, path, and a list of files and sub-folders it contains.
            
        - **Details Panel (File):** For a file, the panel will display its name, path, a list of its direct imports, and a list of its direct exports.
            
- **Feature 1.5: Workspace Integration**
    
    - **User Story:** As a developer, I want to open a file in my IDE directly from the graph so I can seamlessly switch from exploration to editing.
        
    - **Functional Requirements:**
        
        - Double-clicking a **file** node will trigger a command to open that specific file in the user's default code editor (VS Code as the primary target).
            

---

#### **EPIC 2: The Detective (Temporal & Semantic Analysis)**

**Goal:** To layer historical and semantic context onto the map, revealing the hidden stories of the code.

- **Feature 2.1: Code Hotspot Visualization**
    
    - **User Story:** As a developer, I want to see "code hotspots" so I can immediately identify the most complex and frequently changed parts of the codebase.
        
    - **Functional Requirements:**
        
        - The system will analyze the project's Git history to count the number of commits for each file.
            
        - A toggleable "Hotspot View" mode will be available.
            
        - When enabled, the size of each file node will be directly proportional to its commit count. Alternatively, a color gradient (e.g., blue for cool, red for hot) can be used.
            
        - This allows users to instantly spot the files that are the biggest sources of churn and potential bugs.
            
- **Feature 2.2: Knowledge & Ownership Mapping**
    
    - **User Story:** As a developer, I want to know who the primary owners of a module are so I know who to ask for help or for a code review.
        
    - **Functional Requirements:**
        
        - When a node is selected, the "Details Panel" will include a new "Contributors" section.
            
        - This section will analyze `git blame` data for the selected file or folder.
            
        - It will display a list of the top 3-5 contributors, showing their name and a visual indicator (e.g., a bar chart) of their contribution percentage to that specific part of the codebase.
            
- **Feature 2.3: Architectural Evolution Viewer**
    
    - **User Story:** As a developer, I want to compare the architecture between two points in time so I can understand the impact of a new feature or refactor.
        
    - **Functional Requirements:**
        
        - A "Compare Mode" will be available.
            
        - The user will be able to select a "base" and a "compare" reference (e.g., two branches, two tags, or two commit hashes).
            
        - The graph will then render a "diff" view:
            
            - **New dependencies** (edges that exist in "compare" but not "base") will be colored **green**.
                
            - **Removed dependencies** (edges that exist in "base" but not "compare") will be colored **red**.
                
            - **Unchanged dependencies** will be colored gray.
                
        - This feature is critical for conducting architectural reviews on pull requests.
            

---

#### **EPIC 3: The Guardian (Architectural Enforcement)**

**Goal:** To transform the tool from a passive viewer into an active guardian of code quality and team standards.

- **Feature 3.1: The Architectural Rule Engine**
    
    - **User Story:** As a team lead, I want to define our architectural rules in a configuration file so that they can be version-controlled and shared.
        
    - **Functional Requirements:**
        
        - The tool will look for a specific file in the root of the repository (e.g., `cartographer.rules.json`).
            
        - This file will allow users to define dependency rules using path patterns.
            
        - Rules must support both `allowed` and `disallowed` dependencies.
            
        - Example rule: `{ "source": "src/features/*", "disallowed": ["src/core/database/*"] }` would forbid any feature module from directly importing from the database layer.
            
- **Feature 3.2: Real-time Violation Highlighting**
    
    - **User Story:** As a developer, I want to see architectural violations directly on the graph so I can get immediate feedback as I code.
        
    - **Functional Requirements:**
        
        - If a rules file is present, the tool will constantly validate the codebase against it.
            
        - Any edge on the graph that represents a dependency violating a "disallowed" rule will be visually highlighted (e.g., a thick, glowing **red** line).
            
        - Clicking on the violating edge will show in the "Details Panel" exactly which rule is being broken.
            
- **Feature 3.3: CI/CD Integration**
    
    - **User Story:** As a team, we want to automatically block pull requests that introduce architectural violations so we can prevent architectural decay.
        
    - **Functional Requirements:**
        
        - The tool will provide a command-line interface (CLI) version.
            
        - The CLI can be run in a CI/CD pipeline (e.g., GitHub Actions).
            
        - It will analyze the codebase against the `cartographer.rules.json` file.
            
        - If violations are found, the CLI will print a clear report of the violations and exit with a non-zero status code, causing the CI pipeline to fail.
            

---

#### **EPIC 4: The Oracle (AI-Powered Intelligence)**

**Goal:** To leverage AI to make code exploration effortless and predictive.

- **Feature 4.1: Natural Language Codebase Querying**
    
    - **User Story:** As a developer, I want to ask questions about my codebase in plain English so I can find what I need without manually searching.
        
    - **Functional Requirements:**
        
        - A prominent search bar will be available at the top of the UI.
            
        - The user can type natural language queries, such as:
            
            - "Show me all components that use the `useAuth` hook."
                
            - "What depends on `PaymentService.js`?"
                
            - "Where is the `calculatePrice` function defined and used?"
                
        - Upon entering a query, the graph will filter, highlight, or re-center to show the relevant subgraph that answers the question.
            
- **Feature 4.2: On-Demand AI Code Summarization**
    
    - **User Story:** As a developer, when I encounter a large, complex file, I want to get an instant summary of it so I can understand its purpose quickly.
        
    - **Functional Requirements:**
        
        - The user can right-click any file or folder node to bring up a context menu.
            
        - One of the options will be "Generate AI Summary."
            
        - Upon selection, the "Details Panel" will display a concise, AI-generated summary including:
            
            - The primary responsibility of the module.
                
            - Its key dependencies (both what it uses and what uses it).
                
            - A brief summary of its most recent significant changes.