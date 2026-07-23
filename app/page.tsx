import Hero from "@/components/Hero";
import ProductGrid from "@/components/ProductGrid";
import AboutSection from "@/components/AboutSection";
import Footer from "@/components/Footer";
import { prisma } from "@/lib/prisma";
import type { Product } from "@prisma/client";
import type { ProductDTO } from "@/lib/types";

export const dynamic = "force-dynamic";

async function getProducts(): Promise<ProductDTO[]> {
  try {
    const products = await prisma.product.findMany({
      where: { isActive: true },
      orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
    });
    return products.map((p: Product) => ({
      id: p.id,
      name: p.name,
      description: p.description,
      price: p.price,
      weight: p.weight,
      pieces: p.pieces,
      ingredients: p.ingredients,
      wholesalePrice: p.wholesalePrice,
      discount: p.discount,
      image: p.image,
      category: p.category,
      options: p.options,
      isFeatured: p.isFeatured,
      isActive: p.isActive,
      sortOrder: p.sortOrder,
    }));
  } catch {
    return [];
  }
}

export default async function HomePage() {
  const products = await getProducts();

  return (
    <>
      <main>
        <Hero />
        <ProductGrid products={products} />
        <AboutSection />
      </main>
      <Footer />
    </>
  );
}
