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
                let tmp = props.count + 2;
                let pass = props.pass;
                props.setParent({count: tmp, pass: pass.concat([props.menu1])})
            }}>{props.menu1}</button>
            <button onClick={()=>{
                let tmp = props.count + 2;
                let pass = props.pass;
                props.setParent({count: tmp, pass: pass.concat([props.menu2])})
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
            count: 0,
            pass: [],
        };
    }

    localArray = ['안암', '포항'];
    menu = ['떡볶이', '짜장면', '국밥', '치킨', '햄버거', '닭갈비', '돈까스', '초밥', '낙곱새', '삼겹살'];

    render() {
        if (!this.state.isStart) {
            return (
                <Header onClick = {() => {this.setState({isStart:true,})}}/>
            )
        } else if (!this.state.isSelected) {
            return (
                <>
                    {this.localArray.map((i) => {
                        return <Local localName={i} onClick={() => this.setState({isSelected: true, selectedLocal: i})}/>
                        })
                    }
                </>
            )
        } else {
            return (
                <>
                    <Menu menu1={this.menu[this.state.count]} menu2={this.menu[this.state.count+1]} 
                        count={this.state.count} pass={this.state.pass} setParent={(i)=>{this.setState(i)}} />
                </>
            )
        }
    }
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);