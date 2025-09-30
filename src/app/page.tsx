"use client";

import { FormEvent, ReactNode, useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  Contact2,
  Languages,
  LifeBuoy,
  Menu,
  MessageSquare,
  Moon,
  Network,
  Sun,
  Users,
  X,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { z } from "zod";
import { useLanguage, useTheme, type Dictionary } from "./providers";

const contactSchema = z.object({
  name: z.string().min(2, "Please share your name"),
  email: z.string().email("Please provide a valid email"),
  company: z.string().optional(),
  message: z.string().min(10, "Let us know a bit more about your project"),
});

type ContactFormState = {
  name: string;
  email: string;
  company: string;
  message: string;
};

type SubmissionStatus = "idle" | "loading" | "success" | "error";

const baseReveal = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
};

const staggerChildren = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const childItem = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function Home() {
  return <LandingPage />;
}

function LandingPage() {
  const { dictionary, locale, setLocale } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = useMemo(
    () => [
      { label: dictionary.navigation.home, href: "#top" },
      { label: dictionary.navigation.services, href: "#services" },
      { label: dictionary.navigation.portfolio, href: "#portfolio" },
      { label: dictionary.navigation.about, href: "#about" },
      { label: dictionary.navigation.contact, href: "#contact" },
    ],
    [dictionary]
  );

  const handleLanguage = (nextLocale: "en" | "th") => {
    setLocale(nextLocale);
    setMenuOpen(false);
  };

  return (
    <div id="top">
      <header className="sticky top-0 z-50 border-b border-border/40 bg-surface/80 backdrop-blur-xl">
        <div className="container flex h-16 items-center justify-between gap-4">
          <Link
            href="#top"
            className="flex items-center gap-3 text-lg font-semibold"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/15 text-primary shadow-inner">
              <Users className="h-5 w-5" strokeWidth={2.25} />
            </div>
            <span className="font-display tracking-tight">
              Claudable Studio
            </span>
          </Link>
          <nav className="hidden items-center gap-8 lg:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-muted transition-colors duration-300 hover:text-primary"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="hidden items-center gap-3 lg:flex">
            <LanguageSwitcher
              locale={locale}
              onChange={handleLanguage}
              label={dictionary.languageToggle.label}
            />
            <ThemeToggle
              currentTheme={theme}
              toggleTheme={toggleTheme}
              labels={dictionary.themeToggle}
            />
            <a href="#contact" className="button-primary">
              {dictionary.hero.primaryCta}
              <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
            </a>
          </div>
          <button
            type="button"
            onClick={() => setMenuOpen((prev) => !prev)}
            className="inline-flex items-center rounded-xl border border-border/70 p-2 text-muted transition-colors duration-300 hover:text-primary lg:hidden"
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            aria-label="Toggle navigation"
          >
            {menuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
        {menuOpen ? (
          <div
            id="mobile-nav"
            className="border-t border-border/40 bg-surface/95 px-6 py-4 shadow-card lg:hidden"
          >
            <nav className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="text-sm font-medium text-muted transition-colors hover:text-primary"
                >
                  {link.label}
                </a>
              ))}
            </nav>
            <div className="mt-4 flex items-center gap-3">
              <LanguageSwitcher
                locale={locale}
                onChange={handleLanguage}
                label={dictionary.languageToggle.label}
              />
              <ThemeToggle
                currentTheme={theme}
                toggleTheme={toggleTheme}
                labels={dictionary.themeToggle}
              />
            </div>
            <a
              href="#contact"
              className="button-primary mt-4 w-full justify-center"
              onClick={() => setMenuOpen(false)}
            >
              {dictionary.hero.primaryCta}
              <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
            </a>
          </div>
        ) : null}
      </header>

      <main
        className="space-y-24 pb-24 sm:space-y-28 sm:pb-28 lg:space-y-32 lg:pb-32 [&>section:nth-child(3)]:mt-16 [&>section:nth-child(3)]:sm:mt-20 [&>section:nth-child(3)]:lg:mt-24"
      >
        <Hero dictionary={dictionary} />
        <ServicesSection dictionary={dictionary} />
        <PortfolioSection dictionary={dictionary} />
        <AboutSection dictionary={dictionary} />
        <ContactSection dictionary={dictionary} />
      </main>

      <Footer dictionary={dictionary} />
    </div>
  );
}

