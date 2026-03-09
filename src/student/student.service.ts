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