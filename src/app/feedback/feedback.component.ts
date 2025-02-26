import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators, FormBuilder, AbstractControl} from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule} from '@angular/material/input';
import { MatSliderModule } from '@angular/material/slider';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-feedback',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatCheckboxModule, MatFormFieldModule, MatInputModule, MatSliderModule, MatRadioModule, MatDatepickerModule, MatNativeDateModule, ReactiveFormsModule, FormsModule, MatSelectModule, MatIconModule],
  templateUrl: './feedback.component.html',
  styleUrl: './feedback.component.css'
})
export class FeedbackComponent {

  // private readonly _formBuilder = inject(FormBuilder);
  // readonly needed = this._formBuilder.group({
  //   yesall: false,
  //   yessome: false,
  //   no: false
  // })

  userName: string = '';
  email: string = '';
  birthDate!: Date;
  visit: string = '';
  language: string = '';
  needed: string = '';
  reason: string = '';
  rating: number = 3;
  submitted = false;
  minRating = 1;
  maxRating = 5;
  alphanumeric = "^[a-zA-Z][a-zA-Z0-9]*$"

  formdata: FormGroup = new FormGroup({
    userName: new FormControl('', [Validators.required, Validators.minLength(8), Validators.pattern(this.alphanumeric)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    birthDate: new FormControl(null, [Validators.required]),
    visit: new FormControl('', [Validators.required]),
    language: new FormControl('', [Validators.required]),
    yesall: new FormControl(false),
    yessome: new FormControl(false),
    no: new FormControl(false),
    reason: new FormControl('', [Validators.required]),
    rating: new FormControl(3, [Validators.required]),

    neededOptions: new FormGroup({
      yesall: new FormControl(false),
      yessome: new FormControl(false),
      no: new FormControl(false)
    })
  });

  onClickSubmit(data: {
    userName: string;
    email: string;
    birthDate: Date;
    visit: string;
    language: string;
    reason: string;
    rating: number;
  })

  {
    this.submitted = true;
    this.userName = data.userName;
    this.email = data.email;
    this.birthDate = data.birthDate;
    this.visit = data.visit;
    this.language = data.language;
    this.reason = data.reason;
    this.rating = data.rating;

    const neededValues = this.formdata.get('neededOptions')?.value;
    const selectedOptions = [];
    if (neededValues?.yesall) selectedOptions.push("✔ Yes, all of it");
    if (neededValues?.yessome) selectedOptions.push("✔ Yes, some of it");
    if (neededValues?.no) selectedOptions.push("✔ No, none of it");

    this.needed = selectedOptions.length > 0 ? selectedOptions.join(', ') : 'None selected';

    if (this.formdata.valid) {
      console.log("Form Submitted!", this.formdata.value);
    } else {
      console.log("Form is not valid!");
    }
  }
}
