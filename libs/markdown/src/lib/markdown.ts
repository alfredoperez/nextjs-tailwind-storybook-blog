import * as matter from "gray-matter";
import fs from 'fs';
import { join } from 'path';
import  {serialize} from 'next-mdx-remote/serialize'

export function getParsedFileContentBySlug(filename:string, postsPath:string){

  const postFilePath = join(postsPath, `${filename}.md`);
  const fileContent = fs.readFileSync(postFilePath);

  const { data, content} = matter(fileContent);

  return {frontMatter:data, content};
}
export function renderMarkdown(content:string) {
  return serialize(content || '')
}
