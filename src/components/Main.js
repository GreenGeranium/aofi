import Section from './Main/Section';
import Cover from './Main/Cover';
import { backUrl, images } from '../utils/db';

function Main(props) {
  return (
    <div className="main">
      <Cover sliderImages={images}></Cover>
      {props.data &&
        props.data.map((category) => {
          return (
            <Section
              title={category.attributes.main_title}
              text={category.attributes.text}
              image={`${backUrl}${category.attributes.main_image.data[0].attributes.url}`}
              link={category.attributes.link}
              key={category.id}
              style={category.attributes.style}
              databaseLink={category.attributes.database_link}
            ></Section>
          );
        })}
    </div>
  );
}

export default Main;
