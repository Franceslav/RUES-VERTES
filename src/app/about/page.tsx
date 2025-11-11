import HeaderNavigation from "@/components/HeaderNavigation";
import Footer from "@/components/Footer";
import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-bg-1">
      <HeaderNavigation className="py-6" />

      {/* About Content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">

        {/* Hero Title */}
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl uppercase mb-4">About</h1>
          <p className="text-xl opacity-70">Reus Vertes</p>
        </div>

        {/* О бренде / История */}
        <section className="space-y-4">
          <h2 className="text-2xl uppercase border-b border-black/20 pb-2">О бренде / История</h2>
          <div className="space-y-4 leading-relaxed">
            <p>
              Rues Vertes — бренд одежды для креаторов и предпринимателей, основанный Элеонорой Григорян в 2025 году. Наш бренд — это территория для тех, кто мыслит иначе. Мы объединяем работников креативной индустрии, вдохновляя их выражать свою индивидуальность и приверженность к творческому сообществу. Rues Vertes — это настоящее коммьюнити, где мода встречается с креативом, а стиль становится способом говорить о себе громко и уверенно. Мы верим, что одежда — это язык самовыражения. Наши вещи созданы для тех, кто живёт идеями, создаёт смыслы и делает мир вокруг ярче.
            </p>
            <p>
              Каждая коллекция Rues Vertes является лимитированной, а изделия из премиальных материалах доставляются в кастомных деревянных боксах с нанесением граффити и подписанной вручную открыткой. Наши изделия являются уникальными, совмещая в себе повседневный casual, но при этом отражая нестандартность и принадлежность к коммьюнити молодых креаторов. Наша глобальная миссия — объединить всех креаторов, создавая для них уникальный способ заявить о себе.
            </p>
          </div>
        </section>

        {/* Философия */}
        <section className="space-y-4">
          <h2 className="text-2xl uppercase border-b border-black/20 pb-2">Философия</h2>
          <div className="space-y-4 leading-relaxed">
            <p>
              Мы верим в силу простоты и качества. Каждое изделие создается с мыслью о том,
              что мода должна быть осознанной, долговечной и универсальной.
            </p>
            <p>
              Наша философия строится на трех принципах:
            </p>
            <ul className="list-disc list-inside space-y-2 pl-4">
              <li>Качество превыше количества</li>
              <li>Вневременной дизайн вместо сезонных трендов</li>
              <li>Ответственное производство и честность с клиентами</li>
            </ul>
          </div>
        </section>

        {/* Миссия */}
        <section className="space-y-4">
          <h2 className="text-2xl uppercase border-b border-black/20 pb-2">Миссия</h2>
          <div className="space-y-4 leading-relaxed">
            <p>
              Наша миссия — создавать одежду, которая позволяет людям быть собой.
              Мы стремимся к тому, чтобы каждый человек мог найти в нашей коллекции
              вещи, которые станут частью его повседневной жизни на долгие годы.
            </p>
            <p>
              Мы хотим изменить индустрию моды, делая её более осознанной, честной
              и доступной, не жертвуя при этом качеством и дизайном.
            </p>
          </div>
        </section>

        {/* Ценности */}
        <section className="space-y-4">
          <h2 className="text-2xl uppercase border-b border-black/20 pb-2">Ценности</h2>
          <div className="space-y-6 leading-relaxed">
            <div>
              <h3 className="font-semibold text-lg mb-2">Качество</h3>
              <p>
                Мы используем только проверенные материалы и работаем с лучшими
                производителями, чтобы каждое изделие служило вам долгие годы.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2">Честность</h3>
              <p>
                Прозрачность на всех этапах — от выбора материалов до финальной цены.
                Мы открыто рассказываем о том, как и где производится наша продукция.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2">Устойчивость</h3>
              <p>
                Забота об окружающей среде — это не опция, а необходимость.
                Мы выбираем экологичные материалы и минимизируем отходы производства.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2">Индивидуальность</h3>
              <p>
                Каждый человек уникален, и наша одежда призвана подчеркнуть это,
                а не навязать определенный образ.
              </p>
            </div>
          </div>
        </section>

        {/* Команда */}
        <section className="space-y-8">
          <h2 className="text-2xl uppercase border-b border-black/20 pb-2">Команда</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="space-y-4">
              <div className="relative aspect-square bg-bg-2 rounded-lg overflow-hidden">
                <Image
                  src="/shirt/shirt1.png"
                  alt="Команда"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div>
                <h3 className="text-xl font-semibold uppercase">Алексей Иванов</h3>
                <p className="text-sm opacity-70 uppercase">Creative Director</p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="relative aspect-square bg-bg-2 rounded-lg overflow-hidden">
                <Image
                  src="/shirt/shirt2.png"
                  alt="Команда"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div>
                <h3 className="text-xl font-semibold uppercase">Мария Петрова</h3>
                <p className="text-sm opacity-70 uppercase">Lead Designer</p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="relative aspect-square bg-bg-2 rounded-lg overflow-hidden">
                <Image
                  src="/shirt/shirt1.png"
                  alt="Команда"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div>
                <h3 className="text-xl font-semibold uppercase">Дмитрий Сидоров</h3>
                <p className="text-sm opacity-70 uppercase">Production Manager</p>
              </div>
            </div>
          </div>
        </section>

        {/* Амбассадоры */}
        <section className="space-y-8">
          <div>
            <h2 className="text-2xl uppercase border-b border-black/20 pb-2">Амбассадоры</h2>
            <p className="mt-4 opacity-70 leading-relaxed">
              Люди, которые разделяют наши ценности и вдохновляют нас. 
              Наши амбассадоры — это творческие личности, которые через свой стиль и образ жизни 
              воплощают философию Reus Vertes.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
            <div className="space-y-4">
              <div className="relative aspect-[4/5] bg-bg-2 rounded-lg overflow-hidden">
                <Image
                  src="/shirt/shirt2.png"
                  alt="Амбассадор"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div>
                <h3 className="text-xl font-semibold uppercase">Анна Смирнова</h3>
                <p className="text-base opacity-70">Модель и активист</p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="relative aspect-[4/5] bg-bg-2 rounded-lg overflow-hidden">
                <Image
                  src="/shirt/shirt1.png"
                  alt="Амбассадор"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div>
                <h3 className="text-xl font-semibold uppercase">Иван Козлов</h3>
                <p className="text-base opacity-70">Фотограф</p>
              </div>
            </div>
          </div>
        </section>

        {/* Музы */}
        <section className="space-y-8">
          <div>
            <h2 className="text-2xl uppercase border-b border-black/20 pb-2">Музы</h2>
            <p className="mt-4 opacity-70 leading-relaxed">
              Наши любимые модели, которые воплощают дух бренда
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="space-y-4">
              <div className="relative aspect-[3/4] bg-bg-2 rounded-lg overflow-hidden group">
                <Image
                  src="/shirt/shirt2.png"
                  alt="Муза"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <p className="text-sm uppercase">Наша муза сезона весна 2024</p>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold uppercase">Екатерина Волкова</h3>
              </div>
            </div>
            <div className="space-y-4">
              <div className="relative aspect-[3/4] bg-bg-2 rounded-lg overflow-hidden group">
                <Image
                  src="/shirt/shirt1.png"
                  alt="Муза"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <p className="text-sm uppercase">Лицо коллекции</p>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold uppercase">София Новикова</h3>
              </div>
            </div>
            <div className="space-y-4">
              <div className="relative aspect-[3/4] bg-bg-2 rounded-lg overflow-hidden group">
                <Image
                  src="/shirt/shirt2.png"
                  alt="Муза"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <p className="text-sm uppercase">Амбассадор бренда</p>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold uppercase">Дарья Морозова</h3>
              </div>
            </div>
          </div>
        </section>

      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
