import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormPage1Page } from './form-page1.page';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

describe('FormPage1Page', () => {
  let component: FormPage1Page;
  let fixture: ComponentFixture<FormPage1Page>;
  let formBuilder: FormBuilder;

  beforeEach(async() => {
    TestBed.configureTestingModule({
      declarations: [FormPage1Page],
      imports: [
        ReactiveFormsModule, IonicModule.forRoot()
      ],
      providers: [FormBuilder]
    }).compileComponents();

    fixture = TestBed.createComponent(FormPage1Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
    formBuilder = TestBed.inject(FormBuilder)
  });

  it('should create a form on init', () => {
    component.ngOnInit();
    expect(component.artHiveQuestionare).not.toBeUndefined();
  });

  it('should create the form with membersName FormArray', () => {
    expect(component.artHiveQuestionare).toBeDefined();
    expect(component.membersName).toBeDefined();
    expect(component.membersName.controls.length).toBe(0); // Since it is initially empty
  });

  it('should add a new member to the membersName FormArray', () => {
    component.addMember();
    expect(component.membersName.length).toBe(1); // Check if a member has been added
    expect(component.membersName.at(0)).toBeDefined(); // Check if the new FormControl is defined
  });

  it('should remove a member from the FormArray', () =>{
    component.addMember(); // Add a member to ensure there is something to remove
    component.removeMember(0); // Remove the member
    expect(component.membersName.length).toBe(0); // Ensure the FormArray is empty
  });

  it('should get values from the FormControls', () =>{
    component.addMember();
    const memberControl = component.membersName.at(0);
    memberControl.setValue('John Doe');
    expect(memberControl.value).toBe('John Doe');
  });

  it('should have required validators for adding a new member', () => {
    component.addMember();
    expect(component.membersName.hasError('required'));
  });

  it('should initialize start and end date controls', () => {
    const StartDate = component.artHiveQuestionare.get('startDate');
    const EndDate = component.artHiveQuestionare.get('endDate');
    
    expect(StartDate?.hasError('required'));
    expect(EndDate?.hasError('required'));

    expect(StartDate).toBeDefined();
    expect(EndDate).toBeDefined();
    
    expect(StartDate?.value).toBe('');
    expect(EndDate?.value).toBe('');

  });

  it('should set the Start and End dates to be empty and invalid', () =>{
    component.artHiveQuestionare.patchValue({
      startDate: '',
      endDate: ''
    });
    expect(component.artHiveQuestionare.invalid).toBeTrue();
  });

  it('should fill the start and end dates and be valid', () =>{
    component.artHiveQuestionare.patchValue({
      startDate: "2001-11-24",
      endDate: "2024-01-02"
    });
    expect(component.artHiveQuestionare.get('startDate')?.valid).toBeTrue();
    expect(component.artHiveQuestionare.get('endDate')?.valid).toBeTrue();
  });

  it('should initialize address controls',() =>{
    const locationControl = component.artHiveQuestionare.get('locationName');
    const streetControl = component.artHiveQuestionare.get('street');
    const cityControl = component.artHiveQuestionare.get('city');
    const stateControl = component.artHiveQuestionare.get('state');
    const zipControl = component.artHiveQuestionare.get('zip');

    expect(locationControl?.hasError('required')).toBeTrue();
    expect(streetControl?.hasError('required')).toBeTrue();
    expect(cityControl?.hasError('required')).toBeTrue();
    expect(stateControl?.hasError('required')).toBeTrue();
    expect(zipControl?.hasError('required')).toBeTrue();

    expect(locationControl?.value).toBe('');
    expect(streetControl?.value).toBe('');
    expect(cityControl?.value).toBe('');
    expect(stateControl?.value).toBe('');
    expect(zipControl?.value).toBe('');
  });

  it('should set the address controls to be empty and invalid', () =>{
    component.artHiveQuestionare.patchValue({
      locationName: '',
      street: '',
      city: '',
      state: '',
      zip: ''
    });
    expect(component.artHiveQuestionare.invalid).toBeTrue();
  });

  it('should fill the address controls and set them to valid', () =>{
    component.artHiveQuestionare.patchValue({
      locationName: 'SIUE Engineering Building',
      street: 'University Dr.',
      city: 'Edwardsville',
      state: 'IL',
      zip: '62208'
    });

    expect(component.artHiveQuestionare.get('locationName')?.valid).toBeTrue();
    expect(component.artHiveQuestionare.get('street')?.valid).toBeTrue();
    expect(component.artHiveQuestionare.get('city')?.valid).toBeTrue();
    expect(component.artHiveQuestionare.get('state')?.valid).toBeTrue();
    expect(component.artHiveQuestionare.get('zip')?.valid).toBeTrue();
  });

  it('should fill the zip formControl with an invalid input', () => {
    component.artHiveQuestionare.patchValue({zip: 'text'});
    expect(component.artHiveQuestionare.get('zip')?.invalid).toBeTrue();

    component.artHiveQuestionare.patchValue({zip: ''});
    component.artHiveQuestionare.patchValue({zip: '623'});
    expect(component.artHiveQuestionare.get('zip')?.invalid).toBeTrue();

    component.artHiveQuestionare.patchValue({zip: ''});
    component.artHiveQuestionare.patchValue({zip: '633252'});
    expect(component.artHiveQuestionare.get('zip')?.invalid).toBeTrue();

    component.artHiveQuestionare.patchValue({zip: ''});
    component.artHiveQuestionare.patchValue({zip: '62th3'});
    expect(component.artHiveQuestionare.get('zip')?.invalid).toBeTrue();
  });

  it('should initialize contactList controls and test validators', () => {
    component.addContact();
  
    const contactGroup = component.contactList.at(0) as FormGroup;
  
    expect(contactGroup.contains('contactName')).toBeTrue();
    expect(contactGroup.contains('contactEmail')).toBeTrue();
    expect(contactGroup.contains('contactPhone')).toBeTrue();
  
    const contactNameControl = contactGroup.get('contactName');
    const contactEmailControl = contactGroup.get('contactEmail');
    const contactPhoneControl = contactGroup.get('contactPhone');
  
    expect(contactNameControl?.hasError('required')).toBeTrue();
    expect(contactEmailControl?.hasError('required')).toBeTrue();
    expect(contactPhoneControl?.hasError('required')).toBeTrue();
  
    expect(contactNameControl?.value).toBe('');
    expect(contactEmailControl?.value).toBe('');
    expect(contactPhoneControl?.value).toBe('');
  });

  it('should create the contactList FormArray', () =>{
    expect(component.contactList).toBeDefined();
    expect(component.contactList.controls.length).toBe(0); // Since it is initially empty
  });

  it('should add a new contact to the contactList FormArray', () => {
    component.addContact();
    expect(component.contactList.length).toBe(1); // Check if a member has been added
    expect(component.contactList.at(0)).toBeDefined(); // Check if the new FormControl is defined
  });

  it('should remove a member from the contactList FormArray', () =>{
    component.removeContact(0); // Remove the member
    expect(component.contactList.length).toBe(0); // Ensure the FormArray is empty
  });

  it('should set the contactList controls to be empty and invalid', () => {
    component.addContact();
    const contactForm = component.contactList.at(0);

    contactForm.patchValue({
      contactName: '',
      contactEmail: '',
      contactPhone: ''
    });

    expect(contactForm.get('contactName')?.invalid).toBeTrue();
    expect(contactForm.get('contactEmail')?.invalid).toBeTrue();
    expect(contactForm.get('contactPhone')?.invalid).toBeTrue();
  });

  it('should fill the contactList controls and be valid', () =>{
    component.addContact();
    const contactForm = component.contactList.at(0);

    contactForm.patchValue({
      contactName: 'John Doe',
      contactEmail: 'test@email.com',
      contactPhone: '800-111-1111'
    });

    expect(contactForm.get('contactName')?.valid).toBeTrue;
    expect(contactForm.get('contactEmail')?.valid).toBeTrue();
    expect(contactForm.get('contactPhone')?.valid).toBeTrue();

    contactForm.patchValue({
      contactName: 'John Doe',
      contactEmail: 'test@email.com',
      contactPhone: '8001111111'
    });

    expect(contactForm.get('contactName')?.valid).toBeTrue();
    expect(contactForm.get('contactEmail')?.valid).toBeTrue();
    expect(contactForm.get('contactPhone')?.valid).toBeTrue();
  });

  it('should fill the contactNumber and contactPhone and be invalid', () =>{
    component.addContact();

    const contactForm = component.contactList.at(0);
    contactForm.patchValue({
      contactEmail: 'test',
      contactPhone: '(800)1111111'
    });

    expect(contactForm.get('contactEmail')?.invalid).toBeTrue();
    expect(contactForm.get('contactPhone')?.invalid).toBeTrue();
  });

  it('should create a parnerList Form Array', () =>{
    expect(component.partnerList).toBeDefined();
    expect(component.partnerList.controls.length).toBe(0);
  });

  it('should add a new partner to the partnerList FormArray', () => {
    component.addPartner();
    expect(component.partnerList.length).toBe(1); // Check if a member has been added
    expect(component.partnerList.at(0)).toBeDefined(); // Check if the new FormControl is defined
  });

  it('should add and remove a partner from the partnerList Form Array', () =>{
    component.addPartner();
    component.removePartner(0);
    expect(component.partnerList.length).toBe(0);
  });

  it('should add empty values to the partnerList and register as invalid', () =>{
    component.addPartner();
    const partnerControl = component.partnerList.at(0);  // Get the first control in the FormArray
    partnerControl.setValue('');  // Set it to an empty string
    expect(partnerControl.invalid).toBeTrue();
  });

  it('should add values to the partnerList and register as valid', () => {
    component.addPartner();
    const partnerControl = component.partnerList.at(0);
    partnerControl.setValue('John Doe');
    expect(partnerControl.valid).toBeTrue();
    expect(partnerControl.value).toBe('John Doe');
  });

  it('should test partnerList validators', () =>{
    component.addPartner();
    expect(component.partnerList.hasError('required'));
  });

  it('should create a facilitatorList Form Array', () => {
    expect(component.facilitatorList).toBeDefined();
    expect(component.facilitatorList.controls.length).toBe(0); // Since it is initially empty
  });

  it('should create the facilitatorList controls and test validators', () =>{
    component.addFacilitator();
    expect(component.facilitatorList.hasError('required'));
  });

  it('should add a facilitator to the Form Array', () => {
    component.addFacilitator();
    const facilitatorControl = component.facilitatorList.at(0);
    expect(component.facilitatorList.length).toBe(1);
    expect(component.facilitatorList).toBeTruthy();
    expect(facilitatorControl).toBeTruthy();
  });

  it('should add and then remove a control from the facilitator Form Array', () =>{
    component.addFacilitator();
    expect(component.facilitatorList.length).toBe(1);
    component.removeFacilitator(0);
    expect(component.facilitatorList.length).toBe(0);
  });

  it('should add an empty value to the facilitatorList Form Array and register as invalid', () =>{
    component.addFacilitator();
    const facilitatorControl = component.facilitatorList.at(0);
    facilitatorControl.setValue('');
    expect(facilitatorControl.invalid).toBeTrue();
    expect(facilitatorControl).toBeTruthy();
  });

  it('should add a value to the facilitator Form Array and register as valid', () =>{
    component.addFacilitator();
    const facilitatorControl = component.facilitatorList.at(0);
    facilitatorControl.setValue('John Doe');
    expect(facilitatorControl.valid).toBeTrue();
    expect(facilitatorControl).toBeTruthy();
    expect(facilitatorControl.value).toBe('John Doe');
  });

  
});
