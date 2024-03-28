import { Injectable } from '@nestjs/common';
import { MinioService } from 'nestjs-minio-client';

@Injectable()
export class MinioStoreService {
    constructor(private readonly minio:MinioService) {
        

     }


     async uploadFile(file:Express.Multer.File){
        console.log(file);
       try {
        const p= await this.minio.client.putObject("technicalranjit",file.originalname,file.buffer);
        if(p){
            return p;
        }
        throw new Error("Error in uploading file");
       } catch (error) {
              console.log(error);
              throw new Error("Error in uploading file");
       }
        
     }
}
