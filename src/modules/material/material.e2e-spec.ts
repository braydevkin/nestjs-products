import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'

import { Types } from 'mongoose'
import * as request from 'supertest'

import { closeMongooseTestModule, getMongooseTestModule } from 'src/database/mock/db.mock'

import { MaterialModule } from './material.module'
import { MaterialService } from './material.service'

describe('Materials', ()=> {
    let app : INestApplication
    const mockService= {
        create: ()=> {
            return {}
        },
        readAll: ()=> [{}],
        readOne: ()=> {
            return {}
        },
        update: () => {
            return {}
        },
        delete: () => {
            return {}
        }
      };

    beforeAll(async ()=> {
        const moduleRef = await Test.createTestingModule({
            imports: [getMongooseTestModule(), MaterialModule],
        }).overrideProvider(MaterialService).useValue(mockService).compile()

        app = moduleRef.createNestApplication();
        await app.init()
    })

    it('/POST Material', ()=> {
        return request(app.getHttpServer()).post('/material').expect(201).expect(mockService.create())
    })

    it('/GET/[id] Material', () => {
        return request(app.getHttpServer())
          .get(`/material/${String(new Types.ObjectId())}`)
          .expect(200)
          .expect(mockService.readOne());
      });

    it('/GET Materials', ()=> {
       return request(app.getHttpServer()).get('/material').expect(200).expect(mockService.readAll())
    })  

    it('/PUT Material', ()=> {
        return request(app.getHttpServer()).put(`/material/${String(new Types.ObjectId())}`).expect(200).expect(mockService.update())
    })

    it('/DELETE Material', ()=> {
        return request(app.getHttpServer()).delete(`/material/${String(new Types.ObjectId())}`).expect(200).expect(mockService.delete())
    })

    afterAll(async ()=> {
        await app.close()
        await closeMongooseTestModule()
    })
})