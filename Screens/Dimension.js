import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

const guidelineBaseWidth = 375;
const guidelineBaseHeight = 812;
const leftHorizontalScale = (size) => ((width / guidelineBaseWidth) * size) * -1;
const rightHorizontalScale = (size) => (width / guidelineBaseWidth) * size;
const leftVerticalScale = (size) => ((width / guidelineBaseWidth) * size) * -1;
const rightVerticalScale = (size) => (width / guidelineBaseWidth) * size;

const horizontalScale = (size) => (width / guidelineBaseWidth) * size;
const verticalScale = (size) => (height / guidelineBaseHeight) * size;

const moderateScale = (size, factor = 0.5) =>
  size + (horizontalScale(size) - size) * factor;

  
export { horizontalScale, verticalScale,leftVerticalScale,rightVerticalScale, moderateScale,leftHorizontalScale,rightHorizontalScale };