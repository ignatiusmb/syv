import { existsSync } from 'fs';
import feather from './scripts/feather.mjs';

if (!existsSync('./feather/index.js')) feather.build();
