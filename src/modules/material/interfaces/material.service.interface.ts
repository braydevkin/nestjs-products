import { IMaterial } from 'src/shared/interfaces/Material.interface';

/**
 * This interface defines which functions are present in this service
 */
export interface IMaterialService {
  create(data: IMaterial): Promise<IMaterial>;
  readAll(filters?: Partial<IMaterial>): Promise<IMaterial[]>;
  readOne(id: string): Promise<IMaterial>;
  update(id: string, data: IMaterial): Promise<IMaterial>;
  delete(id: string): Promise<IMaterial>;
}
