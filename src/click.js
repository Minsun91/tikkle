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
            console.log("야")
            const currentTime = new Date().toLocaleTimeString();
            setLinkOpenCount(prevCount => prevCount + 1);
            setCoins(prevCoins => [...prevCoins, {
                id: linkOpenCount,
                time: currentTime
            }]);
            console.log(`[${currentTime}] Opening ${links[randomIndex]}. Link opened ${linkOpenCount} times.`);
            openUrlInIncognito(links[randomIndex]);
            currentLinkIndexRef.current = randomIndex;
        };

        const interval = setInterval(openNextLink, 200000); // 200초마다 링크 열기
        return () => clearInterval(interval);
    }, [linkOpenCount]); // linkOpenCount가 변경될 때마다 useEffect가 다시 실행되도록 함

    useEffect(() => {
    }, [coins]); // coins 상태값이 변경될 때마다 useEffect가 다시 실행되도록 함

    const handleOpenPopup = () => {
        const randomIndex = Math.floor(Math.random() * links.length);
        const link = links[randomIndex];
        openUrlInIncognito(link); 
        setCoins(prevCoins => [{
            id: linkOpenCount,
            time: new Date().toLocaleTimeString(),
            x: Math.random() * (window.innerWidth - 40) 
        }, ...prevCoins]); // 동전 쌓기, 안쌓임
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
            <div className="card-deck">
                {links.map((link, index) => (
                    <div className="card" key={index}>
                        <img src="https://d1unuvan7ts7ur.cloudfront.net/1500x0/filters:strip_exif()/38aabcf3-9db8-4eb9-adbb-cdbdf49f4560/01HPFF9S6TM05TKAK0S4K11X05" className="card-img-top" />
                        {/* <img src={link} className="card-img-top" alt={`Link Image ${index}`} /> */}
                        <div className="card-body">
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}