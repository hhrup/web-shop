export function validateSignIn(email, password) {
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

export function validateSignUp(email, password, confirmPassword) {
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

export function validateProductCreation(file, product) {
  if (!file) {
    alert('Choose an image for upload.');
    return false;
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