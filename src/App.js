import React, { Component } from 'react';
import JSONP from 'fetch-jsonp';

class App extends Component {
  constructor(props){
    super(props);
    this.state ={lists: [{ncode: "(コード)",
      pt: "(ポイント)",
      rank: "(ランキング)"
    }],
      title:"(タイトル)"};
  }

  getRankingMonth(){
    let numVar = document.getElementById('input').value;
    let numAll = numVar.replace(/-/g,"");
    let numManth = numAll.slice(0,-2);
    let num = numManth+'01';
    console.log(num);
    JSONP(`https://api.syosetu.com/rank/rankget/?out=jsonp&rtype=${num}-m`)

      .then((response) => response.json())
      .then((json) => {
        this.setState({lists:json.slice(0, 10)})
      })
    .then((json)=>{this.setState({ncode:json[1].ncode})})
      .then((json)=>{this.setState({pt:json[1].pt})})
      .then((json)=>{this.setState({rank:json[1].rank})})

      .catch((e)=>{console.log(e)})

      .then(() =>{
        let novelCode = this.state.lists[0].ncode;
        JSONP(`https://api.syosetu.com/novelapi/api/?out=jsonp&of=t-w&ncode=${novelCode}`)
          .then((response) => response.json())
          .then((json)=>{this.setState({title:json[1].title})})
          .catch((e)=>{console.log(e)})
      })

  };


  render(){
    return (
        <div className="test" id="main">
        <div className="novelRankVew">
        <h1>オンライン小説ランク1</h1>
        <p>月間小説ランキング一位</p>
        <input type="date" id="input" onChange={()=>{this.getRankingMonth()}} />
        <p>{this.state.lists[0].rank}位</p>
        <p>{this.state.title}</p>
        <p>{this.state.lists[0].pt}ポイント</p>
        </div>

        <div className="newNovelVew">
        <h2>ジャンル別新着作品</h2>
        <p>タイトル</p>
        <p>作者</p>
        <p>内容</p>
        </div>

        </div>
        );
  }
}

export default App;
