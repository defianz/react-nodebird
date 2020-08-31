import React, { useCallback, useState, useEffect } from "react";
import AppLayout from "../components/AppLayout";
import Head from "next/head";
import { Form, Input, Checkbox, Button } from "antd";
import styled from "styled-components";
import useinput from "../hooks/useinput";
import { SIGN_UP_REQUEST } from "../reducers/user";
import { useDispatch, useSelector } from "react-redux";
import Router from "next/router";

import wrapper from "../store/configureStore";
import { END } from "redux-saga";
import axios from "axios";

const ErrorMessasge = styled.div`
  color: red;
`;

const Signup = () => {
  const dispatch = useDispatch();
  const { isSigningUp, isSignedUp, isSignUpError, me } = useSelector(
    (state) => state.user
  );

  useEffect(() => {
    if (me && me.id) {
      Router.replace("/");
    }
  }, [me && me.id]);

  useEffect(() => {
    if (isSignedUp) {
      Router.replace("/");
    }
  }, [isSignedUp]);

  useEffect(() => {
    console.log("여기들어옴");
    console.log(isSignUpError);
    if (isSignUpError) {
      alert(isSignUpError);
    }
  }, [isSignUpError]);

  const [email, onChangeEmail] = useinput("");
  const [nickname, onChangeNickname] = useinput("");
  const [password, onChangePassword] = useinput("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const onChangePasswordCheck = useCallback(
    (e) => {
      setPasswordCheck(e.target.value);
      setPasswordError(e.target.value !== password);
    },
    [passwordCheck]
  );

  const [term, setTerm] = useState(false);
  const [termError, setTermError] = useState(false);
  const onChangeTerm = useCallback((e) => {
    setTerm(e.target.checked);
    setTermError(false);
  }, []);

  const onSubmit = useCallback(() => {
    if (password !== passwordCheck) {
      return setPasswordError(true);
    }
    if (!term) {
      return setTermError(true);
    }
    console.log(email, nickname, password, term);
    dispatch({
      type: SIGN_UP_REQUEST,
      data: { email, password, nickname },
    });
  }, [email, password, passwordCheck, term]);

  return (
    <AppLayout>
      <Head>
        <title> 회원 가입| NodeBird</title>
      </Head>
      <Form onFinish={onSubmit}>
        <div>
          <label htmlFor="user-email"> 이메일 </label>
          <br />
          <input
            name="user-email"
            type="email"
            value={email}
            required
            onChange={onChangeEmail}
          />
        </div>
        <div>
          <label htmlFor="user-nick"> 닉네임 </label>
          <br />
          <input
            name="user-nick"
            value={nickname}
            required
            onChange={onChangeNickname}
          />
        </div>
        <div>
          <label htmlFor="user-password"> 패스워드 </label>
          <br />
          <input
            name="user-password"
            type="password"
            value={password}
            required
            onChange={onChangePassword}
          />
        </div>
        <div>
          <label htmlFor="user-password-check"> 패스워드 체크 </label>
          <br />
          <input
            name="user-password-check"
            type="password"
            value={passwordCheck}
            required
            onChange={onChangePasswordCheck}
          />
          {passwordError && (
            <ErrorMessasge>비밀번호가 일치하지 않습니다.</ErrorMessasge>
          )}
        </div>
        <div>
          <label htmlFor="user-term"> 약관 체크 </label>
          <br />
          <Checkbox name="user-term" value={term} onChange={onChangeTerm}>
            데피안의 말을 잘 들을것을 동의합니다.
          </Checkbox>
          {termError && (
            <ErrorMessasge>약관에 동의하지 않습니다.</ErrorMessasge>
          )}
        </div>
        <div style={{ marginTop: 20 }}>
          <Button type="primary" htmlType="submit" loading={isSigningUp}>
            가입
          </Button>
        </div>
      </Form>
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
    console.log("context란");
    console.log(context);
    context.store.dispatch({
      type: LOAD_POSTS_REQUEST,
    });
    context.store.dispatch({
      type: LOAD_MY_INFO_REQUEST,
    });
    context.store.dispatch(END);
    console.log("getServerSideProps end");
    await context.store.sagaTask.toPromise();
  }
);
export default Signup;
