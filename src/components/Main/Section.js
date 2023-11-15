import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import api from '../../utils/api';
function Section(props) {
  const [offers, setOffers] = useState();

  // определение количества предложений
  useEffect(() => {
    api
      .getCardsAmount(props.databaseLink)
      .then((data) => {
        setOffers(data.data.length);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [props.databaseLink]);

  return (
    <section className="section">
      <Link to={props.link} style={{ color: 'inherit', textDecoration: 'inherit' }}>
        <article>
          <h3 style={{ color: props.style }}>{props.title && props.title}</h3>
          <p style={{ color: props.style }}>{props.text && props.text}</p>
          <img src={props.image && props.image} alt={props.title} />
        </article>
      </Link>
    </section>
  );
}

export default Section;
