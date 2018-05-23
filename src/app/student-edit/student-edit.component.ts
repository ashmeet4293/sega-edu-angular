import { Component, OnInit } from '@angular/core';
import { StudentDataVo } from '../models/student.models';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { CustomValidators } from '../common/custom-validator';
import { StudentService } from '../services/student.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AppError } from '../common/app-error';
import { BadInputError } from '../common/bad-input';
import { Route } from '@angular/compiler/src/core';

@Component({
  selector: 'student-edit',
  templateUrl: './student-edit.component.html',
  styleUrls: ['./student-edit.component.css']
})
export class StudentEditComponent implements OnInit {

  form : FormGroup;
  id : any;
  student : any={
    "userId": 7,
    "studentName": "",
    "userName": "",
    "gender": "",
    "dob": "",
    "fatherName": "",
    "email": "",
    "permanentAddress": "",
    "temporaryAddress": "",
    "mobileNo": "",
    "phoneNo": "",
    "academicDetails": "",
    "courseCode": "",
    "lastModifiedBy": "",
    "lastModifiedDate":"" ,
    "registeredBy": "",
    "registeredDate": "",
    "roles": "",
    "password": ""
  };

  genders=[
    {id :"m", type:"male"},
    {id:"f", type:"female"},
    {id:"o", type:"others"}
    
  ];

  courses =[
    {id :"101", type:"Java"},
    {id:"102", type:"Angular"},
    {id:"103", type:"Python"}
  ];

  ngOnInit(){
    this.id=this.route.snapshot.params['id'];

    this.service.getById(this.id)
      .subscribe(students =>{
      this.student=students;
      console.log(this.student);
    });
    
    
  }
  
  constructor( fb: FormBuilder, private service : StudentService, private router: Router, private route : ActivatedRoute) { 
    this.form=fb.group({
      personalInformation : fb.group({
        studentName:([this.student.studentName,Validators.required]),
        userName:(['',Validators.required]),
        gender:(['',Validators.required]),
        dob:(['',Validators.required]),
        fatherName:(['',Validators.required])
      }),
      contactInformation: fb.group({
        email:fb.control('',null,null),
        mobileNo:['',Validators.required],
        phoneNo:['',Validators.required]
      }),
      academicInformation: fb.group({
        courseCode:['',Validators.required],
        academicDetails:['',Validators.required],
      }),
      address: fb.group({
        streetName:['',Validators.required],
        municipality:['',Validators.required],
        zone:['',Validators.required],
        district:['',Validators.required]
      })
    });
  }

  updateStudent(){
    const formModel = this.form.value;
    const personalInformation = formModel.personalInformation;
    const contactInformation = formModel.contactInformation;
    const academicInformation = formModel.academicInformation;
    const address = formModel.address;

    let student =new StudentDataVo(
      personalInformation.studentName,
      personalInformation.userName,
      personalInformation.gender,
      personalInformation.dob,
      personalInformation.fatherName,
      contactInformation.email,
      address,
      contactInformation.mobileNo,
      contactInformation.phoneNo,
      academicInformation.academicDetails,
      academicInformation.courseCode
    );

    this.service.update(student,this.id)
      .subscribe(response=>{
          this.router.navigate(['/students']);
      },(error: AppError)=>{

        if(error instanceof BadInputError){
          alert('Bad Input');
        }else{
          console.log(error);
          alert('Unexpected Error Occured while Creating Student');
        }

      });
  }


  get email(){
    return this.form.get('contactInformation.email');

  }
}
