import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel as ReactCarousel } from "react-responsive-carousel";
import { Fragment } from "react";

export default function Carousel(props: { items: Array<React.ReactNode> }) {
  return (
    <ReactCarousel
      showArrows
      showIndicators={false}
      showStatus={false}
      showThumbs={false}
      autoPlay
      interval={2000}
      infiniteLoop
    >
      {props.items.map((item, idx) => (
        <Fragment key={idx}>{item}</Fragment>
      ))}
    </ReactCarousel>
  );
}
