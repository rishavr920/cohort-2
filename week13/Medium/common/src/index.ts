
//utha kr laya backend se bcoz frontend ko b use krna h isilye common hona chahiye
//for zod
import z from 'zod';


//defining signupInput using zod

export const signupInput = z.object({
    email : z.string().email(),
    password : z.string().min(6),
    name : z.string().optional()
})
//defining signin using zod

export const signinInput = z.object({
    email : z.string().email(),
    password : z.string().min(6),
})


//defininig blogInput using zod
export const blogInput = z.object({
    title : z.string(),
    content : z.string(),
})

//defining updateBlogInput using zod
export const updateBlogInput = z.object({
    title : z.string(),
    content : z.string(),
    id : z.number(),
})

//type inference in zod
export type SignupInput = z.infer<typeof signupInput>;
export type SigninInput = z.infer<typeof signinInput>;
export type CreateBlogInput = z.infer<typeof blogInput>;
export type UpdateBlogInput = z.infer<typeof updateBlogInput>;

//defining 
//the prblm comes when u need these types on the frontend,eventually u will  code frontend as well,
//and in fronend code also u need to know ki mujhe username bhena h ki email ya password what this key look like
//for that we discuss type inference in zod,given this runtime variable will exist in js file
//u can actually extract the type from the runtime variable then u can use in the frontend.

//type inference in zod
 //this is the syntax of zod,frontend will need this, developer of the frontend not going to open the backend folder then go to see different routes their types etc,
//so good approach is, it is good for the frotend developer to access this signupInput type
//that why also export the type so that frontend can use it.
//but problem is that u r exporting it from backend folder.

//in the end we have two different folder frontend,backend so this isn't right place to export signupInput type backend k liye thk h but not for frontend
//so we will learn about monorepo,structur our appliation in multiple modules.

//jaise hmne baceknd bnaya cloudflare pr
//hm frontend krenge react pr

//lekin zod types h wo dono use krenge this is common module,hm ni chahte backend se kch import krna frontend m vice versa,
//to do that whatever is common we wrote in seprate module and import it in both the folders
 


//sawal ye hi ki isko frontend backend tk kaise pohchaye,
//ek way h 
//import {signupInput} from "../../../common/src/index" but this is wrong way

//2nd way, u convert this common in npm module, u don't ideally want this best way is with mono repo but we not study about it so
//now npm way follow .

//so we will publish this common folder as npm package