import React from 'react';
import { Button } from '@mui/material';
import { fetchDogs } from '../API/fetchExternalAPI';

interface DogPageState {
  imageUrl: string;
}

class DogsPage extends React.Component<{}, DogPageState> {
  state: DogPageState = {
    imageUrl: '',
  };

  componentDidMount() {
    this.refreshImage();
  }

  refreshImage = () => {
    fetchDogs()
      .then((imageUrl) => {
        this.setState({ imageUrl });
      });
  };

  render() {
    // qual o formato da resposta? imagem ou mp4?
    if (this.state.imageUrl.match(/\.mp4$/) != null) {
      return (
        <div>
          <Button onClick={this.refreshImage}>Refresh</Button>
          <video className='xibiu' src={this.state.imageUrl} width={'400px'} />
        </div>
      );
    } else {
      return (
        <div>
          <Button startIcon color='primary' variant='contained' onClick={this.refreshImage}>Refresh</Button>
          {this.state.imageUrl ? (
            <img  className='xibiu' src={this.state.imageUrl} alt="Random dog" width={'400px'}/>
          ) : null}
        </div>
      );
    }
  }
}

export default DogsPage;