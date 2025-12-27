export interface SlideElement {
  id: string;
  type: 'text' | 'shape' | 'image' | 'chart' | 'icon';
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
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
  };
  shapeType?: 'rectangle' | 'circle' | 'triangle' | 'line' | 'arrow';
  chartType?: 'bar' | 'line' | 'pie';
  chartData?: { label: string; value: number }[];
  imageUrl?: string;
}

export interface Slide {
  id: string;
  elements: SlideElement[];
  backgroundColor: string;
  backgroundGradient?: string;
}

export interface EditorState {
  slides: Slide[];
  currentSlideIndex: number;
  selectedElementId: string | null;
  zoom: number;
  history: Slide[][];
  historyIndex: number;
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
  | 'image'
  | 'chart-bar'
  | 'chart-line'
  | 'chart-pie';
