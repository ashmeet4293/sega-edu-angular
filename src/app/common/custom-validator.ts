import { AbstractControl, ValidationErrors } from "@angular/forms";
import { HttpClient } from "selenium-webdriver/http";
import { StudentService } from "../services/student.service";
import { AppError } from "./app-error";
import { BadInputError } from "./bad-input";
import { Injectable } from "@angular/core";

@Injectable()
export class CustomValidators{
  
    static emailShouldBeUnique(studentService : StudentService){
        return (control: AbstractControl) => {
            return new Promise((resolve, reject)=>{
                setTimeout(()=>{
                    studentService.getByEmail(control.value)
                        .subscribe(response=>{
                            // console.log(response);
                            if(response){
                                resolve({emailShouldBeUnique : true});
                            }else{
                                resolve(null);
                            }
                        },(error: AppError)=>{
                    if(error instanceof BadInputError){
                        alert('Bad Input');
                    }else{
                        console.log(error);
                        alert('Unexpected Error Occured ');
                    }
                    });
    
                },2000);
            });
        }
    }
}