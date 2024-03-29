import React, { useEffect, useRef, useState } from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import gsap from 'gsap';
import { CSSPlugin } from 'gsap';
import 'bootstrap/dist/css/bootstrap.min.css';
import links from './link';
import './styles/click.css';
import './styles/button.css';
import './styles/card.css';

gsap.registerPlugin(CSSPlugin);

function openUrlInIncognito(url) {
    const width = 400;
    const height = 450;
    const left = (window.innerWidth - width);
    const top = (window.innerHeight - height);
    const options = `toolbar=0,location=0,menubar=0,width=${width},height=${height},left=${left},top=${top}`;
    window.open(url, "_blank", options);
}

export default function Click() {
    const currentLinkIndexRef = useRef(-1);
    const [linkOpenCount, setLinkOpenCount] = useState(0);
    const [coins, setCoins] = useState([]);

    useEffect(() => {
        const openNextLink = () => {
            let randomIndex;
            do {
                randomIndex = Math.floor(Math.random() * links.length);
            } while (currentLinkIndexRef.current === randomIndex);
            const currentTime = new Date().toLocaleTimeString();
            setLinkOpenCount(prevCount => prevCount + 1);
        
            const x = Math.random() * (window.innerWidth - 40); // 동전이 떨어지는 x 좌표를 랜덤으로 설정
            setCoins(prevCoins => [{
                id: linkOpenCount,
                time: new Date().toLocaleTimeString(),
                x: x >= 0 ? x : 0  
            }, ...prevCoins]);
            
            console.log(`[${currentTime}] Opening ${links[randomIndex].link}. Link opened ${linkOpenCount} times.`);
            openUrlInIncognito(links[randomIndex].link); 
            currentLinkIndexRef.current = randomIndex;
        };
      
        const interval = setInterval(openNextLink, 200000); // 200초마다 링크 열기
        return () => clearInterval(interval);
    }, [linkOpenCount]); 

    useEffect(() => {
    }, [coins]); // coins 상태값이 변경될 때마다 useEffect가 다시 실행되도록 함

    const handleOpenPopup = () => {
        const randomIndex = Math.floor(Math.random() * links.length);
        const linkObject = links[randomIndex]; 
        const link = linkObject.link;  
        openUrlInIncognito(link);
        setCoins(prevCoins => [{
            id: linkOpenCount,
            time: new Date().toLocaleTimeString(),
            x: Math.random() * (window.innerWidth - 40)
        }, ...prevCoins]);
        setLinkOpenCount(prevCount => prevCount + 1);
    };   

    useEffect(() => {
        document.querySelectorAll('.button').forEach(button => {
            button.addEventListener('mousemove', e => {
                // 마우스 이동에 따른 애니메이션 효과 적용
            });

            button.addEventListener('mouseleave', e => {
                // 마우스가 버튼을 떠날 때의 애니메이션 효과 적용
            });

            button.addEventListener('click', e => {
                // 버튼 클릭 시의 애니메이션 효과 적용
            });
        });
    }, []);

    return (
        <div className="centered-container">
            <div className="firstContainer">
                <h1>Let's turn dust into Money! 🤑</h1>
                <p>Open this page in a new Incognito window. </p>
                <div className="CoinContainer">
                    <TransitionGroup>
                        {coins.map(coin => (
                            <CSSTransition
                                key={coin.id}
                                classNames="coin-fall"
                                timeout={60000}
                            >
                                <div className="Coin" style={{ left: coin.x }} key={coin.id}></div>
                            </CSSTransition>
                        ))}
                    </TransitionGroup>
                </div>
                <button className="fun-btn" onClick={handleOpenPopup} data-text="Add Tikkle">Add Tikkle</button>
            </div>
            <br />
            <br />

            <div className="card-deck">
                {links.map((item, index) => (
                    <div className="card" key={index} >
                        <a href={item.link} target="_blank" rel="noopener noreferrer">
                            <img src={item.imgSrc} className="card-img-top" alt={`Link Image ${index}`} />
                        </a>
                    </div>
                ))}
            </div>

        </div>
    );
}