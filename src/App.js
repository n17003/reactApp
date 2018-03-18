import React, { Component } from 'react';
import JSONP from 'fetch-jsonp';

class App extends Component {
  constructor(props){
    super(props);
    this.state ={lists: [{ncode: "(コード)",
      pt: "(ポイント)",
      rank: "(ランキング)"
    }],
      title:"(タイトル)",
      newTitle:"",
      newWriter:"",
      newPara:""
    };
  }

  getRankingMonth(){
    let num = ((document.getElementById('input').value).replace(/-/g,"").slice(0,-2))+'01';
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

/*  getForm(){
    let genre = document.getElementById("genreSelectId");
    JSONP(`https://api.syosetu.com/novelapi/api/?genre=${genre}`)
      .then((response) => response.json())
      .then((json) =>{this.setState({newTitle:json[1].newTitle}),
                      this.setState({newWriter:json[1].newWriter}),
                      this.setState({newPara:json[1].newPara})})
  };
*/


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
        <p>{this.state.lists[0].ncode}</p>
        </div>

        <div className="newNovelVew">
        <h2>ジャンル別新着作品</h2>
        <form name="genreForm">
        <select name="genreSelect" id="genreSelectId" /*onChange={()=>{getForm()}} */>
          <option value="101">異世界（恋愛）</option>
          <option value="102">現実世界（恋愛）</option>
          <option value="201">ハイファンタジー</option>
          <option value="202">ローファンタジー</option>
          <option value="301">純文学</option>
          <option value="302">ヒューマンドラマ</option>
          <option value="303">歴史</option>
          <option value="304">推理</option>
          <option value="305">ホラー</option>
          <option value="306">アクション</option>
          <option value="307">コメディー</option>
          <option value="401">VRゲーム</option>
          <option value="402">宇宙</option>
          <option value="403">空想科学</option>
          <option value="404">パニック</option>
          <option value="9901">童話</option>
          <option value="9902">詩</option>
          <option value="9903">エッセイ</option>
          <option value="9904">リプレイ</option>
          <option value="9999">その他</option>
          <option value="9801">ノンフィクション</option>
        </select>
        </form>
        <p>タイトル：花の雫{this.state.newTitle}</p>
        <p>作者：深澤雅海{this.state.newWriter}</p>
        <p>内容</p>
        <p>国王の第一王女であるルピナ。彼女には影武者と婚約者がいる。何物にも代えがたい友人と理解者。欲しいものを手に入れたい。手に入らないものを諦めたい。自分の願いを叶えるために三人は行動する。{this.state.newPara}</p>
        </div>

        </div>
        );
  }
}

export default App;
