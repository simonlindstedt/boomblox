import box1 from '../../assets/img/block.svg';
import box2 from '../../assets/img/block2.svg';
import box3 from '../../assets/img/block4.svg';
import box4 from '../../assets/img/block3.svg';
import { StyledBoxContainer, StyledBox } from './styles';

const BoxContainer = () => {
  return (
    <StyledBoxContainer>
      <StyledBox
        src={box1}
        animate={{
          scale: [1, 1.5, 1.5, 1, 1],
          rotate: [0, 0, 270, 270, 0],
          borderRadius: ['0%', '20%', '50%', '50%', '0%'],
          top: '75%',
          opacity: 0,
        }}
        transition={{
          delay: 0.3,
          duration: 2,
        }}
      />
      <StyledBox
        src={box2}
        animate={{
          scale: [1, 1.7, 1.3, 1, 1],
          rotate: [0, 0, 270, 270, 0],
          top: ['0%', '75%', '40%', '20%'],
          opacity: 0,
        }}
        transition={{
          delay: 0.3,
          duration: 3,
        }}
      />
      <StyledBox
        src={box3}
        animate={{
          rotate: [0, 45, 180, 0, 360, 0],
          top: ['75%', '0%', '70%', '50%', '40%'],
          opacity: 0,
        }}
        transition={{
          delay: 0.3,
          duration: 3.5,
        }}
      />
      <StyledBox
        src={box4}
        animate={{
          rotate: [0, 45, 180, 0, 360, 0],
          top: ['0%', '80%', '0%'],
          right: ['50%', '0%'],
          opacity: 0,
        }}
        transition={{
          delay: 0.3,
          duration: 2.5,
        }}
      />
    </StyledBoxContainer>
  );
};

export default BoxContainer;
