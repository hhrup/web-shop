import React, { useState, useEffect } from 'react';
import { CreateProductContainer } from './create-product.styles';
import FormInput from '../form-input/form-input.component';
import { getCategoriesOrProducts, uploadProduct } from '../../firebase/firebase.database';
import CustomButton from '../custom-button/custom-button.component';
import ImgPreview from '../img-preview/img-preview.component';
import FormTitle from '../form-title/form-title.component';
import { validateProductCreation } from '../../helperScripts/validationFunctions';
import Loader from '../loader/loader.component';
import { withRouter } from 'react-router';

function CreateProduct(props:any) {
  const isProductUpdate = props.location.state;

  const [stateObject, setStateObject] = useState({
    productId: '',
    name: '',
    description: '',
    price: 0,
    category: '',
    categories: [] as string[],
    imgPreviewUrl: '',
    imgName: '',
    file: undefined,
    isUploading: false,
    existingImgUrl: '',
  });

  async function handleSubmit(e:any) {
    e.preventDefault();

    const product = {
      name: stateObject.name.trim(),
      category: stateObject.category.trim(),
      description: stateObject.description.trim(),
      price: stateObject.price,
    };
    const file = stateObject.file;

    if (!validateProductCreation(file, product, stateObject.existingImgUrl)) return;
    setStateObject({ ...stateObject, isUploading: true })

    await uploadProduct(file, product, isProductUpdate, stateObject.productId, stateObject.existingImgUrl); 

    setStateObject({
      productId: '',
      name: '',
      description: '',
      price: 0,
      category: '',
      categories: [],
      imgPreviewUrl: '',
      imgName: '',
      file: undefined,
      isUploading: false,
      existingImgUrl: '',
    });
  }

  function previewImage(file:any) {
    if (file) {
      const fr = new FileReader();

      fr.addEventListener('load', (e) => {
        if(e?.target?.result) {
        setStateObject({ 
          ...stateObject,
          imgPreviewUrl: e.target.result.toString(),
          file: file })
        }
      });
      fr.readAsDataURL(file); // starts reading the file, load event(see event listener above) fired when read completes successfully
    }
  }

  async function handleImgPreview(e:any) {
    e.preventDefault();
    try {
      const [fileHandle] = await window.showOpenFilePicker();

      if (fileHandle && fileHandle.kind === 'file') {
        const file = await fileHandle.getFile();
        setStateObject({ ...stateObject, imgName: file.name });
        previewImage(file);
      }
    } catch (error) {
      console.error(console.error(error));
    }
  }

  function handleChange(e:any) {
    let { name, value } = e.target;

    if (name === 'price') value = Number.parseFloat(value);

    setStateObject({ ...stateObject, [name]: value });
  }

  useEffect(() => {
    if (isProductUpdate) {
      const {id, category, imgUrl, productName, descriptionList, price} = props.location.state;
      setStateObject({
        ...stateObject,
        productId: id,
        name: productName,
        description: descriptionList,
        price: price,
        category: category,
        imgPreviewUrl: imgUrl,
        existingImgUrl: imgUrl,
      });
    } else {
      (async function() {
        const categories: any[] = await getCategoriesOrProducts('productCategories');
        setStateObject({ ...stateObject, categories: categories });
      })()
    }
  }, [])

  return (
    <CreateProductContainer>
      <FormTitle title='Create and upload the product' />
      <form onSubmit={handleSubmit}>
        <ImgPreview
          buttonContent='Choose an image'
          spanContent={stateObject.imgName}
          onClick={handleImgPreview}
          imgUrl={stateObject.imgPreviewUrl}
        />

        <FormInput
          name='name'
          value={stateObject.name}
          type='text'
          labelName='Product name'
          handleChange={handleChange}
        />

        <FormInput
          options={stateObject.categories}
          name='category'
          value={stateObject.category}
          type='text'
          labelName='Select existing category or type in a new one'
          handleChange={handleChange}
        />

        <FormInput
          name='price'
          value={stateObject.price}
          type='text'
          labelName='Product price'
          handleChange={handleChange}
        />

        <FormInput
          isTextArea={true}
          name='description'
          labelName='Product description, separate features with semicolon;'
          value={stateObject.description}
          handleChange={handleChange}
        />
        <CustomButton buttonContent={isProductUpdate ? 'UPDATE PRODUCT' : 'CREATE PRODUCT'} type='submit' />
      </form>
      {stateObject.isUploading && <Loader />}
    </CreateProductContainer>
  );
}

export default withRouter(CreateProduct);
