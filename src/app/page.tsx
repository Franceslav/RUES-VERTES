import HeaderNavigation from "@/components/HeaderNavigation";
import Footer from "@/components/Footer";
import EmailSubscription from "@/components/EmailSubscription";
import Link from "next/link";
import Image from "next/image";

const featuredProductId = "RV-W-002";

export default function Home() {
  return (
    <div className="min-h-screen bg-bg-1">
      <HeaderNavigation className="py-6" />

      {/* Блок №1: Статичное фото - полноширинное */}
      <section className="w-full">
        <div className="relative w-full h-screen bg-bg-2 overflow-hidden flex items-center justify-center">
          <Image
            src="/dclassic%202025-08-17%20173739.668.JPG"
            alt="Зеленая улица с граффити и брендовыми коробками"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/40" />
          <div className="relative z-10 flex flex-col items-center justify-center gap-6 px-4 text-center">
            <h1
              className="text-white text-5xl md:text-6xl font-bold uppercase tracking-[0.3em]"
              style={{ fontFamily: 'var(--font-ibm-plex-mono)', fontWeight: 700 }}
            >
              VRT SHEERT 001
            </h1>
            <Link
              href={`/product/${featuredProductId}`}
              className="w-28 h-28 md:w-32 md:h-32 border-2 border-white text-white uppercase tracking-[0.3em] flex items-center justify-center transition-colors duration-200 hover:bg-white hover:text-bg-4"
            >
              Shop now
            </Link>
          </div>
        </div>
      </section>

      <section className="relative w-full h-4 my-4" aria-hidden="true">
        <div className="absolute inset-0 flex flex-col gap-2">
          <div className="h-1.5 bg-bg-4" />
          <div className="h-1.5 bg-bg-4" />
        </div>
      </section>

      {/* Блок №2: Карта улицы - полноширинные изображения с наложенными текстами */}
      <section className="w-full">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Фото (мужское) - полноширинное с наложенным текстом */}
          <div className="group relative w-full h-[90vh] bg-bg-2 overflow-hidden">
            <Image
              src="/202583155953600.jpg"
              alt="Мужская коллекция Reus Vertus"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" aria-hidden="true" />
            {/* Наложенный текстовый блок */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center z-10">
                <h3 className="text-4xl md:text-5xl lg:text-6xl uppercase font-medium text-white mb-4" style={{ fontFamily: 'var(--font-ibm-plex-mono)', fontWeight: 500 }}>
                  Мужское
                </h3>
                <p className="text-lg md:text-xl uppercase text-white opacity-90" style={{ fontFamily: 'var(--font-ibm-plex-mono)', fontWeight: 400 }}>
                  Скоро
                </p>
              </div>
            </div>
          </div>

          {/* Фото (женское) - полноширинное с наложенным текстом */}
          <div className="group relative w-full h-[90vh] bg-bg-2 overflow-hidden">
            <Image
              src="/dclassic%202025-08-25%20153725.511.JPG"
              alt="Женская коллекция Reus Vertus"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" aria-hidden="true" />
            {/* Наложенный текстовый блок */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center z-10">
                <h3 className="text-4xl md:text-5xl lg:text-6xl uppercase font-medium text-white mb-4" style={{ fontFamily: 'var(--font-ibm-plex-mono)', fontWeight: 500 }}>
                  Женское
                </h3>
                <p className="text-lg md:text-xl uppercase text-white opacity-90" style={{ fontFamily: 'var(--font-ibm-plex-mono)', fontWeight: 400 }}>
                  Скоро
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative w-full h-4 my-4" aria-hidden="true">
        <div className="absolute inset-0 flex flex-col gap-2">
          <div className="h-1.5 bg-bg-4" />
          <div className="h-1.5 bg-bg-4" />
        </div>
      </section>

      {/* Блок №3: Прохожие - луки из lookbook */}
      <section className="w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {[
            { id: 1, src: "/lookbook/dclassic%202025-08-17%20173726.260.JPG", label: "Look 1" },
            { id: 2, src: "/lookbook/dclassic%202025-08-25%20154007.751.JPG", label: "Look 2" },
            { id: 3, src: "/lookbook/202571921630928%20(1).jpg", label: "Look 3" },
            { id: 4, src: "/lookbook/2025825151941112.jpg", label: "Look 4" },
            { id: 5, src: "/lookbook/2025831539728.jpg", label: "Look 5" },
            { id: 6, src: "/lookbook/202583151459872.jpg", label: "Look 6" },
          ].map((look, index) => (
            <div
              key={look.id}
              className="relative w-full h-[70vh] bg-bg-2 overflow-hidden flex items-center justify-center group"
            >
              <Image
                src={look.src}
                alt={look.label}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                priority={index < 2}
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors" aria-hidden="true" />
              <div className="absolute inset-0 flex items-end justify-start p-6">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity text-white uppercase text-sm tracking-[0.2em]">
                  {look.label}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="relative w-full h-4 my-4" aria-hidden="true">
        <div className="absolute inset-0 flex flex-col gap-2">
          <div className="h-1.5 bg-bg-4" />
          <div className="h-1.5 bg-bg-4" />
        </div>
      </section>

      {/* Блок №4: Подписка на email */}
      <section className="w-full bg-bg-1 py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <EmailSubscription />
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
