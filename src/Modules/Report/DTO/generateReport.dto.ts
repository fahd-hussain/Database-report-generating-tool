import { IsNotEmpty } from 'class-validator';

interface Between {
  start: string;
  end: string
}
export class GenerteReportDTO {
  SELECT: Object;
  FROM: Array<string>;
  WHERE: Array<Array<any>>;
  RELATION: Array<Array<any>>;
  BETWEEN: Between
}
