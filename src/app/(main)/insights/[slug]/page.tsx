import connectDB from "@/lib/db";
import Post from "@/models/Post";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

// Generate SEO Metadata dynamically
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  await connectDB();
  const post = await Post.findOne({ slug });
  if (!post) return {};

  return {
    title: `${post.title} | Kaiser3DWeb`,
    description: post.excerpt,
  };
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  await connectDB();
  const post = await Post.findOne({ slug });

  if (!post) return notFound();

  return (
    <article className="pt-32 pb-20 min-h-screen bg-primary text-primary">
      <div className="container mx-auto px-6 max-w-3xl">
        
        <Link href="/insights" className="inline-flex items-center gap-2 text-muted hover:text-accent-start mb-8 transition-colors">
          <ArrowLeft size={20} /> Back to Insights
        </Link>

        <header className="mb-12">
          <div className="flex gap-4 text-sm font-bold uppercase tracking-wider text-accent-start mb-4">
            <span>{post.category}</span>
            <span className="text-muted">• {new Date(post.createdAt).toLocaleDateString()}</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-8 leading-tight">
            {post.title}
          </h1>
          <p className="text-xl text-muted leading-relaxed border-l-4 border-accent-start pl-6">
            {post.excerpt}
          </p>
        </header>

        {/* Content Body - You can use a library like 'react-markdown' here later */}
        <div className="prose prose-lg dark:prose-invert max-w-none">
           {/* Simple rendering for now. In production, use dangerouslySetInnerHTML safely */}
           <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </div>

      </div>
    </article>
  );
}