"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

type Theme = "light" | "dark";
type Locale = "en" | "th";

interface LanguageContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  dictionary: Dictionary;
}

interface ThemeContextValue {
  theme: Theme;
  toggleTheme: () => void;
}

interface Dictionary {
  navigation: {
    home: string;
    services: string;
    portfolio: string;
    about: string;
    contact: string;
  };
  hero: {
    badge: string;
    title: string;
    subtitle: string;
    primaryCta: string;
    secondaryCta: string;
    highlights: Array<{
      label: string;
      title: string;
    }>;
    process: {
      title: string;
      stages: string[];
      note: string;
    };
  };
  services: {
    title: string;
    subtitle: string;
    items: Array<{
      title: string;
      description: string;
    }>;
  };
  portfolio: {
    title: string;
    subtitle: string;
    projects: Array<{
      title: string;
      description: string;
      category: string;
    }>;
  };
  about: {
    title: string;
    subtitle: string;
    mission: string;
    values: Array<{
      title: string;
      description: string;
    }>;
    teamLabel: string;
    team: Array<{
      name: string;
      role: string;
      bio: string;
    }>;
  };
  contact: {
    title: string;
    subtitle: string;
    name: string;
    email: string;
    company: string;
    message: string;
    submit: string;
    success: string;
    error: string;
    sending: string;
    engagementTitle: string;
    engagementPoints: string[];
    directTitle: string;
    directSubtitle: string;
    directCta: string;
  };
  footer: {
    rights: string;
    location: string;
  };
  themeToggle: {
    light: string;
    dark: string;
  };
  languageToggle: {
    label: string;
  };
}

