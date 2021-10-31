import React, { Component } from 'react';
import { HomePageContainer } from './homepage.styles';
import configData from '../../helperScripts/appConfig';
import {
  addProductToCategory,
  addCategoryToProductCategory,
  getImage,
  uploadMetadata,
  downloadMetadata,
  uploadImageAndGetUrl,
} from '../../firebase/firebase.database';


class Homepage extends Component {
  constructor(props) {
    super(props);
    this.imgInput = React.createRef();
    this.textInput = React.createRef();
    this.state = {
      imgUrl: JSON.parse(window.localStorage.getItem('imgUrl')) || '',
    }
  }

  componentDidMount() {
    this.textInput.current.value = 'asdasd';
  }


  render() {
  return (
    <HomePageContainer>
      <h1>Hello!</h1>
      <h2>{this.props.currentUser.email}</h2>
      {this.props.currentUser.uid === configData.adminFirebaseUserId ? (
        <h3>ADMIN CONTROLS </h3>
      ) : (
        ''
      )}
      <input ref={this.imgInput} type='file' accept='image/jpeg, image/png'/>
      <input ref={this.textInput} type='text'/>

      <button onClick={() => addCategoryToProductCategory('cpu')} >ADD CATEGORY TO PRODUCT CATEGORY</button>

      <button onClick={() => addProductToCategory('mbo', {
        name: 'Intel i8',
        price: 200,
        imgUrl: '',
        description: 'A very good central processing unit',
      })} style={{display:'block'}}>ADD FIREBASE PRODUCT</button>


      <button onClick={() => uploadImageAndGetUrl(this.imgInput.current)} style={{display:'block'}}>UPLOAD IMAGE</button>

      <button onClick={uploadMetadata} style={{display:'block'}}>UPLOAD METADATA</button>
      <button onClick={downloadMetadata} style={{display:'block'}}>GET METADATA</button>
      <button onClick={getImage.bind(this)}>DOWNLOAD IMAGE AND SHOW IT</button>
      <img
        id='image'
        src={this.state.imgUrl}
        width='500'
        alt='test'
      />

    </HomePageContainer>)
  }
}

export default Homepage;
