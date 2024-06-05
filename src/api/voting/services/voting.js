"use strict";

/**
 * voting service
 */

module.exports = () => ({
  async vote({ postId, userId, articleId }) {
    console.log("Service");

    console.log(postId, userId, articleId);

    // Check if the user has already voted for this post
    const existingVote = await strapi.db.query("api::vote.vote").findOne({
      where: {
        post: postId,
        userId: userId, // Use userId directly as it's a text field
      },
    });

    if (existingVote) {
      throw new Error(`User with id ${userId} has already voted for post with id ${postId}`);
    }

    // Fetch the current post to get the current value of votes_nick or votes_chris
    const post = await strapi.db.query("api::post.post").findOne({
      where: { id: postId },
      select: ['votes_nick', 'votes_chris'],
    });

    if (!post) {
      throw new Error(`Post with id ${postId} not found`);
    }

    // Check if the articleId exists and fetch the author
    const article = await strapi.db.query("api::article.article").findOne({
      where: { id: articleId },
      populate: { author: true }, // Populate the author relation
    });

    if (!article) {
      throw new Error(`Article with id ${articleId} not found`);
    }

    const authorName = article.author.name; // Adjust this according to the actual structure of your author model

    // Determine which vote count to increment based on the author
    let updateData;
    if (authorName === 'Nick Bigger') {
      updateData = { votes_nick: (post.votes_nick || 0) + 1 };
    } else if (authorName === 'Chris Porter') {
      updateData = { votes_chris: (post.votes_chris || 0) + 1 };
    } else {
      throw new Error(`Unknown author: ${authorName}`);
    }

    // Update the post's vote count
    await strapi.db.query("api::post.post").update({
      where: { id: postId },
      data: updateData,
    });

    // Create a new voting record and automatically publish it
    return await strapi.db.query("api::vote.vote").create({
      data: {
        post: postId,
        userId: userId, // Use userId directly as it's a text field
        article: articleId,
        publishedAt: new Date().toISOString(), // Automatically set the published date to now
      },
    });
  },
});
