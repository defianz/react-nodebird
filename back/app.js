const express = require("express");
const cors = require("cors");
const postRouter = require("./routes/post");
const userRouter = require("./routes/user");
const postsRouter = require("./routes/posts");
const hashtagRouter = require("./routes/hashtag");
const db = require("./models");
const passportConfig = require("./passport");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const dotenv = require("dotenv");
const morgan = require("morgan");
const path = require("path");
const hpp = require("hpp");
const helmet = require("helmet");

dotenv.config();
const app = express();

db.sequelize
  .sync()
  .then(() => {
    console.log("db 연결 성공");
  })
  .catch(console.error);

passportConfig();

if (process.env.NODE_ENV === "production") {
  app.use(morgan("combined"));
  app.use(hpp());
  app.use(helmet());
  app.use(
    cors({
      origin: "http://test-defian.tk",
      credentials: true, // 쿠키 전달 옵션 : 전달하려면 true (default : false)
    })
  );
} else {
  app.use(morgan("dev"));
  app.use(
    cors({
      origin: true,
      credentials: true, // 쿠키 전달 옵션 : 전달하려면 true (default : false)
    })
  );
}

app.use("/", express.static(path.join(__dirname, "uploads")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser("nodebirdsecret"));
app.use(
  session({
    saveUninitialized: false,
    resave: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
      httpOnly: true,
      secure: false,
      domain: process.env.NODE_ENV === "production" && ".test-defian.tk",
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());

// get -> 가져오다
// post -> 생성하다
// put -> 전체수정
// delete -> 제거
// patch -> 부분 수정
// options -> 찔러보기
// head -> 헤더만 가져오기

app.get("/", (req, res) => {
  res.send("hello express");
});

// app.get("/posts", (req, res) => {
//   res.json([
//     {
//       id: 1,
//       content: "hello",
//     },
//     {
//       id: 2,
//       content: "hello2",
//     },
//     {
//       id: 3,
//       content: "hello3",
//     },
//   ]);
// });

app.use("/post", postRouter);
app.use("/posts", postsRouter);
app.use("/user", userRouter);
app.use("/hashtag", hashtagRouter);

// app.use((err,req,res,next) =>{

// });

app.listen(80, () => {
  console.log("서버실행중!!");
});
// app.listen(3065, () => {
//   console.log("서버실행중!!");
// });
