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
          <h1 className="text-9xl h-full p-10 text-green-500">What God Say</h1>
          <input
            onChange={this.handleSearchChange.bind(this)}
            onKeyUp={this.handleEnterKeyPress.bind(this)}
            type="search"
            className="border border-gray-300 rounded w-2/4 px-5 py-3 outline-none hover:shadow-md"
            autoComplete="off"
          />

          <button
            onClick={this.searchForTerm.bind(this)}
            className="bg-blue-400 mt-2 hover:bg-blue-300 rounded text-white p-2 px-6"
          >
            <p className="font-semibold text-lg">Ask Gods Now</p>
          </button>
        </div>

        <div className="flex justify-around mt-5">
          <div className="h-full w-full border">
            <h3 className="text-center text-2xl text-blue-500 font-semibold">
              Bible {this.state.bibleResult?.totalCount}
            </h3>
            <ul className="list-disc leading-5 p-7">
              {bibleResult}
            </ul>
          </div>

          <div className="h-full w-full border">
            <h3 className="text-center text-2xl text-green-500 font-semibold">
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
