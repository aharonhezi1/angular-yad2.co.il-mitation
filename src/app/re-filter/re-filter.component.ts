import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { ReApiService } from '../re-api.service';

@Component({
  selector: 'app-re-filter',
  templateUrl: './re-filter.component.html',
  styleUrls: ['./re-filter.component.scss']
})
export class ReFilterComponent implements OnInit {
  propertyTypeOptions = ['apartment', 'penthouse', 'private house'];
  propertyTypesChecked = [];
  isPropertyTypeClicked = false;
  isRoomsClicked = false;
  isRoomSelectMinClicked = false;
  isRoomSelectMaxClicked = false;
  chosenRooms = {
    max: null, min: null
  };
  // chosenRooms.max;
  // chosenRooms.min;
  roomsArray = [];
  maxRoomArray = [];
  minRoomArray = [];

  form: FormGroup;
  constructor(private formBuilder: FormBuilder, private reApiService: ReApiService) { }
  onClickRoomSelectMin() {
    this.isRoomSelectMinClicked = !this.isRoomSelectMinClicked;
    this.isRoomSelectMaxClicked = false;
  }
  onClickRoomSelectMax() {
    this.isRoomSelectMaxClicked = !this.isRoomSelectMaxClicked;
    this.isRoomSelectMinClicked = false;
  }
  onClickPropertyType() {
    this.isPropertyTypeClicked = !this.isPropertyTypeClicked;
    this.isRoomsClicked = false;
  }
  onClickedRooms() {
    this.isRoomsClicked = !this.isRoomsClicked;
    this.isPropertyTypeClicked = false;
    this.isRoomSelectMinClicked = false;
    this.isRoomSelectMaxClicked = false;
  }
  onChooseRoomsNum(maxOrMin, num) {
    if (maxOrMin === 'max') {
      this.chosenRooms.max = num;
      this.isRoomSelectMaxClicked = false;

    }
    if (maxOrMin === 'min') {
      this.chosenRooms.min = num;
      this.isRoomSelectMinClicked = false;
    }
    const { max, min } = this.chosenRooms;
    let addition = '';
    if (max) {
      if (!min) {
        addition = ' max ';
      }
    } else if (min) {
      addition = ' min ';
    }

    this.form.controls.rooms.setValue(
      ((addition) + (min ? min : '') + (max && min ? ' - ' : '') + (max ? max : ''))
    );

    this.populateRoomsArray(num, maxOrMin);
  }
  onCheckbox(e, option) {
    if (e.target.checked) {
      this.propertyTypesChecked.push(option);
    } else {
      this.propertyTypesChecked = this.propertyTypesChecked.filter(op => op !== option);
    }
    if (this.propertyTypesChecked.length > 1) {
      this.form.controls.propertyType.setValue(this.propertyTypesChecked.length + ' properties');
    } else {
      this.form.controls.propertyType.setValue(this.propertyTypesChecked[0]);
    }
  }

  onSubmit() {
    let formValue = this.form.value;
    formValue = {
      ...formValue, propertyType: this.propertyTypesChecked,
      maxRooms: this.chosenRooms.max,
      minRooms: this.chosenRooms.min
    };
    console.log();
    this.reApiService.getFilterRE(formValue);
  }
  populateRoomsArray(num?, maxOrMin?) {
    if (maxOrMin === 'max') {
      for (let i = 2; i <= num; i++) {
        this.minRoomArray.push(i / 2);
      }
    } else if (maxOrMin === 'min') {
      for (let i = num; i <= 24; i++) {
        this.maxRoomArray.push(i / 2);
      }
    } else {
      for (let i = 2; i <= 24; i++) {
        this.maxRoomArray.push(i / 2);
        this.minRoomArray.push(i / 2);
        this.roomsArray.push(i / 2);
      }
    }
  }
  ngOnInit() {
    this.form = this.formBuilder.group({
      address: '',
      propertyType: '',
      rooms: '',
      minPrice: '',
      maxPrice: ''
    });
    this.populateRoomsArray();

  }

}
