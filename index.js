import Unsplash from '/unsplash-js';

const unsplash = new Unsplash({
 accesskey: "q5gJMmDYctWgCr4OywV-XxhZ_OrAVHak4VMyBstZLwI",
 secret: "r7WQgWdzHWoLK-wFSDAhcbwAEpvpTWfiNctSoJLxCTM",
 callbackUrl: "https://inner-garden.netlify.app/auth"
});

const authenticationUrl = unsplash.auth.getAuthenticationUrl([
  "public",
  "read_user",
  "write_likes"
]);

location.assign(authenticationUrl);
