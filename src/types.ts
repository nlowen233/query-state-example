export type Organization = {
  name: string;
  penSales: PenSale[];
};

export type Pen = {
  id: string;
  color: Color;
  quality: Quality;
  size: Size;
};

export type PenSale = {
  penId: string;
  date: string;
};

export type Color = "green" | "red" | "blue" | "black";
export type Quality = "low" | "medium" | "high";
export type Size = "small" | "standard" | "large";
export type QueryStringState = {
  organizations: ComparisonNode[];
};
export type ComparisonNode = {
  organizationName: string;
  size?: Size;
  quality?: Quality;
  color?: Color;
};

export type QueryStateAction =
  | { type: "add"; payload: ComparisonNode }
  | { type: "remove"; payload: { organizationName: string } }
  | { type: "change"; payload: ComparisonNode }
  | {
      type: "choose-filter";
      payload: {
        organizationName: string;
        filterType: "size" | "quality" | "color";
        value: Size | Quality | Color;
      };
    };

export const enum QueryStateDataParam {
  Data = "data",
}

export type TimeSeriesEntry = {
  time: string;
  [key: string]: number | string;
};
