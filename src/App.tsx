import React from "react";
import axios from "axios";
import Highlighter from "react-highlight-words";
import swal from '@sweetalert/with-react'

interface DataType {
  rows: Array<any>;
  totalCount: number;
}
interface MyState {
  searchTerm: string;
  quranResult: DataType | null;
  bibleResult: DataType | null;
  isLoading: boolean;
}

class App extends React.Component<{}, MyState> {
  constructor(props: any) {
    super(props);
    this.state = {
      searchTerm: "",
      quranResult: null,
      bibleResult: null,
      isLoading: false,
    };
  }

  handleSearchChange(e: any) {
    this.setState({ searchTerm: e.target.value });
  }

  handleEnterKeyPress(e: any) {
    if (e.key === "Enter") {
      this.searchForTerm();
    }
  }

  async searchForTerm() {
    if (this.state.searchTerm === "" || this.state.isLoading) {
      return;
    }
    this.setState({ isLoading: true });
    const parsedBibleData = await this.searchBibleAndParse();
    const parsedQuranData = await this.searchQuranAndParse();

    this.setState({ bibleResult: parsedBibleData });
    this.setState({ quranResult: parsedQuranData });
    this.setState({ isLoading: false });
  }

  async searchBibleAndParse() {
    const bibleResultAxios = await axios.get(
      `https://api.scripture.api.bible/v1/bibles/6bab4d6c61b31b80-01/search?query=${this.state.searchTerm}&limit=100&sort=relevance`,
      { headers: { "api-key": "a4571052d462e077d71ad25ef7186484" } }
    );
    const bibleResult = bibleResultAxios.data.data;
    let rows = []
    if (bibleResult) {
      rows = bibleResult.verses;
    }
    rows.length = 25;
    return {
      totalCount: bibleResult ? bibleResult.total : 0,
      rows: rows,
    };
  }

  async searchQuranAndParse() {
    const quranResultAxios = await axios.get(
      `https://api.alquran.cloud/v1/search/${this.state.searchTerm}/all/en?limit=10`
    );
    const quranResult = quranResultAxios.data.data;
    let rows = []
    if (quranResult && quranResult.matches) {
      rows = quranResult.matches;
    }
    rows.length = 25;
    return {
      totalCount: quranResult? quranResult.count : 0,
      rows: rows,
    };
  }

  askXinecraft() {
    swal({
     buttons: {
       ok: 'STFU',
       cancel: "Close",
     },
     content: (
      <div>
      <h2 className="font-bold text-xl text-light-blue-500">This World is a lie! Please visit my profile.</h2>
      <p className="text-gray-600 italic mt-2 mb-2">
        No No No! This is not a Request
      </p>
      <img src="https://i.ytimg.com/vi/LaiN63o_BxA/maxresdefault.jpg" alt=""/>
    </div>
    )
    })

    setTimeout(() => {
      window.location.href = 'https://github.com/xinecraft'
    }, 10000)
  }

  render() {
    let bibleResult = null;
    const splitSearchTerm = [this.state.searchTerm, ...this.state.searchTerm.split(' ')]
    if (this.state.bibleResult && this.state.bibleResult.rows) {
      bibleResult = this.state.bibleResult.rows.map((result: any) => (
        <li key={result.id}>
          <Highlighter
              highlightClassName="bg-blue-200"
              searchWords={splitSearchTerm}
              autoEscape={true}
              textToHighlight={result.text.toString()}
            />
        </li>
      ));
    }

    let quranResult = null;
    if (this.state.quranResult && this.state.quranResult.rows) {
      quranResult = this.state.quranResult.rows.map(
        (result: any, index: any) => (
          <li key={index}>
            <Highlighter
              highlightClassName="bg-green-200"
              searchWords={splitSearchTerm}
              autoEscape={true}
              textToHighlight={result.text.toString()}
            />
          </li>
        )
      );
    }

    let loadingBar = null;
    if (this.state.isLoading) {
      loadingBar = (
        <div>
          <div className="p-4 w-full mx-auto">
            <div className="animate-pulse flex space-x-4">
              <div className="flex-1 space-y-4 py-1">
                <div className="h-4 bg-blue-gray-300 rounded w-3/4"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-blue-gray-300 rounded"></div>
                  <div className="h-4 bg-blue-gray-300 rounded w-5/6"></div>
                </div>
              </div>
            </div>
          </div>
          <div className="p-4 w-full mx-auto">
            <div className="animate-pulse flex space-x-4">
              <div className="flex-1 space-y-4 py-1">
                <div className="h-4 bg-blue-gray-300 rounded w-3/4"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-blue-gray-300 rounded"></div>
                  <div className="h-4 bg-blue-gray-300 rounded w-5/6"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div>
        <div
          className="overflow-hidden text-center leading-normal"
          role="alert"
        >
          <p className="px-4 py-3 font-bold text-purple-100 bg-purple-800">
            Under Development! Looking for: Geeta & Guru Granth Sahib API
          </p>
          <p className="px-4 py-3 text-purple-700 bg-purple-100 ">
            Looking for adding more scriptures. If you know any Scripture API that 
            provide data based on keyword search, please let me know via{" "}
            <a className="underline" href="https://github.com/xinecraft/whatgodsay">Github</a> or <a className="underline" href="mailto:xinecraft1337@gmail.com">Email</a>.
          </p>
        </div>

        <div className="flex flex-col items-center">
          <h1 className="text-4xl md:text-8xl h-full p-10 font-bhs">
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
              disabled={this.state.isLoading}
              onClick={this.searchForTerm.bind(this)}
              className="inline-flex items-center bg-blue-400 mt-2 hover:bg-blue-300 rounded text-white p-2 px-6 mr-2 focus:outline-none active:bg-blue-500 disabled:opacity-50"
            >
              {this.state.isLoading && (
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="https://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              )}

              <span className="font-semibold text-lg">Ask Gods</span>
            </button>
            <button
              disabled={this.state.isLoading}
              onClick={this.askXinecraft.bind(this)}
              className="inline-flex items-center bg-gray-200 mt-2 hover:bg-gray-100 rounded text-gray-700 p-2 px-6 focus:outline-none active:bg-gray-300 disabled:opacity-50"
            >
              <span className="font-semibold text-lg">Ask Xinecraft</span>
            </button>
          </div>
        </div>

        <div className="flex justify-around mt-5">
          <div className="h-full w-1/2 border">
            <h3 className="text-center text-2xl text-blue-500 font-bhs mt-3">
              Bible {this.state.bibleResult?.totalCount}
            </h3>

            {loadingBar}
            {!this.state.isLoading && <ol className="list-disc leading-5 p-7 space-y-4">{bibleResult}</ol>}
          </div>

          <div className="h-full w-1/2 border">
            <h3 className="text-center text-2xl text-green-500 font-bhs mt-3">
              Quran {this.state.quranResult?.totalCount}
            </h3>

            {loadingBar}
            {!this.state.isLoading && <ol className="list-disc leading-5 p-7 space-y-4">{quranResult}</ol>}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
