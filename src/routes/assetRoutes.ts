import { Router } from 'express';
import * as assetController from '../controllers/assetController';
import { validate } from '../middlewares/validationMiddleware';
import { assetIdSchema, createAssetSchema } from '../validation/assetValidation';
const router = Router();

router.post('/', validate(createAssetSchema), assetController.createAsset);
router.get('/', assetController.getAssets);
router.get('/:id', validate(assetIdSchema, 'params'), assetController.getAsset);
router.delete('/:id', validate(assetIdSchema, 'params'), assetController.deleteAsset);

export default router;