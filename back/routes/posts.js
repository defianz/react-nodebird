const express = require("express");
const { Op } = require("sequelize");

const { User, Post, Image, Comment } = require("../models");

const router = express.Router();

router.get("/", async (req, res, next) => {
  // GET /posts
  try {
    const where = {};
    if (parseInt(req.query.lastId, 10)) {
      //초기로딩이 아닐때
      where.id = { [Op.lt]: parseInt(req.query.lastId, 10) };
      // id가 lastid보다 작을걸로 10개 불러오기
    }
    const posts = await Post.findAll({
      where,
      limit: 10,
      order: [
        ["createdAt", "DESC"],
        [Comment, "createdAt", "DESC"],
      ],
      include: [
        {
          model: User,
          attributes: ["id", "nickname"],
        },
        {
          model: Image,
        },
        {
          model: Comment,
          include: [
            {
              model: User,
              attributes: ["id", "nickname"],
              order: [["createdAt", "DESC"]],
            },
          ],
        },
        {
          model: User, //좋아요 누른사람
          as: "Likers",
          attribute: ["id"],
        },
        {
          model: Post,
          as: "Retweet",
          include: [
            {
              model: User,
              attributes: ["id", "nickname"],
            },
            {
              model: Image,
            },
          ],
        },
      ],
    });
    res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
