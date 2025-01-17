import React from "react";
import styled from "styled-components";

import HeaderBar from "./components/HeaderBar";
import Cat from "./components/Cat";

class App extends React.Component {
  constructor() {
    super();

    const Kats = window.web3.eth.contract(
      // ABI GOES HERE
    );

    this.state = {
      kats: Kats.at(
        // CONTRACT ADDRESS GOES HERE
      ),
      loading: true,
      cats: []
    };
  }

  componentDidMount = async () => {
    const { kats } = this.state;
    for (let i = 0; i < 30; i++)
      kats.getKat(i, (err, cat) =>
        kats.ownerOf(i, (err, owner) =>
          this.setState(state => ({
            cats: [
              ...state.cats,
              {
                color: `#${cat[0].toString(16).padStart(6, "0")}`,
                id: i,
                generation: cat[1].toString(),
                owner
              }
            ]
          }))
        )
      );
  };

  handlePurchase = id => {
    this.state.kats.purchase(id, (err, result) => {
      alert("success!");
    });
  };

  render() {
    const { cats } = this.state;
    return (
      <div>
        <HeaderBar>
          <h1>
            KatCoins{" "}
            <span role="img" aria-label="Smiling emoji">
              😺
            </span>
          </h1>
        </HeaderBar>
        <main>
          <CatWrapper>
            {cats.map(cat => (
              <Cat {...cat} onClick={this.handlePurchase} />
            ))}
          </CatWrapper>
        </main>
      </div>
    );
  }
}

const CatWrapper = styled.div`
  display: flex;
  margin: -8px;
  flex-wrap: wrap;
`;

export default App;
