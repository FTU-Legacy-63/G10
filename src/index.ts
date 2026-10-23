import dossiers from './dossiers.json';
import warehouse from './warehouse.json';
import type { Dossier, WarehouseRecord } from '../domain/types';
export const CASES = dossiers as Dossier[];
export const WAREHOUSE = warehouse as WarehouseRecord[];
export const DATASET = 'extended-8-g1-v1' as const;
