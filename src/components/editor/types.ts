export interface SlideElement {
  id: string;
  type: 'text' | 'shape' | 'image' | 'chart' | 'icon';
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
  locked?: boolean;
  opacity?: number;
  content?: string;
  style?: {
    fontSize?: number;
    fontFamily?: string;
    fontWeight?: string;
    color?: string;
    backgroundColor?: string;
    borderRadius?: number;
    borderWidth?: number;
    borderColor?: string;
    textAlign?: 'left' | 'center' | 'right';
    lineHeight?: number;
    letterSpacing?: number;
    italic?: boolean;
    underline?: boolean;
  };
  shapeType?: 'rectangle' | 'circle' | 'triangle' | 'line' | 'arrow' | 'rounded-rectangle';
  chartType?: 'bar' | 'line' | 'pie';
  chartData?: { label: string; value: number; color?: string }[];
  chartColors?: string[];
  imageUrl?: string;
  imageFit?: 'cover' | 'contain' | 'fill';
}

export interface Slide {
  id: string;
  elements: SlideElement[];
  backgroundColor: string;
  backgroundGradient?: string;
  backgroundImage?: string;
}

export interface LayoutTemplate {
  id: string;
  name: string;
  elements: Omit<SlideElement, 'id'>[];
  thumbnail?: string;
}

export interface ThemePreset {
  id: string;
  name: string;
  colors: {
    primary: string;
    secondary: string;
    background: string;
    text: string;
    accent: string;
  };
  fonts: {
    heading: string;
    body: string;
  };
}

export interface UploadedAsset {
  id: string;
  name: string;
  url: string;
  type: 'image' | 'video';
  thumbnail?: string;
}

export interface EditorState {
  slides: Slide[];
  currentSlideIndex: number;
  selectedElementId: string | null;
  selectedElementIds: string[];
  zoom: number;
  history: Slide[][];
  historyIndex: number;
  clipboard: SlideElement | null;
}

export type ToolType = 
  | 'select'
  | 'text-heading'
  | 'text-subheading'
  | 'text-body'
  | 'shape-rectangle'
  | 'shape-circle'
  | 'shape-triangle'
  | 'shape-line'
  | 'shape-rounded-rectangle'
  | 'image'
  | 'chart-bar'
  | 'chart-line'
  | 'chart-pie';

export const CANVAS_WIDTH = 960;
export const CANVAS_HEIGHT = 540;

