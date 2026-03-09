import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { StudentService } from './student.service';

@Controller('student')
export class StudentController {
    constructor(private readonly studentService: StudentService){}

    @Get()
    getAll(){
        return this.studentService.getAllStudents();
    }

    @Get(':id')
    getOne(@Param('id') id: string){
        return this.studentService.getStudentById(Number(id))
    }

    @Post()
    create(@Body() data:{ name:string, age:number }){
        return this.studentService.createStudent(data);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() data:{name: string, age: number}){
        return this.studentService.updateStudent(Number(id), data);
    }

    @Patch(':id')
    patchUpdate(@Param('id') id: string, @Body() data:Partial<{name:string, age: number}>){
        return this.studentService.patchStudent(Number(id), data)
    }

    @Delete(':id')
    remove(@Param('id') id: string){
        return this.studentService.removeStudent(Number(id))
    }
}