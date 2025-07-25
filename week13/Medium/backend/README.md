```
npm install
npm run dev
```

```
npm run deploy
```
if u r using a node.js based edge environment, then the pooled connection will work fine with neon.db pool url

if u r using a different js runtime (similar to aws lambda/cloudflare workers) is when the neon.tech pooled connection
might not work

the pooled connection that u get from neon.db does not have a bunch of prisma dependencies that the prisma pooled connection does