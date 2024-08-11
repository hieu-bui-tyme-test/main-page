import React from 'react';
import Slider, { SliderProps} from 'rc-slider';
import 'rc-slider/assets/index.css';

const MySlider: React.FC<SliderProps> = ({ ...props }) => {
  console.log({props});
  return (
    <div className="mt-6">
      <Slider {...props} />
    </div>
  );
};

export default MySlider;
