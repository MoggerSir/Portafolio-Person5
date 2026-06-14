export type SkillLevel = 'current' | 'learning';

export class Skill {
  constructor(
    public readonly name: string,
    public readonly icon: string,
    public readonly level: SkillLevel,
  ) {}
}
