import "./Cardssystem.css";
import { Card } from "./Card";

function Servicescards() {
  return (
   <>
    <div className="services-cards">
      <div className="card-list">
        <Card
          imgSrc="https://picsum.photos/id/250/300/200"
          imgAlt="Card Image 1"
          title="SEARCH MEDICINE"
          description="In this platform you can easily search medicine
          Suppose a prescription come to your store and among them some of medicine are not available on your store
          It shows you the medicine availability different stores"
          buttonText="Learn More"
          link="card2"
        />
        <Card
          imgSrc="https://picsum.photos/id/250/300/200"
          imgAlt="Card Image 2"
          title="ORDER MEDICINE"
          description="We also provide a ordering functionality to the medical stores people
          For that they must have registered on this website
          They can simple add the medicine to the cart and can place their order"
          buttonText="Learn More"
          link="card2"
        />
        <Card
          imgSrc="https://picsum.photos/id/250/300/200"
          imgAlt="Card Image 3"
          title="Card Title"
          description="This is the card description section. You can add more details about the product here"
          buttonText="Learn More"
          link="card2"
        />
      </div>
    </div></>
  );
}

export default Servicescards;