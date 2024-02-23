export const markFormAsTouched = (formGroup: any) => {
  for(let i in formGroup.controls) {
      formGroup.controls[i].markAsTouched();
  }
}
