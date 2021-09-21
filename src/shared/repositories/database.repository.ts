export interface IDatabaseRepository<Entity> {
  create(data: Entity): Promise<Entity>;
  readAll(filters?: Partial<Entity>): Promise<Entity[]>;
  readOne(id: string): Promise<Entity>;
  update(id: string, data: Entity): Promise<Entity>;
  delete(id: string): Promise<Entity>;
}
