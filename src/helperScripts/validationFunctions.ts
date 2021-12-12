export function validateSignIn(email: string, password: string) : boolean {
  if(!email) {
    alert(`Email field cannot be empty!`);
    return false;
  }

  if(!password) {
    alert(`Password field cannot be empty!`);
    return false;
  }

  return true;
}

export function validateSignUp(email: string, password: string, confirmPassword: string) : boolean {
  if(!validateSignIn(email, password))
    return false;

  if (!confirmPassword) {
    alert(`Confirm your password!`);
    return false;
  }

  if (password !== confirmPassword) {
    alert(`Passwords do not match!`);
    return false;
  }

  return true;
}

export function validateProductCreation(file: any, product: any, imgUrl: string) : boolean {
  if (!file) {
    if(!imgUrl) {
      alert('Choose an image for upload.');
      return false;
    }
  }
  if (!product.name) {
    alert('Product name field is empty');
    return false;
  }
  if (!product.category) {
    alert('Product category field is empty');
    return false;
  }
  if (!product.price || isNaN(product.price)) {
    alert('Product price field is empty');
    return false;
  }
  if (!product.description) {
    alert('Product description field is empty');
    return false;
  }

  return true;
}
