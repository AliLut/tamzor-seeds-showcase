import { Phone, Instagram, Leaf, Shield, Package, Sparkles, ShoppingBag, Store } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import productImg1 from "@/assets/tamzor-product-1.jpg";
import productImg2 from "@/assets/tamzor-product-2.jpg";

const Navbar = () => (
  <nav className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b">
    <div className="container mx-auto px-4 h-16 flex items-center justify-between">
      <a href="#" className="text-xl font-extrabold tracking-tight">
        <span className="text-primary">TA'MZOR</span>{" "}
        <span className="text-muted-foreground font-medium text-sm">ORIGINAL</span>
      </a>
      <div className="hidden md:flex items-center gap-8 text-sm font-medium">
        <a href="#mahsulotlar" className="text-muted-foreground hover:text-primary transition-colors">Mahsulotlar</a>
        <a href="#afzalliklar" className="text-muted-foreground hover:text-primary transition-colors">Afzalliklar</a>
        <a href="#savdo" className="text-muted-foreground hover:text-primary transition-colors">Savdo</a>
        <a href="#boglanish" className="text-muted-foreground hover:text-primary transition-colors">Bog'lanish</a>
      </div>
      <Button size="sm" asChild>
        <a href="#boglanish">Buyurtma</a>
      </Button>
    </div>
  </nav>
);

const HeroSection = () => (
  <section className="relative min-h-[90vh] flex items-center bg-gradient-to-br from-primary via-primary to-primary/80 overflow-hidden">
    <div className="absolute inset-0 opacity-10">
      <div className="absolute top-20 right-20 w-96 h-96 rounded-full bg-primary-foreground blur-3xl" />
      <div className="absolute bottom-10 left-10 w-72 h-72 rounded-full bg-primary-foreground blur-3xl" />
    </div>
    <div className="container mx-auto px-4 pt-24 pb-16 relative z-10">
      <div className="max-w-2xl">
        <div className="inline-flex items-center gap-2 bg-primary-foreground/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
          <Sparkles className="w-4 h-4 text-primary-foreground" />
          <span className="text-sm font-medium text-primary-foreground">Premium sifat</span>
        </div>
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-primary-foreground leading-tight mb-6">
          Ta'mzor Original –{" "}
          <span className="opacity-90">Haqiqiy Sifat Ta'mi</span>
        </h1>
        <p className="text-lg md:text-xl text-primary-foreground/80 mb-8 max-w-lg">
          Ehtiyotkorlik bilan tanlangan, yuqori sifatli kungaboqar urug'lari. Tabiiy ta'm va yangilik har bir donada.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Button size="lg" variant="secondary" className="text-base font-semibold" asChild>
            <a href="#boglanish">Buyurtma berish</a>
          </Button>
          <Button size="lg" variant="ghost" className="text-primary-foreground border border-primary-foreground/30 hover:bg-primary-foreground/10 text-base" asChild>
            <a href="#mahsulotlar">Mahsulotlar</a>
          </Button>
        </div>
      </div>
    </div>
  </section>
);

const ProductsSection = () => (
  <section id="mahsulotlar" className="py-20 md:py-28 bg-background">
    <div className="container mx-auto px-4">
      <div className="text-center mb-16">
        <span className="text-primary font-semibold text-sm uppercase tracking-widest">Mahsulotlar</span>
        <h2 className="text-3xl md:text-4xl font-extrabold mt-3 text-foreground">Bizning assortiment</h2>
        <p className="text-muted-foreground mt-4 max-w-md mx-auto">
          Har bir ta'm uchun – yuqori sifatli kungaboqar urug'lari
        </p>
      </div>
      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <Card className="overflow-hidden group hover:shadow-xl transition-shadow duration-300">
          <div className="aspect-[4/3] overflow-hidden bg-muted">
            <img src={productImg1} alt="Ta'mzor Original" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
          </div>
          <CardContent className="p-6">
            <div className="inline-block bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-3">
              Original
            </div>
            <h3 className="text-xl font-bold text-foreground mb-2">Ta'mzor Original</h3>
            <p className="text-muted-foreground text-sm">
              Klassik ta'm – tuzlangan, qarsillagan va mazali kungaboqar urug'lari. Eng ko'p sotiluvchi mahsulotimiz.
            </p>
          </CardContent>
        </Card>
        <Card className="overflow-hidden group hover:shadow-xl transition-shadow duration-300">
          <div className="aspect-[4/3] overflow-hidden bg-muted">
            <img src={productImg2} alt="Ta'mzor Nesolenie" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
          </div>
          <CardContent className="p-6">
            <div className="inline-block bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-3">
              Nesolenie
            </div>
            <h3 className="text-xl font-bold text-foreground mb-2">Ta'mzor Tuzlanmagan</h3>
            <p className="text-muted-foreground text-sm">
              Tabiiy ta'm – tuzsiz, sog'lom tanlov. Sof kungaboqar urug'larining haqiqiy lazzati.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  </section>
);

