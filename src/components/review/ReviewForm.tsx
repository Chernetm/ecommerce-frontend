import { useState } from 'react';
import { reviewApi } from '@/api/review';
import { Button } from '@/components/ui/button';
import { Star } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

interface ReviewFormProps {
    productId: number;
    onReviewSubmitted: () => void;
}

export function ReviewForm({ productId, onReviewSubmitted }: ReviewFormProps) {
    const { user } = useAuth();
    const [rating, setRating] = useState(5);
    const [title, setTitle] = useState('');
    const [comment, setComment] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) return; // Should be handled by parent or auth check

        setIsSubmitting(true);
        try {
            await reviewApi.create({ productId, rating, title, comment });
            setRating(5);
            setTitle('');
            setComment('');
            onReviewSubmitted();
        } catch (error) {
            console.error('Failed to submit review', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!user) {
        return <div className="bg-slate-50 p-4 rounded-lg text-sm text-slate-500">Please log in to write a review.</div>;
    }

    return (
        <form onSubmit={handleSubmit} className="bg-white border border-slate-200 p-6 rounded-xl shadow-sm">
            <h3 className="font-semibold text-lg text-slate-900 mb-4">Write a Review</h3>

            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Rating</label>
                    <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <button
                                key={star}
                                type="button"
                                onClick={() => setRating(star)}
                                className="focus:outline-none transition-transform hover:scale-110"
                            >
                                <Star className={`h-6 w-6 ${star <= rating ? 'text-yellow-400 fill-yellow-400' : 'text-slate-300'}`} />
                            </button>
                        ))}
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Title</label>
                    <input
                        className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm focus:ring-2 focus:ring-slate-400 focus:outline-none"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Give your review a title"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Comment</label>
                    <textarea
                        className="flex min-h-[100px] w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm focus:ring-2 focus:ring-slate-400 focus:outline-none"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="What did you like or dislike?"
                        required
                    />
                </div>

                <Button type="submit" disabled={isSubmitting}>Submit Review</Button>
            </div>
        </form>
    );
}
