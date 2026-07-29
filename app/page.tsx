import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ProductGrid from "@/components/ProductGrid";
import AboutSection from "@/components/AboutSection";
import Footer from "@/components/Footer";
import { supabase } from "@/lib/supabase";

export const dynamic = "force-dynamic";
export const revalidate = 60;

export default async function HomePage() {
  const { data: products, error } = await supabase
    .from('products')
    .select('*')
    .eq('isActive', true)
    .order('sortOrder', { ascending: true })
    .order('createdAt', { ascending: false });

  if (error || !products) {
    console.error('Error fetching products:', error);
  }

  return (
    <>
      <Header />
      <main>
        <Hero />
        <ProductGrid products={products || []} />
        <AboutSection />
      </main>
      <Footer />
    </>
  );
}
