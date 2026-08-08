export type ProjectTone = 'ember' | 'ruby' | 'wine' | 'coral' | 'gold';

export interface StackDecision {
  readonly technology: string;
  readonly reason: string;
}

export interface CaseStudy {
  readonly overview: string;
  readonly problem: string;
  readonly process: readonly string[];
  readonly stackDecisions: readonly StackDecision[];
  readonly gallery: readonly string[];
}

export class Project {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly eyebrow: string,
    public readonly summary: string,
    public readonly image: string,
    public readonly stack: readonly string[],
    public readonly tone: ProjectTone,
    public readonly liveUrl?: string,
    public readonly repoUrl?: string,
    public readonly caseStudy?: CaseStudy,
  ) {}
}

export class Profile {
  constructor(
    public readonly name: string,
    public readonly role: string,
    public readonly intro: string,
    public readonly email: string,
    public readonly github: string,
    public readonly linkedin: string,
  ) {}
}
