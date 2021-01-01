import React from "react";
import axios from "axios";

interface DataType {
  rows: Array<any>;
  totalCount: number;
}
interface MyState {
  searchTerm: string;
  quranResult: DataType | null;
  bibleResult: DataType | null;
};

class App extends React.Component<{}, MyState> {
  constructor(props: any) {
    super(props);
    this.state = {
      searchTerm: "",
      quranResult: null,
      bibleResult: null,
    };
  }

  handleSearchChange(e: any) {
    this.setState({ searchTerm: e.target.value });
  }

  handleEnterKeyPress (e: any) {
    if(e.key === 'Enter'){
      this.searchForTerm()
    }
  }

  async searchForTerm() {
    if (this.state.searchTerm === "") {
      return;
    }
    const parsedBibleData = await this.searchBibleAndParse();
    const parsedQuranData = await this.searchQuranAndParse();

    this.setState({ bibleResult: parsedBibleData });
    this.setState({ quranResult: parsedQuranData });
    console.log(parsedBibleData);
    console.log(parsedQuranData);
  }

  async searchBibleAndParse() {
    const bibleResultAxios = await axios.get(
      `https://api.scripture.api.bible/v1/bibles/6bab4d6c61b31b80-01/search?query=${this.state.searchTerm}&limit=100&sort=relevance`,
      { headers: { "api-key": "a4571052d462e077d71ad25ef7186484" } }
    );
    const bibleResult = bibleResultAxios.data.data;
    const rows = bibleResult.verses;
    rows.length = 100;
    return {
      totalCount: bibleResult.total,
      rows: rows,
    };
  }

  async searchQuranAndParse() {
    const quranResultAxios = await axios.get(
      `http://api.alquran.cloud/v1/search/${this.state.searchTerm}/all/en?limit=10`
    );
    const quranResult = quranResultAxios.data.data;
    const rows = quranResult.matches;
    rows.length = 100;
    return {
      totalCount: quranResult.count,
      rows: rows,
    };
  }

  askXinecraft() {
    alert("Just STFU! and visit my github.")
    // window.location.href = 'http://github.com/xinecraft'
  }

  render() {
    let bibleResult = null
    if (this.state.bibleResult && this.state.bibleResult.rows) {
      bibleResult = this.state.bibleResult.rows.map((result: any) => (
        <li className="mb-3" key={result.id}>{result.text.toString()}</li>
      ));
    }

    let quranResult = null
    if (this.state.quranResult && this.state.quranResult.rows) {
      quranResult = this.state.quranResult.rows.map((result: any, index: any) => (
        <li className="mb-3" key={index}>{result.text.toString()}</li>
      ));
    }

    return (
      <div>
        <div className="flex flex-col items-center">
          <h1 className="text-8xl h-full p-10 font-bhs">
            <span className="text-blue-500">W</span>
            <span className="text-red-500">h</span>
            <span className="text-yellow-500">a</span>
            <span className="text-blue-500">t</span>
            <span className="text-green-500">G</span>
            <span className="text-red-500">o</span>
            <span className="text-blue-500">d</span>
            <span className="text-red-500">S</span>
            <span className="text-yellow-500">a</span>
            <span className="text-blue-500">y</span>
            </h1>
          <input
            onChange={this.handleSearchChange.bind(this)}
            onKeyUp={this.handleEnterKeyPress.bind(this)}
            type="search"
            className="border border-gray-300 rounded w-2/4 px-5 py-3 outline-none hover:shadow-md"
            autoComplete="off"
          />

          <div className="flex">
          <button
            onClick={this.searchForTerm.bind(this)}
            className="bg-blue-400 mt-2 hover:bg-blue-300 rounded text-white p-2 px-6 mr-2 focus:outline-none active:bg-blue-500"
          >
            <p className="font-semibold text-lg">Ask Gods</p>
          </button>
          <button
            onClick={this.askXinecraft.bind(this)}
            className="bg-gray-200 mt-2 hover:bg-gray-100 rounded text-gray-700 p-2 px-6 focus:outline-none active:bg-gray-300"
          >
            <p className="font-semibold text-lg">Ask Xinecraft</p>
          </button>
          </div>

        </div>

        <div className="flex justify-around mt-5">
          <div className="h-full w-full border">
            <h3 className="text-center text-2xl text-blue-500 font-bhs mt-3">
              Bible {this.state.bibleResult?.totalCount}
            </h3>
            <ul className="list-disc leading-5 p-7">
              {bibleResult}
            </ul>
          </div>

          <div className="h-full w-full border">
            <h3 className="text-center text-2xl text-green-500 font-bhs mt-3">
              Quran {this.state.quranResult?.totalCount}
            </h3>
            <ul className="list-disc leading-5 p-7">
              {quranResult}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
