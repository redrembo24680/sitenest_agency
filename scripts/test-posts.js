import { getBlogPosts } from '../lib/blog.js';

async function test() {
  try {
    console.log("Fetching posts...");
    const posts = await getBlogPosts();
    console.log(`Found ${posts.length} posts:`);
    posts.forEach(p => {
      console.log(`- Slug: ${p.slug}, Title: ${p.entry.title}, Lang: ${p.entry.language}`);
    });
  } catch (err) {
    console.error("Error fetching posts:", err);
  }
}

test();
