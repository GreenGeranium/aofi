import TelegramIcon from "../images/telegramicon.svg";
import VkIcon from "../images/vkicon.svg";
import YoutubeIcon from "../images/youtubeicon.svg";

function Footer() {
  return (
    <footer>
      <ul className="links">
        <li>
          <a href="https://fitnessassociation.ru/offices">Представильства</a>
        </li>
        <li>
          <a href="https://fitnessassociation.ru/kontakt">Контакты</a>
        </li>
        <li>
          <a href="https://fitnessassociation.ru/sale">Магазин</a>
        </li>
        <li>
          <a href="https://fitnessassociation.ru/event">Мероприятия</a>
        </li>
        <li>
          <a href="https://fitnessassociation.ru/news">Новости</a>
        </li>
      </ul>
      <ul className="socialmedia">
        <li>
          <a href="https://t.me/aofirus">
            <img src={TelegramIcon} alt="Telegram" />
          </a>
        </li>
        <li>
          <a href="https://www.youtube.com/channel/UCBPs9mCN_s2vdHqTzoQI0xw">
            <img src={VkIcon} alt="Vk" />
          </a>
        </li>
        <li>
          <a href="https://vk.com/aofit">
            <img src={YoutubeIcon} alt="Youtube" />
          </a>
        </li>
      </ul>
    </footer>
  );
}

export default Footer;
