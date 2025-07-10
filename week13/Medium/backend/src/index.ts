import { Hono } from 'hono'
import { userRouter } from './routes/user'
import { blogRouter } from './routes/blog'

const app = new Hono<{
  //bcoz ts don't know about the env variables,and .toml file so have to tell type of database_url
  Bindings: {
    DATABASE_URL: string,
    JWT_SECRET: string,
  }
}>();

app.route("/api/v1/user",userRouter);  //api/v1/user is the base path aage wala userRouter me lkha h for signup /signup add ho jayega.
app.route("/api/v1/blog",blogRouter);
  


export default app
