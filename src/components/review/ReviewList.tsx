import { Star } from 'lucide-react';
import { Review } from '@/types';

interface ReviewListProps {
    reviews: Review[];
}

export function ReviewList({ reviews }: ReviewListProps) {
    if (reviews.length === 0) {
        return <div className="text-slate-500 italic">No reviews yet. Be the first to review!</div>;
    }

    return (
        <div className="space-y-6">
            {reviews.map((review) => (
                <div key={review.id} className="border-b border-slate-100 pb-6 last:border-0">
                    <div className="flex items-center gap-2 mb-2">
                        <div className="flex">
                            {[...Array(5)].map((_, i) => (
                                <Star
                                    key={i}
                                    className={`h-4 w-4 ${i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-slate-300'}`}
                                />
                            ))}
                        </div>
                        <span className="font-semibold text-slate-900">{review.title}</span>
                    </div>
                    <p className="text-slate-600 text-sm mb-2">{review.comment}</p>
                    <div className="flex items-center gap-2 text-xs text-slate-400">
                        <span>By User {review.userId.substring(0, 6)}...</span>
                        <span>•</span>
                        <span>{new Date(review.createdAt).toLocaleDateString()}</span>
                        {review.verifiedPurchase && (
                            <span className="text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded flex items-center gap-1">
                                Verified Purchase
                            </span>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
}
