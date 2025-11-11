import HeaderNavigation from "@/components/HeaderNavigation";
import Footer from "@/components/Footer";

export default function StreetPage() {
  return (
    <div className="min-h-screen bg-bg-1">
      <HeaderNavigation className="py-6" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl uppercase mb-8 text-center">Об улице / Справка улицы</h1>

        <div className="space-y-8 leading-relaxed">
          <section>
            <h2 className="text-2xl uppercase border-b border-black/20 pb-2 mb-4">
              О нашей улице
            </h2>
            <p className="opacity-80">
              Reus Vertes — это не просто бренд одежды, это целая улица стиля и самовыражения.
              Наша улица объединяет всех, кто ценит качество, минимализм и осознанный подход к моде.
            </p>
          </section>

          <section>
            <h2 className="text-2xl uppercase border-b border-black/20 pb-2 mb-4">
              История улицы
            </h2>
            <p className="opacity-80">
              Каждая коллекция — это новая улица, новый маршрут для исследования вашего стиля.
              Мы создаем одежду, которая становится частью вашего пути.
            </p>
          </section>

          <section>
            <h2 className="text-2xl uppercase border-b border-black/20 pb-2 mb-4">
              Карта улицы
            </h2>
            <p className="opacity-80 mb-4">
              Исследуйте наши коллекции:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="relative aspect-[4/5] bg-bg-2 rounded-lg overflow-hidden flex items-center justify-center">
                <span className="text-bg-3 opacity-30 uppercase text-sm">Мужская коллекция — скоро</span>
              </div>
              <div className="relative aspect-[4/5] bg-bg-2 rounded-lg overflow-hidden flex items-center justify-center">
                <span className="text-bg-3 opacity-30 uppercase text-sm">Женская коллекция — скоро</span>
              </div>
            </div>
          </section>
        </div>
      </div>

      <Footer />
    </div>
  );
}