function LanguageSwitcher({
  locale,
  onChange,
  label,
}: {
  locale: "en" | "th";
  onChange: (locale: "en" | "th") => void;
  label: string;
}) {
  return (
    <div
      className="flex items-center gap-1 rounded-full border border-border/60 bg-surface px-2 py-1 text-xs shadow-inner"
      role="group"
      aria-label={label}
    >
      <Languages className="h-4 w-4 text-primary" aria-hidden />
      <button
        type="button"
        onClick={() => onChange("en")}
        className={`rounded-full px-3 py-1 font-medium transition-colors ${
          locale === "en"
            ? "bg-primary text-white"
            : "text-muted hover:text-primary"
        }`}
      >
        EN
      </button>
      <button
        type="button"
        onClick={() => onChange("th")}
        className={`rounded-full px-3 py-1 font-medium transition-colors ${
          locale === "th"
            ? "bg-primary text-white"
            : "text-muted hover:text-primary"
        }`}
      >
        ไทย
      </button>
    </div>
  );
}

function ThemeToggle({
  currentTheme,
  toggleTheme,
  labels,
}: {
  currentTheme: "light" | "dark";
  toggleTheme: () => void;
  labels: Dictionary["themeToggle"];
}) {
  const Icon = currentTheme === "dark" ? Sun : Moon;
  const label = currentTheme === "dark" ? labels.light : labels.dark;
  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="relative inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-border/60 bg-surface text-muted transition-all duration-300 hover:-translate-y-0.5 hover:text-primary"
      aria-label={label}
    >
      <Icon className="h-5 w-5" />
    </button>
  );
}

function Hero({ dictionary }: { dictionary: Dictionary }) {
  return (
    <section className="container relative overflow-hidden pt-16 sm:pt-20">
      <motion.div
        className="gradient-shell grid gap-12 px-6 py-12 sm:px-12 lg:grid-cols-[1.2fr_1fr] lg:items-center lg:gap-16"
        {...baseReveal}
      >
        <div className="space-y-6">
          <span className="section-heading inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/15 px-4 py-2 text-xs font-semibold uppercase tracking-[0.32em] text-primary">
            <Contact2 className="h-4 w-4" />
            {dictionary.hero.badge}
          </span>
          <motion.h1
            className="font-display text-4xl leading-tight text-foreground sm:text-5xl lg:text-6xl"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              delay: 0.08,
              ease: [0.25, 0.1, 0.25, 1],
            }}
          >
            {dictionary.hero.title}
          </motion.h1>
          <motion.p
            className="max-w-2xl text-base text-muted sm:text-lg"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              delay: 0.18,
              ease: [0.25, 0.1, 0.25, 1],
            }}
          >
            {dictionary.hero.subtitle}
          </motion.p>
          <motion.div
            className="flex flex-wrap gap-3"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              delay: 0.28,
              ease: [0.25, 0.1, 0.25, 1],
            }}
          >
            <a href="#contact" className="button-primary">
              {dictionary.hero.primaryCta}
              <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
            </a>
            <a href="#portfolio" className="button-secondary">
              {dictionary.hero.secondaryCta}
            </a>
          </motion.div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {dictionary.hero.highlights.map((highlight) => (
              <div
                key={highlight.title}
                className="rounded-2xl border border-border/50 bg-surface/70 p-5 shadow-inner"
              >
                <p className="text-sm font-semibold text-muted">
                  {highlight.label}
                </p>
                <p className="mt-1 text-lg font-semibold text-foreground">
                  {highlight.title}
                </p>
              </div>
            ))}
          </div>
        </div>
        <motion.div
          className="relative mt-6 h-full min-h-[320px] overflow-hidden rounded-3xl border border-primary/25 bg-gradient-to-br from-primary/20 via-accent/20 to-transparent p-6 shadow-soft"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.6,
            delay: 0.32,
            ease: [0.25, 0.1, 0.25, 1],
          }}
        >
          <div className="absolute inset-0 bg-grid" aria-hidden />
          <div className="relative flex h-full flex-col justify-between">
            <div className="space-y-4">
              <p className="text-sm font-medium uppercase tracking-[0.3em] text-primary">
                {dictionary.hero.process.title}
              </p>
              <div className="flex flex-col gap-3">
                {dictionary.hero.process.stages.map((stage, index) => (
                  <motion.div
                    key={stage}
                    className="flex items-center gap-3 rounded-2xl border border-border/60 bg-surface/80 px-4 py-3 text-sm text-muted shadow-inner"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.45,
                      delay: index * 0.08,
                      ease: "easeOut",
                    }}
                  >
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    {stage}
                  </motion.div>
                ))}
              </div>
            </div>
            <div className="rounded-2xl border border-primary/30 bg-primary/15 p-4 text-sm text-primary shadow-inner">
              {dictionary.hero.process.note}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

