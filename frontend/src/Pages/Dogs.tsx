import React from 'react';

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
    fetch('https://random.dog/woof.json')
      .then((response) => response.json())
      .then((data) => {
        // atualizando o estado do componente com a imagem nova
        this.setState({ imageUrl: data.url });
      });
  };

  render() {
    // qual o formato da resposta? imagem ou mp4?
    if (this.state.imageUrl.match(/\.mp4$/) != null) {
      return (
        <div>
          <button onClick={this.refreshImage}>Refresh</button>
          <video src={this.state.imageUrl} />
        </div>
      );
    } else {
      return (
        <div>
          <button onClick={this.refreshImage}>Refresh</button>
          {this.state.imageUrl ? (
            <img src={this.state.imageUrl} alt="Random dog" />
          ) : null}
        </div>
      );
    }
  }
}

export default DogsPage;