export const LAYOUT_TEMPLATES: LayoutTemplate[] = [
  {
    id: 'title-only',
    name: 'Title Only',
    elements: [
      {
        type: 'text',
        x: 80,
        y: 200,
        width: 800,
        height: 80,
        rotation: 0,
        content: 'Click to add title',
        style: {
          fontSize: 56,
          fontFamily: 'Space Grotesk',
          fontWeight: 'bold',
          color: '#1a1a2e',
          textAlign: 'center',
        },
      },
    ],
  },
  {
    id: 'title-subtitle',
    name: 'Title + Subtitle',
    elements: [
      {
        type: 'text',
        x: 80,
        y: 180,
        width: 800,
        height: 80,
        rotation: 0,
        content: 'Click to add title',
        style: {
          fontSize: 56,
          fontFamily: 'Space Grotesk',
          fontWeight: 'bold',
          color: '#1a1a2e',
          textAlign: 'center',
        },
      },
      {
        type: 'text',
        x: 120,
        y: 280,
        width: 720,
        height: 50,
        rotation: 0,
        content: 'Click to add subtitle',
        style: {
          fontSize: 24,
          fontFamily: 'DM Sans',
          fontWeight: 'normal',
          color: '#666666',
          textAlign: 'center',
        },
      },
    ],
  },
  {
    id: 'title-content',
    name: 'Title + Content',
    elements: [
      {
        type: 'text',
        x: 60,
        y: 40,
        width: 840,
        height: 60,
        rotation: 0,
        content: 'Slide Title',
        style: {
          fontSize: 40,
          fontFamily: 'Space Grotesk',
          fontWeight: 'bold',
          color: '#1a1a2e',
          textAlign: 'left',
        },
      },
      {
        type: 'text',
        x: 60,
        y: 120,
        width: 840,
        height: 380,
        rotation: 0,
        content: 'Add your content here. This area is perfect for bullet points, descriptions, or any text-based content you want to share with your audience.',
        style: {
          fontSize: 20,
          fontFamily: 'DM Sans',
          fontWeight: 'normal',
          color: '#444444',
          textAlign: 'left',
          lineHeight: 1.6,
        },
      },
    ],
  },
  {
    id: 'two-column',
    name: 'Two Column',
    elements: [
      {
        type: 'text',
        x: 60,
        y: 40,
        width: 840,
        height: 60,
        rotation: 0,
        content: 'Section Title',
        style: {
          fontSize: 40,
          fontFamily: 'Space Grotesk',
          fontWeight: 'bold',
          color: '#1a1a2e',
          textAlign: 'center',
        },
      },
      {
        type: 'text',
        x: 60,
        y: 120,
        width: 400,
        height: 380,
        rotation: 0,
        content: 'Left column content goes here.',
        style: {
          fontSize: 18,
          fontFamily: 'DM Sans',
          fontWeight: 'normal',
          color: '#444444',
          textAlign: 'left',
        },
      },
      {
        type: 'text',
        x: 500,
        y: 120,
        width: 400,
        height: 380,
        rotation: 0,
        content: 'Right column content goes here.',
        style: {
          fontSize: 18,
          fontFamily: 'DM Sans',
          fontWeight: 'normal',
          color: '#444444',
          textAlign: 'left',
        },
      },
    ],
  },
  {
    id: 'image-left',
    name: 'Image + Text',
    elements: [
      {
        type: 'shape',
        x: 40,
        y: 40,
        width: 420,
        height: 460,
        rotation: 0,
        shapeType: 'rounded-rectangle',
        style: {
          backgroundColor: '#e5e7eb',
          borderRadius: 12,
        },
      },
      {
        type: 'text',
        x: 500,
        y: 60,
        width: 420,
        height: 60,
        rotation: 0,
        content: 'Your Headline',
        style: {
          fontSize: 36,
          fontFamily: 'Space Grotesk',
          fontWeight: 'bold',
          color: '#1a1a2e',
          textAlign: 'left',
        },
      },
      {
        type: 'text',
        x: 500,
        y: 140,
        width: 420,
        height: 320,
        rotation: 0,
        content: 'Add supporting text here to complement your image. This layout works great for product showcases, team introductions, or feature highlights.',
        style: {
          fontSize: 18,
          fontFamily: 'DM Sans',
          fontWeight: 'normal',
          color: '#666666',
          textAlign: 'left',
          lineHeight: 1.6,
        },
      },
    ],
  },
  {
    id: 'full-visual',
    name: 'Full Visual',
    elements: [
      {
        type: 'shape',
        x: 0,
        y: 0,
        width: 960,
        height: 540,
        rotation: 0,
        shapeType: 'rectangle',
        style: {
          backgroundColor: '#1a1a2e',
        },
      },
      {
        type: 'text',
        x: 80,
        y: 420,
        width: 800,
        height: 80,
        rotation: 0,
        content: 'Full Screen Caption',
        style: {
          fontSize: 48,
          fontFamily: 'Space Grotesk',
          fontWeight: 'bold',
          color: '#ffffff',
          textAlign: 'center',
        },
      },
    ],
  },
];

export const THEME_PRESETS: ThemePreset[] = [
  {
    id: 'modern-dark',
    name: 'Modern Dark',
    colors: {
      primary: '#4169e1',
      secondary: '#8b5cf6',
      background: '#1a1a2e',
      text: '#ffffff',
      accent: '#ff6b4a',
    },
    fonts: {
      heading: 'Space Grotesk',
      body: 'DM Sans',
    },
  },
  {
    id: 'light-clean',
    name: 'Light Clean',
    colors: {
      primary: '#2563eb',
      secondary: '#64748b',
      background: '#ffffff',
      text: '#1e293b',
      accent: '#f59e0b',
    },
    fonts: {
      heading: 'Space Grotesk',
      body: 'DM Sans',
    },
  },
  {
    id: 'corporate-blue',
    name: 'Corporate Blue',
    colors: {
      primary: '#1e40af',
      secondary: '#3b82f6',
      background: '#f8fafc',
      text: '#0f172a',
      accent: '#059669',
    },
    fonts: {
      heading: 'Inter',
      body: 'Inter',
    },
  },
  {
    id: 'warm-sunset',
    name: 'Warm Sunset',
    colors: {
      primary: '#ea580c',
      secondary: '#f97316',
      background: '#fffbeb',
      text: '#451a03',
      accent: '#c026d3',
    },
    fonts: {
      heading: 'Space Grotesk',
      body: 'DM Sans',
    },
  },
  {
    id: 'vora-brand',
    name: 'VORA Brand',
    colors: {
      primary: '#4169e1',
      secondary: '#ff6b4a',
      background: '#ffffff',
      text: '#1a1a2e',
      accent: '#fbbf24',
    },
    fonts: {
      heading: 'Space Grotesk',
      body: 'DM Sans',
    },
  },
];

export const BRAND_COLORS = [
  '#4169e1',
  '#ff6b4a',
  '#8b5cf6',
  '#10b981',
  '#f59e0b',
  '#ec4899',
  '#06b6d4',
  '#1a1a2e',
  '#ffffff',
  '#000000',
];

export const CHART_COLORS = [
  '#4169e1',
  '#ff6b4a',
  '#8b5cf6',
  '#10b981',
  '#f59e0b',
  '#ec4899',
];
