const DataTypes = require("sequelize");
const { Model } = DataTypes;

module.exports = class Comment extends Model {
  static init(sequelize) {
    return super.init(
      {
        // id가 기본적으로 들어있다.
        content: {
          type: DataTypes.TEXT,
          allowNULL: false,
        },
      },
      {
        modelName: "Comment",
        tableName: "comments",
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci", //한글, 이모티콘 저장
        sequelize,
      }
    );
  }

  static associtate(db) {
    db.Comment.belongsTo(db.User);
    db.Comment.belongsTo(db.Post);
  }
};

// (sequelize, DataTypes) => {
//   const Comment = sequelize.define(
//     "Comment",
//     {
//       // id가 기본적으로 들어있다.
//       content: {
//         type: DataTypes.TEXT,
//         allowNULL: false,
//       },
//     },
//     // UserId:{}
//     // PostId:{}
//     {
//       charset: "utf8mb4",
//       collate: "utf8mb4_general_ci", //한글, 이모티콘 저장
//     }
//   );
//   Comment.associate = (db) => {

//   };
//   return Comment;
// };
