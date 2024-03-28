import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  Query,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { KiitUsersService } from './kiit-users.service';
import {
  KiitUserRegister,
  PremiumUserRegisterDto,
} from './dto/KiitUserRegister.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import * as fs from 'fs';
import axios from 'axios';
import jsPDF from 'jspdf';

import cheerio from 'cheerio';
import { createCanvas, loadImage } from 'canvas';
import { exit } from 'process';
import { JwtService } from '@nestjs/jwt';
import { MinioStoreService } from 'src/minio-store/minio-store.service';

const secure = "Ranjit";

@Controller('kiitusers')
export class KiitUsersController {
  constructor(private readonly kiitUserService: KiitUsersService,private readonly jwtService:JwtService,private readonly minioStore:MinioStoreService) {}



  @Post('registerUser')
  async registerUser(@Body() dto: KiitUserRegister) {
    console.log(dto)
    return this.kiitUserService.registerUser(dto);
  }

  @Get('getUserByEmail/:email')
  async getUserById(@Param('email') email: string) {
  
    
    return this.kiitUserService.getUserByEmail(email);
  }

  @Post('verifyTokenUser')
  async verifyTokenUser(@Body() dto:{token:string,email:string}) {
    try {
      console.log("Verification",dto);
      const verifyToken =await this.jwtService.verifyAsync(dto.token,{
        secret:"Ranjit"
      });
      console.log(verifyToken);
      return verifyToken;
    } catch (error) {
      console.log(dto.email,error);
      throw new BadRequestException("Invalid Token");
    }
  }


  @Post("verifySession")
  async verifySession(@Body() dto:{email:string,token:string}){
    return this.kiitUserService.verifyToken(dto.token,dto.email);

  }

  @Post("removeSiginToken")
  async removeSiginToken(@Body() dto:{email:string,token:string}){
    console.log(dto)
    return this.kiitUserService.removeSiginToken(dto);
  }


  @Post('registerPremiumUser')
  async registerPremiumUser(@Body() dto: PremiumUserRegisterDto) {
    console.log(dto);
    return this.kiitUserService.registerPremiumUser(dto);
  }
  

  @Get('getUsers')
  async getAllPremiumUser() {
    return this.kiitUserService.getAllPremiumUser();
  }

  @Get("allUsers")
  async getAllUsers(){
    return this.kiitUserService.getAllUsers();
  }

  @Get('getPremiumUserById/:userId')
  async getPremiumUserById(@Param('userId') userId: string) {
    return this.kiitUserService.getPremiumUserById(userId);
  }

  @Post('savePaymentScreenshot')
  @UseInterceptors(FileInterceptor('image'))
  async updatePayment(
    @UploadedFile() file: Express.Multer.File,
    @Body() dto: { userId: string },
  ) {
    console.log(file, dto);

    if (file) {
      await this.checkIfImage(file);
    }
    return this.kiitUserService.savePayemntScreenshot(dto.userId, file);
  }

  @Post('activateUser')
  async updatePremiumUser(@Body() dto: { userId: string }) {
    // console.log(dto)
    return this.kiitUserService.activatePremiumUser(dto.userId);
  }

  async checkIfImage(fileInfo: {
    mimetype: string;
    path: string;
  }): Promise<void> {
    if (!fileInfo.mimetype.startsWith('image/')) {
      fs.unlinkSync(fileInfo.path);
      throw new BadRequestException('File is not an image.');
    }
  }


  @Get("getpremiumWithoutPaymentScreenshot")
  async getPremiumUserWithPaymentStatus(){
    return this.kiitUserService.getPremiumUserWithoutPaymentScreenshot();
  } 

  @Get("sendPaymentReminder")
  async sendPaymentReminder(){
    return this.kiitUserService.sendRemainderMail();
  }


  @Get("getUserWithoutPremium")
  async getUserWithoutPremium(){
    return this.kiitUserService.getUserWithoutPremiumAccount();
  }

  @Get("sendMailToNonPremiumUser")
  async sendMailToNonPremiumUser(){
    return this.kiitUserService.sendMailToUserWithoutPremiumAccount();
  }


  @Get("addTotalEarnedToAllUsers")
  async addTotalEarnedToAllUsers(){ 
    return this.kiitUserService.addTotalEarnedToAllUsers();
  }

  @Get("sendTestMail")
  async sendTestMail(){
    return this.kiitUserService.sendTestMail();
  }

 

  @Get("filteruser")
  async filterUser(){
    return this.kiitUserService.filterUser();
  }

  @Get("sendMailToNonKiitconnectUser")
  async sendMailToNonKiitconnectUser(){
    return this.kiitUserService.sendMailToNonKiitConnectUser();
  }  
  
  @Get("sendMailToNonKiitconnectUser4thsem")
  async sendMailToNonKiitconnectUser4thsem(){
    return this.kiitUserService.sendTo4thSem();
  }


  @Get("testMails")
  async testMails(){
    return this.kiitUserService.testMails();
  }
 


  @Get("print200user")
  async print200thuser(){
    const users = []


    for(var i = 0 ;i<users.length;i++){
      if(i===200){
        console.log(users[i].email);
        exit;
      }
    }
  }



  @Get("getKeys")
  async getKeys(){
    return this.kiitUserService.testCacheService();


  }

  @Post("generateDeviceResetToken")
  async generateDeviceResetToken(@Body("email") email:string ){
    console.log(email)
    return this.kiitUserService.generateResetDeviceToken(email);
  }

  @Get("checkTokenAndReset")
  async checkTokenAndReset(@Query("token") token:string){
    console.log(token)
    return this.kiitUserService.checkTokenAndResetDevice(token);
  }

  

  @Post("uploadTest")
  @UseInterceptors(FileInterceptor('file'))
  async uploadTest(
    @UploadedFile() file: Express.Multer.File,
   
  ) {
    console.log(file);    
    return this.minioStore.uploadFile(file);
  }


}
