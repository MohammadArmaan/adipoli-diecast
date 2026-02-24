import { notFound } from "next/navigation";
import { formatDate, getReadingTime } from "@/lib/utils";
import { getWixServerClient } from "@/lib/wix-client.server";

export const revalidate = 60;

async function getBlogPostBySlug(slug: string) {
  try {
    const wixClient = await getWixServerClient();

    const { items } = await wixClient.posts
      .queryPosts()
      .eq("slug", slug)
      .limit(1)
      .find();

    const postSummary = items[0];
    if (!postSummary?._id) return null;

    // fieldsets: ["RICH_CONTENT"] is required — without it content is truncated
    const fullPost = await wixClient.posts.getPost(postSummary._id, {
      fieldsets: ["RICH_CONTENT"],
    } as any);

    return fullPost || null;
  } catch (error) {
    console.error("Error fetching blog post:", error);
    return null;
  }
}

/* ---------------------------------------------------------------
   Image helpers
   Your API confirmed the image lives at:
     post.media.wixMedia.image = "wix:image://v1/<fileId>/<name>#..."
--------------------------------------------------------------- */
function wixUriToCdnUrl(uri: string, width: number, height: number): string {
  const withoutScheme = uri.replace("wix:image://v1/", "");
  const fileId = withoutScheme.split("#")[0].split("/")[0];
  return `https://static.wixstatic.com/media/${fileId}/v1/fill/w_${width},h_${height},al_c,q_85,enc_auto/${fileId}`;
}

function getPostImageUri(post: any): string | null {
  // Confirmed primary location from your logs
  const wixMediaImage = post?.media?.wixMedia?.image;
  if (typeof wixMediaImage === "string" && wixMediaImage) return wixMediaImage;

  // Fallbacks
  const hero = post?.heroImage;
  if (!hero) return null;
  if (typeof hero === "string" && hero) return hero;
  if (typeof hero === "object") {
    return (
      hero.id ?? hero.url ?? hero?.image?.src?.url ?? hero?.src?.url ?? null
    );
  }
  return null;
}

function buildImageUrl(
  post: any,
  width: number,
  height: number,
): string | null {
  const uri = getPostImageUri(post);
  if (!uri) return null;
  if (uri.startsWith("wix:image://")) return wixUriToCdnUrl(uri, width, height);
  if (uri.startsWith("https://") || uri.startsWith("http://")) return uri;
  return `https://static.wixstatic.com/media/${uri}/v1/fill/w_${width},h_${height},al_c,q_85,enc_auto/${uri}`;
}

