export interface IGroup {
  groupId: string;
  name: string;
  points: number;
  defined: boolean;
  cases: ICase[];
}

export interface ICase {
  caseId: string;
  name: string;
  groupId: string;
  points: number;
  defined: boolean;
}

export interface Index {
  groupIndex: number;
  caseIndex: number;
}

