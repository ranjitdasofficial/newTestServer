import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { NotesService } from './notes.service';
import {
  AddNotesDTO,
  AddNotesSingleDTO,
  AddPyqsDTO,
  AddPyqsSingleDTO,
  SolutionDto,
} from './notes.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Get('createBranches')
  async createBranches() {
    return this.notesService.createBranches();
  }

  @Get('createSemestersForEachBranch')
  async createSemestersForEachBranch() {
    return this.notesService.createSemestersForEachBranch();
  }

  @Get('findSemesterByBranch')
  async findSemesterByBranch() {
    return this.notesService.findSemesterByBranch();
  }

  @Get('getSemestersByBranchId/:branchId')
  async getSemestersByBranchId(@Param('branchId') branchId: string) {
    return this.notesService.getSemestersByBranchId(branchId);
  }


  @Get('getSubjectsByBranchNameAndSemesterNumber')
  async getSubjectsByBranchNameAndSemesterNumber(
    @Query() dto: { branchName: string; semesterNumber: string },
  ) {
    return this.notesService.getSubjectsByBranchNameAndSemesterNumber(dto);
  }


  @Get("getAllBranchesWithSemesters")
  async getAllBranchesWithSemesters() {
    return this.notesService.getAllSemesterAndBranch();
  }

  @Get('getSemesterByName/:semesterName')
  async getSemesterByName(@Param('semesterName') semesterName: string) {
    return this.notesService.getSemesterByName(semesterName);
  }

  @Post('createSubject')
  async createSubject(@Body() dto: { data: [] }) {
    return this.notesService.createSubject(dto.data);
  }

  @Post('addSubjectToSemester')
  async addSubjectToSemester(
    @Body() dto: { semesterId: string; subjectId: string },
  ) {


    console.log(dto)
    
    return this.notesService.addExistingSubjectToSemester(
      dto.subjectId,
      dto.semesterId,
    );
  }

  @Post("removeSubjectFromSemester")
  async removeSubjectFromSemester(
    @Body() dto: { semesterId: string; subjectId: string },
  ) {
    return this.notesService.removeSubjectFromSemester(
      dto.subjectId,
      dto.semesterId,
    );
  }

  @Get('getAllSubjects')
  async getAllSubjects() {
    return this.notesService.getAllSubjects();
  }

  @Post('addmultiSubjectToSemester')
  async addMultiSubjectToSemester(
    @Body() dto: { semesterId: string; subjectId: string[] },
  ) {
    console.log(dto);
    return this.notesService.addMultiPleSubjectsToSemester(
      dto.subjectId,
      dto.semesterId,
    );
  }

  @Post('addPYQSToSubject')
  async addPYQSToSubject(@Body() dto: AddPyqsDTO) {
    console.log(dto);
    return this.notesService.addPyqsToSubject(dto.subjectId, dto.pyqs);
  }

  @Post('deletePYQS')
  async deletePYQS(
    @Body()
    dto: {
      pyqsId: string;
      subjectId: string;
      solutionId: string | null;
    },
  ) {
    return this.notesService.deletePYQS(dto);
  }

  @Post('deleteSolution')
  async deleteSolution(
    @Body() dto: { pyqsId: string; subjectId: string; solutionId: string },
  ) {
    return this.notesService.deleteSolution(dto);
  }

  @Post('addPYQSToSubjectSingle')
  async addPYQSToSubjectSingle(@Body() dto: AddPyqsSingleDTO) {
    console.log(dto);
    return this.notesService.addPyqsToSubjectSingle(dto.subjectId, dto.pyqs);
  }

  @Post('addNotesToSubject')
  async addNotesToSubject(@Body() dto: AddNotesDTO) {
    console.log(dto);
    return this.notesService.addNotesToSubject(dto);
  }

  @Post('addNotesToSubjectSingle')
  async addNotesToSubjectSingle(@Body() dto: AddNotesSingleDTO) {
    console.log(dto);
    return this.notesService.addNotesToSubjectSingle(dto);
  }

  @Post('deleteNotes')
  async deleteNotes(@Body() dto: { noteId: string; subjectId: string }) {
    return this.notesService.deleteNote(dto);
  }

  @Get('getPYQSByBranchIdAndSemesterId')
  async getPYQSByBranchIdAndSemesterId(
    @Query() dto: { branchId: string; semesterId: string },
  ) {
    return this.notesService.getPYQSByBranchIdAndSemesterId(
      dto.branchId,
      dto.semesterId,
    );
  }

  @Get('getPYQSByBranchIdAndSemesterNumber')
  async getNotesByBranchIdAndSemesterId(
    @Query() dto: { branchId: string; semesterNumber: string; type: string },
  ) {
    console.log(dto);
    return this.notesService.getMaterialsByBranchIdAndSemesterId(dto);
  }

  @Get('UpdateDocument')
  async UpdateDocument() {
    return this.notesService.updateDocuments();
  }

  @Post('addSolutionsToPyqs')
  async addSolutionsToPyqs(@Body() dto: any) {
    console.log(dto);
    return this.notesService.addSolutionToPyqs(dto);
  }

  @Post('ActionOnSolutionReview')
  async actionOnSolutionReview(
    @Body()
    dto: {
      status: string;
      createdById: string;
      rejectedReason?: string;
    },
  ) {
    return this.notesService.actionOnSolutionReview(
      dto.status,
      dto.createdById,
      dto.rejectedReason,
    );
  }

  @Get('getAllReviewSolution')
  async getAllReviewSolution() {
    return this.notesService.getSolutionReview();
  }

  @Get('mysubmission')
  async getMySubmission(@Query() dto: { userId: string }) {
    return this.notesService.getMySubmission(dto.userId);
  }

  @Get('payToUser/:refId')
  async payToUser(@Param('refId') refId: string) {
    return this.notesService.paidToUser(refId);
  }

  @Get('getAllSubmission')
  async getAllSubmission() {
    return this.notesService.getAllSubmission();
  }

  // CReating folders for all subjects

  @Get('CreateSubjectFolder')
  async createSubjectFolder() {
    return await this.notesService.createfolder();
  }
   
  @Post('updatePYQSQuestion')
  async updatePYQSQuestion(
    @Body()
    dto: {
      subjectId: string;
      pyqId: string;
      Question: string;
      Type: string;
    },
  ) {
    console.log("dto",dto);
    // if (!dto.subjectId || !dto.PyqId || !dto.Question || !dto.Type)
    //   throw new BadRequestException('Please provide all the required fields');
    return this.notesService.updateQuestions(
      dto.subjectId,
      dto.pyqId,
      dto.Question,
      dto.Type,
    );
  }


  @Get("testsub")
  async testsub() {
    return this.notesService.testC();
  }

  @Get("getNotesAndPYQS/:id")
  async getNotesAndPYQS(@Param("id") id:string) {
    console.log(id);
    return this.notesService.getNotesAndPyqsBySubjectId(id);
  }

  @Post("deleteMultiplePYQS")
  async deleteMultiplePYQS(@Body() dto: {
    ids: string[];
    subjectId: string;
    type: string;
  }) {

    console.log(dto);
    return this.notesService.deleteMutiplePYQSAndSolution(dto);
  }

  @Post("adminAddSolution")
  async adminAddSolution(@Body() dto: {
    solution: string;
    questionId: string;
    subjectId: string;
  }) {
    console.log(dto);
    return this.notesService.adminAddSolution(dto);
  }

  @Post("adminAddQuestion")
  async adminAddQuestion(@Body() dto: {
    note: string;
    subjectId: string;
    name: string;
  }) {
    console.log(dto);
    return this.notesService.adminAddQuestion(dto);
  }

  @Post("addSubject")
  async addSubject(@Body() dto: {
    name: string;
    code?: string;
    credit?:string;
    folderId: string;
  }) {
    console.log(dto);
    return this.notesService.addSubject(dto);
  }

  @Post("deleteSubject") 
  async deleteSubject(@Body() dto: {
    subjectId: string;
  }) {
    console.log(dto);
    return this.notesService.deleteSubject(dto.subjectId);
  }
  

}
