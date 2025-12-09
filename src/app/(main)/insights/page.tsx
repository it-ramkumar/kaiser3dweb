import Link from "next/link";
import connectDB from "@/lib/db";
import Post from "@/models/Post";
import { Calendar, ArrowRight } from "lucide-react";

// Server Component: Fetches directly from DB for SEO speed
async function getPosts() {
  await connectDB();
  // Only fetch published posts for the public view
  const posts = await Post.find({ published: true }).sort({ createdAt: -1 });
  return posts;
}

export const metadata = {
  title: "Insights & 3D Trends | Kaiser3DWeb",
  description: "Expert articles on WebGL, 3D Product Configurators, and the future of E-commerce.",
};

export default async function InsightsPage() {
  const posts = await getPosts();

  return (
    <div className="pt-32 pb-20 min-h-screen bg-primary text-primary transition-colors duration-300">
      <div className="container mx-auto px-6">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6">
            Industry <span className="text-gradient">Insights</span>
          </h1>
          <p className="text-muted text-xl max-w-2xl mx-auto">
            Deep dives into 3D technology, conversion optimization, and the future of digital retail.
          </p>
        </div>

        {/* Blog Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post: any) => (
            <Link href={`/insights/${post.slug}`} key={post._id} className="group">
              <div className="glass-card rounded-2xl overflow-hidden h-full flex flex-col hover:border-accent-start/50 transition-all duration-300 hover:-translate-y-2">
                
                {/* Image Placeholder */}
                <div className="h-48 bg-secondary w-full relative overflow-hidden">
                   {post.coverImage ? (
                     <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover" />
                   ) : (
                     <div className="absolute inset-0 bg-gradient-to-br from-accent-start/20 to-accent-end/20" />
                   )}
                </div>

                <div className="p-8 flex flex-col flex-grow">
                  <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-wider text-muted mb-4">
                    <span className="text-accent-start">{post.category}</span>
                    <span className="flex items-center gap-1">
                      <Calendar size={12} />
                      {new Date(post.createdAt).toLocaleDateString()}
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold mb-4 group-hover:text-accent-start transition-colors">
                    {post.title}
                  </h3>
                  
                  <p className="text-muted line-clamp-3 mb-6 flex-grow">
                    {post.excerpt}
                  </p>

                  <span className="flex items-center gap-2 text-primary font-bold text-sm group-hover:gap-3 transition-all">
                    Read Article <ArrowRight size={16} />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}