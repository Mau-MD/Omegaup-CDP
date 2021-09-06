export interface IArrayData {
  size: number;
  minValue: number;
  maxValue: number;
  distinct: boolean;
  value: string;
}

export interface IMatrixData {
  rows: number;
  columns: number;
  minValue: number;
  maxValue: number;
  distinct: "row" | "column" | "all" | "none";
  value: string;
}

export interface ILine {
  lineId: string;
  type: "line" | "multiline" | "array" | "matrix";
  label: string;
  value: string;
  arrayData: IArrayData | undefined;
  matrixData: IMatrixData | undefined;
}

export interface IInput {
  id: caseIdentifier;
  lines: ILine[];
  outData: string;
}

export interface caseIdentifier {
  groupId: string;
  caseId: string;
}

