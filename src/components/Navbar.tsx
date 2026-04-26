import { Link, NavLink } from "react-router-dom";
import { Logo } from "./Logo";
import { Button } from "./ui/button";
import { Sparkles } from "lucide-react";

export function Navbar() {
  const linkCls = ({ isActive }: { isActive: boolean }) =>
    `font-body text-sm font-semibold transition-colors ${
      isActive ? "text-accent" : "text-foreground/70 hover:text-foreground"
    }`;

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Logo />
        <nav className="hidden items-center gap-8 md:flex">
          <NavLink to="/" end className={linkCls}>Home</NavLink>
          <NavLink to="/upload" className={linkCls}>Scan</NavLink>
          <NavLink to="/dashboard" className={linkCls}>Dashboard</NavLink>
        </nav>
        <Button asChild size="sm" className="rounded-full bg-foreground text-cream hover:bg-foreground/90">
          <Link to="/upload">
            <Sparkles className="mr-1.5 h-4 w-4" />
            Start Analysis
          </Link>
        </Button>
      </div>
    </header>
  );
}