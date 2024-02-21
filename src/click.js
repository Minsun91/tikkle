// // Click.js
// import React, { useEffect, useRef, useState } from 'react';
// import links from './link';  

// function openUrlInIncognito(url) {
//     window.open(url, "_blank", "toolbar=0,location=0,menubar=0");
// }

// export default function Click() {
//     const currentLinkIndexRef = useRef(-1);
//     const [linkOpenCount, setLinkOpenCount] = useState(0);

//     useEffect(() => {
//         const openNextLink = () => {
//             const randomIndex = Math.floor(Math.random() * links.length); // 랜덤 인덱스 선택
//             if (currentLinkIndexRef.current === randomIndex) {
//                 openNextLink(); // 현재 링크와 같은 경우 다음 링크를 선택
//             } else {
//                 const currentTime = new Date().toLocaleTimeString(); // 현재 시간 가져오기
//                 setLinkOpenCount(prevCount => prevCount + 1); // 링크를 열은 횟수 증가
//                 console.log(`[${currentTime}] Opening ${links[randomIndex]}. Link opened ${linkOpenCount} times.`); // 콘솔에 시간과 열릴 링크, 그리고 누적된 링크를 열은 횟수 출력
//                 openUrlInIncognito(links[randomIndex]); // 새 인코그니토 창에서 새 링크 열기
//                 currentLinkIndexRef.current = randomIndex; // 현재 링크 인덱스 업데이트
//             }
//         };

//         const interval = setInterval(openNextLink, 100000);

//         return () => clearInterval(interval);
//     }, [linkOpenCount]); // linkOpenCount가 변경될 때마다 useEffect가 다시 실행되도록 함

//     const handleVisitButtonClick = () => {
//         const randomIndex = Math.floor(Math.random() * links.length);
//         openUrlInIncognito(links[randomIndex]);
//         currentLinkIndexRef.current = randomIndex;
//     };

//     return (
//         <div>
//             <h1>티끌을 모아보자!</h1>
//             <p>이 페이지를 새 인코그니토 창에서 열어주세요.  </p>
//             <button onClick={handleVisitButtonClick}>Click</button>
//         </div>
//     );
// }

import React, { useEffect, useRef, useState } from 'react';
import links from './link';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import './styles/click.css';

function openUrlInIncognito(url) {
    window.open(url, "_blank", "toolbar=0,location=0,menubar=0");
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
        console.log("Coins updated:", coins); // coins 상태값이 업데이트될 때마다 콘솔에 메시지 출력
    }, [coins]); // coins 상태값이 변경될 때마다 useEffect가 다시 실행되도록 함

    const handleOpenPopup = () => {
        const randomIndex = Math.floor(Math.random() * links.length);
        const link = links[randomIndex];
        openUrlInIncognito(link); // 팝업 열기
        setCoins(prevCoins => [{
            id: linkOpenCount,
            time: new Date().toLocaleTimeString()
        }, ...prevCoins]); // 동전 쌓기
        setLinkOpenCount(prevCount => prevCount + 1);
    };

    return (
        <div>
            <h1>티끌을 모아보자!</h1>
            <p>이 페이지를 새 인코그니토 창에서 열어주세요.  </p>
            <div className="CoinContainer">
                <TransitionGroup> {/* coins를 TransitionGroup으로 감싸서 애니메이션 효과 추가 */}
                    {coins.map(coin => (
                        <CSSTransition
                            key={coin.id}
                            classNames="fade"
                            timeout={300}
                        >
                            <div className="Coin" key={coin.id}></div>
                        </CSSTransition>
                    ))}
                </TransitionGroup>
            </div>

            <button onClick={handleOpenPopup}>Add Tikkle</button>
        </div>
    );
}

