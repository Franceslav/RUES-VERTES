"use client";

import HeaderNavigation from "@/components/HeaderNavigation";
import Footer from "@/components/Footer";
import { useState, use, useEffect, useMemo } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import EmailSubscription from "@/components/EmailSubscription";
import Image from "next/image";

const FALLBACK_PRODUCT_IMAGES = [
  "/2025719194253168.jpg",
  "/dclassic%202025-08-17%20173739.668.JPG",
  "/dclassic%202025-08-25%20153725.511.JPG",
];

interface Product {
  id: string;
  name: string;
  code: string;
  price: number;
  description: string | null;
  imageUrl: string | null;
  colors: string[] | null;
  sizes: string[] | null;
  fit: string | null;
  category: string | null;
}

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { user } = useAuth();
  const router = useRouter();
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [selectedFit, setSelectedFit] = useState<string>("Regular");
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isTogglingFavorite, setIsTogglingFavorite] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const defaultColors = [
    { name: "Белый", value: "#FFFFFF" },
    { name: "Зеленый", value: "#006341" },
  ];

  const defaultSizes = ["S", "M", "L", "XL"];

  useEffect(() => {
    loadProduct();
  }, [id]);

  useEffect(() => {
    if (user && product) {
      checkFavorite();
    }
  }, [user, product]);

  const loadProduct = async () => {
    try {
      const response = await fetch(`/api/products/${id}`);
      if (response.ok) {
        const data = await response.json();
        setProduct(data.product);
        setError(null);
        // Установить размеры и цвета из БД, если они есть
        if (data.product.sizes && data.product.sizes.length > 0) {
          // sizes уже будут установлены из product
        }
      } else {
        const errorData = await response.json();
        setError(errorData.error || "Товар не найден");
        setProduct(null);
      }
    } catch (error) {
      console.error("Error loading product:", error);
      setError("Ошибка при загрузке товара");
      setProduct(null);
    } finally {
      setIsLoading(false);
    }
  };

  const checkFavorite = async () => {
    if (!user || !product) return;

    try {
      const response = await fetch("/api/favorites", {
        headers: {
          "x-user-id": user.id,
        },
      });

      if (response.ok) {
        const data = await response.json();
        const favorite = data.favorites?.find(
          (fav: any) => fav.product.id === product.id
        );
        setIsFavorite(!!favorite);
      } else {
        // Не показываем ошибку, если просто нет избранного
        setIsFavorite(false);
      }
    } catch (error) {
      console.error("Error checking favorite:", error);
      setIsFavorite(false);
    }
  };

  const handleToggleFavorite = async () => {
    if (!user || !product) {
      if (!user) {
        router.push("/profile");
      }
      return;
    }

    setIsTogglingFavorite(true);
    try {
      if (isFavorite) {
        // Удалить из избранного
        const response = await fetch(`/api/favorites?productId=${product.id}`, {
          method: "DELETE",
          headers: {
            "x-user-id": user.id,
          },
        });

        if (response.ok) {
          setIsFavorite(false);
        }
      } else {
        // Добавить в избранное
        const response = await fetch("/api/favorites", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-user-id": user.id,
          },
          body: JSON.stringify({
            productId: product.id,
          }),
        });

        if (response.ok) {
          setIsFavorite(true);
        } else {
          const error = await response.json();
          alert(error.error || "Ошибка при добавлении в избранное");
        }
      }
    } catch (error) {
      console.error("Error toggling favorite:", error);
      alert("Ошибка при изменении избранного");
    } finally {
      setIsTogglingFavorite(false);
    }
  };

  const sizes = product?.sizes || defaultSizes;
  const colors = product?.colors
    ? product.colors.map((color) => {
        const colorMap: Record<string, string> = {
          "#006341": "Зеленый",
          "#FFFFFF": "Белый",
        };
        return { name: colorMap[color] || color, value: color };
      })
    : defaultColors;

  // Посадка - выбирается пользователем
  const fitScale = [
    { label: "Slim", value: "Slim" },
    { label: "Slim/Regular", value: "Slim/Regular" },
    { label: "Regular", value: "Regular" },
    { label: "Relaxed", value: "Relaxed" },
    { label: "Oversized", value: "Oversized" },
  ];

  const lookbookImages = [
    { src: "/lookbook/202571920230512.jpg", alt: "Lookbook образ 1" },
    { src: "/lookbook/2025719202722568.jpg", alt: "Lookbook образ 2" },
    { src: "/lookbook/202583151222472.jpg", alt: "Lookbook образ 3" },
  ];

  const galleryImages = useMemo(() => {
    const baseImages = product?.imageUrl
      ? [product.imageUrl, ...FALLBACK_PRODUCT_IMAGES]
      : FALLBACK_PRODUCT_IMAGES;
    return Array.from(new Set(baseImages.filter(Boolean)));
  }, [product?.imageUrl]);

  useEffect(() => {
    if (galleryImages.length > 0 && selectedImageIndex >= galleryImages.length) {
      setSelectedImageIndex(0);
    }
  }, [galleryImages.length, selectedImageIndex]);

  const activeImage = galleryImages[selectedImageIndex] ?? galleryImages[0];
  
  // Установить посадку по умолчанию из БД при загрузке товара
  useEffect(() => {
    if (product?.fit) {
      setSelectedFit(product.fit);
    }
  }, [product?.fit]);

  const handleAddToCart = async () => {
    if (!user || !selectedSize) {
      if (!user) {
        router.push("/profile");
      }
      return;
    }

    setIsAddingToCart(true);
    try {
      const response = await fetch("/api/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-user-id": user.id,
        },
        body: JSON.stringify({
          productId: id,
          quantity: 1,
          size: selectedSize,
          color: selectedColor || null,
          fit: selectedFit || null,
        }),
      });

      if (response.ok) {
        alert("Товар добавлен в корзину!");
        router.push("/cart");
      } else {
        const error = await response.json();
        alert(error.error || "Ошибка при добавлении в корзину");
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert("Ошибка при добавлении в корзину");
    } finally {
      setIsAddingToCart(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-bg-1">
        <HeaderNavigation className="py-6" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center py-20">
            <p className="text-bg-3 opacity-70 uppercase">Загрузка товара...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-bg-1">
        <HeaderNavigation className="py-6" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center py-20">
            <p className="text-bg-3 opacity-70 uppercase mb-4">
              {error || "Товар не найден"}
            </p>
            <Link
              href="/"
              className="text-bg-4 hover:opacity-70 transition-opacity uppercase underline"
            >
              Вернуться на главную
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg-1">
      <HeaderNavigation className="py-6" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Основной блок: Фото слева, информация справа */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-14 items-start">
          {/* Левая колонка: Фото товара (закрепляется) */}
          <div className="lg:sticky lg:top-6 lg:h-[calc(100vh-3rem)]">
            <div className="space-y-4">
              {/* Главное фото */}
              <div className="relative w-full aspect-square bg-bg-2 rounded-lg overflow-hidden flex items-center justify-center">
                {activeImage ? (
                  <Image
                    src={activeImage}
                    alt={product?.name ? `${product.name} — фото ${selectedImageIndex + 1}` : `Фото товара ${selectedImageIndex + 1}`}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                    priority
                  />
                ) : (
                  <span className="text-bg-3 opacity-30 uppercase text-sm">
                    Фото товара {selectedImageIndex + 1}
                  </span>
                )}
              </div>

              {/* Миниатюры */}
              <div className="grid grid-cols-4 gap-2">
                {galleryImages.map((imageSrc, index) => (
                  <button
                    key={imageSrc}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-colors ${
                      selectedImageIndex === index
                        ? "border-bg-4"
                        : "border-transparent hover:border-bg-4/40"
                    }`}
                    aria-label={`Показать фото ${index + 1}`}
                  >
                    <Image
                      src={imageSrc}
                      alt={product?.name ? `${product.name} — миниатюра ${index + 1}` : `Миниатюра ${index + 1}`}
                      fill
                      sizes="(max-width: 768px) 25vw, 10vw"
                      className="object-cover"
                    />
                    {selectedImageIndex === index && (
                      <span className="absolute inset-0 border-2 border-bg-4 pointer-events-none" aria-hidden="true"></span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Правая колонка: Информация о товаре */}
          <div className="space-y-6 pt-2 lg:pt-0">
            {/* Название товара + код товара */}
            <div>
              <h1 className="text-3xl uppercase mb-2">
                {product?.name || "Название товара"}
              </h1>
              <p className="text-sm opacity-70 uppercase">
                Код товара: {product?.code || "RV-001"}
              </p>
            </div>

            {/* Короткое описание */}
            <p className="leading-relaxed opacity-80">
              {product?.description ||
                "Короткое описание товара. Премиальная футболка из высококачественного хлопка."}
            </p>

            {/* Цена */}
            <div className="text-2xl font-semibold">
              {product?.price ? `${product.price.toLocaleString("ru-RU")} ₽` : "5 990 ₽"}
            </div>

            {/* Цвета */}
            <div className="space-y-3">
              <p className="uppercase text-sm font-medium">Цвета</p>
              <div className="flex gap-3">
                {colors.map((color) => (
                  <button
                    key={color.value}
                    onClick={() => setSelectedColor(color.value)}
                    className={`w-12 h-12 rounded-full border-2 transition-all ${
                      selectedColor === color.value
                        ? "border-bg-3 scale-110"
                        : "border-transparent hover:border-bg-3/50"
                    }`}
                    style={{ backgroundColor: color.value }}
                    aria-label={color.name}
                  />
                ))}
              </div>
            </div>

            {/* Размер и посадка */}
            <div className="space-y-4 pt-4 border-t border-black/10">
              {/* Посадка - выбирается пользователем */}
              <div>
                <p className="uppercase text-sm font-medium mb-3">Посадка</p>
                <div className="relative w-full max-w-xl">
                  <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-black/30 -translate-y-1/2" aria-hidden="true" />
                  <div className="grid grid-cols-5 gap-3 relative">
                    {fitScale.map((item) => {
                      const isRegular = item.value === "Regular";
                      const isActive = selectedFit === item.value || isRegular;

                      return (
                        <button
                          key={item.value}
                          onClick={() => {
                            if (isRegular) {
                              setSelectedFit(item.value);
                            }
                          }}
                          disabled={!isRegular}
                          aria-disabled={!isRegular}
                          className={`relative flex flex-col items-center gap-2 transition-colors ${
                            isRegular ? "text-bg-4" : "text-bg-3 opacity-50 cursor-not-allowed"
                          }`}
                          aria-label={`Посадка ${item.label}`}
                        >
                          <span
                            className={`w-12 h-12 rounded-full border-2 flex items-center justify-center text-xs uppercase tracking-widest transition-all ${
                              isActive && isRegular
                                ? "border-bg-4 bg-bg-4 text-white"
                                : "border-black/10 bg-white"
                            }`}
                          >
                            {item.label.charAt(0)}
                          </span>
                          <span className="text-[10px] uppercase tracking-widest text-center leading-tight">
                            {item.label}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Размер - выбирается пользователем */}
              <div>
                <p className="uppercase text-sm font-medium mb-3">Размер</p>
                <div className="flex gap-2">
                  {sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`flex-1 py-3 px-4 border-2 rounded uppercase transition-all ${
                        selectedSize === size
                          ? "border-bg-3 bg-bg-2"
                          : "border-black/20 hover:border-black/40"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
                <button className="mt-2 text-sm underline opacity-70">
                  Таблица размеров
                </button>
              </div>
            </div>

            {/* Кнопки: В корзину и Избранное */}
            <div className="flex gap-3 pt-4">
              <button
                onClick={handleAddToCart}
                disabled={isAddingToCart || !selectedSize || !user}
                className="flex-1 bg-bg-4 text-white py-4 px-6 uppercase hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {!user
                  ? "Войдите для добавления в корзину"
                  : isAddingToCart
                  ? "Добавление..."
                  : "В корзину"}
              </button>
              <button
                onClick={handleToggleFavorite}
                disabled={isTogglingFavorite || !user}
                className={`p-4 border-2 rounded hover:border-black/40 transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                  isFavorite
                    ? "border-bg-4 bg-bg-4 text-white"
                    : "border-black/20"
                }`}
                aria-label={isFavorite ? "Удалить из избранного" : "Добавить в избранное"}
              >
                {isTogglingFavorite ? (
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-current"></div>
                ) : (
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M17.5 3.33334C17.058 2.89134 16.517 2.55934 15.925 2.36334C15.333 2.16734 14.705 2.11234 14.089 2.20334C13.473 2.29434 12.884 2.52834 12.366 2.88934C11.848 3.25034 11.414 3.72834 11.1 4.28534L10 6.66667L8.9 4.28534C8.586 3.72834 8.152 3.25034 7.634 2.88934C7.116 2.52834 6.527 2.29434 5.911 2.20334C5.295 2.11234 4.667 2.16734 4.075 2.36334C3.483 2.55934 2.942 2.89134 2.5 3.33334C1.916 3.91734 1.467 4.62034 1.185 5.39334C0.903 6.16634 0.794 6.99034 0.866 7.80634C0.938 8.62234 1.189 9.41134 1.6 10.12C2.011 10.8287 2.573 11.4387 3.243 11.9053L10 17.5L16.757 11.9053C17.427 11.4387 17.989 10.8287 18.4 10.12C18.811 9.41134 19.062 8.62234 19.134 7.80634C19.206 6.99034 19.097 6.16634 18.815 5.39334C18.533 4.62034 18.084 3.91734 17.5 3.33334Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      fill={isFavorite ? "currentColor" : "none"}
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Инфо о товаре */}
        <div className="mb-16 space-y-10">
          <div>
   	      <h2 className="text-2xl uppercase mb-6">Инфо о товаре</h2>
          <div className="space-y-8">
            <section>
              <h3 className="uppercase text-sm font-medium mb-3">Описание</h3>
              <p className="leading-relaxed opacity-80">
                {product?.description ||
                  "Премиальная футболка из высококачественного хлопка. Идеальная посадка и комфорт для повседневной носки. Минималистичный дизайн подойдет к любому образу."}
              </p>
            </section>

            <section>
              <h3 className="uppercase text-sm font-medium mb-3">Состав</h3>
              <p className="leading-relaxed opacity-80">
                100% хлопок, кулирка с peach-эффектом, 250&nbsp;г/м²
              </p>
            </section>

            <section>
              <h3 className="uppercase text-sm font-medium mb-3">Параметры модели</h3>
              <p className="leading-relaxed opacity-80">Рост: 180 см, размер: M</p>
            </section>

            <section>
              <h3 className="uppercase text-sm font-medium mb-3">Подробности, материалы и инструкция по уходу</h3>
              <p className="leading-relaxed opacity-80">
                Изделие изготавливается из высококачественного хлопка с мягкой поверхностью. Рекомендуется деликатный уход, чтобы сохранить структуру ткани и насыщенность цвета.
              </p>
            </section>

            <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="uppercase text-sm font-medium mb-1">Артикул</h3>
                <p className="opacity-80 uppercase">{product?.code || "RV-001"}</p>
              </div>
              <div>
                <h3 className="uppercase text-sm font-medium mb-1">Коллекция</h3>
                <p className="opacity-80 uppercase">Осень-Зима 2024</p>
              </div>
            </section>

            <section>
              <h3 className="uppercase text-sm font-medium mb-3">Уход</h3>
              <ul className="space-y-2 opacity-80">
                <li>• Машинная стирка при 30°C</li>
                <li>• Не отбеливать</li>
                <li>• Гладить при низкой температуре</li>
                <li>• Не подвергать химчистке</li>
              </ul>
            </section>

            <section>
              <h3 className="uppercase text-sm font-medium mb-3">Доставка</h3>
              <p className="leading-relaxed opacity-80">
                Доставка по Москве и регионам России. Срок доставки: 1–3 рабочих дня.
              </p>
            </section>

            <section>
              <Link
                href="/contacts"
                className="text-sm uppercase underline opacity-70 hover:opacity-100 inline-block"
              >
                Задать вопрос о товаре
              </Link>
            </section>
          </div>
        </div>
      </div>

        {/* Lookbook */}
        <div className="mb-16">
          <h2 className="text-2xl uppercase mb-8">Lookbook</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {lookbookImages.map((image, index) => (
              <div key={image.src} className="group relative w-full aspect-[3/4] overflow-hidden rounded-lg">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  priority={index === 0}
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors" aria-hidden="true" />
              </div>
            ))}
          </div>
        </div>

        {/* Скидка за подписку на имейл */}
        <EmailSubscription />
      </div>

      {/* Подвал */}
      <Footer />
    </div>
  );
}

