import '../css/DiaDosNamorados.css'
import isabela1 from '../assets/isabela1.jpeg'
import isabela3 from '../assets/isabela3.jpeg'
import isabela4 from '../assets/isabela4.jpeg'
import isabela5 from '../assets/isabela5.jpeg'
import isabela6 from '../assets/isabela6.jpeg'
import isabela9 from '../assets/isabela9.jpeg'
import isabela10 from '../assets/isabela10.jpeg'
import isabela12 from '../assets/isabela12.jpeg'
import be from '../assets/be.jpeg'
import isa from '../assets/isa.jpeg'
import la from '../assets/la.jpeg'
import i6 from '../assets/16.jpeg'
import novo from '../assets/novo.jpeg'

export default function DiaDosNamorados() {
  const scrollToMoments = () => {
    const section = document.querySelector('.section-title')
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const memorias = [
    { id: 1, image: be, title: 'O Dia que Tudo Começou', date: '16/03/2024', description: 'Esse foi o dia. Eu tava super ansioso, tremendo de medo. Quando ouvi "cheguei", bateu aquele frio na barriga. Quando te vi, foi maravilhoso. Você tava linda demais. A primeira vez foi cheia de nervosismo, mas tentamos de novo na escada... e foi surreal. Uma conexão que eu nunca tinha sentido antes. "Cara de apaixonada você tá." "Eu não." Mas tava sim... e só se fez muito.' },
    { id: 2, image: isa, title: 'Nossa Primeira Saída', date: '20/03/2024', description: 'Aqui foi a primeira vez que saímos juntos de verdade. A gente já tinha ficado algumas vezes, já tinha tido nossos primeiros momentos… e eu fiquei um pouco nervoso por um motivo: ia falar com o seu pai. Mas acabou sendo tranquilo, porque a luz da sua casa acabou e ele acabou adiando a conversa. Só restou a gente se divertir.' },
    { id: 3, image: la, title: 'Nosso Primeiro Dia dos Namorados', date: '12/06/2024', description: 'Esse dia foi incrível, nosso primeiro Dia dos Namorados mesmo sendo ficantes? Para mim você já era minha namorada. Na escola te desejei feliz Dia dos Namorados e você me olhou com os olhos brilhando, igual a um nenen. Te dei um chocolate e ainda pedi para Pérola cantar para você, kkkkk. Depois você veio para minha casa direto da escola, ficou quase uma hora no banheiro e saiu com uma caixa de presente. Chorei, porque nunca tinha me sentido tão amado e nunca tinha amado alguém do jeito que eu te amo. Passamos o dia inteiro juntos e foi simplesmente incrível.' },
    { id: 4, image: isabela5, title: 'Nossa Primeira Festa Junina', date: '15/06/2024', description: 'Aqui curtimos nossa primeira festa junina na escola juntos. Você estava muito linda e eu estava cansado e meio chato, porque nunca gostei dessa escola e ter que ir me irritou, mas mesmo assim foi muito bom. Comemos, ficamos juntos e foi bem apaixonado.' },
    { id: 5, image: isabela12, title: 'Nossa Primeira Vez', date: '22/06/2024', description: 'Nossa, esse foi um dia que fiquei muito nervoso, kkkkkkkkk. Foi nossa primeira conexão íntima e foi maravilhoso. Você conheceu meus avós, estávamos na festa junina na casa da sua melhor amiga e depois fomos para minha casa. Nos beijamos bastante e tivemos nossa primeira relação. Foi rápido e a gente estava nervoso, mas foi muito bom. E é que você é linda demais 😅.' },
    { id: 6, image: i6, title: 'Nosso Pedido de Namoro', date: '21/07/2024', description: 'Nosso dia 21 foi inesquecível, o dia em que concretizamos nosso compromisso. A Dandara perdeu a voz kkkkk, você estava na casa dela e eu queria te entregar a aliança na roda-gigante do Villa-Lobos, mas não deu. Te chamei para minha casa. Você, teimosa como sempre, não queria ir, mas sua mãe te convenceu. Te entreguei a aliança com um buquê gigante, pedi sua mão ao seu pai, que ficou emocionado. Foi a primeira e única vez que me ajoelhei para pedir a mão de alguém em namoro, e foi do amor da minha vida. Você chorou bastante, não acreditou, mas o importante é que você gostou!' },
    { id: 7, image: isabela3, title: 'Nossa Primeira Praia', date: '10/08/2024', description: 'Nossa primeira praia juntos foi maravilhosa. Saímos com minha mãe e minha tia, e dormimos pela primeira vez juntos em uma cama de casal. Você estava imensuravel mente linda, principalmente quando estava sem roupa rsrs. Você gemendo alto e a gente movendo a cama lá pra janela, vizinho de baixo ficou com inveja.' },
    { id: 8, image: novo, title: 'Nosso Primeiro Ano Novo', date: '31/12/2024', description: 'Nosso primeiro ano novo. Você foi para minha casa à noite, fomos para a minha prima e você ficou bêbada pela primeira vez, kkkkk. Aproveitamos bastante e na hora dos fogos foi bem apaixonado. Como sempre brigamos de madrugada por motivos bestas (culpa sua). Voltamos para minha casa de manhã, eu dormindo no sofá e você saiu do banheiro sem roupa, rindo e dizendo que eu estava louco de dormir, já subindo em cima de mim. Aproveitamos nossa manhã juntos e depois dormimos. Foi ótimo!' },
    { id: 9, image: isabela1, title: 'Nossa Formatura', date: '20/12/2025', description: 'Dia da nossa formatura foi maravilhoso, praticamente a última vez com o pessoal da escola. Aproveitamos muito, brincamos, gritamos "Murilão grandão" no meio da cerimônia kkkkk. Você estava linda demais! Me surpreendo sempre que te vejo, você é surreal. Esse dia... Foi o fim de um ciclo, o fim do nosso ensino médio, e ficamos juntos até o final, algo que vou ter o prazer de contar para nossos filhos.' },
    { id: 10, image: isabela10, title: 'Nosso Segundo Ano Novo', date: '31/12/2025', description: 'Aqui já tinha passado bastante tempo e estávamos no nosso segundo ano novo juntos. Você estava maravilhosa como sempre, combinamos roupas, vimos os fogos e eu fiquei bêbado demais... falei que ia ficar igual o Woody de Toy Story! Levei bebida dos outros para casa KKKKKKKKKKK e apesar da confusão, foi divertido e é história para contar!' },
    { id: 11, image: isabela9, title: 'Nossa Viagem para Olímpia', date: '15/01/2026', description: 'Nossa primeira viagem com sua família foi para Olímpia, foram longas seis horas de carro, mas foi muito legal. Passeamos, aproveitamos bastante e foi tudo maravilhoso. Fomos ao parque enquanto a cidade estava sem luz, pegamos ingressos de graça e você ainda imitou um sapo, minha PCDzinha, te amo! Qualquer viagem com você e sua família é sempre incrível.' },
    { id: 12, image: isabela6, title: 'Nossa Última Viagem', date: '10/02/2026', description: 'A última viagem que fizemos também foi em família, fomos para a praia. Aproveitamos muito, brincamos à noite, caminhamos bastante procurando uma moto elétrica para passear (sem sucesso), tomamos sorvete, comemos muito bem, e foi simplesmente maravilhoso. Já estou ansioso pela próxima!' },
  ]

  return (
    <div className="dias-namorados">
      {/* HEADER */}
      <header className="header">
        <div className="header-left">
          <div className="logo">NETFLIX</div>
          <nav className="nav-menu">
            <a href="#inicio">Início</a>
            <a href="#series">Séries</a>
            <a href="#filmes">Filmes</a>
            <a href="#bombando">Bombando</a>
            <a href="#lista">Minha lista</a>
          </nav>
        </div>
        <div className="header-right">
          <button className="header-btn">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.35-4.35"></path>
            </svg>
          </button>
          <button className="header-btn">🔔</button>
          <button className="header-btn">👤</button>
        </div>
      </header>

      {/* BANNER PRINCIPAL */}
      <section className="hero">
        <div className="hero-background">
          <div className="hero-collage">
            <img src={isabela10} alt="Foto 1" className="collage-img collage-1" />
            <img src={isabela1} alt="Foto 2" className="collage-img collage-2" />
            <img src={novo} alt="Foto 3" className="collage-img collage-3" />
            <img src={isabela9} alt="Foto 4" className="collage-img collage-4" />
            <img src={isabela6} alt="Foto 5" className="collage-img collage-5" />
            <img src={i6} alt="Foto 6" className="collage-img collage-6" />
            <img src={la} alt="Foto 7" className="collage-img collage-7" />
            <img src={isabela4} alt="Foto 8" className="collage-img collage-8" />
          </div>
          <div className="hero-overlay"></div>
        </div>
        
        <div className="hero-content">
          <div className="hero-left">
            <h1 className="hero-title">
              <div className="title-text">16/03</div>
            </h1>
            <p className="hero-description">
            Em um dia que parecia comum, entre risadas, conversas e um churrasco entre amigos, dois caminhos se cruzam. O que começa simples logo vira algo maior: o início de um amor e de uma parceria que mudaria duas vidas para sempre. ❤️
 
            </p>
            <div className="hero-buttons">
              <button className="btn btn-play" onClick={scrollToMoments}>
                ▶ Assistir
              </button>
              <button className="btn btn-info" onClick={scrollToMoments}>
                ℹ Mais informações
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* SEÇÃO DE MEMÓRIAS */}
      <section className="content-section">
        <h2 className="section-title">Nossos melhores momentos!</h2>
        <div className="carousel-container">
          <div className="carousel-row">
            {memorias.slice(0, 6).map((memoria) => (
              <div key={memoria.id} className="carousel-item">
                <div className="carousel-item-image">
                  <img src={memoria.image} alt={`Memória ${memoria.id}`} />
                </div>
                <div className="carousel-text-box">
                  <h3 className="carousel-text-title">{memoria.title}</h3>
                  <p className="carousel-text-date">{memoria.date}</p>
                  <p className="carousel-text-description">{memoria.description}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="carousel-row">
            {memorias.slice(6, 12).map((memoria) => (
              <div key={memoria.id} className="carousel-item">
                <div className="carousel-item-image">
                  <img src={memoria.image} alt={`Memória ${memoria.id}`} />
                </div>
                <div className="carousel-text-box">
                  <h3 className="carousel-text-title">{memoria.title}</h3>
                  <p className="carousel-text-date">{memoria.date}</p>
                  <p className="carousel-text-description">{memoria.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-content">
          <h2 className="footer-title">Nossa História Continua...</h2>
          <p className="footer-text">
            Cada foto aqui é mais do que uma memória, é um pedaço da nossa história, 
            do nosso amor, da nossa cumplicidade. Desde aquele primeiro dia até agora, 
            você só me surpreende cada vez mais. Ver você crescer, evoluir e se tornar 
            essa mulher incrível que você é hoje me enche de orgulho.
          </p>
          <p className="footer-text">
            Tenho certeza absoluta de que você será uma psicóloga de sucesso, 
            porque você tem tudo: dedicação, inteligência, empatia e um coração gigante. 
            E pode ter certeza de uma coisa, eu sempre vou estar ao seu lado, 
            te apoiando, te amando e vibrando por cada conquista sua! Parabéns pelo novo emprego!
          </p>
          <p className="footer-text">
            Obrigado por cada momento, cada sorriso, cada beijo, cada abraço. 
            Obrigado por ser minha parceira, minha melhor amiga, meu amor. 
            Te amo hoje, amanhã e para sempre.
          </p>
          <div className="footer-signature">
            <p>Com todo meu amor,</p>
            <p className="footer-name">Gustavo ❤️</p>
          </div>
        </div>
      </footer>
    </div>
  )
}