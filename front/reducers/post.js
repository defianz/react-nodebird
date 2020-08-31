import shortId from "shortid";
import postSaga from "../sagas/post";
import produce from "../util/produce";
import faker from "faker";

export const initialState = {
  singlePost: null,
  mainPosts: [],
  imagePaths: [],
  loadPostLoading: false,
  loadPostDone: false,
  loadPostError: null,
  hasMorePosts: true,
  retweetLoading: false,
  retweetDone: false,
  retweetError: null,
  uploadImagesLoading: false,
  uploadImagesDone: false,
  uploadImagesError: null,
  likePostLoading: false,
  likePostDone: false,
  likePostError: null,
  unlikePostLoading: false,
  unlikePostDone: false,
  unlikePostError: null,
  loadPostsLoading: false,
  loadPostsDone: false,
  loadPostsError: null,
  addPostLoading: false,
  addPostDone: false,
  addPostError: null,
  removePostLoading: false,
  removePostDone: false,
  removePostError: null,
  addCommentLoading: false,
  addCommentDone: false,
  addCommentError: null,
};

// export const generateDummyPost = (number) =>
//   Array(20)
//     .fill()
//     .map(() => ({
//       id: shortId.generate(),
//       User: {
//         id: shortId.generate(),
//         nickname: faker.name.findName(),
//       },
//       content: faker.lorem.paragraph(),
//       Images: [{ src: faker.image.image() }],
//       Comments: [
//         {
//           id: shortId.generate(),
//           contents: faker.lorem.sentence(),
//           User: {
//             id: shortId.generate(),
//             nickname: faker.name.findName(),
//           },
//         },
//       ],
//     }));

// initialState.mainPosts = initialState.mainPosts.concat(generateDummyPost(10));

export const LOAD_USER_POSTS_REQUEST = "LOAD_USER_POSTS_REQUEST";
export const LOAD_USER_POSTS_SUCCESS = "LOAD_USER_POSTS_SUCCESS";
export const LOAD_USER_POSTS_FAILURE = "LOAD_USER_POSTS_FAILURE";

export const LOAD_HASHTAG_POSTS_REQUEST = "LOAD_HASHTAG_POSTS_REQUEST";
export const LOAD_HASHTAG_POSTS_SUCCESS = "LOAD_HASHTAG_POSTS_SUCCESS";
export const LOAD_HASHTAG_POSTS_FAILURE = "LOAD_HASHTAG_POSTS_FAILURE";

export const LOAD_POST_REQUEST = "LOAD_POST_REQUEST";
export const LOAD_POST_SUCCESS = "LOAD_POST_SUCCESS";
export const LOAD_POST_FAILURE = "LOAD_POST_FAILURE";

export const REMOVE_IMAGE = "REMOVE_IMAGE";

export const RETWEET_REQUEST = "RETWEET_REQUEST";
export const RETWEET_SUCCESS = "RETWEET_SUCCESS";
export const RETWEET_FAILURE = "RETWEET_FAILURE";

export const UPLOAD_IMAGES_REQUEST = "UPLOAD_IMAGES_REQUEST";
export const UPLOAD_IMAGES_SUCCESS = "UPLOAD_IMAGES_SUCCESS";
export const UPLOAD_IMAGES_FAILURE = "UPLOAD_IMAGES_FAILURE";

export const LIKE_POST_REQUEST = "LIKE_POST_REQUEST";
export const LIKE_POST_SUCCESS = "LIKE_POST_SUCCESS";
export const LIKE_POST_FAILURE = "LIKE_POST_FAILURE";

export const UNLIKE_POST_REQUEST = "UNLIKE_POST_REQUEST";
export const UNLIKE_POST_SUCCESS = "UNLIKE_POST_SUCCESS";
export const UNLIKE_POST_FAILURE = "UNLIKE_POST_FAILURE";

export const LOAD_POSTS_REQUEST = "LOAD_POSTS_REQUEST";
export const LOAD_POSTS_SUCCESS = "LOAD_POSTS_SUCCESS";
export const LOAD_POSTS_FAILURE = "LOAD_POSTS_FAILURE";

export const ADD_POST_REQUEST = "ADD_POST_REQUEST";
export const ADD_POST_SUCCESS = "ADD_POST_SUCCESS";
export const ADD_POST_FAILURE = "ADD_POST_FAILURE";

export const REMOVE_POST_REQUEST = "REMOVE_POST_REQUEST";
export const REMOVE_POST_SUCCESS = "REMOVE_POST_SUCCESS";
export const REMOVE_POST_FAILURE = "REMOVE_POST_FAILURE";

