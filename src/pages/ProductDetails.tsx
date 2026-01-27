import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { productApi } from '@/api/product';
import { cartApi } from '@/api/cart';
import { Product, Review } from '@/types';
import { Button } from '@/components/ui/button';
import { ReviewList } from '@/components/review/ReviewList';
import { ReviewForm } from '@/components/review/ReviewForm';
import { ShoppingCart } from 'lucide-react';

export function ProductDetailsPage() {
    const { id } = useParams();
    const [product, setProduct] = useState<Product | null>(null);
    const [reviews, setReviews] = useState<Review[]>([]); // Assuming we fetch reviews separate or from product
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (id) {
            loadData(Number(id));
        }
    }, [id]);

    const loadData = async (productId: number) => {
        setLoading(true);
        try {
            const pData = await productApi.getById(productId);
            console.log("Product data", pData);
            setProduct(pData);
            // Assuming reviews might not be in the product response directly or we want fresh ones
            // const rData = await reviewApi.getByProductId(productId); 
            // setReviews(rData); 
            // NOTE: Based on previous inspection, ProductResponse has reviews. Let's assume `productApi.getById` returns ProductResponse actually?
            // Wait, types/index.ts `Product` interface doesn't have `reviews`. 
            // backend `ProductResponse` DOES have `Reviews`.
            // I need to update frontend type or just cast it for now.
            // Let's assume we fetch reviews separately for cleaner architecture if backend supports it, 
            // OR we use the reviews embedded. 
            // Let's try to fetch reviews separately if possible or mock for now.
            // Actually earlier I implemented `reviewApi.getByProductId` to return [].
            // Let's rely on product.reviews if it exists (casted)
            const pResponse = pData as any;
            if (pResponse.reviews) setReviews(pResponse.reviews);

        } catch (err) { console.error(err); }
        finally { setLoading(false); }
    };

    const handleAddToCart = async () => {
        if (product) {
            await cartApi.add(product.id, 1);
            alert('Added to cart!');
        }
    };

    if (loading) return <div className="p-10 text-center">Loading...</div>;
    if (!product) return <div className="p-10 text-center">Product not found</div>;

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
                {/* Image Gallery */}
                <div className="rounded-2xl bg-slate-100 overflow-hidden aspect-square">
                    {(() => {
                        let imageUrl: string | null = null;

                        if (product.images) {
                            try {
                                if (Array.isArray(product.images)) {
                                    imageUrl = product.images[0];
                                } else if (typeof product.images === "string") {
                                    // If it looks like a JSON array → parse
                                    if (product.images.trim().startsWith("[")) {
                                        const arr = JSON.parse(product.images);
                                        imageUrl = arr?.[0] ?? null;
                                    } else {
                                        // Otherwise treat it as a direct URL
                                        imageUrl = product.images;
                                    }
                                }
                            } catch (e) {
                                console.error("Invalid images format", e);
                            }
                        }

                        return imageUrl ? (
                            <img
                                src={imageUrl}
                                alt={product.name}
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-slate-300">
                                No Image
                            </div>
                        );
                    })()}
                </div>


                {/* Info */}
                <div className="space-y-6">
                    <div>
                        <h1 className="text-4xl font-bold text-slate-900 mb-2">{product.name}</h1>
                        <p className="text-2xl font-bold text-blue-600">${(product.price || 0).toFixed(2)}</p>
                    </div>

                    <p className="text-slate-600 leading-relaxed text-lg">{product.description}</p>

                    <div className="grid grid-cols-2 gap-4 py-6 border-y border-slate-100">
                        <div>
                            <span className="block text-sm text-slate-500">Stock</span>
                            <span className="font-medium text-slate-900">{product.stock} units</span>
                        </div>
                        <div>
                            <span className="block text-sm text-slate-500">Category</span>
                            <span className="font-medium text-slate-900">{product.categoryId}</span>
                        </div>
                    </div>

                    <Button size="lg" className="w-full text-lg h-14" onClick={handleAddToCart}>
                        <ShoppingCart className="mr-2 h-5 w-5" /> Add to Cart
                    </Button>
                </div>
            </div>

            {/* Reviews Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                <div className="lg:col-span-2 space-y-8">
                    <h2 className="text-2xl font-bold text-slate-900">Customer Reviews</h2>
                    <ReviewList reviews={reviews} />
                </div>
                <div>
                    <div className="sticky top-24">
                        <ReviewForm productId={product.id} onReviewSubmitted={() => loadData(product.id)} />
                    </div>
                </div>
            </div>
        </div>
    );
}
