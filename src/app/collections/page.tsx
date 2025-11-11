"use client";

import HeaderNavigation from "@/components/HeaderNavigation";
import Footer from "@/components/Footer";
import EmailSubscription from "@/components/EmailSubscription";
import ProductCard from "@/components/ProductCard";
import Image from "next/image";
import { useState } from "react";

export default function CollectionsPage() {
  const [activeCategory, setActiveCategory] = useState("new");

  const categories = [
    { name: "Новинки", slug: "new" },
    { name: "Футболки", slug: "t-shirts" },
  ];

  // Примеры товаров - только футболка
  const featuredProductId = "RV-W-002";

  const products = [
    {
      id: featuredProductId,
      name: "Футболка женская",
      code: "RV-W-002",
      price: 6800,
      image: "/2025719194253168.jpg",
    },
  ];

  return (
    <div className="min-h-screen bg-bg-1">
      <HeaderNavigation className="py-6" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-2xl uppercase mb-8">Коллекции</h1>

        {/* Разделы Мужское/Женское */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="group relative aspect-[4/5] rounded-lg overflow-hidden">
            <Image
              src="/202583155953600.jpg"
              alt="Мужская коллекция Reus Vertus"
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" aria-hidden="true" />
          </div>
          <div className="group relative aspect-[4/5] rounded-lg overflow-hidden">
            <Image
              src="/dclassic%202025-08-25%20153725.511.JPG"
              alt="Женская коллекция Reus Vertus"
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" aria-hidden="true" />
          </div>
        </div>

        {/* Категории - переключатель */}
        <div className="mb-12">
          <h2 className="text-xl uppercase mb-4">Категории</h2>
          <div className="flex gap-6 border-b border-black/20">
            {categories.map((category) => (
              <button
                key={category.slug}
                onClick={() => setActiveCategory(category.slug)}
                className={`pb-3 uppercase text-sm border-b-2 transition-colors ${
                  activeCategory === category.slug
                    ? "border-black font-medium"
                    : "border-transparent hover:border-black/50"
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Товары */}
        <div className="flex justify-center mb-12">
          <div className="w-full max-w-md">
            {products.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        </div>

        {/* Блок подписки на имейл */}
        <EmailSubscription />
      </div>

      <Footer />
    </div>
  );
}

