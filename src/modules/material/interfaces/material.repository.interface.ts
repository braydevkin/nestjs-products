import { IMaterial } from 'src/shared/interfaces/Material.interface';

import { IDatabaseRepository } from 'src/shared/repositories/database.repository';

export interface IMaterialRepository extends IDatabaseRepository<IMaterial> {
  getMaterialOffStock(filter: IMaterial): Promise<IMaterial>;
}
