import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import React from "react";
import path from "path";
import fs from 'fs';
import matter from "gray-matter";
import styled from "styled-components";

const ArticleContainer = styled.article`
    table {
        width: 100%;
        margin-bottom: 1rem;

        tr {

            th {
                background-color: #00000010;
            }

            td,
            th {
                padding: 0.5rem;
                border: 1px solid #00000010;
            }

        }

    }

    blockquote {
        padding: 0.5rem;
        border-left: 3px solid #00000015;
        background-color: #00000010;

        p {
            margin: 0;
        }

    }

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
        margin-bottom: 1.5rem;
    }
`;

const postsDirectory = path.join(process.cwd(), 'content');

type Props = {
    slug: string;
}

export default function PostReader({slug}: Props) {
    const fullPath = path.join(postsDirectory, `${slug}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    const {data, content} = matter(fileContents);

    return (
        <ArticleContainer>
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {content}
            </ReactMarkdown>
        </ArticleContainer>
    );
}