const dictionaries: Record<Locale, Dictionary> = {
  en: {
    navigation: {
      home: "Home",
      services: "Services",
      portfolio: "Case Studies",
      about: "About",
      contact: "Contact",
    },
    hero: {
      badge: "Enterprise-grade digital solutions",
      title: "Accelerate innovation with tailored software crafted around your business.",
      subtitle:
        "We partner with ambitious teams to design, build, and scale web platforms that unlock new value, streamline operations, and delight customers.",
      primaryCta: "Start a Project",
      secondaryCta: "View Case Studies",
      highlights: [
        {
          label: "99.9% uptime",
          title: "Enterprise-ready infrastructure",
        },
        {
          label: "Audit-ready",
          title: "Security from day one",
        },
      ],
      process: {
        title: "Delivery cadence",
        stages: ["Discovery", "Architecture", "Build", "Launch", "Scale"],
        note: "Trusted across fintech, healthcare, and industrial operations",
      },
    },
    services: {
      title: "Our Core Services",
      subtitle:
        "From concept to continuous optimization, we deliver full lifecycle product expertise that keeps you ahead of change.",
      items: [
        {
          title: "Custom Web Application Development",
          description:
            "Design and build mission-critical platforms with modern architectures, seamless user journeys, and measurable ROI.",
        },
        {
          title: "System Integration",
          description:
            "Connect your ecosystem with secure APIs, real-time data pipelines, and unified dashboards for faster decisions.",
        },
        {
          title: "Consulting & Maintenance",
          description:
            "Receive continuous enhancements, observability, and expert guidance to keep your digital initiatives thriving.",
        },
      ],
    },
    portfolio: {
      title: "Featured Case Studies",
      subtitle:
        "A selection of recent partnerships where we helped organizations launch new ventures, modernize operations, and outpace competitors.",
      projects: [
        {
          title: "Nova Logistics Portal",
          description: "Scaled fulfillment visibility across 14 countries with predictive analytics and live ETAs.",
          category: "Supply Chain Transformation",
        },
        {
          title: "Helix Health Platform",
          description: "Enabled HIPAA-compliant telehealth with automated triage and clinician dashboards.",
          category: "Healthcare Experience",
        },
        {
          title: "Orbit Finance Suite",
          description: "Unified risk, compliance, and reporting into a single secured workspace for financial teams.",
          category: "Fintech Modernization",
        },
        {
          title: "Pulse Retail Intelligence",
          description: "Delivered real-time inventory insights and personalization across 120+ retail locations.",
          category: "Retail Innovation",
        },
      ],
    },
    about: {
      title: "Mission, Values & People",
      subtitle:
        "We exist to help visionary teams move faster. Our multi-disciplinary experts align around outcomes, transparency, and long-term partnership.",
      mission:
        "Our mission is to translate complex challenges into confident digital momentum through thoughtful strategy, resilient engineering, and human-centered design.",
      values: [
        {
          title: "Partnership",
          description: "Co-creating with stakeholders to ensure every decision ties back to measurable business outcomes.",
        },
        {
          title: "Craft",
          description: "Elevating every interaction—from pixels to pipelines—with purposeful detail and technical rigor.",
        },
        {
          title: "Momentum",
          description: "Delivering iterative value, validating assumptions, and continuously optimizing post-launch.",
        },
      ],
      teamLabel: "Leadership team",
      team: [
        {
          name: "Aria Patel",
          role: "Principal Product Strategist",
          bio: "Leads discovery and product vision alignment across enterprise engagements.",
        },
        {
          name: "Liam Chen",
          role: "Lead Solutions Architect",
          bio: "Designs resilient, scalable systems that integrate seamlessly across your stack.",
        },
        {
          name: "Maya Rivera",
          role: "Head of Experience Design",
          bio: "Crafts intuitive journeys grounded in research, accessibility, and brand expression.",
        },
      ],
    },
    contact: {
      title: "Plan the Next Sprint",
      subtitle:
        "Tell us about your initiative and we'll schedule a discovery session to map opportunities, timelines, and success metrics.",
      name: "Full name",
      email: "Work email",
      company: "Company",
      message: "Project vision",
      submit: "Request Consultation",
      success: "We've received your message and will reply within 24 hours.",
      error: "Something went wrong. Please try again or email hello@claudable.dev.",
      sending: "Sending...",
      engagementTitle: "Engagement snapshots",
      engagementPoints: [
        "Product discovery & roadmap in 3 weeks",
        "Cross-functional delivery squad on demand",
        "Continuous integration & observability baked in",
      ],
      directTitle: "Prefer a direct line?",
      directSubtitle: "We respond within one business day.",
      directCta: "hello@claudable.dev",
    },
    footer: {
      rights: "All rights reserved",
      location: "Made with intent in Bangkok & San Francisco",
    },
    themeToggle: {
      light: "Switch to light mode",
      dark: "Switch to dark mode",
    },
    languageToggle: {
      label: "Language",
    },
  },
  th: {
    navigation: {
      home: "หน้าแรก",
      services: "บริการ",
      portfolio: "ผลงาน",
      about: "เกี่ยวกับเรา",
      contact: "ติดต่อ",
    },
    hero: {
      badge: "โซลูชันดิจิทัลระดับองค์กร",
      title: "ขับเคลื่อนนวัตกรรมด้วยซอฟต์แวร์ที่ออกแบบเฉพาะสำหรับธุรกิจของคุณ",
      subtitle:
        "เราร่วมมือกับทีมที่มีวิสัยทัศน์เพื่อออกแบบ พัฒนา และต่อยอดแพลตฟอร์มเว็บที่สร้างคุณค่าใหม่ ปรับปรุงการดำเนินงาน และสร้างประสบการณ์ที่น่าประทับใจ",
      primaryCta: "เริ่มโครงการ",
      secondaryCta: "ดูตัวอย่างผลงาน",
      highlights: [
        {
          label: "พร้อมใช้งาน 99.9%",
          title: "โครงสร้างพื้นฐานเพื่อองค์กร",
        },
        {
          label: "พร้อมตรวจสอบ",
          title: "ความปลอดภัยตั้งแต่วันแรก",
        },
      ],
      process: {
        title: "จังหวะการส่งมอบ",
        stages: ["ค้นหา", "ออกแบบสถาปัตยกรรม", "พัฒนา", "เปิดตัว", "ขยาย"],
        note: "ได้รับความไว้วางใจจากองค์กรด้านการเงิน สุขภาพ และอุตสาหกรรม",
      },
    },
    services: {
      title: "บริการหลักของเรา",
      subtitle:
        "ตั้งแต่ไอเดียจนถึงการเพิ่มประสิทธิภาพอย่างต่อเนื่อง เรามอบความเชี่ยวชาญตลอดวงจรผลิตภัณฑ์เพื่อให้คุณนำหน้าความเปลี่ยนแปลง",
      items: [
        {
          title: "พัฒนาเว็บแอปเฉพาะทาง",
          description:
            "ออกแบบและสร้างแพลตฟอร์มสำคัญของธุรกิจด้วยสถาปัตยกรรมทันสมัย ประสบการณ์ใช้งานราบรื่น และผลตอบแทนที่ชัดเจน",
        },
        {
          title: "เชื่อมต่อระบบ",
          description:
            "เชื่อมต่อระบบต่าง ๆ ด้วย API ที่ปลอดภัย ท่อข้อมูลแบบเรียลไทม์ และแดชบอร์ดรวมเพื่อการตัดสินใจที่รวดเร็ว",
        },
        {
          title: "ที่ปรึกษาและดูแลต่อเนื่อง",
          description:
            "รับการพัฒนาอย่างต่อเนื่อง ระบบเฝ้าระวัง และคำแนะนำจากผู้เชี่ยวชาญเพื่อให้โครงการดิจิทัลเติบโตอย่างยั่งยืน",
        },
      ],
    },
    portfolio: {
      title: "ตัวอย่างผลงาน",
      subtitle:
        "คัดสรรจากความร่วมมือล่าสุดที่เราช่วยให้องค์กรเปิดตัวบริการใหม่ ปรับปรุงการดำเนินงาน และก้าวนำคู่แข่ง",
      projects: [
        {
          title: "Nova Logistics Portal",
          description: "ยกระดับการมองเห็นการขนส่งใน 14 ประเทศพร้อมคาดการณ์การมาถึงแบบเรียลไทม์",
          category: "ทรานส์ฟอร์มซัพพลายเชน",
        },
        {
          title: "Helix Health Platform",
          description: "แพลตฟอร์มเทเลเฮลท์ที่สอดคล้อง HIPAA พร้อมการคัดกรองอัตโนมัติและแดชบอร์ดแพทย์",
          category: "ประสบการณ์ด้านสุขภาพ",
        },
        {
          title: "Orbit Finance Suite",
          description: "รวมการจัดการความเสี่ยง คอมพลายแอนซ์ และรายงานในศูนย์บัญชาการเดียว",
          category: "การเงินสมัยใหม่",
        },
        {
          title: "Pulse Retail Intelligence",
          description: "ข้อมูลสต็อกแบบเรียลไทม์และการปรับแต่งประสบการณ์ในร้านกว่า 120 สาขา",
          category: "นวัตกรรมค้าปลีก",
        },
      ],
    },
    about: {
      title: "พันธกิจ ค่านิยม และทีมงาน",
      subtitle:
        "เราเกิดขึ้นเพื่อช่วยทีมที่มีวิสัยทัศน์ให้เดินหน้าได้เร็วขึ้น ผู้เชี่ยวชาญของเราทำงานร่วมกันบนพื้นฐานของผลลัพธ์ ความโปร่งใส และความร่วมมือระยะยาว",
      mission:
        "พันธกิจของเราคือเปลี่ยนความท้าทายที่ซับซ้อนให้เป็นความก้าวหน้าดิจิทัลอย่างมั่นใจ ผ่านกลยุทธ์ที่รอบคอบ วิศวกรรมที่ยืดหยุ่น และการออกแบบที่เน้นมนุษย์",
      values: [
        {
          title: "การเป็นพาร์ทเนอร์",
          description: "ร่วมสร้างกับผู้มีส่วนได้ส่วนเสียเพื่อให้ทุกการตัดสินใจส่งผลต่อธุรกิจจริง",
        },
        {
          title: "ความประณีต",
          description: "ใส่ใจทุกรายละเอียดตั้งแต่ส่วนติดต่อผู้ใช้จนถึงโครงสร้างระบบด้วยมาตรฐานสูง",
        },
        {
          title: "ความต่อเนื่อง",
          description: "ส่งมอบคุณค่าอย่างต่อเนื่อง ทดสอบสมมติฐาน และพัฒนาอย่างไม่หยุดยั้งหลังเปิดตัว",
        },
      ],
      teamLabel: "ทีมผู้นำ",
      team: [
        {
          name: "Aria Patel",
          role: "ผู้อำนวยการกลยุทธ์ผลิตภัณฑ์",
          bio: "ขับเคลื่อนการค้นหาและกำหนดวิสัยทัศน์ผลิตภัณฑ์ร่วมกับลูกค้าระดับองค์กร",
        },
        {
          name: "Liam Chen",
          role: "สถาปนิกโซลูชัน",
          bio: "ออกแบบระบบที่ยืดหยุ่นและมีสเกลสูงเพื่อเชื่อมต่อทุกระบบของคุณ",
        },
        {
          name: "Maya Rivera",
          role: "หัวหน้าฝ่ายออกแบบประสบการณ์",
          bio: "สร้างประสบการณ์ที่เข้าใจง่ายจากงานวิจัย มาตรฐานการเข้าถึง และอัตลักษณ์แบรนด์",
        },
      ],
    },
    contact: {
      title: "วางแผนสปรินต์ถัดไป",
      subtitle:
        "บอกเราเกี่ยวกับโครงการของคุณแล้วเราจะนัดหมายเพื่อสำรวจเป้าหมาย ไทม์ไลน์ และตัวชี้วัดความสำเร็จ",
      name: "ชื่อ-นามสกุล",
      email: "อีเมลทำงาน",
      company: "บริษัท",
      message: "ภาพรวมโครงการ",
      submit: "ขอคำปรึกษา",
      success: "เราได้รับข้อความแล้วและจะติดต่อกลับภายใน 24 ชั่วโมง",
      error: "เกิดข้อผิดพลาด กรุณาลองใหม่หรือติดต่อ hello@claudable.dev",
      sending: "กำลังส่ง...",
      engagementTitle: "ภาพรวมการร่วมงาน",
      engagementPoints: [
        "ค้นหาและวางโร้ดแมปภายใน 3 สัปดาห์",
        "ทีมส่งมอบข้ามสายงานพร้อมสนับสนุน",
        "บูรณาการ CI และระบบเฝ้าระวังตั้งแต่แรก",
      ],
      directTitle: "ต้องการพูดคุยโดยตรง?",
      directSubtitle: "เราตอบกลับภายในหนึ่งวันทำการ",
      directCta: "hello@claudable.dev",
    },
    footer: {
      rights: "สงวนลิขสิทธิ์ทั้งหมด",
      location: "สร้างด้วยความตั้งใจในกรุงเทพฯ และซานฟรานซิสโก",
    },
    themeToggle: {
      light: "สลับเป็นโหมดสว่าง",
      dark: "สลับเป็นโหมดมืด",
    },
    languageToggle: {
      label: "ภาษา",
    },
  },
};

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);
const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

export const Providers = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<Theme>("light");
  const [locale, setLocale] = useState<Locale>("en");

  useEffect(() => {
    if (typeof window === "undefined") return;

    const storedTheme = window.localStorage.getItem("theme") as Theme | null;
    const storedLocale = window.localStorage.getItem("locale") as Locale | null;

    if (storedTheme) {
      setTheme(storedTheme);
    } else {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setTheme(prefersDark ? "dark" : "light");
    }

    if (storedLocale) {
      setLocale(storedLocale);
    }
  }, []);

  useEffect(() => {
    if (typeof document === "undefined") return;
    document.documentElement.classList.toggle("dark", theme === "dark");
    document.documentElement.style.colorScheme = theme;
    window.localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    if (typeof document === "undefined") return;
    document.documentElement.lang = locale;
    window.localStorage.setItem("locale", locale);
  }, [locale]);

  const toggleTheme = () => setTheme((prev) => (prev === "light" ? "dark" : "light"));

  const dictionary = useMemo(() => dictionaries[locale], [locale]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <LanguageContext.Provider value={{ locale, setLocale, dictionary }}>
        {children}
      </LanguageContext.Provider>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within Providers");
  }
  return context;
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within Providers");
  }
  return context;
};

export type { Dictionary };
