import Lottie from 'react-lottie-player';

const LottieAnimation = ({ animationData, ...props }: any) => (
  <Lottie animationData={animationData} {...props} />
);

export default LottieAnimation;
