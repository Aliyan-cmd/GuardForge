import React, { useEffect, useState } from 'react';
import { Star, MessageSquare, Send } from 'lucide-react';
import { PublicLayout } from '../components/PublicLayout';
import api from '../api/client';

export const Reviews = () => {
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [content, setContent] = useState('');
  const [rating, setRating] = useState(5);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const res = await api.get('/reviews/');
      setReviews(res.data);
    } catch (err) {
      console.error("Failed to fetch reviews", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await api.post('/reviews/', { user_name: name, user_role: role, content, rating });
      setName(''); setRole(''); setContent(''); setRating(5);
      fetchReviews();
      alert("Thank you for your review!");
    } catch (err) {
      alert("Failed to submit review");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <PublicLayout>
      <section className="py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20 animate-fade-in-up">
            <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight">
              User <span className="text-gradient">Feedback</span>
            </h1>
            <p className="text-gray-400 text-xl max-w-3xl mx-auto">
              See what others are saying about GuardForge, and leave your own review.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-6">
              {loading ? (
                <div className="text-center py-20 animate-pulse text-gray-500">Loading reviews...</div>
              ) : reviews.length === 0 ? (
                <div className="text-center py-20 glass-card rounded-2xl border-dashed border-white/10">
                  <MessageSquare size={40} className="mx-auto text-gray-600 mb-4" />
                  <p className="text-gray-500 font-bold text-lg">No reviews yet. Be the first to share your experience!</p>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 gap-6">
                  {reviews.map((r, i) => (
                    <div key={r.id} className="glass-card rounded-2xl p-6 border border-white/5 animate-fade-in text-left" style={{ animationDelay: `${i * 50}ms` }}>
                      <div className="flex items-center gap-1 mb-4">
                        {Array.from({ length: Math.floor(r.rating) }).map((_, s) => (
                          <Star key={s} size={14} className="text-yellow-400 fill-yellow-400" />
                        ))}
                      </div>
                      <p className="text-base text-gray-300 leading-relaxed mb-6 italic">"{r.content}"</p>
                      <div className="flex items-center gap-3 mt-auto">
                        <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-black uppercase">{r.user_name[0]}</div>
                        <div>
                          <p className="text-sm font-bold text-white">{r.user_name}</p>
                          <p className="text-[10px] text-gray-500 uppercase tracking-widest">{r.user_role}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="lg:col-span-1">
              <div className="glass-card rounded-3xl p-8 border-primary/20 sticky top-32">
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                  <Send size={20} className="text-primary" />
                  Leave a Review
                </h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <input type="text" placeholder="Your Name" value={name} onChange={e => setName(e.target.value)} required
                    className="input-premium w-full px-4 py-3 rounded-xl text-sm text-white" />
                  <input type="text" placeholder="Role (e.g. CTO, Developer)" value={role} onChange={e => setRole(e.target.value)}
                    className="input-premium w-full px-4 py-3 rounded-xl text-sm text-white" />
                  <textarea placeholder="Your Experience..." value={content} onChange={e => setContent(e.target.value)} required rows={5}
                    className="input-premium w-full px-4 py-3 rounded-xl text-sm text-white resize-none" />
                  <div className="flex items-center justify-between px-1">
                    <span className="text-xs text-gray-500 font-bold uppercase tracking-widest">Rating</span>
                    <div className="flex gap-1">
                      {[1,2,3,4,5].map(s => (
                        <button key={s} type="button" onClick={() => setRating(s)} className="focus:outline-none transition-transform hover:scale-110">
                          <Star size={20} className={s <= rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-700'} />
                        </button>
                      ))}
                    </div>
                  </div>
                  <button type="submit" disabled={submitting}
                    className="btn-primary w-full py-4 rounded-xl text-sm font-bold text-white mt-4 flex items-center justify-center gap-2">
                    {submitting ? 'Submitting...' : 'Post Review'}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
};
