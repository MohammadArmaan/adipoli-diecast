import Link from "next/link";
import { formatDate } from "@/lib/utils";
import { getWixServerClient } from "@/lib/wix-client.server";

export const revalidate = 60;

async function getAllBlogPosts(limit = 100) {
  try {
    const wixClient = await getWixServerClient();

    const { items } = await wixClient.posts
      .queryPosts()
      .descending("firstPublishedDate")
      .limit(limit)
      .find();

    return items || [];
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return [];
  }
}

/**
 * Builds a Wix CDN URL from a wix:image:// URI.
 *
 * Input:  "wix:image://v1/d4aa76_765072b5a6d6477e811b4f09711e6a3a~mv2.jpg/filename.jpg#..."
 * Output: "https://static.wixstatic.com/media/d4aa76_765072b5a6d6477e811b4f09711e6a3a~mv2.jpg/v1/fill/w_600,h_300,al_c,q_85,enc_auto/d4aa76_765072b5a6d6477e811b4f09711e6a3a~mv2.jpg"
 */
function wixUriToCdnUrl(uri: string, width: number, height: number): string {
  // Strip scheme and version prefix
  const withoutScheme = uri.replace("wix:image://v1/", "");
  // Strip everything after # (origin dimensions metadata)
  const withoutHash = withoutScheme.split("#")[0];
  // fileId is the first segment before the slash (filename)
  const fileId = withoutHash.split("/")[0];
  return `https://static.wixstatic.com/media/${fileId}/v1/fill/w_${width},h_${height},al_c,q_85,enc_auto/${fileId}`;
}

/**
 * Extracts the image URI from wherever Wix puts it in the post object.
 *
 * Your API response confirms the shape is:
 *   post.media.wixMedia.image = "wix:image://v1/..."
 *
 * We also fall back to heroImage for safety.
 */
function getPostImageUri(post: any): string | null {
  // Primary: post.media.wixMedia.image  ← confirmed from your logs
  const wixMediaImage = post?.media?.wixMedia?.image;
  if (typeof wixMediaImage === "string" && wixMediaImage) return wixMediaImage;

  // Fallback: heroImage variants
  const hero = post?.heroImage;
  if (!hero) return null;
  if (typeof hero === "string" && hero) return hero;
  if (typeof hero === "object") {
    return hero.id ?? hero.url ?? hero?.image?.src?.url ?? hero?.src?.url ?? null;
  }

  return null;
}

function buildImageUrl(post: any, width: number, height: number): string | null {
  const uri = getPostImageUri(post);
  if (!uri) return null;

  if (uri.startsWith("wix:image://")) return wixUriToCdnUrl(uri, width, height);
  if (uri.startsWith("https://") || uri.startsWith("http://")) return uri;

  // Bare fileId
  return `https://static.wixstatic.com/media/${uri}/v1/fill/w_${width},h_${height},al_c,q_85,enc_auto/${uri}`;
}

export default async function BlogPage() {
  const blogPosts = await getAllBlogPosts();

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="mb-10 text-center text-4xl font-bold text-primary">
        Blogs
      </h1>

      <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
        {blogPosts.map((post: any) => {
          const imageUrl = buildImageUrl(post, 600, 300);

          return (
            <Link
              key={post._id}
              href={`/blog/${post.slug}`}
              className="group relative block overflow-hidden rounded-2xl border border-border bg-card shadow-lg transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_0_40px_hsl(var(--primary)/0.35)]"
            >
              {imageUrl ? (
                <div className="relative overflow-hidden h-56">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={imageUrl}
                    alt={post.title ?? "Blog cover"}
                    className="h-full w-full object-cover transition-all duration-700 group-hover:rotate-[1deg] group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/40 to-transparent" />
                </div>
              ) : (
                <div className="h-56 w-full bg-muted/40 flex items-center justify-center text-muted-foreground text-xs uppercase tracking-widest">
                  No cover image
                </div>
              )}

              <div className="relative p-6">
                <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-primary">
                  {formatDate(post.firstPublishedDate)}
                </p>
                <h2 className="mb-3 text-xl font-extrabold uppercase tracking-wide text-foreground transition-colors duration-300 group-hover:text-primary">
                  {post.title}
                </h2>
                <p className="mb-5 line-clamp-3 text-sm text-muted-foreground">
                  {post.excerpt}
                </p>
                <div className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-primary">
                  Read More →
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}