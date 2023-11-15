import Slider from "./Slider";

function Cover({ sliderImages }) {
  return (
    <section className="cover">
      <Slider images={sliderImages} />
    </section>
  );
}

export default Cover;
