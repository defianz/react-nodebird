import React from "react";
import Link from "next/link";
import PropTypes from "prop-types";

//regexr.com 에서 정규표현식 찾음
// split은 ()로 묶여줘야함
const PostCardContent = ({ postData }) => (
  <div>
    {postData.split(/(#[^\s#]+)/g).map((v, i) => {
      if (v.match(/(#[^\s#]+)/g)) {
        return (
          <Link href={`/hashtag/${v.slice(1)}`} prefetch={false} key={i}>
            <a>{v}</a>
          </Link>
        );
      }
      return v;
    })}
  </div>
);

PostCardContent.Proptypes = {
  postData: PropTypes.string.isRequired,
};

export default PostCardContent;
