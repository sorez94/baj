import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1,
    slidesToSlide: 1
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1,
    slidesToSlide: 3
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1
  }
};

export default function Example() {
  return (
    <Carousel
      swipeable={true}
      draggable={true}
      showDots={true}
      responsive={responsive}
      ssr={true}
      infinite={true}
      keyBoardControl={true}
    >
      <div style={{ height: '300px', backgroundColor: 'blueviolet' }}>Item 1</div>
      <div style={{ height: '300px', backgroundColor: 'yellow' }}>Item 2</div>
      <div style={{ height: '300px', backgroundColor: 'red' }}>Item 3</div>
    </Carousel>
  );
}
