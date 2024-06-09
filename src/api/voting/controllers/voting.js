"use strict";

/**
 * A set of functions called "actions" for `voting`
 */

module.exports = {
  getVote: async (ctx, next) => {
    try {
      const { postId, userId } = ctx.request.body;

      if (!postId || !userId)
        throw new Error(
          "Missing one or more of required fields: postId, userId"
        );

      const vote = await strapi
        .service("api::voting.voting")
        .getVote({ postId, userId });

      return vote;
    } catch (err) {
      console.log("ERROR:", err);

      throw new Error("Something went wrong.");
    }
  },

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
      console.log("#########################\n");
      console.log("ERROR:", err);
      console.log("\n#########################");

      throw new Error("Something went wrong.");
    }
  },

  switchVote: async (ctx, next) => {
    try {
      const { postId, userId, currentArticleId, targetArticleId } = ctx.request.body;

      console.log({ postId, userId, currentArticleId, targetArticleId })

      if (postId === undefined || userId === undefined || currentArticleId === undefined || targetArticleId === undefined)
        throw new Error(
          "Missing one or more of required fields: postId, userId, currentArticleId, targetArticleId"
        );

      const switchVote = await strapi
        .service("api::voting.voting")
        .switchVote({ postId, userId, currentArticleId, targetArticleId });

      return switchVote;
    } catch (err) {
      console.log("#########################\n");
      console.log("ERROR:", err);
      console.log("\n#########################");

      throw new Error("Something went wrong.");
    }
  },
};
