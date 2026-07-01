import type * as echarts from "echarts/core";

export interface MapGeoJson {
  type: "FeatureCollection";
  features: Array<{
    type: "Feature";
    id?: string | number;
    properties?: Record<string, unknown> | null;
    geometry: unknown;
  }>;
}

type KeysWithValue<T, V> = {
  [K in keyof T]-?: T[K] extends V ? K : never;
}[keyof T];

export type MapAccessor<T, V> = KeysWithValue<T, V> | ((row: T) => V);

export type MapStyle<T, V> = V | ((row: T) => V);

export interface BubbleMapProps<T> {
  class?: string;
  echarts: typeof echarts;
  geoJson: MapGeoJson;
  mapName?: string;
  data: T[];
  lng: MapAccessor<T, number>;
  lat: MapAccessor<T, number>;
  value: MapAccessor<T, number>;
  name?: MapAccessor<T, string>;
  minRadius?: number;
  maxRadius?: number;
  bubbleSize?: (value: number) => number;
  bubbleColor?: MapStyle<T, string>;
  bubbleBorderColor?: MapStyle<T, string>;
  bubbleBorderWidth?: MapStyle<T, number>;
  center?: [number, number];
  zoom?: number;
  roam?: boolean;
  showTooltip?: boolean;
  valueFormat?: (value: number) => string;
  tooltipFormatter?: (row: T) => string;
  onBubbleHover?: (row: T | undefined) => void;
  onBubbleClick?: (row: T) => void;
  height?: number;
  isDarkMode?: boolean;
  ref?: echarts.ECharts | null;
}

export interface BubblePoint<T> {
  name?: string;
  value: [number, number, number];
  symbolSize: number;
  itemStyle: {
    color: string;
    borderColor: string;
    borderWidth: number;
  };
  datum: T;
}
