// import { motion } from 'framer-motion';
// import { Button } from '@/components/ui/button';
// import { Link } from 'react-router-dom';
// import { Shop } from '@/pages/Shop';

// export function Home() {
//     return (
//         <div className="space-y-16">
//             {/* Hero Section */}
//             <section className="relative overflow-hidden rounded-3xl bg-slate-900 px-6 py-24 sm:py-32 lg:px-8">
//                 <div className="mx-auto max-w-2xl text-center">
//                     <motion.h2
//                         initial={{ opacity: 0, y: 20 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         transition={{ duration: 0.5 }}
//                         className="text-4xl font-bold tracking-tight text-white sm:text-6xl"
//                     >
//                         Elevate Your Style
//                     </motion.h2>
//                     <motion.p
//                         initial={{ opacity: 0, y: 20 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         transition={{ duration: 0.5, delay: 0.2 }}
//                         className="mt-6 text-lg leading-8 text-slate-300"
//                     >
//                         Discover the latest trends in fashion and accessories. Curated collections for the modern individual.
//                     </motion.p>
//                     <motion.div
//                         initial={{ opacity: 0, y: 20 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         transition={{ duration: 0.5, delay: 0.4 }}
//                         className="mt-10 flex items-center justify-center gap-x-6"
//                     >
//                         <Link to="/shop">
//                             <Button size="lg" className="bg-blue-600 hover:bg-blue-500">Shop Now</Button>
//                         </Link>
//                         <Link to="/about">
//                             <Button variant="outline" size="lg" className="text-white border-white hover:bg-white/10">Learn more <span aria-hidden="true">→</span></Button>
//                         </Link>
//                     </motion.div>
//                 </div>

//                 {/* Abstract Background Shapes */}
//                 <div className="absolute -top-24 right-0 -z-10 transform-gpu blur-3xl" aria-hidden="true">
//                     <div className="aspect-[1404/767] w-[87.75rem] bg-gradient-to-r from-[#80caff] to-[#4f46e5] opacity-25" style={{ clipPath: 'polygon(73.6% 51.7%, 91.7% 11.8%, 100% 46.4%, 97.4% 82.2%, 92.5% 84.9%, 75.7% 64%, 55.3% 47.5%, 46.5% 49.4%, 45% 62.9%, 50.3% 87.2%, 21.3% 64.1%, 0.1% 100%, 5.4% 51.1%, 21.4% 63.9%, 58.9% 0.2%, 73.6% 51.7%)' }}></div>
//                 </div>
//             </section>

//             {/* Featured Categories (Placeholder) */}
//             <section>
//                 <div className="flex justify-between items-center mb-8">
//                     <h3 className="text-2xl font-bold text-slate-900">Featured Collections</h3>
//                     <Link to="/shop" className="text-blue-600 font-medium hover:text-blue-500">View all</Link>
//                 </div>
//                 <Shop/>
//             </section>
//         </div>
//     );
// }
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { productApi } from '@/api/product';
import { Product } from '@/types';

export function Home() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFeaturedProducts();
  }, []);

  const loadFeaturedProducts = async () => {
    try {
      const res = await productApi.getAll();
      // Take first 3 products as featured
      setFeaturedProducts(res.products?.slice(0, 3) ?? []);
    } catch (err) {
      console.error('Failed to load featured products', err);
    } finally {
      setLoading(false);
    }
  };

  const getImage = (images: any): string | null => {
    if (!images) return null;
    if (Array.isArray(images)) return images[0];
    if (typeof images === 'string' && images.trim().startsWith('[')) {
      try {
        return JSON.parse(images)[0];
      } catch {
        return null;
      }
    }
    if (typeof images === 'string') return images;
    return null;
  };

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-slate-900 px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-bold tracking-tight text-white sm:text-6xl"
          >
            Elevate Your Style
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-6 text-lg leading-8 text-slate-300"
          >
            Discover the latest trends in fashion and accessories. Curated collections for the modern individual.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-10 flex items-center justify-center gap-x-6"
          >
            <Link to="/shop">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-500">Shop Now</Button>
            </Link>
            <Link to="/about">
              <Button variant="outline" size="lg" className="text-white border-white hover:bg-white/10">
                Learn more <span aria-hidden="true">→</span>
              </Button>
            </Link>
          </motion.div>
        </div>

        {/* Abstract Background Shapes */}
        <div className="absolute -top-24 right-0 -z-10 transform-gpu blur-3xl" aria-hidden="true">
          <div
            className="aspect-[1404/767] w-[87.75rem] bg-gradient-to-r from-[#80caff] to-[#4f46e5] opacity-25"
            style={{ clipPath: 'polygon(73.6% 51.7%, 91.7% 11.8%, 100% 46.4%, 97.4% 82.2%, 92.5% 84.9%, 75.7% 64%, 55.3% 47.5%, 46.5% 49.4%, 45% 62.9%, 50.3% 87.2%, 21.3% 64.1%, 0.1% 100%, 5.4% 51.1%, 21.4% 63.9%, 58.9% 0.2%, 73.6% 51.7%)' }}
          />
        </div>
      </section>

      {/* Featured Collections */}
      <section>
        <div className="flex justify-between items-center mb-8">
          <h3 className="text-2xl font-bold text-slate-900">Featured Collections</h3>
          <Link to="/shop" className="text-blue-600 font-medium hover:text-blue-500">View all</Link>
        </div>

        {loading ? (
          <div className="p-10 text-center text-gray-500">Loading featured products...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProducts.map((p) => {
              const img = getImage(p.images);
              return (
                <Link to={`/product/${p.id}`} key={p.id}>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="relative aspect-[4/5] overflow-hidden rounded-xl bg-slate-200 group cursor-pointer"
                  >
                    {img ? (
                      <img
                        src={img}
                        alt={p.name}
                        className="absolute inset-0 w-full h-full object-cover object-center group-hover:opacity-80 transition-opacity"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                        No Image
                      </div>
                    )}
                    <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-slate-900/20 transition-colors" />
                    <div className="absolute bottom-6 left-6">
                      <h4 className="text-xl font-bold text-white">{p.name}</h4>
                      <p className="text-slate-200 text-sm">${p.price?.toFixed(2)}</p>
                    </div>
                  </motion.div>
                </Link>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
