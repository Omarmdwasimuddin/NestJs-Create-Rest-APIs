<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>


```bash 
# create module
$ nest g module student

# create service
$ nest g service student

# create controller
$ nest g controller student
```

```bash 
# student.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class StudentService {
    private students = [
        { id:1101, name:'Wasim', age:29 },
        { id:1102, name:'Hannan', age:32 },
        { id:1103, name:'Rafiq', age:25 },
        { id:1104, name:'Kamrul', age:27 },
        { id:1105, name:'Mir-Jahan', age:22 }
    ];

    getAllStudents(){
        return this.students;
    }

    getStudentById(id: number){
        const student = this.students.find((s) => s.id === id)
        if(!student) throw new NotFoundException
        return student;
    }
}
```

```bash 
# student.controller.ts
import { Controller, Get, Param } from '@nestjs/common';
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
}
```

![](/public/Img/output2.png)
![](/public/Img/output1.png)


```bash
# student.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class StudentService {
    private students = [
        { id:1101, name:'Wasim', age:29 },
        { id:1102, name:'Hannan', age:32 },
        { id:1103, name:'Rafiq', age:25 },
        { id:1104, name:'Kamrul', age:27 },
        { id:1105, name:'Mir-Jahan', age:22 }
    ];

    getAllStudents(){
        return this.students;
    }

    getStudentById(id: number){
        const student = this.students.find((s) => s.id === id)
        if(!student) throw new NotFoundException
        return student;
    }

    createStudent(data: {name: string, age: number}){
        const newStudent = {
            id: Date.now(),
            ...data,
        };
        this.students.push(newStudent);
        return newStudent;
    }

    updateStudent(id: number, data:{name: string, age: number}){
        const index = this.students.findIndex((s) => s.id === id);
        if(index === -1) throw new NotFoundException('Student not found!');
        this.students[index] = {id, ...data};
        return this.students[index];
    }

    patchStudent(id: number, data:Partial<{name: string, age: number}>){
        const student = this.getStudentById(id);
        Object.assign(student, data);
        return student;
    }

    removeStudent(id: number){
        const index = this.students.findIndex((s) => s.id === id);
        if( index === -1 ) throw new NotFoundException('Student not found!');
        const removed = this.students.splice(index,1);
        return { message: 'student deleted successfully', student: removed[0] };
    }
}
```

```bash
# student.controller.ts
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
```

#### POST
![](/public/Img/create.png)

#### UPDATE
![](/public/Img/update.png)

#### PATCH
![](/public/Img/patchUpdate.png)

#### DELETE
![](/public/Img/deleted.png)
