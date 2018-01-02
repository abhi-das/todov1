import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewTaskComponent } from './add-new-task.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { TaskService } from '../../services/task.service';
import { TaskModel } from '../../models/task-model';
import { RouterTestingModule } from '@angular/router/testing';
import { Http, Response, HttpModule } from '@angular/http';


describe('AddNewTaskComponent', () => {
  let component: AddNewTaskComponent;
  let fixture: ComponentFixture<AddNewTaskComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule
      ], 
      declarations: [
        AddNewTaskComponent
      ],
      providers: [ LoginService, TaskService ]
    })

    fixture = TestBed.createComponent(AddNewTaskComponent);
    component = fixture.componentInstance;
    component.ngOnInit();

  });

  it('should create AddNewTaskComponent', () => {
    expect(component).toBeTruthy();
  });

  it('AddNewTaskForm Component invalid when empty', () => {
      expect(component.addNewTaskForm.valid).toBeFalsy();
  });

  it('userid should not be empty', () => {
    let titleEle = component.addNewTaskForm.controls['title'];
    expect(titleEle.valid).toBeFalsy();
  })

  it('password should not be empty', () => {
    let descriptionEle = component.addNewTaskForm.controls['description'];
    expect(descriptionEle.valid).toBeFalsy();
  })

  it('Submit a form data and match the user filled values ', () => {
    expect(component.addNewTaskForm.valid).toBeFalsy();
    component.addNewTaskForm.controls['title'].setValue('New Task Title');
    component.addNewTaskForm.controls['description'].setValue('Task Description');

    let formData = component.addNewTaskForm.value;
    component.onAddTask();

    expect(formData['title']).toBe('New Task Title');
    expect(formData['description']).toBe('Task Description');

  })

  // Add one more case for redirect after form submit

});
