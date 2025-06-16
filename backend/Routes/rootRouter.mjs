import { Router } from "express";
import watchRouter from "./watchRouter.mjs";
import userRouter from "./userRouter.mjs";
import cartRouter from "./cartRouter.mjs";
import orderRouter from "./orderRouter.mjs";

const rootRouter = Router();

rootRouter.use("/watch", watchRouter); // watchRouter
rootRouter.use("/user", userRouter); // userRouter
rootRouter.use("/cart", cartRouter); // cartRouter
rootRouter.use("/order", orderRouter); // orderRouter

export default rootRouter;
