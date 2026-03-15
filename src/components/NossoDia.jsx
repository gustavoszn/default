import './css/NossoDia.css'
import isabela10 from '../assets/isabela10.jpeg'

export default function NossoDia({ onProfileClick }) {
  return (
    <div className="nosso-dia-container">
      <h1>Quem está assistindo?</h1>
      
      <div className="profiles-wrapper">
        <div className="profile-card" onClick={onProfileClick}>
          <div className="profile-image">
            <img src={isabela10} alt="Nosso Dia" />
          </div>
          <p className="profile-name">Isabela e Gustavo</p>
        </div>
      </div>

      <button className="manage-button">Gerenciar Perfis</button>
    </div>
  );
}