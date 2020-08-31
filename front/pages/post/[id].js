// post/[id].js
import React from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import Head from "next/head";

import AppLayout from "../../components/AppLayout";
import PostCard from "../../components/PostCard";

import { LOAD_MY_INFO_REQUEST } from "../../reducers/user";
import { LOAD_POST_REQUEST } from "../../reducers/post";
import axios from "axios";
import wrapper from "../../store/configureStore";
import { END } from "redux-saga";

const Post = () => {
  const router = useRouter();
  const { singlePost } = useSelector((state) => state.post);
  const { id } = router.query;

  return (
    <AppLayout>
      <Head>
        <meta name="description" content={singlePost.content} />
        <meta
          property="og:title"
          content={`${singlePost.User.nickname}님의 게시글`}
        />
        <meta property="og:description" content={singlePost.content} />
        <meta
          property="og:image"
          content={
            singlePost.Images[0]
              ? singlePost.Images[0].src
              : "https://nodebird.com/favicon.ico"
          }
        />
        <meta property="og:url" content={`https://nodebird.com/post/${id}`} />
      </Head>
      <PostCard post={singlePost} />
    </AppLayout>
  );
};

// Home.getInitialProps; 없어질거같음
export const getServerSideProps = wrapper.getServerSideProps(
  async (context) => {
    console.log("getServerSideProps Start");
    console.log(context.req.headers);
    const cookie = context.req ? context.req.headers.cookie : "";
    axios.defaults.headers.Cookie = "";
    if (context.req && cookie) {
      axios.defaults.headers.Cookie = cookie;
    }
    context.store.dispatch({
      type: LOAD_MY_INFO_REQUEST,
    });
    context.store.dispatch({
      type: LOAD_POST_REQUEST,
      data: context.params.id,
    });
    context.store.dispatch(END);
    console.log("getServerSideProps end");
    await context.store.sagaTask.toPromise();
  }
);

export default Post;
