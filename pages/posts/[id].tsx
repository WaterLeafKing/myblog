import CommentCard from '@/components/CommentCard';
import CommentInput from '@/components/CommentInput';
import { MarkdownViewer } from '@/components/Markdown';
import SEO from '@/components/SEO';
import Tag from '@/components/Tag';
import { createClient } from '@supabase/supabase-js';
import { GetStaticPaths, GetStaticProps } from 'next';
import Image from 'next/image';
import { useEffect, useState } from 'react';

interface Post {
  id: number;
  title: string;
  content: string;
  created_at: string;
  preview_image_url: string;
  Category: {
    title: string;
  };
  PostTag: {
    Tag: {
      name: string;
    };
  }[];
  duration_time: number;
}

interface PostPageProps {
  post: Post;
}

interface Comment {
  id: number;
  comment: string;
  created_at: string;
  sub_id: number;
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const getStaticPaths: GetStaticPaths = async () => {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );

  const { data: posts } = await supabase.from('Post').select('id');

  const paths =
    posts?.map((post) => ({
      params: { id: post.id.toString() },
    })) || [];

  return {
    paths,
    fallback: 'blocking', // 또는 false나 true
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );

  const id = params?.id;

  const { data: post } = await supabase
    .from('Post')
    .select(
      `id, preview_image_url, title, content, created_at, PostTag (
          tag_id,
          Tag (name)
        )`,
    )
    .eq('id', id)
    .single();

  if (!post) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      post,
    },
    revalidate: 3600, // 1시간마다 재생성 (선택사항)
  };
};

