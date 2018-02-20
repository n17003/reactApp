import React, { Component } from 'react';
import JSONP from 'fetch-jsonp';

class App extends Component {
  constructor(props){
    super(props);
    this.state ={lists: [{ncode: "(コード)",
                  pt: "(ポイント)",
                  rank: "(ランキング)"
                  }],
                rankNum:0,
                title:"(タイトル)"};
  }

  getRankingMonth(){
    let num = document.getElementById('input').value;
//    console.log(num);
    JSONP(`https://api.syosetu.com/rank/rankget/?out=jsonp&rtype=${num}-m`)
      .then((response) => response.json())
      .then((json) => {
        this.setState({lists:json.slice(0, 10)})
      })
      .catch((e)=>{console.log(e)})

      .then(() =>{
        let novelCode = this.state.lists[0].ncode;
        console.log(novelCode)
        JSONP(`https://api.syosetu.com/novelapi/api/?out=jsonp&of=t-w&ncode=${novelCode}`)
         .then((response) => response.json())
         .then((json)=>{this.setState({title:json[1].title})
         })


         .catch((e)=>{console.log(e)})
          })

  };


  render(){
    return (
        <div className="test" id="main">
        <h1>小説ランキング</h1>
        <p>{this.state.lists[this.state.rankNum].rank}位</p>
        <p>{this.state.title}</p>
        <p>{this.state.lists[this.state.rankNum].pt}</p>
        <p>月間小説ランキング一位(知りたい月を入力（例：20180101）)</p>
        <input type="Number" id="input" onChange={()=>{}}/>
        <input type="button" value="検索!" onClick={()=>{this.getRankingMonth()}} />
        </div>
        );
  }
}

export default App;
