export class Config {
  public defaultEventColor: string;
  private hourStart: number;
  private hourEnd: number;

  constructor(data: any) {
    this.defaultEventColor = data.defaultEventColor;
    this.hourStart = data.hourStart
    this.hourEnd = data.hourEnd;
  }

  public get getDefaultEventColor(): string {
    return this.defaultEventColor;
  }

  public set setDefaultEventColor(color: string) {
    this.defaultEventColor = color;
  }

  public get getHourEnd(): number {
    return this.hourEnd;
  }

  public set setHourEnd(value: number) {
    this.hourEnd = value;
  }
  public get getHourStart(): number {
    return this.hourStart;
  }

  public set setHourStart(value: number) {
    this.hourStart = value;
  }
}
