import { Types } from 'mongoose';
import { Material } from 'src/database/models/Material';

export default class MaterialMock {
  static giveMeAllMaterials(): Material {
    const material = new Material();
    material._id = '1';
    material.name = 'Verde Ubatuba';
    material.purchasePrice = 300;
    material.sellPrice = 450;
    material.shopID = '1';
    material.inStock = 5;
    material.onSale = true;
    material.unitOfMeasurement = 'm²';
    return material;
  }
}
