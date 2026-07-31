import { About } from './components/About';
import { Contact } from './components/Contact';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ProjectCarousel } from './components/ProjectCarousel';
import { portfolioRepository } from './data/portfolio';

export class PortfolioApplication {
  constructor(private readonly repository = portfolioRepository) {}

  render() {
    return (
      <div className="app">
        <div className="background-noise" />
        <Header />
        <main>
          <Hero profile={this.repository.profile} />
          <ProjectCarousel projects={this.repository.featuredProjects} />
          <About skills={this.repository.skills} />
        </main>
        <Contact profile={this.repository.profile} />
      </div>
    );
  }
}

export default function App() {
  return new PortfolioApplication().render();
}
