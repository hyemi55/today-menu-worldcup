import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

function Header(props) {
    return (
        <button id='start' onClick={() => props.onClick()}>최애의 메뉴</button>
    )
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
                var tmp = props.count + 1;
                var pass = props.pass;
                if (tmp <= props.round/2) {
                    props.setCount(tmp); 
                    props.setPass(pass.concat([props.menu1]));
                } else {
                    props.setRound(props.round/2);
                    props.setCount(1);
                    props.setPass([]);
                    props.setCandidate(pass.concat(props.menu1).sort(()=>Math.random-0.5));
                }
            }}>{props.menu1}</button>
            <button onClick={()=>{
                var tmp = props.count + 1;
                var pass = props.pass;
                if (tmp <= props.round/2) {
                    props.setCount(tmp); 
                    props.setPass(pass.concat([props.menu2]));
                } else {
                    props.setRound(props.round/2);
                    props.setCount(1);
                    props.setPass([]);
                    props.setCandidate(pass.concat(props.menu2).sort(()=>Math.random-0.5));
                }
            }}>{props.menu2}</button>
        </>
    )
}

function App(props) {
    var [isStart, setStart] = useState(false);
    var [isLocalSelected, setLocalSelected] = useState(false);
    var [isRoundSelected, setRoundSelected] = useState(false);
    var [selectedLocal, setSelectedLocal] = useState('');
    var [round, setRound] = useState(16);
    var [count, setCount] = useState(1);
    var [pass, setPass] = useState([]);
    var [candidate, setCandidate] = useState([]);

    const menu = ['떡볶이', '해장국', '짜장면', '치킨', '우동', '햄버거', '돈까스', '국수', '초밥', '낙곱새', '삼겹살', '찜닭', '냉면', '김밥', '국밥', '샌드위치'];
    const localArray = ['안암', '포항'];

    if (!isStart) {
        return (
            <div className='container'>
                <Header onClick = {() => {setStart(true)}}/>
            </div>
        )
    } else if (!isLocalSelected) {
        return (
            <div className='container'>
                {localArray.map((i) => {
                    return <Local localName={i} onClick={() => {
                                setLocalSelected(true);
                                setSelectedLocal(i);
                            }}/>
                    })
                }
            </div>
        )
    } else if (!isRoundSelected) {
        let len = menu.length;
        let arr = [];
        for (let i = 4; i <= len; i=i*2) {
            arr.push([i]);
        }
        return (
            <div className='container'>
                {arr.map((i) => <button onClick={()=> {
                                    let tmp = menu.sort(() => Math.random() - 0.5);
                                    tmp = tmp.slice(0, i);
                                    setRoundSelected(true);
                                    setRound(i);
                                    setCandidate(tmp);
                                }}>{i}강</button>)}
            </div>
        )
    } else {
        if (round === 1) {
            return (
                <div className='container' id='winner'>
                    <div>승리 메뉴는</div>
                    <div>{candidate[0]}</div>
                </div>
            )
        }
        else {
            return (
                <div className='container' id='tournament'>
                    <div>{round}강</div>
                    <div>{count} / {round / 2}</div>
                    <div>
                        <Menu menu1={candidate[2 * (count-1)]} menu2={candidate[2 * (count-1) + 1]}
                            count={count} setCount={(i)=>{setCount(i)}}
                            pass={pass} setPass={(i)=>{setPass(i)}}
                            round={round} setRound={(i)=>{setRound(i)}}
                            candidate={candidate} setCandidate={(i)=>{setCandidate(i)}} />
                    </div>
                </div>
            )
        }
    } 
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);