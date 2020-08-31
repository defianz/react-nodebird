// const { sequelize } = require(".");
const DataTypes = require("sequelize");
const { Model } = DataTypes;

module.exports = class Post extends Model {
  static init(sequelize) {
    super.init(
      {
        // id가 기본적으로 들어있다.
        content: {
          type: DataTypes.TEXT,
          allowNULL: false,
        },
      },
      {
        modelName: "Post",
        tableName: "posts",
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci", //한글, 이모티콘 저장
        sequelize,
      }
    );
  }

  static associate(db) {
    db.Post.belongsTo(db.User);
    db.Post.belongsToMany(db.Hashtag, { through: "PostHashtag" });
    db.Post.hasMany(db.Comment);
    db.Post.hasMany(db.Image);
    db.Post.belongsToMany(db.User, { through: "Like", as: "Likers" });
    db.Post.belongsTo(db.Post, { as: "Retweet" });
  }
};

// module.exports = (sequelize, DataTypes) => {
//   const Post = sequelize.define(
//     "Post",
//     {
//       // id가 기본적으로 들어있다.
//       content: {
//         type: DataTypes.TEXT,
//         allowNULL: false,
//       },
//       // RetweetId
//     },
//     {
//       charset: "utf8mb4",
//       collate: "utf8mb4_general_ci", //한글, 이모티콘 저장
//     }
//   );
//   Post.associate = (db) => {
//     db.Post.belongsTo(db.User);
//     db.Post.belongsToMany(db.Hashtag, { through: "PostHashtag" });
//     db.Post.hasMany(db.Comment);
//     db.Post.hasMany(db.Image);
//     db.Post.belongsToMany(db.User, { through: "Like", as: "Likers" });
//     db.Post.belongsTo(db.Post, { as: "Retweet" });
//   };
//   return Post;
// };
