import React, { Component } from 'react';
import { CreateProductContainer } from './create-product.styles';
import FormInput from '../form-input/form-input.component';
import { getCategoriesOrProducts, uploadProduct } from '../../firebase/firebase.database';
import CustomButton from '../custom-button/custom-button.component';
import ImgPreview from '../img-preview/img-preview.component';
import FormTitle from '../form-title/form-title.component';
import { validateProductCreation } from '../../helperScripts/validationFunctions';
import Loader from '../loader/loader.component';
import { withRouter } from 'react-router';

class CreateProduct extends Component {
  constructor(props) {
    super(props);

    this.state = {
      productId: '',
      name: '',
      description: '',
      price: 0,
      category: '',
      categories: '',
      imgPreviewUrl: '',
      imgName: '',
      file: undefined,
      isUploading: false,
    };

    this.isProductUpdate = this.props.location.state ? true : false;

    this.handleSubmit = this.handleSubmit.bind(this); // We could use arrow functions instead of binding it like this
    this.handleChange = this.handleChange.bind(this);
    this.handleImgPreview = this.handleImgPreview.bind(this);
  }

  async handleSubmit(e) {
    e.preventDefault();

    const product = {
      name: this.state.name.trim(),
      category: this.state.category.trim(),
      description: this.state.description.trim(),
      price: this.state.price,
    };
    const file = this.state.file;

    if (!validateProductCreation(file, product)) return;
    this.setState({ isUploading: true });

    await uploadProduct(file, product);

    this.setState({
      file: undefined,
      imgPreviewUrl: '',
      imgName: '',
      name: '',
      category: '',
      description: '',
      price: 0,
      isUploading: false,
    });
  }

  previewImage(file) {
    if (file) {
      const fr = new FileReader();

      fr.addEventListener('load', (e) => {
        this.setState({ imgPreviewUrl: e.target.result, file: file });
      });
      fr.readAsDataURL(file); // starts reading the file, load event fired when read completes successfully
    }
  }

  async handleImgPreview(e) {
    e.preventDefault();
    try {
      const [fileHandle] = await window.showOpenFilePicker();

      if (fileHandle && fileHandle.kind === 'file') {
        const file = await fileHandle.getFile();
        this.setState({ imgName: file.name });
        this.previewImage(file);
      }
    } catch (error) {
      console.error(console.error(error));
    }
  }

  handleChange(e) {
    let { name, value } = e.target;

    if (name === 'price') value = Number.parseFloat(value);

    this.setState({ [name]: value });
  }

  async componentDidMount() {
    if (this.isProductUpdate) {
      const {id, category, imgUrl, productName, descriptionList, price} = this.props.location.state;
      this.setState({
        productId: id,
        name: productName,
        description: descriptionList,
        price: price,
        category: category,
        imgPreviewUrl: imgUrl,
      });
    } else {
      const categories = await getCategoriesOrProducts('productCategories');
      this.setState({ categories: categories });
    }
  }

  render() {
    return (
      <CreateProductContainer>
        <FormTitle title='Create and upload the product' />
        <form onSubmit={this.handleSubmit}>
          <ImgPreview
            buttonContent='Choose an image'
            spanContent={this.state.imgName}
            onClick={this.handleImgPreview}
            imgUrl={this.state.imgPreviewUrl}
          />

          <FormInput
            name='name'
            value={this.state.name}
            type='text'
            labelName='Product name'
            handleChange={this.handleChange}
          />

          <FormInput
            isDataList={true}
            options={this.state.categories}
            name='category'
            value={this.state.category}
            type='text'
            labelName='Select existing category or type in a new one'
            handleChange={this.handleChange}
          />

          <FormInput
            name='price'
            value={this.state.price}
            type='text'
            labelName='Product price'
            handleChange={this.handleChange}
          />

          <FormInput
            name='description'
            isTextArea={true}
            type='text'
            labelName='Product description, separate features with semicolon;'
            value={this.state.description}
            handleChange={this.handleChange}
          />
          <CustomButton buttonContent={this.isProductUpdate ? 'UPDATE PRODUCT' : 'CREATE PRODUCT'} type='submit' />
        </form>
        {this.state.isUploading && <Loader />}
      </CreateProductContainer>
    );
  }
}

export default withRouter(CreateProduct);
