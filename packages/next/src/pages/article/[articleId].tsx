import type {GetStaticPaths, GetStaticProps, NextPage} from "next";
import Head from "next/head";
import Image from "next/image";
import styled from "styled-components";

const Hoge = styled.div`
  align-items: center;
  box-sizing: border-box;
  display: grid;
  width: 50px;
`;

const ArticleDetail: NextPage = ({ articles }: any) => {
  console.log({ articles });
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Hoge />
      <footer>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <span>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
};

export default ArticleDetail;
// pages/article/[articleId].tsx
export const getStaticProps: GetStaticProps<any, { articleId: string }> = async (context) => {
  const articles = await fetch(`http://localhost:1337/articles/${context.params?.articleId}`).then(res => res.json())
  return {
    props: { articles }, // ページコンポーネントにpropsとして渡されます。
  };
}

export const getStaticPaths: GetStaticPaths = async () => {
  const articles = await fetch("http://localhost:1337/articles").then(res => res.json()) as { id: string }[]
  const paths = articles.map(article => `/article/${article.id}`)
  return {
    paths,
    fallback: false,
  }
}
