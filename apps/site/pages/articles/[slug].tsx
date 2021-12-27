import { getParsedFileContentBySlug, renderMarkdown } from "@apdev/markdown";
import { Youtube } from "@apdev/shared/mdx-elements";
import { readdirSync } from "fs";
import { GetStaticPaths, GetStaticProps } from 'next';
import { ParsedUrlQuery } from 'querystring';
import {join } from 'path';
import { MDXRemote } from "next-mdx-remote";

interface ArticleProps extends ParsedUrlQuery {
  slug: string;
}

const mdxElements = {
  Youtube
}
const POSTS_PATH = join(process.cwd(), '_articles');

export function Article({frontMatter, html}: ArticleProps) {
  return (
    <div className="m-6">
      <article className="prose prose-lg">
        <h1>{frontMatter.title}</h1>
        <div>by {frontMatter.author.name}</div>
      </article>
      <hr/>
      <MDXRemote {...html}  components={mdxElements}  />
    </div>
  );
}

export const getStaticProps: GetStaticProps<ArticleProps> = async ({
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
