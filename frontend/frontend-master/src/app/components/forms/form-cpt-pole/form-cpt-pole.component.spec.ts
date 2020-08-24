import { async, ComponentFixture, TestBed, fakeAsync, tick } from "@angular/core/testing";

import { FormCptPoleComponent } from "./form-cpt-pole.component";
import { Pole } from "src/app/models/classes/pole";
import { PoleApiService } from "src/app/services/api/pole-api.service";
import { FormBuilder, ReactiveFormsModule, FormGroup, Validators } from "@angular/forms";
import { Promotion } from "src/app/models/classes/promotion";
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

describe("FormCptPoleComponent", () => {
  let component: FormCptPoleComponent;
  let fixture: ComponentFixture<FormCptPoleComponent>;
  let poleApiService: PoleApiService;
  const formBuilder: FormBuilder = new FormBuilder();
  const mockPolesData = [
    new Pole({
      id: 4,
      name: "informatique",
      color: "#ffb81c",
      promotions: new Array<Promotion>()
    }),
    new Pole({
      id: 3,
      name: "RH",
      color: "#aa751c",
      promotions: new Array<Promotion>()
    }),
    new Pole({
      id: 2,
      name: "cdp",
      color: "#11111c",
      promotions: new Array<Promotion>()
    })
  ];
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FormCptPoleComponent],
      imports: [ReactiveFormsModule, HttpClientTestingModule],
      providers: [
        { provide: FormBuilder, useValue: formBuilder },
        PoleApiService
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormCptPoleComponent);
    component = fixture.componentInstance;
    component.parentForm = setupFormGroup();
    poleApiService = TestBed.get(PoleApiService);
    fixture.detectChanges();
  });

  function setupFormGroup(): FormGroup {
    return formBuilder.group({
      pole: ['', Validators.required]
    });
  }

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it('getPolesList() should return the right polesList', fakeAsync(() => {
    let result: Pole[] = [];
    spyOn(poleApiService, 'getPoles').and.returnValue(of(mockPolesData));
    component.ngOnInit();

    component.polesList$.subscribe((r: Pole[]) => {
      result = r;
    });
    tick();
    fixture.detectChanges();

    expect(result).toBe(mockPolesData);
    expect(poleApiService.getPoles).toHaveBeenCalledTimes(1)
  }));

  describe('Field pole', () => {
    it('should be invalid when value is not set', () => {
      const pole = component.parentForm.controls.pole;
      const errors = pole.errors || {};
      expect(errors.required).toBeTruthy();
    });

    it('should be valid when value = mockRoomData', () => {
      const pole = component.parentForm.controls.pole;
      pole.setValue(mockPolesData[1]);
      const errors = pole.errors || {};
      expect(errors.required).toBeFalsy();
    });
  });
});
