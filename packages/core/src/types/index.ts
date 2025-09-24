// Core TypeScript interfaces for CodeCartographer

/**
 * Base interface for all graph nodes
 */
export interface Node {
  id: string; // Unique identifier (e.g., file path)
  label: string; // Display name (e.g., file name)
  type: 'file' | 'folder';
}

/**
 * Represents a file node in the dependency graph
 */
export interface FileNode extends Node {
  type: 'file';
  commitCount?: number; // For hotspot analysis (Git integration)
  topContributors?: string[]; // For ownership mapping (Git blame)
  imports?: string[]; // Direct imports from this file
  exports?: string[]; // Direct exports from this file
  size?: number; // File size in bytes
  lastModified?: Date; // Last modification date
}

/**
 * Represents a folder node in the dependency graph
 */
export interface FolderNode extends Node {
  type: 'folder';
  children?: string[]; // IDs of child nodes (files and subfolders)
  depth?: number; // Depth in the folder hierarchy
  isEmpty?: boolean; // Whether folder contains any files
}

/**
 * Represents an edge (dependency relationship) between nodes
 */
export interface Edge {
  source: string; // ID of the source node
  target: string; // ID of the target node
  type: 'internal' | 'external' | 'dev'; // Dependency type
  isViolation?: boolean; // For architectural rule violations
  weight?: number; // Strength of dependency (number of imports)
  label?: string; // Optional edge label for display
}

/**
 * Main graph data structure containing all nodes and edges
 */
export interface ProjectGraph {
  nodes: (FileNode | FolderNode)[];
  edges: Edge[];
  metadata?: {
    totalFiles: number;
    totalFolders: number;
    totalDependencies: number;
    lastScanned: Date;
    projectRoot: string;
  };
}

/**
 * Configuration for architectural rules
 */
export interface ArchitectureRule {
  from: string; // Source path pattern (e.g., "src/features/**")
  to: string; // Target path pattern (e.g., "src/core/**")
  allow: boolean; // Whether this dependency is allowed
  description?: string; // Human-readable description of the rule
}

/**
 * Architecture rules configuration file structure
 */
export interface ArchitectureRules {
  rules: ArchitectureRule[];
  metadata?: {
    version: string;
    lastUpdated: Date;
    description?: string;
  };
}

/**
 * View state for navigation and UI state management
 */
export interface ViewState {
  currentPath: string[]; // Breadcrumb path (e.g., ['src', 'components', 'ui'])
  viewLevel: 'folder' | 'file'; // Current view granularity
  selectedNodeId?: string; // Currently selected node
  zoomLevel: number; // Current zoom level
  panOffset: { x: number; y: number }; // Pan offset coordinates
}

/**
 * Parsed import/export information from a file
 */
export interface ParsedFileInfo {
  filePath: string;
  imports: {
    source: string; // Where the import comes from
    imported: string[]; // What is imported (default, named, namespace)
    type: 'static' | 'dynamic'; // Static import or dynamic import()
  }[];
  exports: {
    name: string; // Export name
    type: 'default' | 'named' | 'namespace'; // Export type
  }[];
  errors?: string[]; // Parsing errors if any
}

/**
 * Git analysis data for a file
 */
export interface GitFileAnalysis {
  filePath: string;
  commitCount: number; // Number of commits that modified this file
  topContributors: {
    author: string;
    commits: number;
    percentage: number;
  }[];
  lastModified: Date;
  linesAdded: number;
  linesDeleted: number;
}

/**
 * Project scanning options
 */
export interface ScanOptions {
  includePatterns?: string[]; // File patterns to include (default: ['**/*.{js,ts,jsx,tsx}'])
  excludePatterns?: string[]; // File patterns to exclude (default: ['node_modules/**', 'dist/**', '.git/**'])
  maxDepth?: number; // Maximum directory depth to scan
  includeGitAnalysis?: boolean; // Whether to include Git analysis
  includeFileSize?: boolean; // Whether to include file size information
}

/**
 * API response structure for project scanning
 */
export interface ScanResponse {
  success: boolean;
  graph?: ProjectGraph;
  error?: string;
  warnings?: string[];
  scanTime?: number; // Time taken to scan in milliseconds
}
