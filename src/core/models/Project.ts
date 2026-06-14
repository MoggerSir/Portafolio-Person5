export type ProjectCategory = 'featured' | 'learning';

export class Project {
  constructor(
    public readonly id: string,
    public readonly title: string,
    public readonly subtitle: string,
    public readonly shortDescription: string,
    public readonly longDescription: string,
    public readonly image: string,
    public readonly repoUrl: string,
    public readonly liveUrl: string | null,
    public readonly techStack: readonly string[],
    public readonly category: ProjectCategory,
    public readonly privateRepository = false,
  ) {}

  get hasLiveDemo(): boolean {
    return this.liveUrl !== null && this.liveUrl !== '#';
  }

  get hasRepository(): boolean {
    return !this.privateRepository && this.repoUrl !== '#';
  }

  get isPrivateRepository(): boolean {
    return this.privateRepository;
  }
}
