import { SITE, SOCIAL } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { Github, Linkedin, Mail } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";

export function Footer() {
  return (
    <footer className="w-full border-t border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <p className="text-center text-sm leading-loose md:text-left">
            Built by {" "}
            <a
              href={SOCIAL.github + "?"}
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              {SITE.author}
            </a> 
            &nbsp;&copy; {new Date().getUTCFullYear()}
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <a href={SOCIAL.github} target="_blank" rel="noreferrer">
              <Github className="h-4 w-4" />
              <span className="sr-only">GitHub</span>
            </a>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <a href={SOCIAL.linkedin} target="_blank" rel="noreferrer">
              <Linkedin className="h-4 w-4" />
              <span className="sr-only">LinkedIn</span>
            </a>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <a href={`mailto:${SOCIAL.email}`}>
              <Mail className="h-4 w-4" />
              <span className="sr-only">Email</span>
            </a>
          </Button>
          <div className="ml-2 border-l border-border/40 pl-4">
            <ThemeToggle aria-label="Toggle color theme" />
          </div>
        </div>
      </div>
    </footer>
  );
}
