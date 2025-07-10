import { Hono } from 'hono'
//adding prisma client
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';

//importing jwt library on hono/jwt not using json web token bcoz it may possible it not work on cloudflare workers
import { sign, verify } from 'hono/jwt'

//zod imports
// import { signupInput } from '../common'
import { signupInput,signinInput} from '@100xdevs/medium-common'

export const userRouter = new Hono<{
  //bcoz ts don't know about the env variables,and .toml file so have to tell type of database_url
  Bindings: {
    DATABASE_URL: string,
    JWT_SECRET: string,
  }
}>();

// //middleware - protecting the end points
// userRouter.use('/api/v1/blog/*',async(c,next)=>{
//   //get the header
//   //verify the header
//   //if the header is correct, we can proceed
//   //if not, we return the user a 403 status code

//   const header = c.req.header("authorization") || "";
//   //bearer token => [bearer,token]
//   const token = header.split(" ")[1];
   
//   const response = await verify(header,c.env.JWT_SECRET);
//   if(response.id){  //agar response id mila h to next() chlega means we can go to signup,signin jaisa request hoga waise
//     next();
//   }
//   else{
//     c.status(403);
//     return c.json({error: "unauthorized"})
//   }
// })

userRouter.post('/signup',async(c)=>{
  //signup route
  const body = await c.req.json();
  
  //sanatize
  //{
  //  "email" :  "string",
  //  "password" : "string",
  //  "name" : "string"
  //}  to do this we help of zod validation,zod lets u do input validation ki jo user bhej rhe wo sai sai ho.

  const {success} = signupInput.safeParse(body);
  if(!success){
      c.status(411);
      return c.json({error: "invalid input"})
  }
  //prisma ka part
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,  //yha type error de rha tha
  }).$extends(withAccelerate())

  
  try{
    const user = await prisma.user.create({
      data: {
        username: body.username,
        password: body.password,
        name: body.name,
      }
    });

    const token = await sign({
      id : user.id
    },c.env.JWT_SECRET);

    return c.json({token})  //jo jwt token mila  we can decode it pr tm bologe how can we decode it,
    // so json web token doesn't mean that other people can not decode it, it means that other people can not verify it.
    // return c.text('jwt here')
  }catch(e){
    c.status(403);
    return c.json({error: "error while signing up"})
  }
})


userRouter.post('/signin',async(c)=>{
  //singin route
  const body = await c.req.json();
  //zod validation
  const {success} = signinInput.safeParse(body);
  if(!success){
      c.status(411);
      return c.json({error: "invalid input"})
  }

  //prisma ka part
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  try{
    const user = await prisma.user.findFirst({
      where: {
        username: body.username,
        password: body.password,
    }
    });

  if(!user){
    c.status(403); //for unauthorized
    return c.json({error: "user not found"})
  }

  const jwt = await sign({
                id: user.id
               },c.env.JWT_SECRET);

  return c.json({jwt})
  }
  catch(e){
    c.status(411);
    return c.text("invalid");
  }
  })
  