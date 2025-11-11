import Link from "next/link";

type ProductCardProps = {
  id: string;
  name: string;
  code: string;
  price: number;
  image?: string;
};

export default function ProductCard({ id, name, code, price, image }: ProductCardProps) {
  return (
    <Link href={`/product/${id}`} className="group">
      <div className="space-y-3">
        {/* Фото товара */}
        <div className="relative w-full aspect-[3/4] bg-bg-2 rounded-lg overflow-hidden flex items-center justify-center group-hover:opacity-90 transition-opacity">
          {image ? (
            <img src={image} alt={name} className="w-full h-full object-cover" />
          ) : (
            <span className="text-bg-3 opacity-30 uppercase text-xs text-center px-4">
              Фото товара
            </span>
          )}
        </div>

        {/* Название товара + код товара */}
        <div>
          <h3 className="uppercase text-sm mb-1">{name}</h3>
          <p className="text-xs opacity-70 uppercase">{code}</p>
        </div>

        {/* Цена */}
        <div className="text-base font-medium">{price.toLocaleString("ru-RU")} ₽</div>

        {/* Цвета (заглушка) */}
        <div className="flex gap-2">
          <div className="w-4 h-4 rounded-full bg-white border border-black/20"></div>
          <div className="w-4 h-4 rounded-full bg-bg-4 border border-black/20"></div>
        </div>
      </div>
    </Link>
  );
}

