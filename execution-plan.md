# CodeCartographer - Epic 1 Execution Plan

## Project Overview
**Epic 1: The Cartographer** - Build the foundational multi-layered visualization of the codebase

## Tech Stack Decisions
- ✅ **Zustand** for state management (simpler than Redux, more powerful than Context)
- ❌ **No file watching** (user will manually trigger scans)
- ✅ **Babel parser** for AST generation and dependency extraction
- ✅ **D3-force** for graph layout and visualization
- ✅ **pnpm workspace** monorepo structure
- ✅ **Electron + React + Vite** for desktop app
- ✅ **TypeScript** with strict mode

## Architecture
```
packages/
├── core/           # Pure TypeScript - no UI dependencies
│   ├── parser/     # AST parsing & dependency extraction
│   ├── scanner/    # Project traversal & graph building
│   └── types/      # Shared interfaces
├── app/            # Electron + React + D3
│   ├── main/       # Electron main process
│   ├── renderer/   # React UI + D3 visualization
│   └── shared/     # IPC communication
└── cli/            # Command line interface (future)
```

## Execution Plan: 32 Atomic Tasks

### PHASE 1A: Foundation Setup (Tasks 1-12)

#### Task 1: Setup Monorepo ✅ COMPLETED
- **Objective:** Initialize pnpm workspace with packages/core and packages/app
- **Deliverable:** Working pnpm workspace structure
- **Time Estimate:** 30 minutes
- **Success Criteria:** `pnpm install` works, workspace commands function
- **Status:** ✅ Completed - pnpm workspace setup with packages/core and packages/app configured

#### Task 2: Setup Core Package ✅ COMPLETED
- **Objective:** Setup packages/core with TypeScript, Babel dependencies, and build scripts
- **Deliverable:** Core package with TypeScript config, Babel parser, build system
- **Time Estimate:** 45 minutes
- **Success Criteria:** Core package builds successfully, Babel parser imports work
- **Status:** ✅ Completed - TypeScript config, Babel parser, Jest testing, build system working

#### Task 3: Setup App Package
- **Objective:** Setup packages/app with Electron, React, Vite, D3, Zustand dependencies
- **Deliverable:** App package with all UI dependencies configured
- **Time Estimate:** 45 minutes
- **Success Criteria:** App package builds, Electron window opens, React renders

#### Task 4: Create Types Interfaces
- **Objective:** Create core/src/types.ts with Node, Edge, ProjectGraph interfaces
- **Deliverable:** Complete TypeScript interfaces for graph data structures
- **Time Estimate:** 30 minutes
- **Success Criteria:** All interfaces compile, match specification requirements

#### Task 5: Implement File Parser
- **Objective:** Create parseFile() function using Babel parser to extract imports/exports
- **Deliverable:** Function that takes file path, returns import/export data
- **Time Estimate:** 2 hours
- **Success Criteria:** Parses JS/TS/JSX/TSX files, extracts all import statements

#### Task 6: Implement Project Scanner
- **Objective:** Create scanProject() function to recursively parse all JS/TS files
- **Deliverable:** Function that builds complete file-to-file dependency graph
- **Time Estimate:** 2 hours
- **Success Criteria:** Scans entire project, builds JSON graph structure

#### Task 7: Implement Folder Aggregator
- **Objective:** Create aggregateToFolders() function to convert file graph to folder graph
- **Deliverable:** Function that creates folder-level dependency graph
- **Time Estimate:** 1.5 hours
- **Success Criteria:** Converts file graph to folder graph, maintains relationships

#### Task 8: Setup Electron Main
- **Objective:** Create Electron main process with basic window setup
- **Deliverable:** Electron app that opens window and loads React app
- **Time Estimate:** 45 minutes
- **Success Criteria:** Electron window opens, loads React app successfully

#### Task 9: Setup React App
- **Objective:** Create React app with Vite, basic routing, and component structure
- **Deliverable:** React app with basic component structure
- **Time Estimate:** 45 minutes
- **Success Criteria:** React app renders, basic routing works

#### Task 10: Setup Zustand Store
- **Objective:** Create Zustand store for graph data, current view state, and navigation
- **Deliverable:** Zustand store with all required state management
- **Time Estimate:** 1 hour
- **Success Criteria:** Store manages graph data, view state, navigation state

#### Task 11: Create Basic D3 Component
- **Objective:** Create D3Graph component with basic force simulation and node rendering
- **Deliverable:** React component that renders D3 force-directed graph
- **Time Estimate:** 2 hours
- **Success Criteria:** D3 graph renders with nodes and edges, force simulation works

#### Task 12: Integrate Core with App
- **Objective:** Connect core scanner to app and render basic hairball graph
- **Deliverable:** End-to-end integration showing project dependency graph
- **Time Estimate:** 1 hour
- **Success Criteria:** App loads project, scans dependencies, renders graph

### PHASE 1B: Basic Visualization (Tasks 13-20)

#### Task 13: Implement Pan Zoom
- **Objective:** Add pan and zoom functionality to D3 graph using d3-zoom
- **Deliverable:** Graph supports mouse wheel zoom and drag pan
- **Time Estimate:** 1 hour
- **Success Criteria:** Smooth pan/zoom interactions, no performance issues

#### Task 14: Implement Node Dragging
- **Objective:** Enable node dragging with d3-drag and update force simulation
- **Deliverable:** Nodes can be dragged, force simulation updates accordingly
- **Time Estimate:** 1 hour
- **Success Criteria:** Nodes drag smoothly, force simulation responds

#### Task 15: Style Nodes Edges
- **Objective:** Apply visual styling to nodes (folders vs files) and edges (internal/external)
- **Deliverable:** Visually distinct styling for different node/edge types
- **Time Estimate:** 1 hour
- **Success Criteria:** Clear visual distinction between folder/file nodes, edge types

