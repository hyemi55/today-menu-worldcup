import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

class Header extends React.Component {
    render() {
        return (
            <div id='container'>
                <button id='start' onClick={() => this.props.onClick()}>최애의 메뉴</button>
            </div>
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
            isSelected: false,
            selectedLocal: '',
            round: 8,
            count: 1,
            menu: ['떡볶이', '짜장면', '치킨', '햄버거', '돈까스', '초밥', '낙곱새', '삼겹살'],
            pass: [],
            candidate: ['떡볶이', '짜장면', '치킨', '햄버거', '돈까스', '초밥', '낙곱새', '삼겹살'],
            localArray: ['안암', '포항'],
        };
    }

    render() {
        if (!this.state.isStart) {
            return (
                <Header onClick = {() => {this.setState({isStart:true,})}}/>
            )
        } else if (!this.state.isSelected) {
            return (
                <>
                    {this.state.localArray.map((i) => {
                        return <Local localName={i} onClick={() => this.setState({isSelected: true, selectedLocal: i})}/>
                        })
                    }
                </>
            )
        } else {
            if (this.state.round === 1) {
                return (
                    <>
                        <div>승리 메뉴는</div>
                        <div>{this.state.candidate[0]}</div>
                    </>
                )
            }
            return (
                <>
                    <div>{this.state.round}강</div>
                    <div>{this.state.count} / {this.state.round / 2}</div>
                    <Menu menu1={this.state.candidate[2 * (this.state.count-1)]} menu2={this.state.candidate[2 * (this.state.count-1) + 1]}
                        pState={this.state} setParent={(i)=>{this.setState(i)}} />
                </>
            )
        }
    }
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);