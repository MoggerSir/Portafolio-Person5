export class Stat {
  constructor(
    public readonly label: string,
    public readonly value: number,
    public readonly maxValue: number = 100,
  ) {}

  get percentage(): number {
    return Math.min(100, Math.round((this.value / this.maxValue) * 100));
  }
}
