import { Profile, Project } from './models';

export interface PortfolioSource {
  readonly profile: Profile;
  readonly projects: readonly Project[];
  readonly skills: readonly string[];
}

export class PortfolioRepository {
  private static instance: PortfolioRepository;

  private constructor(private readonly source: PortfolioSource) {}

  static from(source: PortfolioSource): PortfolioRepository {
    if (!this.instance) this.instance = new PortfolioRepository(source);
    return this.instance;
  }

  get profile(): Profile {
    return this.source.profile;
  }

  get featuredProjects(): readonly Project[] {
    return this.source.projects;
  }

  get skills(): readonly string[] {
    return this.source.skills;
  }
}
