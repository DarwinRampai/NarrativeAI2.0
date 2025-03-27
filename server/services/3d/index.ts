import { Router } from "express";
import { runwayMLRouter } from "./runway";
import { stableDiffusionRouter } from "./stable-diffusion";
import { omniverseRouter } from "./omniverse";
import { metahumanRouter } from "./metahuman";
import { mayaRouter } from "./maya";
import { blenderRouter } from "./blender";

const threeDRouter = Router();

// Mount individual 3D service routers
threeDRouter.use('/runway', runwayMLRouter);
threeDRouter.use('/stable-diffusion', stableDiffusionRouter);
threeDRouter.use('/omniverse', omniverseRouter);
threeDRouter.use('/metahuman', metahumanRouter);
threeDRouter.use('/maya', mayaRouter);
threeDRouter.use('/blender', blenderRouter);

export { threeDRouter };
