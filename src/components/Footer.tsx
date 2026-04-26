import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="border-t border-border/50 bg-secondary/40 py-12">
      <div className="container mx-auto flex flex-col items-center justify-between gap-6 px-4 md:flex-row">
        <div className="flex flex-col items-center gap-2 md:items-start">
          <Logo />
          <p className="font-body text-xs text-muted-foreground">
            Brewed with care · © {new Date().getFullYear()} BeanDNA
          </p>
        </div>
        <p className="font-script text-xl text-mocha/70">
          every bean has a story.
        </p>
      </div>
    </footer>
  );
}