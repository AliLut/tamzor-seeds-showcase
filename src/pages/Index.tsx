import { useEffect, useRef, useState } from "react";
import {
  Phone, Instagram, Leaf, Shield, Package, Sparkles, ShoppingBag, Store,
  Sun, Heart, Award, Truck, Users, Star, ChevronDown, MapPin, Clock, Zap,
  CheckCircle2, ArrowRight, Menu, X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import heroImg1 from "@/assets/tamzor-hero-1.jpg";
import heroImg2 from "@/assets/tamzor-hero-2.jpg";
import seedsScatter from "@/assets/seeds-scatter.jpg";
import sunflowerField from "@/assets/sunflower-field.jpg";
import logo from "@/assets/tamzor-logo.jpg";
import ChatWidget from "@/components/ChatWidget";

/* ── Scroll animation hook ── */
function useScrollAnimation() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    const elements = document.querySelectorAll(
      ".animate-on-scroll, .animate-on-scroll-left, .animate-on-scroll-right, .animate-on-scroll-scale"
    );
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);
}

/* ── Counter animation ── */
function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          let start = 0;
          const duration = 2000;
          const step = (timestamp: number) => {
            if (!start) start = timestamp;
            const progress = Math.min((timestamp - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * target));
            if (progress < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return <span ref={ref}>{count}{suffix}</span>;
}

/* ── Navbar ── */
const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { href: "#mahsulotlar", label: "Mahsulotlar" },
    { href: "#afzalliklar", label: "Afzalliklar" },
    { href: "#raqamlar", label: "Raqamlar" },
    { href: "#savdo", label: "Savdo" },
    { href: "#boglanish", label: "Bog'lanish" },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled ? "bg-background/95 backdrop-blur-xl shadow-lg border-b" : "bg-transparent"
    }`}>
      <div className="container mx-auto px-4 h-16 md:h-20 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2.5 group">
          <img
            src={logo}
            alt="Ta'mzor Original logo"
            className={`rounded-full transition-all duration-300 ${
              scrolled ? "w-10 h-10 ring-2 ring-primary/30" : "w-11 h-11 ring-2 ring-primary-foreground/40"
            } group-hover:scale-105`}
          />
          <span className="leading-tight">
            <span className={`block text-base md:text-lg font-extrabold tracking-tight transition-colors duration-300 ${
              scrolled ? "text-primary" : "text-primary-foreground"
            }`}>
              TA'MZOR
            </span>
            <span className={`block font-semibold text-[10px] md:text-xs tracking-[0.2em] transition-colors duration-300 ${
              scrolled ? "text-muted-foreground" : "text-primary-foreground/70"
            }`}>
              ORIGINAL
            </span>
          </span>
        </a>

        <div className="hidden lg:flex items-center gap-8 text-sm font-medium">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`relative transition-colors duration-300 hover:text-primary after:absolute after:bottom-[-4px] after:left-0 after:h-0.5 after:w-0 after:bg-primary after:transition-all after:duration-300 hover:after:w-full ${
                scrolled ? "text-muted-foreground" : "text-primary-foreground/80"
              }`}
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <Button size="sm" className="hidden sm:inline-flex pulse-glow" asChild>
            <a href="#boglanish">
              Buyurtma <ArrowRight className="w-4 h-4 ml-1" />
            </a>
          </Button>
          <button
            className={`lg:hidden p-2 transition-colors ${scrolled ? "text-foreground" : "text-primary-foreground"}`}
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`lg:hidden overflow-hidden transition-all duration-500 ${
        mobileOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
      }`}>
        <div className="bg-background/95 backdrop-blur-xl border-t px-4 py-4 space-y-1">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="block py-3 px-4 text-foreground hover:text-primary hover:bg-primary/5 rounded-lg transition-all duration-200 font-medium"
            >
              {link.label}
            </a>
          ))}
          <Button className="w-full mt-3" asChild>
            <a href="#boglanish" onClick={() => setMobileOpen(false)}>Buyurtma berish</a>
          </Button>
        </div>
      </div>
    </nav>
  );
};

/* ── Hero ── */
const HeroSection = () => (
  <section className="relative min-h-screen flex items-center overflow-hidden">
    {/* Background image with overlay */}
    <div className="absolute inset-0">
      <img src={sunflowerField} alt="" className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-r from-foreground/90 via-foreground/70 to-foreground/40" />
    </div>

    {/* Floating decorative elements */}
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute top-20 right-[10%] w-32 h-32 rounded-full bg-primary/20 blur-3xl floating" />
      <div className="absolute bottom-32 left-[5%] w-48 h-48 rounded-full bg-primary/15 blur-3xl floating-slow" />
      <div className="absolute top-1/3 right-[30%] w-20 h-20 rounded-full bg-primary/10 blur-2xl floating" style={{ animationDelay: "1s" }} />
    </div>

    <div className="container mx-auto px-4 pt-24 pb-16 relative z-10">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <div className="inline-flex items-center gap-2 bg-primary/20 backdrop-blur-sm rounded-full px-5 py-2.5 mb-8 animate-on-scroll">
            <Sun className="w-4 h-4 text-primary animate-spin" style={{ animation: "spin-slow 8s linear infinite" }} />
            <span className="text-sm font-semibold text-primary-foreground">100% Tabiiy Mahsulot</span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-primary-foreground leading-[1.1] mb-6 animate-on-scroll stagger-1">
            Ta'mzor Original –{" "}
            <span className="text-primary relative">
              Haqiqiy Sifat
              <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 300 12" fill="none">
                <path d="M2 10C50 2 150 2 298 10" stroke="hsl(30 92% 53%)" strokeWidth="3" strokeLinecap="round" />
              </svg>
            </span>{" "}
            Ta'mi
          </h1>

          <p className="text-lg md:text-xl text-primary-foreground/70 mb-10 max-w-lg leading-relaxed animate-on-scroll stagger-2">
            Ehtiyotkorlik bilan tanlangan, yuqori sifatli kungaboqar urug'lari. 
            Tabiiy ta'm va yangilik har bir donada. O'zbekistonning eng yaxshi semechkasi.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-12 animate-on-scroll stagger-3">
            <Button size="lg" className="text-base font-bold h-14 px-8 group" asChild>
              <a href="#boglanish">
                Buyurtma berish
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </a>
            </Button>
            <Button
              size="lg"
              variant="ghost"
              className="text-primary-foreground border-2 border-primary-foreground/20 hover:bg-primary-foreground/10 text-base h-14 px-8"
              asChild
            >
              <a href="#mahsulotlar">Mahsulotlarni ko'rish</a>
            </Button>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap gap-6 animate-on-scroll stagger-4">
            {[
              { icon: CheckCircle2, text: "Premium sifat" },
              { icon: Leaf, text: "100% tabiiy" },
              { icon: Truck, text: "Tezkor yetkazish" },
            ].map((badge, i) => (
              <div key={i} className="flex items-center gap-2 text-primary-foreground/60">
                <badge.icon className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium">{badge.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Hero product image */}
        <div className="hidden lg:block relative animate-on-scroll-scale stagger-2">
          <div className="relative">
            <div className="absolute -inset-4 bg-primary/20 rounded-3xl blur-2xl floating-slow" />
            <img
              src={heroImg1}
              alt="Ta'mzor Original mahsuloti"
              className="relative rounded-3xl shadow-2xl w-full hover:scale-[1.02] transition-transform duration-700"
            />
            {/* Floating badge */}
            <div className="absolute -bottom-4 -left-4 bg-background rounded-2xl shadow-xl p-4 floating">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Star className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Reyting</p>
                  <p className="font-bold text-foreground">4.9 / 5.0</p>
                </div>
              </div>
            </div>
            <div className="absolute -top-4 -right-4 bg-primary text-primary-foreground rounded-2xl shadow-xl px-5 py-3 floating-slow">
              <p className="font-bold text-lg">#1</p>
              <p className="text-xs opacity-80">Bestseller</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* Scroll indicator */}
    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
      <ChevronDown className="w-8 h-8 text-primary-foreground/50" />
    </div>
  </section>
);

/* ── Marquee banner ── */
const MarqueeBanner = () => (
  <div className="bg-primary py-3 overflow-hidden">
    <div className="flex whitespace-nowrap" style={{ animation: "scroll-left 20s linear infinite" }}>
      {Array.from({ length: 8 }).map((_, i) => (
        <span key={i} className="text-primary-foreground font-bold text-sm mx-8 flex items-center gap-2">
          <Sun className="w-4 h-4" />
          PREMIUM SIFAT
          <span className="opacity-50">•</span>
          TABIIY TA'M
          <span className="opacity-50">•</span>
          HAQIQIY LAZZAT
        </span>
      ))}
    </div>
    <style>{`@keyframes scroll-left { from { transform: translateX(0); } to { transform: translateX(-50%); } }`}</style>
  </div>
);

/* ── Products ── */
const ProductsSection = () => (
  <section id="mahsulotlar" className="py-24 md:py-32 bg-background relative overflow-hidden">
    {/* Background decoration */}
    <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

    <div className="container mx-auto px-4 relative">
      <div className="text-center mb-20">
        <span className="animate-on-scroll inline-block text-primary font-bold text-sm uppercase tracking-[0.2em] mb-4">
          ☀ Mahsulotlar
        </span>
        <h2 className="animate-on-scroll stagger-1 text-3xl md:text-5xl font-extrabold text-foreground">
          Bizning assortiment
        </h2>
        <p className="animate-on-scroll stagger-2 text-muted-foreground mt-5 max-w-lg mx-auto text-lg">
          Har bir ta'm uchun – yuqori sifatli kungaboqar urug'lari
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto">
        {/* Product 1 */}
        <div className="animate-on-scroll-left stagger-2">
          <Card className="overflow-hidden group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-0 shadow-lg">
            <div className="aspect-[4/3] overflow-hidden bg-muted relative">
              <img
                src={heroImg1}
                alt="Ta'mzor Original"
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute top-4 right-4 bg-primary text-primary-foreground px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg">
                Bestseller
              </div>
            </div>
            <CardContent className="p-8">
              <div className="flex items-center gap-2 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                ))}
                <span className="text-sm text-muted-foreground ml-1">(4.9)</span>
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-3">Ta'mzor Original</h3>
              <p className="text-muted-foreground leading-relaxed">
                Klassik ta'm – tuzlangan, qarsillagan va mazali kungaboqar urug'lari. 
                Eng ko'p sotiluvchi mahsulotimiz. Oilangiz va do'stlaringiz uchun eng yaxshi tanlov.
              </p>
              <Button className="mt-6 w-full group/btn" size="lg" asChild>
                <a href="#boglanish">
                  Buyurtma berish
                  <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                </a>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Product 2 */}
        <div className="animate-on-scroll-right stagger-3">
          <Card className="overflow-hidden group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-0 shadow-lg">
            <div className="aspect-[4/3] overflow-hidden bg-muted relative">
              <img
                src={heroImg2}
                alt="Ta'mzor Nesolenie"
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute top-4 right-4 bg-green-600 text-primary-foreground px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg">
                Tabiiy
              </div>
            </div>
            <CardContent className="p-8">
              <div className="flex items-center gap-2 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                ))}
                <span className="text-sm text-muted-foreground ml-1">(4.8)</span>
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-3">Ta'mzor Tuzlanmagan</h3>
              <p className="text-muted-foreground leading-relaxed">
                Tabiiy ta'm – tuzsiz, sog'lom tanlov. Sof kungaboqar urug'larining haqiqiy lazzati. 
                Sog'lig'ingiz uchun eng to'g'ri qaror.
              </p>
              <Button className="mt-6 w-full group/btn" variant="outline" size="lg" asChild>
                <a href="#boglanish">
                  Buyurtma berish
                  <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                </a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  </section>
);

/* ── Parallax divider ── */
const ParallaxDivider = () => (
  <section className="relative h-72 md:h-96 overflow-hidden">
    <div
      className="absolute inset-0 bg-fixed bg-center bg-cover"
      style={{ backgroundImage: `url(${seedsScatter})` }}
    />
    <div className="absolute inset-0 bg-foreground/60" />
    <div className="relative z-10 h-full flex items-center justify-center text-center px-4">
      <div>
        <h3 className="text-3xl md:text-5xl font-extrabold text-primary-foreground mb-4 animate-on-scroll">
          Har bir dona – <span className="text-primary">mukammallik</span>
        </h3>
        <p className="text-primary-foreground/70 text-lg max-w-md mx-auto animate-on-scroll stagger-1">
          Biz faqat eng yaxshi kungaboqar urug'larini tanlaymiz
        </p>
      </div>
    </div>
  </section>
);

/* ── Features ── */
const features = [
  { icon: Shield, title: "Premium sifat", desc: "Faqat eng yaxshi kungaboqar urug'lari tanlanadi va sifat nazoratidan o'tkaziladi" },
  { icon: Leaf, title: "Tabiiy mahsulot", desc: "Sun'iy qo'shimchalarsiz, tabiiy ta'm. Sog'lom va xavfsiz" },
  { icon: Package, title: "Professional qadoqlash", desc: "Yangilikni saqlovchi zamonaviy qadoqlash texnologiyasi" },
  { icon: Sparkles, title: "Yangi va toza", desc: "Har doim yangi partiyalar, eng yuqori sifat kafolati" },
  { icon: Heart, title: "Sevimli ta'm", desc: "Minglab oilalar tomonidan tanlangan va ishonch qozongan brend" },
  { icon: Award, title: "Sifat kafolati", desc: "Har bir mahsulot qat'iy sifat standartlariga javob beradi" },
];

const FeaturesSection = () => (
  <section id="afzalliklar" className="py-24 md:py-32 bg-secondary relative overflow-hidden">
    <div className="absolute bottom-0 left-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

    <div className="container mx-auto px-4 relative">
      <div className="text-center mb-20">
        <span className="animate-on-scroll inline-block text-primary font-bold text-sm uppercase tracking-[0.2em] mb-4">
          ✦ Afzalliklar
        </span>
        <h2 className="animate-on-scroll stagger-1 text-3xl md:text-5xl font-extrabold text-foreground">
          Nega aynan Ta'mzor?
        </h2>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {features.map((f, i) => (
          <div
            key={i}
            className={`animate-on-scroll-scale stagger-${i + 1} group bg-background rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2 border border-transparent hover:border-primary/20`}
          >
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary group-hover:scale-110 transition-all duration-500">
              <f.icon className="w-8 h-8 text-primary group-hover:text-primary-foreground transition-colors duration-500" />
            </div>
            <h3 className="font-bold text-lg text-foreground mb-3">{f.title}</h3>
            <p className="text-muted-foreground leading-relaxed">{f.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

/* ── Stats / Numbers ── */
const StatsSection = () => (
  <section id="raqamlar" className="py-24 md:py-28 bg-primary relative overflow-hidden">
    <div className="absolute inset-0 opacity-10">
      <div className="absolute top-10 left-10 w-64 h-64 rounded-full bg-primary-foreground blur-3xl" />
      <div className="absolute bottom-10 right-10 w-48 h-48 rounded-full bg-primary-foreground blur-3xl" />
    </div>

    <div className="container mx-auto px-4 relative">
      <div className="text-center mb-16">
        <h2 className="animate-on-scroll text-3xl md:text-5xl font-extrabold text-primary-foreground">
          Raqamlarda Ta'mzor
        </h2>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-4xl mx-auto">
        {[
          { value: 5000, suffix: "+", label: "Mamnun mijozlar", icon: Users },
          { value: 50, suffix: "+", label: "Hamkor do'konlar", icon: Store },
          { value: 100, suffix: "%", label: "Tabiiy mahsulot", icon: Leaf },
          { value: 3, suffix: " yil", label: "Bozordagi tajriba", icon: Clock },
        ].map((stat, i) => (
          <div key={i} className={`animate-on-scroll stagger-${i + 1} text-center`}>
            <div className="w-14 h-14 rounded-2xl bg-primary-foreground/15 flex items-center justify-center mx-auto mb-4">
              <stat.icon className="w-7 h-7 text-primary-foreground" />
            </div>
            <p className="text-3xl md:text-5xl font-extrabold text-primary-foreground mb-2">
              <AnimatedCounter target={stat.value} suffix={stat.suffix} />
            </p>
            <p className="text-primary-foreground/70 font-medium">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

/* ── Retail / Vending ── */
const RetailSection = () => (
  <section id="savdo" className="py-24 md:py-32 bg-background relative overflow-hidden">
    <div className="absolute top-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2" />

    <div className="container mx-auto px-4 relative">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-20">
          <span className="animate-on-scroll inline-block text-primary font-bold text-sm uppercase tracking-[0.2em] mb-4">
            🏪 Savdo yechimlari
          </span>
          <h2 className="animate-on-scroll stagger-1 text-3xl md:text-5xl font-extrabold text-foreground">
            Do'konlar uchun professional yechimlar
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="animate-on-scroll-left">
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Ta'mzor brendining maxsus snack dispenserlari orqali do'koningizda qulay va zamonaviy savdo tashkil qiling.
              Ulgurji va chakana hamkorlik imkoniyatlari mavjud.
            </p>

            <div className="space-y-6 mb-10">
              {[
                { icon: Store, title: "Vending qutilar", desc: "Chakana do'konlar uchun professional snack dispenserlari. Zamonaviy dizayn va qulay foydalanish." },
                { icon: ShoppingBag, title: "Ulgurji sotib olish", desc: "Katta hajmda buyurtma bering va maxsus narxlardan foydalaning. Doimiy hamkorlarga chegirmalar." },
                { icon: Truck, title: "Tezkor yetkazish", desc: "Toshkent bo'ylab tezkor yetkazib berish xizmati. Buyurtmangiz 24 soat ichida." },
                { icon: Zap, title: "Marketing qo'llab-quvvatlash", desc: "Reklama materiallari va savdo bo'yicha maslahatlar bepul." },
              ].map((item, i) => (
                <div
                  key={i}
                  className={`flex items-start gap-4 p-4 rounded-xl hover:bg-secondary transition-all duration-300 group`}
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                    <item.icon className="w-6 h-6 text-primary group-hover:text-primary-foreground transition-colors" />
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground mb-1">{item.title}</h4>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <Button className="h-14 px-8 text-base font-bold group" size="lg" asChild>
              <a href="#boglanish">
                Hamkorlik uchun bog'laning
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </a>
            </Button>
          </div>

          <div className="animate-on-scroll-right stagger-2">
            <div className="relative">
              <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-3xl p-8 aspect-square flex flex-col items-center justify-center gap-6 relative overflow-hidden">
                <div className="absolute inset-0 shimmer rounded-3xl" />
                <Store className="w-24 h-24 text-primary floating relative z-10" />
                <p className="text-foreground font-bold text-xl relative z-10">Professional Dispenser</p>
                <p className="text-muted-foreground text-center max-w-xs relative z-10">
                  Do'koningiz uchun zamonaviy snack dispenser tizimi
                </p>
              </div>
              {/* Floating stat */}
              <div className="absolute -bottom-4 -right-4 bg-background rounded-2xl shadow-xl p-5 floating">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center">
                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Hamkorlar</p>
                    <p className="font-bold text-foreground">50+ do'kon</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

/* ── Testimonials ── */
const testimonials = [
  { name: "Akbar M.", role: "Do'kon egasi, Toshkent", text: "Ta'mzor semechkasi mijozlarimiz orasida eng ko'p sotiladi. Sifati har doim bir xil va dispenser tizimi juda qulay.", rating: 5 },
  { name: "Dilnoza K.", role: "Doimiy mijoz", text: "Oilamiz faqat Ta'mzor semechkasi yeydi. Tabiiy ta'mi va yangiligi boshqalardan farq qiladi.", rating: 5 },
  { name: "Jasur T.", role: "Ulgurji xaridor", text: "Ulgurji narxlar juda qulay. Yetkazib berish tez va xizmat ajoyib. Tavsiya qilaman!", rating: 5 },
];

const TestimonialsSection = () => (
  <section className="py-24 md:py-32 bg-secondary">
    <div className="container mx-auto px-4">
      <div className="text-center mb-20">
        <span className="animate-on-scroll inline-block text-primary font-bold text-sm uppercase tracking-[0.2em] mb-4">
          💬 Fikrlar
        </span>
        <h2 className="animate-on-scroll stagger-1 text-3xl md:text-5xl font-extrabold text-foreground">
          Mijozlarimiz nima deydi
        </h2>
      </div>

      <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {testimonials.map((t, i) => (
          <div key={i} className={`animate-on-scroll stagger-${i + 1}`}>
            <Card className="h-full border-0 shadow-md hover:shadow-xl transition-all duration-500 hover:-translate-y-2">
              <CardContent className="p-8">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(t.rating)].map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-muted-foreground leading-relaxed mb-6 italic">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="font-bold text-primary">{t.name[0]}</span>
                  </div>
                  <div>
                    <p className="font-bold text-foreground text-sm">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </div>
  </section>
);

/* ── Contact ── */
const ContactSection = () => (
  <section id="boglanish" className="py-24 md:py-32 bg-foreground text-primary-foreground relative overflow-hidden">
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute top-20 left-[10%] w-64 h-64 rounded-full bg-primary/10 blur-3xl floating" />
      <div className="absolute bottom-10 right-[10%] w-48 h-48 rounded-full bg-primary/10 blur-3xl floating-slow" />
    </div>

    <div className="container mx-auto px-4 relative">
      <div className="max-w-3xl mx-auto text-center">
        <span className="animate-on-scroll inline-block text-primary font-bold text-sm uppercase tracking-[0.2em] mb-4">
          📞 Bog'lanish
        </span>
        <h2 className="animate-on-scroll stagger-1 text-3xl md:text-5xl font-extrabold mb-4">
          Biz bilan bog'laning
        </h2>
        <p className="animate-on-scroll stagger-2 text-primary-foreground/60 mb-12 text-lg max-w-md mx-auto">
          Buyurtma berish yoki hamkorlik uchun quyidagi raqamlar orqali murojaat qiling
        </p>

        <div className="grid sm:grid-cols-2 gap-6 mb-8 animate-on-scroll stagger-3">
          <a
            href="tel:+998904793040"
            className="flex items-center justify-center gap-4 bg-primary-foreground/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-primary-foreground/20 transition-all duration-300 hover:scale-105 group"
          >
            <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center group-hover:bg-primary transition-colors">
              <Phone className="w-5 h-5" />
            </div>
            <div className="text-left">
              <p className="text-xs text-primary-foreground/50">Telefon 1</p>
              <span className="font-bold text-lg">+998 90-479-30-40</span>
            </div>
          </a>
          <a
            href="tel:+998931958811"
            className="flex items-center justify-center gap-4 bg-primary-foreground/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-primary-foreground/20 transition-all duration-300 hover:scale-105 group"
          >
            <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center group-hover:bg-primary transition-colors">
              <Phone className="w-5 h-5" />
            </div>
            <div className="text-left">
              <p className="text-xs text-primary-foreground/50">Telefon 2</p>
              <span className="font-bold text-lg">+998 93-195-88-11</span>
            </div>
          </a>
        </div>

        <a
          href="https://instagram.com/tamzor_snack"
          target="_blank"
          rel="noopener noreferrer"
          className="animate-on-scroll stagger-4 inline-flex items-center gap-4 bg-gradient-to-r from-pink-600/20 to-purple-600/20 backdrop-blur-sm rounded-2xl px-8 py-6 hover:from-pink-600/30 hover:to-purple-600/30 transition-all duration-300 hover:scale-105"
        >
          <Instagram className="w-6 h-6" />
          <div className="text-left">
            <p className="text-xs text-primary-foreground/50">Instagram</p>
            <span className="font-bold text-lg">@tamzor_snack</span>
          </div>
        </a>

        <div className="mt-12 animate-on-scroll stagger-5">
          <div className="flex items-center justify-center gap-2 text-primary-foreground/40">
            <MapPin className="w-4 h-4" />
            <span className="text-sm">Toshkent, O'zbekiston</span>
          </div>
        </div>
      </div>
    </div>
  </section>
);

/* ── Footer ── */
const Footer = () => (
  <footer className="bg-foreground border-t border-primary-foreground/10 py-12">
    <div className="container mx-auto px-4">
      <div className="grid md:grid-cols-3 gap-10 mb-10">
        <div>
          <p className="text-2xl font-extrabold text-primary-foreground mb-2">
            TA'MZOR <span className="font-medium text-sm text-primary-foreground/40">ORIGINAL</span>
          </p>
          <p className="text-primary-foreground/50 text-sm leading-relaxed">
            O'zbekistonning eng sifatli kungaboqar urug'lari. 
            Haqiqiy ta'm va sifat kafolati.
          </p>
        </div>
        <div>
          <h4 className="font-bold text-primary-foreground mb-4">Sahifalar</h4>
          <div className="space-y-2">
            {["Mahsulotlar", "Afzalliklar", "Savdo", "Bog'lanish"].map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase().replace("'", "")}`}
                className="block text-primary-foreground/50 hover:text-primary transition-colors text-sm"
              >
                {link}
              </a>
            ))}
          </div>
        </div>
        <div>
          <h4 className="font-bold text-primary-foreground mb-4">Aloqa</h4>
          <div className="space-y-2 text-primary-foreground/50 text-sm">
            <p>+998 90-479-30-40</p>
            <p>+998 93-195-88-11</p>
            <a href="https://instagram.com/tamzor_snack" className="hover:text-primary transition-colors block">
              @tamzor_snack
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-primary-foreground/10 pt-8 text-center">
        <p className="text-primary-foreground/30 text-sm">
          © {new Date().getFullYear()} Ta'mzor Original. Barcha huquqlar himoyalangan.
        </p>
      </div>
    </div>
  </footer>
);

/* ── Page ── */
const Index = () => {
  useScrollAnimation();

  return (
    <>
      <Navbar />
      <HeroSection />
      <MarqueeBanner />
      <ProductsSection />
      <ParallaxDivider />
      <FeaturesSection />
      <StatsSection />
      <RetailSection />
      <TestimonialsSection />
      <ContactSection />
      <Footer />
      <ChatWidget />
    </>
  );
};

export default Index;
