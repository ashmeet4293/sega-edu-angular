import { FormControl, FormGroup, Validators } from '@angular/forms';
import { StudentDataVo } from '../models/student.models';
import { StudentService } from '../services/student.service';
import { AppError } from '../common/app-error';
import { BadInputError } from '../common/bad-input';
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CustomValidators } from '../common/custom-validator';

@Component({
  selector: 'student-signup',
  templateUrl: './student-signup.component.html',
  styleUrls: ['./student-signup.component.css']
})
export class StudentSignupComponent  {
  form : FormGroup;
  roleId : any;

  genders=[
    {id :"m", type:"male"},
    {id:"f", type:"female"},
    {id:"o", type:"others"}
    
  ];

  
  constructor( fb: FormBuilder, private service : StudentService, private router: Router, private route: ActivatedRoute) { 
    this.form=fb.group({
      personalInformation : fb.group({
        studentName:(['',Validators.required]),
        userName:(['',Validators.required]),
        gender:(['',Validators.required]),
        dob:(['',Validators.required]),
        fatherName:(['',Validators.required])
      }),
      contactInformation: fb.group({
        email:fb.control('',[Validators.required],[CustomValidators.emailShouldBeUnique(service)]),
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

  createAccount(){
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

    this.roleId=this.route.snapshot.params['id'];

    this.service.create(student, this.roleId)
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

  reset(){
    this.form.reset;
  }

  get studentName(){
    return this.form.get('personalInformation.studentName') as FormControl;
  }

  get userName(){
    return this.form.get('personalInformation.userName');
    
  }
  get gender(){
    return this.form.get('personalInformation.gender');
    
  }
  get dob(){
    return this.form.get('personalInformation.dob');
    
  }
  get fatherName(){
    return this.form.get('personalInformation.fatherName');
  }
 
  get email(){
    return this.form.get('contactInformation.email');

  }
  get mobileNo(){
    return this.form.get('contactInformation.mobileNo');

  }
  get phoneNo(){
    return this.form.get('contactInformation.phoneNo');

  }
  get courseCode(){
    return this.form.get('academicInformation.courseCode');

  }
  get academicDetails(){
    return this.form.get('academicInformation.academicDetails');

  }
  get streetName(){
    return this.form.get('address.streetName');
  }
  get zone(){
    return this.form.get('address.zone');

  }
  get municipality(){
    return this.form.get('address.municipality');

  }
  get district(){
    return this.form.get('address.district');

    // var a=
   

  }
  

}
