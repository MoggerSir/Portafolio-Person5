import { Stat } from './Stat';
import { SocialLink } from './SocialLink';

export class Profile {
  constructor(
    public readonly initials: string,
    public readonly firstName: string,
    public readonly lastName: string,
    public readonly role: string,
    public readonly subtitle: string,
    public readonly motto: string,
    public readonly bio: string,
    public readonly bioHighlights: readonly string[],
    public readonly avatar: string,
    public readonly level: number,
    public readonly stats: readonly Stat[],
    public readonly socialLinks: readonly SocialLink[],
    public readonly email: string,
  ) {}

  get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  get personaCardTitle(): string {
    return `PERSONA — ${this.firstName.toUpperCase()} LVL ${this.level}`;
  }
}