export default function Post({ post }: PostPageProps) {
  const [commentList, setCommentList] = useState<Comment[]>([]);
  const [headings, setHeadings] = useState<{ text: string; level: number }[]>(
    [],
  );
  const [activeHeading, setActiveHeading] = useState<string>('');

  const extractHeadings = (content: string) => {
    const headingRegex = /^#{1,2}\s+(.+)$/gm;
    const matches = content.match(headingRegex) || [];
    return matches.map((match) => ({
      text: match.replace(/^#+\s+/, ''),
      level: match.startsWith('##') ? 2 : 1,
    }));
  };

  const fetchComment = async (id: number) => {
    const { data, error } = await supabase
      .from('Comment')
      .select('id, comment, created_at, sub_id')
      .eq('post_id', id);

    if (error) {
      console.log(error);
    } else {
      setCommentList(data);
    }
  };

  useEffect(() => {
    setHeadings(extractHeadings(post.content));
    fetchComment(post.id);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveHeading(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-100px 0px -66%',
        threshold: 0,
      },
    );

    const headingElements = document.querySelectorAll('h1, h2');
    headingElements.forEach((element) => observer.observe(element));

    return () => {
      headingElements.forEach((element) => observer.unobserve(element));
    };
  }, [post]);

  const handleAddComment = (newComment: Comment) => {
    setCommentList((prevComments) => [...prevComments, newComment]);
  };

  const generateHeadingId = (text: string) => {
    return text
      .toLowerCase()
      .replace(/'/g, '')
      .replace(/[^a-z0-9]+/g, '-') // Replace all non-alphanumeric chars (including spaces, dots, commas) with hyphen
      .replace(/^-+|-+$/g, '') // Remove leading/trailing hyphens
      .trim(); // R
  };

  const scrollToHeading = (headingText: string) => {
    const maxAttempts = 5;
    let attempts = 0;

    const tryScroll = () => {
      const targetId = generateHeadingId(headingText);
      const element = document.getElementById(targetId);

      if (element) {
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
        setTimeout(() => {
          window.scrollBy(0, -100);
        }, 100);
      } else if (attempts < maxAttempts) {
        attempts++;
        setTimeout(tryScroll, 200);
      }
    };

    tryScroll();
  };

  return (
    <>
      <SEO
        title={post?.title || ''}
        description={post?.content.substring(0, 160) || ''} // First 160 characters as description
        image={post?.preview_image_url || ''}
        url={`/posts/${post.id}`}
      />
      <main className="mx-auto px-4 lg:ml-60">
        <div id="the-top"></div>
        <div className="container mx-auto">
          <div className="mt-8 lg:grid lg:grid-cols-4 lg:gap-2">
            <div className="lg:col-span-3">
              {post ? (
                <>
                  <div className="relative">
                    <div className="absolute inset-0 bottom-4 z-10 flex flex-col items-center justify-end p-4 lg:bottom-8">
                      <div className="flex-row p-2">
                        {post.PostTag.map((item, index) => (
                          <>
                            <Tag key={index} tag={item.Tag.name} />
                            {index < post.PostTag.length - 1 && (
                              <span className="mx-1 text-[8px] text-white">
                                •
                              </span>
                            )}
                          </>
                        ))}
                      </div>
                      <div className="break-keep text-center text-xl font-medium text-white lg:text-3xl">
                        {post.title}
                      </div>
                    </div>
                    <div className="absolute inset-0 rounded-lg bg-gradient-to-b from-transparent via-transparent to-black/60"></div>
                    <Image
                      src={post.preview_image_url}
                      width={1200}
                      height={675}
                      alt={post.title}
                      priority
                      className="h-[300px] w-full rounded-xl object-cover md:h-[420px] lg:h-[520px]"
                    />
                  </div>

                  <div className="lg:hidden">
                    <div
                      id="tableofcontents"
                      className="bg-white p-4 lg:sticky lg:top-4 lg:shadow"
                    >
                      <h3 className="mb-2 text-sm font-medium">
                        Table of Contents
                      </h3>
                      <a
                        href="#the-top"
                        className="ml-1 text-xs text-slate-600 hover:text-orange-400"
                        onClick={(e) => {
                          e.preventDefault();
                          scrollToHeading('the-top');
                        }}
                      >
                        Top
                      </a>
                      <nav className="relative">
                        <div className="absolute left-2 top-0 h-full w-px bg-gray-300" />

                        {headings.map((heading, index) => (
                          <a
                            key={index}
                            href={`#${generateHeadingId(heading.text)}`}
                            onClick={(e) => {
                              e.preventDefault();
                              scrollToHeading(heading.text);
                            }}
                            className={`group relative flex items-center text-sm ${
                              heading.level === 2 ? 'ml-4' : 'ml-4'
                            } mb-1`}
                          >
                            <span
                              className={`absolute -left-[13.6px] z-10 size-[12px] rounded-full border-4 border-white transition-colors ${
                                activeHeading ===
                                generateHeadingId(heading.text)
                                  ? 'bg-orange-400'
                                  : 'bg-slate-600 group-hover:bg-orange-400'
                              }`}
                            />
                            <span
                              className={`ml-4 transition-colors ${
                                activeHeading ===
                                generateHeadingId(heading.text)
                                  ? 'text-orange-400'
                                  : 'text-slate-600 group-hover:text-orange-400'
                              }`}
                            >
                              {heading.text}
                            </span>
                          </a>
                        ))}
                      </nav>
                      <a
                        href="#comment-input"
                        className="ml-1 text-xs text-slate-600 hover:text-orange-400"
                        onClick={(e) => {
                          e.preventDefault();
                          scrollToHeading('comment-input');
                        }}
                      >
                        Comments
                      </a>
                    </div>
                  </div>

                  <div className="relative mt-8">
                    <MarkdownViewer source={post.content} components={{}} />
                  </div>
                </>
              ) : (
                <p>Loading...</p>
              )}
              <div className="mt-12 font-bold">
                {commentList.length} comments
              </div>
              <div className="my-4" id="comment-input">
                <CommentInput
                  postId={post.id}
                  onAddComment={handleAddComment}
                />
              </div>
              {commentList.map((item, index) => (
                <CommentCard
                  key={index}
                  comment={item.comment}
                  comment_created_at={item.created_at}
                  sub_id={item.sub_id}
                />
              ))}
            </div>
            <div className="hidden lg:col-span-1 lg:block">
              <div
                id="tableofcontents"
                className="rounded-xl bg-white p-4 lg:sticky lg:top-4 lg:shadow"
              >
                <h3 className="mb-2 text-sm font-medium">Table of Contents</h3>
                <a
                  href="#the-top"
                  className="ml-1 text-xs text-slate-600 hover:text-orange-400"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToHeading('the-top');
                  }}
                >
                  Top
                </a>
                <nav className="relative">
                  <div className="absolute left-2 h-full w-px bg-gray-300" />

                  {headings.map((heading, index) => (
                    <a
                      key={index}
                      href={`#${generateHeadingId(heading.text)}`}
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToHeading(heading.text);
                      }}
                      className={`group relative flex items-center text-sm ${
                        heading.level === 2 ? 'ml-4' : 'ml-4'
                      } mb-1`}
                    >
                      <span
                        className={`absolute -left-[13.6px] z-10 size-[12px] rounded-full border-4 border-white transition-colors ${
                          activeHeading === generateHeadingId(heading.text)
                            ? 'bg-orange-400'
                            : 'bg-slate-600 group-hover:bg-orange-400'
                        }`}
                      />
                      <span
                        className={`ml-4 transition-colors ${
                          activeHeading === generateHeadingId(heading.text)
                            ? 'text-orange-400'
                            : 'text-slate-600 group-hover:text-orange-400'
                        }`}
                      >
                        {heading.text}
                      </span>
                    </a>
                  ))}
                </nav>
                <a
                  href="#comment-input"
                  className="ml-1 text-xs text-slate-600 hover:text-orange-400"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToHeading('comment-input');
                  }}
                >
                  Comments
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
