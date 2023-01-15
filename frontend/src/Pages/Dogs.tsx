import React from 'react';
import { Box, Button, CssBaseline, Grid } from '@mui/material';
import { fetchDogs } from '../API/fetchExternalAPI';
import '../App.css'

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
    fetchDogs().then((imageUrl) => {
      this.setState({ imageUrl });
    });
  };

  render() {
    // qual o formato da resposta? imagem ou mp4?
    if (this.state.imageUrl.match(/\.mp4$/) != null) {
      return (
        <Grid
          container
          component="main"
          justifyContent="center"
          alignItems="center"
        >
          <CssBaseline />
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Button fullWidth onClick={this.refreshImage}>
              Refresh
            </Button>
            <div className='media'>

            <video
              className="xibiu"
              src={this.state.imageUrl}
              width={'400px'}
            />
            </div>
          </Box>
          <footer className='footer'>
          <a href='/landing'><Button>Clients Page</Button></a>
          <a href='/random'><Button>Random User Page</Button></a>
          <a href='/cats'><Button>Cats Page</Button></a>
        </footer>
        </Grid>
      );
    } else {
      return (
        <div>
          <Grid
            container
            component="main"
            justifyContent="center"
            alignItems="center"
          >
            <CssBaseline />
            <Box
              sx={{
                my: 8,
                mx: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Button
                fullWidth
                color="primary"
                variant="contained"
                onClick={this.refreshImage}
              >
                Refresh
              </Button>
              {this.state.imageUrl ? (
                <div className='media'>
                <img
                  src={this.state.imageUrl}
                  alt="Random dog"
                  width={'400px'}
                />
                </div>
              ) : null}
            </Box>
          </Grid>
          <footer className='footer'>
          <a href='/landing'><Button>Clients Page</Button></a>
          <a href='/random'><Button>Random User Page</Button></a>
          <a href='/cats'><Button>Cats Page</Button></a>
        </footer>
        </div>
      );
    }
  }
}

export default DogsPage;