/* ---------------------------------------------------------------
   Rich Content → HTML renderer
   Handles all node types present in your richContent dump.
--------------------------------------------------------------- */
function richContentToHtml(richContent: any): string {
  if (!richContent?.nodes) return "";
  return richContent.nodes.map(nodeToHtml).join("");
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function buildInlineImageUrl(imageData: any): string | null {
  const raw =
    imageData?.image?.src?.url ??
    imageData?.src?.url ??
    imageData?.url ??
    imageData?.src ??
    null;
  if (!raw) return null;
  if (raw.startsWith("https://") || raw.startsWith("http://")) return raw;
  if (raw.startsWith("wix:image://")) return wixUriToCdnUrl(raw, 900, 500);
  return `https://static.wixstatic.com/media/${raw}/v1/fill/w_900,h_500,al_c,q_85,enc_auto/${raw}`;
}

function nodeToHtml(node: any): string {
  if (!node) return "";

  const children = node.nodes?.length
    ? node.nodes.map(nodeToHtml).join("")
    : "";

  switch (node.type) {
    case "PARAGRAPH": {
      // Empty paragraphs (spacers) — render as a small gap
      const inner = children.trim();
      return inner
        ? `<p class="mb-4 leading-relaxed">${children}</p>`
        : `<p class="mb-2">&nbsp;</p>`;
    }

    case "HEADING": {
      const level = node.headingData?.level ?? 2;
      const sizeMap: Record<number, string> = {
        1: "text-3xl",
        2: "text-2xl",
        3: "text-xl",
        4: "text-lg",
        5: "text-base",
        6: "text-sm",
      };
      return `<h${level} class="${sizeMap[level] ?? "text-2xl"} font-bold mt-8 mb-3">${children}</h${level}>`;
    }

    case "BULLETED_LIST":
      return `<ul class="list-disc pl-6 mb-4 space-y-1">${children}</ul>`;

    case "ORDERED_LIST":
      return `<ol class="list-decimal pl-6 mb-4 space-y-1">${children}</ol>`;

    case "LIST_ITEM":
      return `<li class="leading-relaxed">${children}</li>`;

    case "BLOCKQUOTE":
      return `<blockquote class="border-l-4 border-primary pl-4 italic my-6 text-muted-foreground">${children}</blockquote>`;

    case "CODE_BLOCK":
      return `<pre class="bg-muted rounded-lg p-4 my-4 overflow-x-auto text-sm font-mono"><code>${children}</code></pre>`;

    case "DIVIDER":
      return `<hr class="my-8 border-border" />`;

    case "IMAGE": {
      const url = buildInlineImageUrl(node.imageData);
      if (!url) return "";
      const alt = escapeHtml(node.imageData?.altText ?? "");
      const caption = node.imageData?.caption
        ? `<figcaption class="text-center text-sm text-muted-foreground mt-2">${escapeHtml(node.imageData.caption)}</figcaption>`
        : "";
      return `<figure class="my-8"><img src="${url}" alt="${alt}" class="rounded-xl w-full object-cover" loading="lazy" />${caption}</figure>`;
    }

    case "VIDEO": {
      const url =
        node.videoData?.video?.src?.url ??
        node.videoData?.src?.url ??
        node.videoData?.url ??
        "";
      if (!url) return children;
      return `<video controls class="w-full rounded-xl my-6"><source src="${url}" /></video>`;
    }

    case "EMBED": {
      const html = node.embedData?.oembed?.html ?? "";
      if (!html) return children;
      return `<div class="my-6 overflow-hidden rounded-xl">${html}</div>`;
    }

    case "TEXT": {
      const rawText = node.textData?.text ?? node.text ?? "";
      if (rawText === "") return "";

      let text = escapeHtml(rawText);
      const decorations: any[] = node.textData?.decorations ?? [];

      for (const d of decorations) {
        switch (d.type) {
          case "BOLD":
            text = `<strong>${text}</strong>`;
            break;
          case "ITALIC":
            text = `<em>${text}</em>`;
            break;
          case "UNDERLINE":
            text = `<u>${text}</u>`;
            break;
          case "STRIKETHROUGH":
            text = `<s>${text}</s>`;
            break;
          case "LINK": {
            const href = d.linkData?.link?.url ?? "#";
            const target =
              d.linkData?.link?.target === "_blank"
                ? ' target="_blank" rel="noopener noreferrer"'
                : "";
            text = `<a href="${href}"${target} class="text-primary underline hover:opacity-80">${text}</a>`;
            break;
          }
          case "COLOR": {
            const color = d.colorData?.foreground ?? "";
            if (color) text = `<span style="color:${color}">${text}</span>`;
            break;
          }
          case "FONT_SIZE": {
            const size = d.fontSizeData?.value ?? "";
            const unit = d.fontSizeData?.unit?.toLowerCase() ?? "px";
            if (size)
              text = `<span style="font-size:${size}${unit}">${text}</span>`;
            break;
          }
        }
      }

      return text;
    }

    default:
      // Don't lose content from unknown node types
      return children;
  }
}

/* ---------------------------------------------------------------
   Page Component
--------------------------------------------------------------- */
type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};
export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) notFound();

  const heroImageUrl = buildImageUrl(post, 1200, 600);

  // richContent can live at different keys depending on SDK version
  const richContent =
    (post as any).richContent ??
    (post as any).content?.richContent ??
    (post as any).content ??
    null;

  const html = richContentToHtml(richContent);

  return (
    <div className="min-h-screen bg-background">
      {/* HEADER */}
      <div className="border-b border-border bg-gradient-to-br from-background via-card to-background">
        <div className="mx-auto max-w-4xl px-6 py-20">
          <div className="mb-8 flex items-center gap-4">
            <div className="h-1 w-12 rounded-full bg-primary" />
            <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Blog
            </span>
          </div>

          <h1 className="mb-6 text-4xl font-extrabold leading-tight md:text-5xl">
            {post.title}
          </h1>

          <div className="flex flex-wrap gap-6 text-sm text-muted-foreground">
            <span>{formatDate(post.firstPublishedDate)}</span>
            <span>{getReadingTime(richContent)} min read</span>
          </div>
        </div>
      </div>

      {/* ARTICLE */}
      <article className="mx-auto max-w-4xl px-6 py-16">
        {heroImageUrl && (
          <div className="mb-12 overflow-hidden rounded-2xl border border-border">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={heroImageUrl}
              alt={post.title ?? ""}
              className="w-full object-cover"
            />
          </div>
        )}

        <div className="rounded-2xl border border-border bg-card/70 p-8 shadow-xl md:p-12">
          {html ? (
            <div
              className="prose prose-lg max-w-none dark:prose-invert"
              dangerouslySetInnerHTML={{ __html: html }}
            />
          ) : (
            <div
              className="prose prose-lg max-w-none dark:prose-invert"
              dangerouslySetInnerHTML={{
                __html: (post as any).excerpt ?? "<p>No content available.</p>",
              }}
            />
          )}
        </div>

        <div className="mt-16 text-center">
          <a
            href="/blog"
            className="inline-block rounded-xl border border-border px-6 py-3 font-semibold transition-colors hover:bg-muted"
          >
            ← Back to Blogs
          </a>
        </div>
      </article>
    </div>
  );
}
