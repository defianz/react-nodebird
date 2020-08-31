import React from "react";
import PropTypes from "prop-types";
import "antd/dist/antd.css";
import Head from "next/head";
// import withReduxSaga from 'next-redux-saga'; //SSR할때 필요없음

import wrapper from "../store/configureStore";

const NodeBird = ({ Component }) => {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>node-bird</title>
      </Head>
      <Component />
    </>
  );
};

NodeBird.propTypes = {
  Component: PropTypes.elementType.isRequired,
};

export default wrapper.withRedux(NodeBird);
