import {
  Node,
  FileNode,
  FolderNode,
  Edge,
  ProjectGraph,
  ArchitectureRule,
  ArchitectureRules,
  ViewState,
  ParsedFileInfo,
  GitFileAnalysis,
  ScanOptions,
  ScanResponse
} from '../types';

describe('TypeScript Types', () => {
  it('should create valid Node instances', () => {
    const fileNode: FileNode = {
      id: 'src/components/Button.tsx',
      label: 'Button.tsx',
      type: 'file',
      commitCount: 15,
      topContributors: ['john.doe', 'jane.smith'],
      imports: ['react', './types'],
      exports: ['Button', 'ButtonProps'],
      size: 2048,
      lastModified: new Date()
    };

    const folderNode: FolderNode = {
      id: 'src/components',
      label: 'components',
      type: 'folder',
      children: ['src/components/Button.tsx', 'src/components/Input.tsx'],
      depth: 2,
      isEmpty: false
    };

    expect(fileNode.type).toBe('file');
    expect(folderNode.type).toBe('folder');
  });

  it('should create valid Edge instances', () => {
    const edge: Edge = {
      source: 'src/components/Button.tsx',
      target: 'src/utils/helpers.ts',
      type: 'internal',
      isViolation: false,
      weight: 3,
      label: 'imports helpers'
    };

    expect(edge.type).toBe('internal');
    expect(edge.weight).toBe(3);
  });

  it('should create valid ProjectGraph instances', () => {
    const graph: ProjectGraph = {
      nodes: [
        {
          id: 'src/components/Button.tsx',
          label: 'Button.tsx',
          type: 'file'
        },
        {
          id: 'src/components',
          label: 'components',
          type: 'folder'
        }
      ],
      edges: [
        {
          source: 'src/components/Button.tsx',
          target: 'src/utils/helpers.ts',
          type: 'internal'
        }
      ],
      metadata: {
        totalFiles: 1,
        totalFolders: 1,
        totalDependencies: 1,
        lastScanned: new Date(),
        projectRoot: '/path/to/project'
      }
    };

    expect(graph.nodes).toHaveLength(2);
    expect(graph.edges).toHaveLength(1);
    expect(graph.metadata?.totalFiles).toBe(1);
  });

  it('should create valid ArchitectureRules instances', () => {
    const rules: ArchitectureRules = {
      rules: [
        {
          from: 'src/features/**',
          to: 'src/core/**',
          allow: true,
          description: 'Features can depend on core'
        },
        {
          from: 'src/features/**',
          to: 'src/features/**',
          allow: false,
          description: 'Features cannot depend on each other'
        }
      ],
      metadata: {
        version: '1.0.0',
        lastUpdated: new Date(),
        description: 'Project architecture rules'
      }
    };

    expect(rules.rules).toHaveLength(2);
    expect(rules.rules[0].allow).toBe(true);
    expect(rules.rules[1].allow).toBe(false);
  });

  it('should create valid ViewState instances', () => {
    const viewState: ViewState = {
      currentPath: ['src', 'components', 'ui'],
      viewLevel: 'folder',
      selectedNodeId: 'src/components',
      zoomLevel: 1.0,
      panOffset: { x: 100, y: 200 }
    };

    expect(viewState.currentPath).toEqual(['src', 'components', 'ui']);
    expect(viewState.viewLevel).toBe('folder');
    expect(viewState.zoomLevel).toBe(1.0);
  });

  it('should create valid ParsedFileInfo instances', () => {
    const parsedInfo: ParsedFileInfo = {
      filePath: 'src/components/Button.tsx',
      imports: [
        {
          source: 'react',
          imported: ['React', 'useState'],
          type: 'static'
        },
        {
          source: './types',
          imported: ['ButtonProps'],
          type: 'static'
        }
      ],
      exports: [
        {
          name: 'Button',
          type: 'default'
        },
        {
          name: 'ButtonProps',
          type: 'named'
        }
      ],
      errors: []
    };

    expect(parsedInfo.imports).toHaveLength(2);
    expect(parsedInfo.exports).toHaveLength(2);
    expect(parsedInfo.imports[0].type).toBe('static');
  });

  it('should create valid GitFileAnalysis instances', () => {
    const gitAnalysis: GitFileAnalysis = {
      filePath: 'src/components/Button.tsx',
      commitCount: 15,
      topContributors: [
        {
          author: 'john.doe',
          commits: 10,
          percentage: 66.7
        },
        {
          author: 'jane.smith',
          commits: 5,
          percentage: 33.3
        }
      ],
      lastModified: new Date(),
      linesAdded: 150,
      linesDeleted: 50
    };

    expect(gitAnalysis.commitCount).toBe(15);
    expect(gitAnalysis.topContributors).toHaveLength(2);
    expect(gitAnalysis.topContributors[0].percentage).toBe(66.7);
  });

  it('should create valid ScanOptions instances', () => {
    const options: ScanOptions = {
      includePatterns: ['**/*.{js,ts,jsx,tsx}'],
      excludePatterns: ['node_modules/**', 'dist/**'],
      maxDepth: 10,
      includeGitAnalysis: true,
      includeFileSize: true
    };

    expect(options.includePatterns).toEqual(['**/*.{js,ts,jsx,tsx}']);
    expect(options.excludePatterns).toEqual(['node_modules/**', 'dist/**']);
    expect(options.includeGitAnalysis).toBe(true);
  });

  it('should create valid ScanResponse instances', () => {
    const response: ScanResponse = {
      success: true,
      graph: {
        nodes: [],
        edges: []
      },
      warnings: ['Some files could not be parsed'],
      scanTime: 1500
    };

    expect(response.success).toBe(true);
    expect(response.scanTime).toBe(1500);
    expect(response.warnings).toHaveLength(1);
  });
});
