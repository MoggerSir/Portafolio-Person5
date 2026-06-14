export class SocialLink {
  constructor(
    public readonly id: string,
    public readonly label: string,
    public readonly url: string,
    public readonly icon: 'github' | 'linkedin' | 'email',
  ) {}
}
