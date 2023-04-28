import gsap from 'gsap';
import { useRef } from 'react';
import styled from 'styled-components';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import DoorCanvas from './DoorCanvas';

gsap.registerPlugin(ScrollTrigger);

const TitleWrapper = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
`;

const Name = styled.div`
  opacity: 0;
  position: absolute;
  left: 5%;
  top: 60%;

  .name {
    font-size: 5rem;
  }

  hr {
    width: 100%;
    height: 1px;
    background-color: white;
  }

  .sub {
    font-size: 5rem;
  }

  .canvas {
    width: 100%;
    height: 100vh;
  }
`;

function Title() {
  const textRef = useRef<HTMLDivElement>(null);

  // useEffect(() => {
  //   gsap.to(textRef.current, { opacity: 1, duration: 1 });
  // }, []);

  return (
    <TitleWrapper>
      {/* <Name ref={textRef}>
        <div className='name text'>안재성</div>
        <hr />
        <div className='sub text'>Frontend Developer</div>
      </Name> */}
      <DoorCanvas />
    </TitleWrapper>
  );
}

export default Title;