#### Task 16: Add Hover Tooltips
- **Objective:** Implement hover tooltips showing file/folder paths
- **Deliverable:** Tooltips appear on hover with node information
- **Time Estimate:** 45 minutes
- **Success Criteria:** Tooltips show on hover, display correct path information

#### Task 17: Create Details Panel
- **Objective:** Create DetailsPanel component for showing node information
- **Deliverable:** Sidebar panel that displays selected node details
- **Time Estimate:** 1 hour
- **Success Criteria:** Panel opens/closes, displays node information

#### Task 18: Implement Node Selection
- **Objective:** Add click handlers for node selection and details panel updates
- **Deliverable:** Clicking nodes selects them and updates details panel
- **Time Estimate:** 45 minutes
- **Success Criteria:** Node selection works, details panel updates correctly

#### Task 19: Add Import Export Lists
- **Objective:** Show file imports and exports in details panel
- **Deliverable:** Details panel displays import/export information for files
- **Time Estimate:** 1 hour
- **Success Criteria:** Import/export lists display correctly in details panel

#### Task 20: Implement Breadcrumb Nav
- **Objective:** Create BreadcrumbNav component for navigation hierarchy
- **Deliverable:** Breadcrumb component showing current navigation path
- **Time Estimate:** 45 minutes
- **Success Criteria:** Breadcrumbs display current path, clickable navigation

### PHASE 1C: Drill-Down Navigation (Tasks 21-28)

#### Task 21: Implement Double Click Drill
- **Objective:** Add double-click handler to transition from folder view to file view
- **Deliverable:** Double-clicking folders drills down to show contents
- **Time Estimate:** 1.5 hours
- **Success Criteria:** Double-click transitions work, view updates correctly

#### Task 22: Implement View State Management
- **Objective:** Update Zustand store to handle current view level and active directory
- **Deliverable:** Store manages view hierarchy and navigation state
- **Time Estimate:** 1 hour
- **Success Criteria:** View state persists, navigation state managed correctly

#### Task 23: Implement External Folder Collapsing
- **Objective:** Create collapsed nodes for external folder dependencies
- **Deliverable:** External dependencies shown as collapsed folder nodes
- **Time Estimate:** 1.5 hours
- **Success Criteria:** External folders appear as collapsed nodes, clickable

#### Task 24: Implement Breadcrumb Navigation
- **Objective:** Make breadcrumb clickable to navigate back up hierarchy
- **Deliverable:** Breadcrumb navigation allows going back up hierarchy
- **Time Estimate:** 1 hour
- **Success Criteria:** Breadcrumb clicks navigate back, view updates correctly

#### Task 25: Add Folder File Icons
- **Objective:** Add visual icons to distinguish folders from files
- **Deliverable:** Clear visual distinction between folders and files
- **Time Estimate:** 45 minutes
- **Success Criteria:** Icons clearly distinguish folder vs file nodes

#### Task 26: Implement Smooth Transitions
- **Objective:** Add smooth animations between view transitions
- **Deliverable:** Smooth animations when transitioning between views
- **Time Estimate:** 1 hour
- **Success Criteria:** Transitions are smooth, no jarring changes

#### Task 27: Handle Edge Cases Navigation
- **Objective:** Handle edge cases like empty folders, circular dependencies
- **Deliverable:** Robust handling of edge cases in navigation
- **Time Estimate:** 1 hour
- **Success Criteria:** Edge cases handled gracefully, no crashes

#### Task 28: Add Loading States
- **Objective:** Add loading indicators during graph transitions
- **Deliverable:** Loading indicators during view transitions
- **Time Estimate:** 45 minutes
- **Success Criteria:** Loading states show during transitions, good UX

### PHASE 1D: Workspace Integration & Polish (Tasks 29-32)

#### Task 29: Implement VS Code Integration
- **Objective:** Add double-click file opening in VS Code using child_process
- **Deliverable:** Double-clicking files opens them in VS Code
- **Time Estimate:** 1 hour
- **Success Criteria:** Files open in VS Code when double-clicked

#### Task 30: Add Project Open Dialog
- **Objective:** Create File > Open Project menu and folder selection dialog
- **Deliverable:** Menu option to open project folders
- **Time Estimate:** 1 hour
- **Success Criteria:** File menu works, folder selection dialog opens

#### Task 31: Implement Error Handling
- **Objective:** Add comprehensive error handling for parsing and file operations
- **Deliverable:** Robust error handling throughout the application
- **Time Estimate:** 1.5 hours
- **Success Criteria:** Errors handled gracefully, user feedback provided

#### Task 32: Add Performance Optimization
- **Objective:** Optimize for large codebases with virtualization and lazy loading
- **Deliverable:** Performance optimizations for large projects
- **Time Estimate:** 2 hours
- **Success Criteria:** Handles 1000+ files without performance issues

## Success Metrics
- **Functional:** All 5 Epic 1 features working end-to-end
- **Performance:** Handle 1000+ files without lag
- **UX:** Smooth 60fps interactions
- **Quality:** 90%+ test coverage on core logic

## Risk Mitigation
- **D3 Learning Curve:** Start with simple examples, build incrementally
- **Large Codebase Performance:** Implement virtualization, lazy loading
- **Cross-platform File Paths:** Use Node.js path utilities
- **Babel Parsing Edge Cases:** Comprehensive test cases

## Total Estimated Time: 40-45 hours
## Target Completion: 4 weeks (10-12 hours/week)

---
*Created: [Current Date]*
*Last Updated: [Current Date]*
*Status: Ready for Execution*
