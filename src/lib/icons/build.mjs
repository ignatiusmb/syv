import { existsSync } from 'fs';
import feather from './feather/build.mjs';

if (!existsSync('./feather/index.js')) feather.build();
