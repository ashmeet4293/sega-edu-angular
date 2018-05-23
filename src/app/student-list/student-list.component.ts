import { Component, OnInit } from '@angular/core';
import { StudentService } from '../services/student.service';
import { Router } from '@angular/router';
import { AppError } from '../common/app-error';
import { NotFoundError } from '../common/not-found-error';

@Component({
  selector: 'student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {
  students: any[];
  constructor(private service : StudentService, private router: Router) { }

  ngOnInit() {
    this.service.getAll()
    .subscribe(students =>{
      console.log(students);
      this.students=students;
    });
    
  }

  updateStudent(student){
    console.log(student);
    this.router.navigate(['/studentedit']);
  }

  deleteStudent(id ){
      let index=this.students.indexOf(id);
      this.students.splice(index,1);

      this.service.delete(id)
        .subscribe( null,(error : AppError)=>{
          this.students.splice(index,0,id);

          if(error instanceof NotFoundError){
            alert("Already Deleted");
          }
        });

  }
}