export const ADD_COMMENT_REQUEST = "ADD_COMMENT_REQUEST";
export const ADD_COMMENT_SUCCESS = "ADD_COMMENT_SUCCESS";
export const ADD_COMMENT_FAILURE = "ADD_COMMENT_FAILURE";

export const addPost = (data) => ({
  type: ADD_POST_REQUEST,
  data,
});

export const addComment = (data) => ({
  type: ADD_COMMENT_REQUEST,
  data,
});

// const dummyPost = (data) => ({
//   id: data.id,
//   content: data.content,
//   User: {
//     id: 1,
//     nickname: "데피안",
//   },
//   Images: [],
//   Comments: [],
// });

// const dummyComment = (data) => ({
//   id: shortId.generate(),
//   contents: data,
//   User: {
//     id: 1,
//     nickname: "데피안",
//   },
// });
// 이전 상태를 액션을 통해 다음 상태로 만들어내는 함수(불변성은 지키면서)
const reducer = (state = initialState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case LOAD_POST_REQUEST:
        draft.loadPostLoading = true;
        draft.loadPostDone = false;
        draft.loadPostError = null;
        break;
      case LOAD_POST_SUCCESS:
        draft.loadPostLoading = false;
        draft.loadPostDone = true;
        draft.singlePost = action.data;
        break;
      case LOAD_POST_FAILURE:
        draft.loadPostLoading = false;
        draft.loadPostError = action.error;
        break;
      case REMOVE_IMAGE:
        draft.imagePaths = draft.imagePaths.filter((v, i) => i !== action.data);
        break;
      case RETWEET_REQUEST:
        draft.retweetLoading = true;
        draft.retweetDone = false;
        draft.retweetError = null;
        break;
      case RETWEET_SUCCESS: {
        draft.retweetLoading = false;
        draft.retweetDone = true;
        draft.mainPosts.unshift(action.data);
        break;
      }
      case RETWEET_FAILURE:
        draft.retweetLoading = false;
        draft.retweetError = action.error;
        break;
      case UPLOAD_IMAGES_REQUEST:
        draft.uploadImagesLoading = true;
        draft.uploadImagesDone = false;
        draft.uploadImagesError = null;
        break;
      case UPLOAD_IMAGES_SUCCESS: {
        draft.imagePaths = action.data;
        draft.uploadImagesLoading = false;
        draft.uploadImagesDone = true;
        break;
      }
      case UPLOAD_IMAGES_FAILURE:
        draft.uploadImagesLoading = false;
        draft.uploadImagesError = action.error;
        break;
      case LIKE_POST_REQUEST:
        draft.likePostLoading = true;
        draft.likePostDone = false;
        draft.likePostError = null;
        break;
      case LIKE_POST_SUCCESS: {
        const post = draft.mainPosts.find((v) => v.id === action.data.postId);
        console.log(post);
        post.Likers.push({ id: action.data.UserId });
        draft.likePostLoading = false;
        draft.likePostDone = true;
        break;
      }
      case LIKE_POST_FAILURE:
        draft.likePostLoading = false;
        draft.likePostError = action.error;
        break;
      case UNLIKE_POST_REQUEST:
        draft.unlikePostLoading = true;
        draft.unlikePostDone = false;
        draft.unlikePostError = null;
        break;
      case UNLIKE_POST_SUCCESS: {
        const post = draft.mainPosts.find((v) => v.id === action.data.postId);
        post.Likers = post.Likers.filter((v) => v.id !== action.data.UserId);
        draft.unlikePostLoading = false;
        draft.unlikePostDone = true;
        break;
      }
      case UNLIKE_POST_FAILURE:
        draft.unlikePostLoading = false;
        draft.unlikePostError = action.error;
        break;
      case LOAD_USER_POSTS_REQUEST:
      case LOAD_HASHTAG_POSTS_REQUEST:
      case LOAD_POSTS_REQUEST:
        draft.loadPostsLoading = true;
        draft.loadPostsDone = false;
        draft.loadPostsError = null;
        break;
      case LOAD_USER_POSTS_SUCCESS:
      case LOAD_HASHTAG_POSTS_SUCCESS:
      case LOAD_POSTS_SUCCESS:
        draft.mainPosts = draft.mainPosts.concat(action.data);
        draft.loadPostsLoading = false;
        draft.loadPostsDone = true;
        draft.hasMorePosts = draft.mainPosts.length === 10;
        break;
      case LOAD_USER_POSTS_FAILURE:
      case LOAD_HASHTAG_POSTS_FAILURE:
      case LOAD_POSTS_FAILURE:
        draft.loadPostsLoading = false;
        draft.loadPostsError = action.error;
        break;
      case ADD_POST_REQUEST:
        draft.addPostLoading = true;
        draft.addPostDone = false;
        draft.addPostError = null;
        break;
      case ADD_POST_SUCCESS:
        draft.mainPosts.unshift(action.data);
        draft.imagePaths = [];
        draft.addPostLoading = false;
        draft.addPostDone = true;
        break;
      case ADD_POST_FAILURE:
        draft.addPostLoading = false;
        draft.addPostError = action.error;
        break;
      case REMOVE_POST_REQUEST:
        draft.removePostLoading = true;
        draft.removePostDone = false;
        draft.removePostError = null;
        break;
      case REMOVE_POST_SUCCESS:
        draft.mainPosts = draft.mainPosts.filter(
          (v) => v.id !== action.data.PostId
        );
        draft.removePostLoading = false;
        draft.removePostDone = true;
        break;
      case REMOVE_POST_FAILURE:
        draft.removePostLoading = false;
        draft.removePostError = action.error;
        break;
      case ADD_COMMENT_REQUEST:
        draft.addCommentLoading = true;
        draft.addCommentDone = false;
        draft.addCommentError = null;
        break;
      case ADD_COMMENT_SUCCESS: {
        const post = draft.mainPosts.find((v) => v.id === action.data.PostId);
        post.Comments.unshift(action.data);
        draft.addCommentLoading = false;
        draft.addCommentDone = true;
        break;
        //action.data.contents post userid
        // const postIndex = state.mainPosts.findIndex(
        //   (v) => v.id === action.data.postId
        // );
        // const post = { ...state.mainPosts[postIndex] };
        // post.Comments = [dummyComment(action.data.contents), ...post.Comments];
        // const mainPosts = [...state.mainPosts];
        // mainPosts[postIndex] = post;
        // return {
        //   ...state,
        //   mainPosts,
        //   addCommentLoading: false,
        //   addCommentDone: true,
        // };
      }
      case ADD_COMMENT_FAILURE:
        draft.addCommentLoading = false;
        draft.addCommentError = action.error;
        break;
      default:
        break;
    }
  });

  //   switch (action.type) {
  //     case ADD_POST_REQUEST:
  //       return {
  //         ...state,
  //         addPostLoading: true,
  //         addPostDone: false,
  //         addPostError: null,
  //       };
  //     case ADD_POST_SUCCESS:
  //       return {
  //         ...state,
  //         mainPosts: [dummyPost(action.data), ...state.mainPosts],
  //         addPostLoading: false,
  //         addPostDone: true,
  //       };
  //     case ADD_POST_FAILURE:
  //       return {
  //         ...state,
  //         addPostLoading: false,
  //         addPostError: action.error,
  //       };
  //     case REMOVE_POST_REQUEST:
  //       return {
  //         ...state,
  //         removePostLoading: true,
  //         removePostDone: false,
  //         removePostError: null,
  //       };
  //     case REMOVE_POST_SUCCESS:
  //       return {
  //         ...state,
  //         mainPosts: state.mainPosts.filter((v) => v.id !== action.data),
  //         removePostLoading: false,
  //         removePostDone: true,
  //       };
  //     case REMOVE_POST_FAILURE:
  //       return {
  //         ...state,
  //         removePostLoading: false,
  //         removePostError: action.error,
  //       };
  //     case ADD_COMMENT_REQUEST:
  //       return {
  //         ...state,
  //         addCommentLoading: true,
  //         addCommentDone: false,
  //         addCommentError: null,
  //       };
  //     case ADD_COMMENT_SUCCESS: {
  //       //action.data.contents post userid
  //       const postIndex = state.mainPosts.findIndex(
  //         (v) => v.id === action.data.postId
  //       );
  //       const post = { ...state.mainPosts[postIndex] };
  //       post.Comments = [dummyComment(action.data.contents), ...post.Comments];
  //       const mainPosts = [...state.mainPosts];
  //       mainPosts[postIndex] = post;
  //       return {
  //         ...state,
  //         mainPosts,
  //         addCommentLoading: false,
  //         addCommentDone: true,
  //       };
  //     }
  //     case ADD_COMMENT_FAILURE:
  //       return {
  //         ...state,
  //         addCommentLoading: false,
  //         addCommentError: action.error,
  //       };
  //     default:
  //       return state;
  //   }
};

export default reducer;