function ServicesSection({ dictionary }: { dictionary: Dictionary }) {
  const serviceIcons: ReadonlyArray<LucideIcon> = [Network, Building2, LifeBuoy];
  const services = dictionary.services.items.map((item, index) => ({
    icon: serviceIcons[index % serviceIcons.length],
    ...item,
  }));

  return (
    <section id="services" className="container">
      <motion.div className="mx-auto max-w-3xl text-center" {...baseReveal}>
        <p className="section-heading">{dictionary.navigation.services}</p>
        <h2 className="section-title mt-3">{dictionary.services.title}</h2>
        <p className="section-subtitle mx-auto">
          {dictionary.services.subtitle}
        </p>
      </motion.div>
      <motion.div
        className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        variants={staggerChildren}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        {services.map((service) => (
          <motion.div key={service.title} variants={childItem}>
            <article className="gradient-shell card-hover h-full p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/15 text-primary shadow-inner">
                <service.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-6 text-xl font-semibold text-foreground">
                {service.title}
              </h3>
              <p className="mt-3 text-sm text-muted sm:text-base">
                {service.description}
              </p>
            </article>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

function PortfolioSection({ dictionary }: { dictionary: Dictionary }) {
  return (
    <section id="portfolio" className="container">
      <motion.div className="mx-auto max-w-3xl text-center" {...baseReveal}>
        <p className="section-heading">{dictionary.navigation.portfolio}</p>
        <h2 className="section-title mt-3">{dictionary.portfolio.title}</h2>
        <p className="section-subtitle mx-auto">
          {dictionary.portfolio.subtitle}
        </p>
      </motion.div>
      <motion.div
        className="mt-12 grid gap-6 sm:grid-cols-2"
        variants={staggerChildren}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        {dictionary.portfolio.projects.map((project) => (
          <motion.div key={project.title} variants={childItem}>
            <article className="gradient-shell card-hover h-full overflow-hidden">
              <div className="relative h-48 overflow-hidden bg-gradient-to-br from-primary/30 via-accent/30 to-transparent">
                <div
                  className="absolute inset-0 bg-grid opacity-60"
                  aria-hidden
                />
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/10 to-white/5 mix-blend-overlay" />
                <div className="absolute bottom-4 left-4 rounded-full border border-primary/30 bg-primary/20 px-4 py-2 text-xs font-medium uppercase tracking-[0.3em] text-primary">
                  {project.category}
                </div>
              </div>
              <div className="space-y-3 px-6 pb-6 pt-6">
                <h3 className="text-xl font-semibold text-foreground">
                  {project.title}
                </h3>
                <p className="text-sm text-muted sm:text-base">
                  {project.description}
                </p>
              </div>
            </article>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

function AboutSection({ dictionary }: { dictionary: Dictionary }) {
  return (
    <section id="about" className="container">
      <motion.div className="mx-auto max-w-3xl text-center" {...baseReveal}>
        <p className="section-heading">{dictionary.navigation.about}</p>
        <h2 className="section-title mt-3">{dictionary.about.title}</h2>
        <p className="section-subtitle mx-auto">{dictionary.about.subtitle}</p>
      </motion.div>
      <motion.div
        className="mt-12 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]"
        variants={staggerChildren}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        <motion.div variants={childItem}>
          <div className="gradient-shell space-y-6 p-8">
            <h3 className="text-2xl font-semibold text-foreground">
              {dictionary.about.mission}
            </h3>
            <div className="fade-divider" />
            <ul className="grid gap-4">
              {dictionary.about.values.map((value) => (
                <li
                  key={value.title}
                  className="flex gap-4 rounded-2xl border border-border/60 bg-surface/70 p-5 shadow-inner"
                >
                  <ArrowRight className="mt-1 h-5 w-5 text-primary" />
                  <div>
                    <p className="font-semibold text-foreground">
                      {value.title}
                    </p>
                    <p className="mt-1 text-sm text-muted">
                      {value.description}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
        <motion.div variants={childItem}>
          <div className="gradient-shell h-full space-y-6 p-8">
            <h3 className="text-lg font-semibold text-foreground">
              {dictionary.about.teamLabel}
            </h3>
            <div className="grid gap-4">
              {dictionary.about.team.map((member) => (
                <div
                  key={member.name}
                  className="rounded-2xl border border-border/60 bg-surface/70 p-5 shadow-inner"
                >
                  <div className="flex items-center justify-between">
                    <p className="text-base font-semibold text-foreground">
                      {member.name}
                    </p>
                    <span className="text-xs font-medium uppercase tracking-[0.28em] text-primary/80">
                      {member.role}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-muted">{member.bio}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

function ContactSection({ dictionary }: { dictionary: Dictionary }) {
  const [formState, setFormState] = useState<ContactFormState>({
    name: "",
    email: "",
    company: "",
    message: "",
  });
  const [errors, setErrors] = useState<
    Partial<Record<keyof ContactFormState, string>>
  >({});
  const [status, setStatus] = useState<SubmissionStatus>("idle");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("loading");

    try {
      const parsed = contactSchema.parse(formState);
      setErrors({});

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed),
      });

      if (!response.ok) {
        throw new Error("Request failed");
      }

      setStatus("success");
      setFormState({ name: "", email: "", company: "", message: "" });
    } catch (error: unknown) {
      if (error instanceof z.ZodError) {
        const fieldErrors = error.flatten().fieldErrors;
        setErrors({
          name: fieldErrors.name?.[0],
          email: fieldErrors.email?.[0],
          company: fieldErrors.company?.[0],
          message: fieldErrors.message?.[0],
        });
      } else {
        setErrors({});
      }
      setStatus("error");
    }
  };

  const isLoading = status === "loading";
  const showSuccess = status === "success";
  const showError = status === "error";

  return (
    <section id="contact" className="container">
      <motion.div className="mx-auto max-w-3xl text-center" {...baseReveal}>
        <p className="section-heading">{dictionary.navigation.contact}</p>
        <h2 className="section-title mt-3">{dictionary.contact.title}</h2>
        <p className="section-subtitle mx-auto">
          {dictionary.contact.subtitle}
        </p>
      </motion.div>
      <motion.div
        className="gradient-shell mt-12 grid gap-10 px-6 py-10 lg:grid-cols-[1.1fr_0.9fr] lg:px-12"
        variants={staggerChildren}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        <motion.form
          onSubmit={handleSubmit}
          className="space-y-6"
          variants={childItem}
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <Field
              id="name"
              icon={<Users className="h-4 w-4 text-primary" />}
              label={dictionary.contact.name}
              value={formState.name}
              onChange={(value) =>
                setFormState((prev) => ({ ...prev, name: value }))
              }
              error={errors.name}
              required
            />
            <Field
              id="email"
              type="email"
              icon={<MessageSquare className="h-4 w-4 text-primary" />}
              label={dictionary.contact.email}
              value={formState.email}
              onChange={(value) =>
                setFormState((prev) => ({ ...prev, email: value }))
              }
              error={errors.email}
              required
            />
          </div>
          <Field
            id="company"
            icon={<Building2 className="h-4 w-4 text-primary" />}
            label={dictionary.contact.company}
            value={formState.company}
            onChange={(value) =>
              setFormState((prev) => ({ ...prev, company: value }))
            }
            error={errors.company}
          />
          <div>
            <label
              htmlFor="message"
              className="text-sm font-medium text-foreground"
            >
              {dictionary.contact.message}
            </label>
            <div className="mt-2 rounded-2xl border border-border/60 bg-surface/80 focus-within:border-primary/80">
              <textarea
                id="message"
                name="message"
                value={formState.message}
                onChange={(event) =>
                  setFormState((prev) => ({
                    ...prev,
                    message: event.target.value,
                  }))
                }
                rows={5}
                className="w-full resize-none rounded-2xl border-0 bg-transparent px-4 py-3 text-sm text-foreground placeholder:text-muted focus:ring-0"
                placeholder={dictionary.contact.message}
                required
                aria-invalid={Boolean(errors.message) || undefined}
              />
            </div>
            {errors.message ? (
              <p className="mt-2 text-xs text-primary">{errors.message}</p>
            ) : null}
          </div>
          <button type="submit" className="button-primary" disabled={isLoading}>
            {isLoading ? (
              <span className="flex items-center gap-2">
                <span className="h-3 w-3 animate-spin rounded-full border-2 border-white border-t-transparent" />
                {dictionary.contact.sending}
              </span>
            ) : (
              <span className="flex items-center gap-2">
                {dictionary.contact.submit}
                <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
              </span>
            )}
          </button>
          {showSuccess ? (
            <p className="text-sm font-medium text-primary">
              {dictionary.contact.success}
            </p>
          ) : null}
          {showError && !isLoading ? (
            <p className="text-sm font-medium text-primary">
              {dictionary.contact.error}
            </p>
          ) : null}
        </motion.form>
        <motion.div className="space-y-6" variants={childItem}>
          <div className="rounded-3xl border border-primary/30 bg-primary/15 p-8 text-primary shadow-inner">
            <p className="text-sm font-semibold uppercase tracking-[0.3em]">
              {dictionary.contact.engagementTitle}
            </p>
            <ul className="mt-4 space-y-3 text-sm text-primary/90">
              {dictionary.contact.engagementPoints.map((point) => (
                <li key={point}>• {point}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-3xl border border-border/60 bg-surface/80 p-8 shadow-inner">
            <p className="text-sm font-semibold text-muted">
              {dictionary.contact.directTitle}
            </p>
            <p className="mt-2 text-lg font-semibold text-foreground">
              {dictionary.contact.directCta}
            </p>
            <p className="mt-2 text-sm text-muted">
              {dictionary.contact.directSubtitle}
            </p>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

function Field({
  id,
  label,
  value,
  onChange,
  error,
  icon,
  required,
  type = "text",
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  icon: ReactNode;
  required?: boolean;
  type?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="text-sm font-medium text-foreground">
        {label}
      </label>
      <div className="mt-2 flex items-center gap-2 rounded-2xl border border-border/60 bg-surface/80 px-3 py-2 focus-within:border-primary/80">
        {icon}
        <input
          id={id}
          name={id}
          type={type}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="w-full border-0 bg-transparent text-sm text-foreground placeholder:text-muted focus:ring-0"
          placeholder={label}
          required={required}
          aria-invalid={Boolean(error) || undefined}
        />
      </div>
      {error ? <p className="mt-2 text-xs text-primary">{error}</p> : null}
    </div>
  );
}

function Footer({ dictionary }: { dictionary: Dictionary }) {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="border-t border-border/40 bg-surface/80 py-10 backdrop-blur">
      <div className="container flex flex-col gap-4 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
        <p className="font-medium text-foreground">
          © {currentYear} Claudable Studio. {dictionary.footer.rights}.
        </p>
        <p>{dictionary.footer.location}</p>
      </div>
    </footer>
  );
}
