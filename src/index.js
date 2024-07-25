import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

class Header extends React.Component {
    render() {
        return (
            <button id='start' onClick={() => this.props.onClick()}>최애의 메뉴</button>
        )
    }
}

function Local(props) {
    return (
        <button onClick={()=>props.onClick()}>{props.localName}</button>
    )
}

function Menu(props) {
    return (
        <>
            <button onClick={()=>{
                let tmp = props.pState.count + 1;
                let pass = props.pState.pass;
                (tmp <= props.pState.round/2) ? props.setParent({count: tmp, pass: pass.concat([props.menu1])}) 
                                            : props.setParent({round: props.pState.round/2, count: 1, pass: [], candidate: pass.concat(props.menu1).sort(() => Math.random() - 0.5)});
            }}>{props.menu1}</button>
            <button onClick={()=>{
                let tmp = props.pState.count + 1;
                let pass = props.pState.pass;
                (tmp <= props.pState.round/2) ? props.setParent({count: tmp, pass: pass.concat([props.menu2])}) 
                                            : props.setParent({round: props.pState.round/2, count: 1, pass: [], candidate: pass.concat(props.menu2).sort(() => Math.random() - 0.5)});
            }}>{props.menu2}</button>
        </>
    )
}

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isStart: false,
            isLocalSelected: false,
            isRoundSelected: false,
            selectedLocal: '',
            round: 16,
            count: 1,
            pass: [],
            candidate: [],
        };
    }

    menu = ['떡볶이', '해장국', '짜장면', '치킨', '우동', '햄버거', '돈까스', '국수', '초밥', '낙곱새', '삼겹살', '찜닭', '냉면', '김밥', '국밥', '샌드위치'];
    localArray = ['안암', '포항'];

    render() {
        if (!this.state.isStart) {
            return (
                <div className='container'>
                    <Header onClick = {() => {this.setState({isStart:true,})}}/>
                </div>
            )
        } else if (!this.state.isLocalSelected) {
            return (
                <div className='container'>
                    {this.localArray.map((i) => {
                        return <Local localName={i} onClick={() => this.setState({isLocalSelected: true, selectedLocal: i})}/>
                        })
                    }
                </div>
            )
        } else if (!this.state.isRoundSelected) {
            let len = this.menu.length;
            let arr = [];
            for (let i = 4; i <= len; i=i*2) {
                arr.push([i]);
            }
            return (
                <div className='container'>
                    {arr.map((i) => <button onClick={()=> {
                                        let tmp = this.menu.sort(() => Math.random() - 0.5);
                                        tmp = tmp.slice(0, i);
                                        this.setState({isRoundSelected: true, round: i, candidate: tmp});
                                    }}>{i}강</button>)}
                </div>
            )
        } else {
            if (this.state.round === 1) {
                return (
                    <div className='container' id='winner'>
                        <div>승리 메뉴는</div>
                        <div>{this.state.candidate[0]}</div>
                    </div>
                )
            }
            else {
                return (
                    <div className='container' id='tournament'>
                        <div>{this.state.round}강</div>
                        <div>{this.state.count} / {this.state.round / 2}</div>
                        <div>
                            <Menu menu1={this.state.candidate[2 * (this.state.count-1)]} menu2={this.state.candidate[2 * (this.state.count-1) + 1]}
                                pState={this.state} setParent={(i)=>{this.setState(i)}} />
                        </div>
                    </div>
                )
            }
        }
    }
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);