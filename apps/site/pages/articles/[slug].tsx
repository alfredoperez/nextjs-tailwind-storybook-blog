import { getParsedFileContentBySlug, renderMarkdown } from "@apdev/markdown";
import { CustomLink } from "@apdev/shared/mdx-elements";
import { readdirSync } from "fs";
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';
import { ParsedUrlQuery } from 'querystring';
import {join } from 'path';
import dynamic from 'next/dynamic'
import { MDXRemote } from "next-mdx-remote";

interface ArticleProps extends ParsedUrlQuery {
  slug: string;
}

const mdxElements = {
  Youtube:dynamic(async () => await import('@apdev/shared/mdx-elements/youtube/youtube')),
  // a:  CustomLink
}
const POSTS_PATH = join(process.cwd(), process.env.POSTS_PATH);

export function Article({frontMatter, html}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <div className="m-6">
      <article className="prose prose-lg">
        <h1>{frontMatter.title}</h1>
        <div>by {(frontMatter.author as any).name}</div>
      </article>
      <hr/>
      <MDXRemote {...html}  components={mdxElements}  />
    </div>
  );
}

export const getStaticProps = async ({
  params,
}: {
  params: ArticleProps;
}) => {

  /// 1. Parse the content of our markdown separate it into frontmatter and content
  const {frontMatter,content} = getParsedFileContentBySlug(params.slug, POSTS_PATH);

  // 2. convert markdown content to HTML
  const renderHTML = await renderMarkdown(content);

  return {
    props: {
      frontMatter,
      html:renderHTML,
    },
  };
};


export const getStaticPaths: GetStaticPaths<ArticleProps> = async () => {
  const paths = readdirSync(POSTS_PATH)
      .map(path => path.replace(/\.mdx?$/,''))
      .map(slug => ({params:{slug}}))

  return {
    paths,
    fallback: false,
  };
};

export default Article;