const features = [
  { icon: Shield, title: "Premium sifat", desc: "Faqat eng yaxshi kungaboqar urug'lari tanlanadi" },
  { icon: Leaf, title: "Tabiiy mahsulot", desc: "Sun'iy qo'shimchalarsiz, tabiiy ta'm" },
  { icon: Package, title: "Professional qadoqlash", desc: "Yangilikni saqlovchi zamonaviy qadoqlash" },
  { icon: Sparkles, title: "Yangi va toza", desc: "Har doim yangi partiyalar, eng yuqori freshness" },
];

const FeaturesSection = () => (
  <section id="afzalliklar" className="py-20 md:py-28 bg-secondary">
    <div className="container mx-auto px-4">
      <div className="text-center mb-16">
        <span className="text-primary font-semibold text-sm uppercase tracking-widest">Afzalliklar</span>
        <h2 className="text-3xl md:text-4xl font-extrabold mt-3 text-foreground">Nega Ta'mzor?</h2>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
        {features.map((f, i) => (
          <div key={i} className="text-center p-6">
            <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <f.icon className="w-7 h-7 text-primary" />
            </div>
            <h3 className="font-bold text-foreground mb-2">{f.title}</h3>
            <p className="text-muted-foreground text-sm">{f.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const RetailSection = () => (
  <section id="savdo" className="py-20 md:py-28 bg-background">
    <div className="container mx-auto px-4">
      <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div>
          <span className="text-primary font-semibold text-sm uppercase tracking-widest">Savdo yechimlari</span>
          <h2 className="text-3xl md:text-4xl font-extrabold mt-3 mb-6 text-foreground">
            Do'konlar uchun professional yechimlar
          </h2>
          <p className="text-muted-foreground mb-6">
            Ta'mzor brendining maxsus snack dispenserlari orqali do'koningizda qulay va zamonaviy savdo tashkil qiling.
            Ulgurji va chakana hamkorlik imkoniyatlari mavjud.
          </p>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Store className="w-5 h-5 text-primary mt-1 shrink-0" />
              <div>
                <h4 className="font-semibold text-foreground">Vending qutilar</h4>
                <p className="text-sm text-muted-foreground">Chakana do'konlar uchun professional snack dispenserlari</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <ShoppingBag className="w-5 h-5 text-primary mt-1 shrink-0" />
              <div>
                <h4 className="font-semibold text-foreground">Ulgurji sotib olish</h4>
                <p className="text-sm text-muted-foreground">Katta hajmda buyurtma bering va maxsus narxlardan foydalaning</p>
              </div>
            </div>
          </div>
          <Button className="mt-8" size="lg" asChild>
            <a href="#boglanish">Hamkorlik uchun bog'laning</a>
          </Button>
        </div>
        <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-3xl p-8 flex items-center justify-center aspect-square">
          <div className="text-center">
            <Store className="w-20 h-20 text-primary mx-auto mb-4 opacity-60" />
            <p className="text-muted-foreground font-medium">Professional dispenser</p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const ContactSection = () => (
  <section id="boglanish" className="py-20 md:py-28 bg-primary text-primary-foreground">
    <div className="container mx-auto px-4">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold mb-4">Bog'lanish</h2>
        <p className="text-primary-foreground/80 mb-10">
          Buyurtma berish yoki hamkorlik uchun biz bilan bog'laning
        </p>
        <div className="grid sm:grid-cols-2 gap-6 mb-10">
          <a href="tel:+998904793040" className="flex items-center justify-center gap-3 bg-primary-foreground/15 backdrop-blur-sm rounded-2xl p-5 hover:bg-primary-foreground/25 transition-colors">
            <Phone className="w-5 h-5" />
            <span className="font-semibold">+998 90-479-30-40</span>
          </a>
          <a href="tel:+998931958811" className="flex items-center justify-center gap-3 bg-primary-foreground/15 backdrop-blur-sm rounded-2xl p-5 hover:bg-primary-foreground/25 transition-colors">
            <Phone className="w-5 h-5" />
            <span className="font-semibold">+998 93-195-88-11</span>
          </a>
        </div>
        <a
          href="https://instagram.com/tamzor_snack"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 bg-primary-foreground/15 backdrop-blur-sm rounded-2xl px-8 py-5 hover:bg-primary-foreground/25 transition-colors"
        >
          <Instagram className="w-5 h-5" />
          <span className="font-semibold">@tamzor_snack</span>
        </a>
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="bg-foreground text-background/70 py-10">
    <div className="container mx-auto px-4 text-center">
      <p className="text-lg font-extrabold text-background mb-2">
        TA'MZOR <span className="font-medium text-sm text-background/50">ORIGINAL</span>
      </p>
      <p className="text-sm">© {new Date().getFullYear()} Ta'mzor Original. Barcha huquqlar himoyalangan.</p>
    </div>
  </footer>
);

const Index = () => (
  <>
    <Navbar />
    <HeroSection />
    <ProductsSection />
    <FeaturesSection />
    <RetailSection />
    <ContactSection />
    <Footer />
  </>
);

export default Index;
