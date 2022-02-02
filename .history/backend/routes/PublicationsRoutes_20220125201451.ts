import { Router } from 'express';
const router = Router();

import PublicationsController from '../controllers/PublicationsController';
const { createPublication } = PublicationsController

router.post('/createpublication')