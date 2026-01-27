// import { motion } from 'framer-motion';
// import { Button } from '@/components/ui/button';
// import { ShoppingCart } from 'lucide-react';

// const products = [
//     {
//         id: 1,
//         name: 'Classic White Tee',
//         price: '$29.99',
//         image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
//         category: 'T-Shirts'
//     },
//     {
//         id: 2,
//         name: 'Denim Jacket',
//         price: '$89.99',
//         image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
//         category: 'Outerwear'
//     },
//     {
//         id: 3,
//         name: 'Summer Dress',
//         price: '$59.99',
//         image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
//         category: 'Dresses'
//     },
//     {
//         id: 4,
//         name: 'Leather Boots',
//         price: '$129.99',
//         image: 'https://images.unsplash.com/photo-1520639888713-785118eb8b1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
//         category: 'Footwear'
//     },
//     {
//         id: 5,
//         name: 'Vintage Jeans',
//         price: '$79.99',
//         image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
//         category: 'Bottoms'
//     },
//     {
//         id: 6,
//         name: 'Striped Sweater',
//         price: '$49.99',
//         image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
//         category: 'Tops'
//     }
// ];

// export function Shop() {
//     return (
//         <div className="bg-white">
//             <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
//                 <motion.div
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ duration: 0.5 }}
//                 >
//                     <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Shop Collection</h2>
//                     <p className="mt-4 text-gray-500">Curated items for your unique style.</p>
//                 </motion.div>

//                 <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
//                     {products.map((product, index) => (
//                         <motion.div
//                             key={product.id}
//                             initial={{ opacity: 0, y: 20 }}
//                             animate={{ opacity: 1, y: 0 }}
//                             transition={{ duration: 0.5, delay: index * 0.1 }}
//                             className="group relative"
//                         >
//                             <div className="aspect-[1/1] w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-[7/8]">
//                                 <img
//                                     src={product.image}
//                                     alt={product.name}
//                                     className="h-full w-full object-cover object-center group-hover:opacity-75 transition-opacity"
//                                 />
//                             </div>
//                             <div className="mt-4 flex justify-between">
//                                 <div>
//                                     <h3 className="text-sm text-gray-700">
//                                         <a href={`/product/${product.id}`}>
//                                             <span aria-hidden="true" className="absolute inset-0" />
//                                             {product.name}
//                                         </a>
//                                     </h3>
//                                     <p className="mt-1 text-sm text-gray-500">{product.category}</p>
//                                 </div>
//                                 <p className="text-sm font-medium text-gray-900">{product.price}</p>
//                             </div>
//                             <div className="mt-4">
//                                 <Button className="w-full bg-slate-900 hover:bg-slate-800 text-white flex items-center justify-center gap-2">
//                                     <ShoppingCart className="h-4 w-4" /> Add to Cart
//                                 </Button>
//                             </div>
//                         </motion.div>
//                     ))}
//                 </div>
//             </div>
//         </div>
//     );
// }
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';
import { productApi } from '@/api/product';
import { Product } from '@/types';

export function Shop() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const res = await productApi.getAll();
      console.log('products',res)
      // Your backend response: { data: { products: [...], pagination: {...} } }
      setProducts(res.products ?? []);
    } catch (err) {
      console.error('Failed to load products', err);
    } finally {
      setLoading(false);
    }
  };

  // Normalize image to always get the first URL
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

  if (loading) return <div className="p-10 text-center">Loading...</div>;
  if (!products.length) return <div className="p-10 text-center">No products found</div>;

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Shop Collection
          </h2>
          <p className="mt-4 text-gray-500">Curated items from your backend.</p>
        </motion.div>

        <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((p, index) => {
            const img = getImage(p.images);

            return (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative"
              >
                <div className="aspect-square w-full overflow-hidden rounded-lg bg-gray-200">
                  {img ? (
                    <img
                      src={img}
                      alt={p.name}
                      className="h-full w-full object-cover group-hover:opacity-75 transition"
                    />
                  ) : (
                    <div className="h-full w-full flex items-center justify-center text-gray-400">
                      No Image
                    </div>
                  )}
                </div>

                <div className="mt-4 flex justify-between">
                  <div>
                    <h3 className="text-sm text-gray-700">
                      <a href={`/product/${p.id}`}>
                        <span className="absolute inset-0" />
                        {p.name}
                      </a>
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">{p.categoryId}</p>
                  </div>
                  <p className="text-sm font-medium text-gray-900">
                    ${p.price?.toFixed(2)}
                  </p>
                </div>

                <div className="mt-4">
                  <Button className="w-full bg-slate-900 hover:bg-slate-800 text-white flex items-center justify-center gap-2">
                    <ShoppingCart className="h-4 w-4" />
                    Add to Cart
                  </Button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
