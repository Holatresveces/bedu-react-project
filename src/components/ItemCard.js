import { Link } from "react-router-dom";

const ItemCard = ({ item }) => {
  const { image, title, description, year, slug } = item;
  return (
    <article className="project">
      <div className="project__img">
        <img className="image project__img" src={image} />
      </div>
      <div className="project__info">
        <div className="project__info-inner">
          <div className="project__title lg">{title}</div>
          <div className="project__description sm">
            <span className="project__year">{year}</span>
            {description}
          </div>
          <div className="link sm">
            <Link to={slug ? `projects/${slug}` : "/"}>View project</Link>
          </div>
        </div>
      </div>
    </article>
  );
};

export default ItemCard;
