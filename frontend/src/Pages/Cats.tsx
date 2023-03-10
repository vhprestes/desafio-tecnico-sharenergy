import React from 'react';
import '../App.css';
import { Button } from '@mui/material';

interface CatsState {
  selectedCode: number | null;
}

class CatsPage extends React.Component<{}, CatsState> {
  state: CatsState = {
    selectedCode: null,
  };

  handleCodeSelected = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const code = parseInt(event.target.value);
    if (!isNaN(code) && this.codes.includes(code)) {
      this.setState({ selectedCode: code });
    }
  };

  codes = [
    100, 101, 102, 103, 200, 201, 202, 203, 204, 206, 207, 300, 301, 302, 303,
    304, 305, 306, 307, 308, 400, 401, 402, 403, 404, 405, 406, 407, 408, 409,
    410, 411, 412, 413, 414, 415, 416, 417, 418, 420, 421, 422, 423, 424, 425,
    426, 427, 428, 429, 430, 431, 432, 433, 444, 450, 451, 455, 497, 498, 499,
    500, 501, 502, 503, 504, 506, 507, 508, 509, 510, 511, 521, 522, 523, 525,
    599, 600, 601, 602, 800, 801, 802,
  ];

  render() {
    return (
      <div className="cats">
        <select onChange={this.handleCodeSelected} className="selectCats">
          <option className="selectCats" value="">
            Select an HTTP status code
          </option>
          {this.codes.map((code) => (
            <option key={code} value={code}>
              {code}
            </option>
          ))}
        </select>
        {this.state.selectedCode && (
          <img
            className="mediacats"
            src={`https://http.cat/${this.state.selectedCode}.jpg`}
            alt={`HTTP ${this.state.selectedCode}`}
            onError={() => this.setState({ selectedCode: 404 })}
          />
        )}

        <footer className="footer">
          <a href="/landing">
            <Button>Clients Page</Button>
          </a>
          <a href="/random">
            <Button>Random User Page</Button>
          </a>
          <a href="/dogs">
            <Button>Dogs Page</Button>
          </a>
        </footer>
      </div>
    );
  }
}

export default CatsPage;
