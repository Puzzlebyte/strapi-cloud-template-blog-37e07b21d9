"use strict";

/**
 * A set of functions called "actions" for `voting`
 */

module.exports = {
  vote: async (ctx, next) => {
    try {
      const { postId, userId, articleId } = ctx.request.body;

      if (!postId || !userId || !articleId)
        throw new Error(
          "Missing one or more of required fields: postId, userId, articleId"
        );

      const vote = await strapi
        .service("api::voting.voting")
        .vote({ postId, userId, articleId });

      return vote;
    } catch (err) {
      console.log("#########################\n")
      console.log("ERROR:", err);
      console.log("\n#########################")

      throw new Error("Something went wrong.");
    }
  },
};
