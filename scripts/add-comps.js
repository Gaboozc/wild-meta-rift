const fs = require('fs');
const existing = require('../data/compositions.json');

// First fix existing win conditions that don't match champions
const fixes = {
  'wombo-combo': {
    winCondition: {
      es: 'Malphite ult inicia el teamfight. Jarvan IV crea la caja y Yasuo ult dentro. Miss Fortune canaliza Bullet Time sobre todos los enemigos atrapados. Alistar knockup impide que escapen.',
      en: 'Malphite ult initiates. Jarvan IV creates the box and Yasuo ults inside. Miss Fortune channels Bullet Time over all trapped enemies. Alistar knockup prevents escapes.'
    }
  },
  'engage-chain': {
    winCondition: {
      es: 'Malphite inicia. Wukong gira y knockup a todos. Galio aterriza desde cualquier parte del mapa. Caitlyn hace trampas en las posiciones de retroceso. Nautilus engancha al primer enemigo que intente escapar.',
      en: 'Malphite initiates. Wukong spins and knockups everyone. Galio lands from anywhere on the map. Caitlyn places traps on retreat positions. Nautilus hooks the first enemy who tries to escape.'
    }
  },
  'magic-damage': {
    winCondition: {
      es: 'Sion absorbe el engage enemigo. Amumu lanza ult de AOE CC. Syndra bala de burst instantáneo. Kai\'Sa con daño mágico de W. Zilean revive a Syndra o Kai\'Sa si mueren. Sin resistencia mágica, todos explotan.',
      en: 'Sion absorbs enemy engage. Amumu throws AOE CC ult. Syndra instant burst shot. Kai\'Sa with W magic damage. Zilean revives Syndra or Kai\'Sa if they die. Without MR, everyone explodes.'
    }
  },
  'la-tormenta': {
    winCondition: {
      es: 'Sion es el frontline. Wukong ult knockup a todos. Orianna coloca la bola sobre Wukong y detona Shockwave al inicio del giro. Ezreal hace daño desde atrás. Zilean revive al carry caído.',
      en: 'Sion is the frontline. Wukong ult knockups everyone. Orianna places ball on Wukong and detonates Shockwave at the start of his spin. Ezreal deals damage from behind. Zilean revives the fallen carry.'
    }
  },
  'la-ballena': {
    winCondition: {
      es: 'Sion hace el engage frontal. Nunu bola de nieve inicia. Galio llega desde cualquier punto del mapa. Kog\'Maw dispara desde atrás con W on-hit masivo. Lulu escuda y hace gigante a Kog\'Maw cuando lo divan.',
      en: 'Sion does the front engage. Nunu snowball initiates. Galio arrives from anywhere on the map. Kog\'Maw shoots from behind with massive W on-hit. Lulu shields and makes Kog\'Maw giant when dived.'
    }
  },
  'guerra-sustain': {
    winCondition: {
      es: 'Gwen con sustain propio en Q. Nunu bola de nieve y heals masivos. Swain drena vida mientras hace daño. Kai\'Sa escala. Soraka cura a todo el equipo. El teamfight más largo posible favorece siempre a este equipo.',
      en: 'Gwen with own sustain in Q. Nunu snowball and massive heals. Swain drains life while dealing damage. Kai\'Sa scales. Soraka heals the whole team. The longest possible teamfight always favors this team.'
    }
  },
  'the-heist': {
    winCondition: {
      es: 'Sion splitpushea top mientras crea presión. Taliyah aparece en cualquier parte del mapa con engage global. Twisted Fate gold card bloquea escapes. Caitlyn y Janna dominan bot. Forzar al equipo enemigo a dividirse.',
      en: 'Sion splitpushes top while creating pressure. Taliyah appears anywhere on map with global engage. Twisted Fate gold card blocks escapes. Caitlyn and Janna dominate bot. Force the enemy team to split.'
    }
  },
  'guardianes-eternos': {
    winCondition: {
      es: 'Ornn hace el engage y mejora items del equipo. Vi inicia con charge. Seraphine cura y da shields con su pasiva musical. Sivir con ult de velocidad reposiciona. Maokai planta semillas para sustain en teamfight.',
      en: 'Ornn engages and upgrades team items. Vi initiates with charge. Seraphine heals and shields with musical passive. Sivir repositions with speed ult. Maokai plants saplings for teamfight sustain.'
    }
  }
};

// Apply fixes to existing comps
const fixedExisting = existing.map(comp => {
  if (fixes[comp.id]) {
    return { ...comp, ...fixes[comp.id] };
  }
  return comp;
});

const newComps = [
  {
    id:'la-pareja-cosmica',
    name:{es:'La Pareja Cósmica',en:'The Cosmic Couple'},
    tags:['engage','AOE','synergy'],difficulty:'media',
    winCondition:{es:'Rakan inicia con su escudo/charm. Xayah detona sus plumas sobre todos los enemigos que Rakan agrupo. Ahri seduce al carry enemigo. Hecarim entra al teamfight en caballo al galope. Sion absorbe el frontline.',en:'Rakan initiates with his shield/charm. Xayah detonates feathers on all enemies Rakan grouped. Ahri charms the enemy carry. Hecarim charges into teamfight on horseback. Sion absorbs the frontline.'},
    team:[{role:'top',champ:'Sion'},{role:'jgl',champ:'Hecarim'},{role:'mid',champ:'Ahri'},{role:'adc',champ:'Xayah'},{role:'sup',champ:'Rakan'}],patch:'7.1f'
  },
  {
    id:'amantes-malditos',
    name:{es:'Amantes Malditos',en:'Star-Crossed Lovers'},
    tags:['pick','snowball','aggression'],difficulty:'alta',
    winCondition:{es:'Garen aplica silencio con E y marca con ult. Katarina entra con Cuchillas de Shunpo cuando Garen silencia y ejecuta con ult sin interrupciones. Lee Sin hace los picks previos. Miss Fortune y Alistar controlan bot.',en:'Garen applies silence with E and marks with ult. Katarina dives with Shunpo when Garen silences and executes with uninterrupted ult. Lee Sin makes prior picks. Miss Fortune and Alistar control bot.'},
    team:[{role:'top',champ:'Garen'},{role:'jgl',champ:'Lee Sin'},{role:'mid',champ:'Katarina'},{role:'adc',champ:'Miss Fortune'},{role:'sup',champ:'Alistar'}],patch:'7.1f'
  },
  {
    id:'el-dragon-espacial',
    name:{es:'El Dragón del Espacio',en:'The Space Dragon'},
    tags:['AP','scaling','late-game'],difficulty:'alta',
    winCondition:{es:'Aurelion Sol escala cada vez que mata a alguien con su W. Sion y Nunu aguantan el early. Ezreal poke desde lejos. Lulu escuda y hace gigante a Aurelion Sol cuando lo divan en teamfight. En nivel 11+ es imparable.',en:'Aurelion Sol scales every time he kills someone with his W. Sion and Nunu hold the early. Ezreal pokes from range. Lulu shields and makes Aurelion Sol giant when dived in teamfight. At level 11+ he is unstoppable.'},
    team:[{role:'top',champ:'Sion'},{role:'jgl',champ:'Nunu & Willump'},{role:'mid',champ:'Aurelion Sol'},{role:'adc',champ:'Ezreal'},{role:'sup',champ:'Lulu'}],patch:'7.1f'
  },
  {
    id:'las-centinelas',
    name:{es:'Las Centinelas',en:'The Sentinels'},
    tags:['poke','sustain','scaling'],difficulty:'media',
    winCondition:{es:'Lucian y Senna son el mejor bot duo: Senna genera ánimas y gana rango infinitamente mientras cura con Q. Lucian escala su daño con cada item de Senna. Hecarim hace ganks rapidos. Viktor y Ornn protegen el late.',en:'Lucian and Senna are the best bot duo: Senna generates souls and gains infinite range while healing with Q. Lucian scales damage with every Senna item. Hecarim makes fast ganks. Viktor and Ornn protect late.'},
    team:[{role:'top',champ:'Ornn'},{role:'jgl',champ:'Hecarim'},{role:'mid',champ:'Viktor'},{role:'adc',champ:'Lucian'},{role:'sup',champ:'Senna'}],patch:'7.1f'
  },
  {
    id:'hermanas-divinas',
    name:{es:'Hermanas Divinas',en:'Divine Sisters'},
    tags:['AP','protect','teamfight'],difficulty:'media',
    winCondition:{es:'Kayle escala a nivel 16. Morgana aplica Escudo Negro garantizando que Kayle nunca sea CC-eada. Amumu lanza ult de teamfight. Orianna coloca la bola para el Shockwave. Caitlyn snipea desde atrás.',en:'Kayle scales to level 16. Morgana applies Black Shield guaranteeing Kayle is never CC-ed. Amumu throws teamfight ult. Orianna places ball for Shockwave. Caitlyn snipes from behind.'},
    team:[{role:'top',champ:'Kayle'},{role:'jgl',champ:'Amumu'},{role:'mid',champ:'Orianna'},{role:'adc',champ:'Caitlyn'},{role:'sup',champ:'Morgana'}],patch:'7.1f'
  },
  {
    id:'bestias-de-la-oscuridad',
    name:{es:'Bestias de la Oscuridad',en:'Beasts of Darkness'},
    tags:['sustain','dive','teamfight'],difficulty:'media',
    winCondition:{es:'Volibear transforma y carga sobre los carries. Warwick siente el olor de la sangre cuando alguien tiene menos del 50% y llega como rayo con E. Swain drena vida en teamfight. Tristana destruye torres. Braum absorbe el daño.',en:'Volibear transforms and charges onto carries. Warwick smells blood when someone is below 50% and arrives like lightning with E. Swain drains life in teamfight. Tristana destroys towers. Braum absorbs damage.'},
    team:[{role:'top',champ:'Volibear'},{role:'jgl',champ:'Warwick'},{role:'mid',champ:'Swain'},{role:'adc',champ:'Tristana'},{role:'sup',champ:'Braum'}],patch:'7.1f'
  },
  {
    id:'el-cuartel',
    name:{es:'El Cuartel',en:'The Barracks'},
    tags:['tank','poke','sustain'],difficulty:'fácil',
    winCondition:{es:'Urgot controla el espacio con sus cadenas giratorias y ejecuta con ult. Olaf avanza ignorando el CC en ult. Veigar acumula AP con cada hechizo y mata de un golpe en late. Jinx explota cuando consigue kills. Nautilus engancha y knockup.',en:'Urgot controls space with spinning chains and executes with ult. Olaf advances ignoring CC in ult. Veigar accumulates AP with every spell and one-shots in late. Jinx explodes when she gets kills. Nautilus hooks and knockups.'},
    team:[{role:'top',champ:'Urgot'},{role:'jgl',champ:'Olaf'},{role:'mid',champ:'Veigar'},{role:'adc',champ:'Jinx'},{role:'sup',champ:'Nautilus'}],patch:'7.1f'
  },
  {
    id:'la-torre-de-acero',
    name:{es:'La Torre de Acero',en:'The Steel Tower'},
    tags:['poke','siege','control'],difficulty:'media',
    winCondition:{es:'Gnar poke desde lejos en forma Mini y transforma en Mega Gnar para el engage clave contra la pared. Heimerdinger coloca torres H-28G en las posiciones más peligrosas. Caitlyn snipea con trampas y headshot. Karma escuda y poke.',en:'Gnar pokes from range in Mini form and transforms into Mega Gnar for key wall engage. Heimerdinger places H-28G turrets in the most dangerous positions. Caitlyn snipes with traps and headshot. Karma shields and pokes.'},
    team:[{role:'top',champ:'Gnar'},{role:'jgl',champ:'Hecarim'},{role:'mid',champ:'Heimerdinger'},{role:'adc',champ:'Caitlyn'},{role:'sup',champ:'Karma'}],patch:'7.1f'
  },
  {
    id:'terror-sigiloso',
    name:{es:'Terror Sigiloso',en:'Stealthy Terror'},
    tags:['stealth','pick','assassin'],difficulty:'alta',
    winCondition:{es:'Nocturne lanza ult apagando la visión de todos. En la oscuridad Twitch se vuelve invisible durante 5 segundos y flanquea. Malphite inicia desde el frente para crear distracción. Zoe duerme a los carries. Nami frena a los que intentan huir.',en:'Nocturne ults cutting off vision. In darkness Twitch becomes invisible for 5 seconds and flanks. Malphite initiates from the front as distraction. Zoe sleeps carries. Nami slows those who try to flee.'},
    team:[{role:'top',champ:'Malphite'},{role:'jgl',champ:'Nocturne'},{role:'mid',champ:'Zoe'},{role:'adc',champ:'Twitch'},{role:'sup',champ:'Nami'}],patch:'7.1f'
  },
  {
    id:'velocidad-pura',
    name:{es:'Velocidad Pura',en:'Pure Speed'},
    tags:['mobility','aggression','snowball'],difficulty:'alta',
    winCondition:{es:'Singed corre dejando veneno y el enemigo tiene que perseguirle o ignorarle. Shyvana en forma de dragón vuela por el mapa. Zeri gana velocidad de movimiento con cada escudo que Janna le da. Viktor controla mid. Perseguir al equipo enemigo hasta que no pueda más.',en:'Singed runs leaving poison and the enemy has to chase him or ignore him. Shyvana in dragon form flies across the map. Zeri gains movement speed with every shield Janna gives her. Viktor controls mid. Chase the enemy team until they can\'t take more.'},
    team:[{role:'top',champ:'Singed'},{role:'jgl',champ:'Shyvana'},{role:'mid',champ:'Viktor'},{role:'adc',champ:'Zeri'},{role:'sup',champ:'Janna'}],patch:'7.1f'
  },
  {
    id:'apostadores-locos',
    name:{es:'Apostadores Locos',en:'Risk Takers'},
    tags:['aggression','snowball','early-game'],difficulty:'alta',
    winCondition:{es:'Riven splitpushea y hace duelos 1v1. Graves explota con sus perdigones. Rell hace charge y knockup agresivo. Zed hace combo de sombras y mata carries. Jinx explota con aceleración de rocket. Todo-o-nada antes del minuto 20.',en:'Riven splitpushes and wins 1v1 duels. Graves explodes with his buckshots. Rell charges and aggressively knockups. Zed does shadow combo and kills carries. Jinx rockets accelerate. All-or-nothing before minute 20.'},
    team:[{role:'top',champ:'Riven'},{role:'jgl',champ:'Graves'},{role:'mid',champ:'Zed'},{role:'adc',champ:'Jinx'},{role:'sup',champ:'Rell'}],patch:'7.1f'
  },
  {
    id:'los-berserkers',
    name:{es:'Los Berserkers',en:'The Berserkers'},
    tags:['aggression','dive','early-game'],difficulty:'alta',
    winCondition:{es:'Tryndamere spin y críticos masivos. Es intocable cuando activa ult. Olaf ignora todo el CC con su ult. Ahri seduce al carry enemigo durante el engage. Samira necesita kills de estilo para su ult. Alistar da el knockup inicial.',en:'Tryndamere spins with massive crits. He is unkillable when ult is active. Olaf ignores all CC with his ult. Ahri charms the enemy carry during engage. Samira needs style kills for her ult. Alistar provides the initial knockup.'},
    team:[{role:'top',champ:'Tryndamere'},{role:'jgl',champ:'Olaf'},{role:'mid',champ:'Ahri'},{role:'adc',champ:'Samira'},{role:'sup',champ:'Alistar'}],patch:'7.1f'
  },
  {
    id:'asesinos-del-tiempo',
    name:{es:'Asesinos del Tiempo',en:'Time Assassins'},
    tags:['pick','AP','burst'],difficulty:'alta',
    winCondition:{es:'Ekko retrocede el tiempo con R para escapar o ejecutar. Nidalee salta entre arbustos y lanza jabalinas que hacen doble daño. Katarina acumula resets con cada kill. Vayne true damage mata tanques. Zilean revive al carry clave.',en:'Ekko rewinds time with R to escape or execute. Nidalee leaps between bushes and throws javelins that deal double damage. Katarina stacks resets with every kill. Vayne true damage kills tanks. Zilean revives key carry.'},
    team:[{role:'top',champ:'Sion'},{role:'jgl',champ:'Nidalee'},{role:'mid',champ:'Ekko'},{role:'adc',champ:'Vayne'},{role:'sup',champ:'Zilean'}],patch:'7.1f'
  },
  {
    id:'la-danza-mortal',
    name:{es:'La Danza Mortal',en:'The Deadly Dance'},
    tags:['dive','carry-jungla','synergy'],difficulty:'alta',
    winCondition:{es:'Irelia danza entre enemigos con sus cuchillas flotantes. Kindred marca al objetivo más peligroso para eliminarlo. Rakan y Kalista son el mejor bot duo: Kalista lanza a Rakan para el engage perfecto. Twisted Fate bloquea la retirada.',en:'Irelia dances between enemies with floating blades. Kindred marks the most dangerous target for elimination. Rakan and Kalista are the best bot duo: Kalista throws Rakan for the perfect engage. Twisted Fate blocks the retreat.'},
    team:[{role:'top',champ:'Irelia'},{role:'jgl',champ:'Kindred'},{role:'mid',champ:'Twisted Fate'},{role:'adc',champ:'Kalista'},{role:'sup',champ:'Rakan'}],patch:'7.1f'
  },
  {
    id:'el-artillero-fantasma',
    name:{es:'El Artillero Fantasma',en:'The Phantom Gunner'},
    tags:['poke','AP','control'],difficulty:'media',
    winCondition:{es:'Vel\'Koz destruye desde máximo rango con su investigación de 5 partes y ult de laser. Fizz es imposible de alcanzar con su E sobre el palo. Lucian hace burst corto y movilidad. Norra mejora a sus aliados con portales. Sion fronline.',en:'Vel\'Koz destroys from maximum range with 5-part research and laser ult. Fizz is impossible to catch with his E on the stick. Lucian does short burst with mobility. Norra upgrades allies with portals. Sion frontline.'},
    team:[{role:'top',champ:'Sion'},{role:'jgl',champ:'Fizz'},{role:'mid',champ:'Vel\'Koz'},{role:'adc',champ:'Lucian'},{role:'sup',champ:'Norra'}],patch:'7.1f'
  },
  {
    id:'el-equipo-de-fuego',
    name:{es:'El Equipo de Fuego',en:'The Fire Squad'},
    tags:['AP','AOE','teamfight'],difficulty:'media',
    winCondition:{es:'Annie invoca a Tibbers con stun de AOE. Shyvana en forma de dragón escupe fuego. Brand explota en cadena entre enemigos cercanos. Nami ola de marea enlentece y hace más daño con sus otras habilidades. Jhin remata con bala 4.',en:'Annie summons Tibbers with AOE stun. Shyvana in dragon form breathes fire. Brand chain explodes between nearby enemies. Nami tidal wave slows and empowers her other abilities. Jhin finishes with bullet 4.'},
    team:[{role:'top',champ:'Sion'},{role:'jgl',champ:'Shyvana'},{role:'mid',champ:'Annie'},{role:'adc',champ:'Jhin'},{role:'sup',champ:'Brand'}],patch:'7.1f'
  },
  {
    id:'sangre-fria',
    name:{es:'Sangre Fría',en:'Cold Blood'},
    tags:['pick','assassin','snowball'],difficulty:'alta',
    winCondition:{es:'Akshan revive a aliados asesinados eliminando al asesino. Rengar salta de arbustos y ejecuta carries con Colmillo Feroz. Talon paredes y roamea. Sivir bloquea hechizos con Muro de Hechizos. Senna snipea con ult desde cualquier lugar del mapa.',en:'Akshan revives killed allies by eliminating their killer. Rengar leaps from bushes and executes carries with Savagery. Talon walls and roams. Sivir blocks spells with Spell Shield. Senna snipes with ult from anywhere on the map.'},
    team:[{role:'top',champ:'Akshan'},{role:'jgl',champ:'Rengar'},{role:'mid',champ:'Talon'},{role:'adc',champ:'Sivir'},{role:'sup',champ:'Senna'}],patch:'7.1f'
  },
  {
    id:'el-mago-loco',
    name:{es:'El Mago Loco',en:'The Mad Mage'},
    tags:['AP','poke','siege'],difficulty:'media',
    winCondition:{es:'Gragas rueda barriles y su E desplaza enemigos en el momento incorrecto. Ekko tiene movilidad extrema y puede resetear la situación con ult. Ziggs destruye torres con pasiva y reduce cooldown de torres enemigas. Tristana también destruye torres. Bard aparece de otro plano.',en:'Gragas rolls barrels and his E displaces enemies at the wrong moment. Ekko has extreme mobility and can reset the situation with ult. Ziggs destroys towers with passive and reduces enemy tower cooldown. Tristana also destroys towers. Bard appears from another plane.'},
    team:[{role:'top',champ:'Gragas'},{role:'jgl',champ:'Ekko'},{role:'mid',champ:'Ziggs'},{role:'adc',champ:'Tristana'},{role:'sup',champ:'Bard'}],patch:'7.1f'
  },
  {
    id:'noche-sin-luna',
    name:{es:'Noche Sin Luna',en:'Moonless Night'},
    tags:['AP','burst','control'],difficulty:'alta',
    winCondition:{es:'Nocturne apaga la visión. Vex empuja a los enemigos que saltan sobre ella con su miedo pasivo y hace burst masivo. Morgana ata con cadena oscura a los que intentan escapar. Xayah detona plumas sobre los atados. Sion absorbe el frontline.',en:'Nocturne cuts vision. Vex repels enemies that jump on her with passive fear and deals massive burst. Morgana binds with dark chain those who try to escape. Xayah detonates feathers on the bound. Sion absorbs frontline.'},
    team:[{role:'top',champ:'Sion'},{role:'jgl',champ:'Nocturne'},{role:'mid',champ:'Vex'},{role:'adc',champ:'Xayah'},{role:'sup',champ:'Morgana'}],patch:'7.1f'
  },
  {
    id:'el-coloso-eterno',
    name:{es:'El Coloso Eterno',en:'The Eternal Colossus'},
    tags:['sustain','tank','late-game'],difficulty:'fácil',
    winCondition:{es:'Dr. Mundo se cura el 50% de vida con su ult en 4 segundos. Warwick persigue carries con poca vida y se cura masivamente con cada mordida. Swain drena vida mientras hace daño AP. Kog\'Maw destruye tanques con W. Soraka cura infinitamente.',en:'Dr. Mundo heals 50% of his health with ult in 4 seconds. Warwick chases low-HP carries and heals massively with every bite. Swain drains life while dealing AP damage. Kog\'Maw destroys tanks with W. Soraka heals infinitely.'},
    team:[{role:'top',champ:'Dr. Mundo'},{role:'jgl',champ:'Warwick'},{role:'mid',champ:'Swain'},{role:'adc',champ:'Kog\'Maw'},{role:'sup',champ:'Soraka'}],patch:'7.1f'
  },
  {
    id:'demonios-del-caos',
    name:{es:'Demonios del Caos',en:'Chaos Demons'},
    tags:['AP','dive','burst'],difficulty:'alta',
    winCondition:{es:'Mordekaiser aisla al carry enemigo en su ult 1v1. Evelynn acecha invisible desde nivel 6 y asesina. Vex empuja a los enemies que saltan sobre ella con su miedo pasivo. Nilah dash circular en teamfight. Brand explota en cadena entre los agrupados.',en:'Mordekaiser isolates the enemy carry in his 1v1 ult realm. Evelynn lurks invisible from level 6 and assassinates. Vex repels enemies that jump on her with passive fear. Nilah circular dash in teamfight. Brand chain explodes among grouped enemies.'},
    team:[{role:'top',champ:'Mordekaiser'},{role:'jgl',champ:'Evelynn'},{role:'mid',champ:'Vex'},{role:'adc',champ:'Nilah'},{role:'sup',champ:'Brand'}],patch:'7.1f'
  },
  {
    id:'maestros-del-roam',
    name:{es:'Maestros del Roam',en:'Roam Masters'},
    tags:['roam','global','pick'],difficulty:'alta',
    winCondition:{es:'Nidalee como jungla salta entre arbustos y hace ganks sorpresa. Mel en mid refleja hechizos enemigos de vuelta. Jayce presiona la línea de Barón. Pantheon aterriza en cualquier parte del mapa con su salto global. Nami sustain en bot.',en:'Nidalee in jungle leaps between bushes and makes surprise ganks. Mel in mid reflects enemy spells back. Jayce pressures Baron lane. Pantheon lands anywhere on the map with his global leap. Nami sustains in bot.'},
    team:[{role:'top',champ:'Jayce'},{role:'jgl',champ:'Nidalee'},{role:'mid',champ:'Mel'},{role:'adc',champ:'Varus'},{role:'sup',champ:'Nami'}],patch:'7.1f'
  },
  {
    id:'explosion-de-magia',
    name:{es:'Explosión de Magia',en:'Magic Explosion'},
    tags:['AP','AOE','teamfight'],difficulty:'media',
    winCondition:{es:'Kennen stun masivo con ult de rayos y Amumu ult de CC de AOE simultáneo. Orianna coloca la bola sobre Kennen antes de que lance su ult para el Shockwave perfecto. Sivir reposiciona con velocidad. Sona ult paraliza los rezagados.',en:'Kennen mass stun with lightning ult and Amumu AOE CC ult simultaneously. Orianna places ball on Kennen before he ults for the perfect Shockwave. Sivir repositions with speed. Sona ult paralyzes stragglers.'},
    team:[{role:'top',champ:'Kennen'},{role:'jgl',champ:'Amumu'},{role:'mid',champ:'Orianna'},{role:'adc',champ:'Sivir'},{role:'sup',champ:'Sona'}],patch:'7.1f'
  },
  {
    id:'la-manada',
    name:{es:'La Manada',en:'The Pack'},
    tags:['dive','aggression','snowball'],difficulty:'alta',
    winCondition:{es:'Warwick siente sangre y persigue con E invisible rápido. Master Yi medita y es imbatible con Alfa Strike. Katarina acumula resets con cada kill. Vayne kita con paso de retroceso E. Milio escuda cuando los divan. El equipo caza como manada sin parar.',en:'Warwick smells blood and chases with fast invisible E. Master Yi meditates and is unstoppable with Alpha Strike. Katarina stacks resets with every kill. Vayne kites with E backstep. Milio shields when dived. The team hunts like a pack non-stop.'},
    team:[{role:'top',champ:'Wukong'},{role:'jgl',champ:'Master Yi'},{role:'mid',champ:'Katarina'},{role:'adc',champ:'Vayne'},{role:'sup',champ:'Milio'}],patch:'7.1f'
  },
  {
    id:'el-gran-golpe',
    name:{es:'El Gran Golpe',en:'The Big Hit'},
    tags:['engage','burst','teamfight'],difficulty:'media',
    winCondition:{es:'Sett agarra al tanque enemigo más grande y lo lanza contra sus aliados con Show Stopper. Shyvana transforma al momento exacto que Sett inicia para explotar junto. Katarina entra con resets. Jinx explota con aceleración tras cada kill. Thresh mantiene la línea.',en:'Sett grabs the biggest enemy tank and throws them at their allies with Show Stopper. Shyvana transforms at the exact moment Sett initiates to explode together. Katarina enters with resets. Jinx accelerates after every kill. Thresh holds the line.'},
    team:[{role:'top',champ:'Sett'},{role:'jgl',champ:'Shyvana'},{role:'mid',champ:'Katarina'},{role:'adc',champ:'Jinx'},{role:'sup',champ:'Thresh'}],patch:'7.1f'
  },
  {
    id:'el-ejercito-de-la-luz',
    name:{es:'El Ejército de la Luz',en:'Army of Light'},
    tags:['AP','scaling','AOE'],difficulty:'media',
    winCondition:{es:'Kayle en nivel 16 lanza cuchillas de fuego rangeadas e invulnerable. Lux hace burst de rayo desde lejos. Seraphine protege con Nota Final y shields musicales. Sivir limpia waves con ricochet. Nunu bola de nieve inicial para el engage.',en:'Kayle at level 16 throws ranged fire blades while invulnerable. Lux bursts with lightning bolt from range. Seraphine protects with Final Chord and musical shields. Sivir clears waves with ricochet. Nunu snowball initial engage.'},
    team:[{role:'top',champ:'Kayle'},{role:'jgl',champ:'Nunu & Willump'},{role:'mid',champ:'Lux'},{role:'adc',champ:'Sivir'},{role:'sup',champ:'Seraphine'}],patch:'7.1f'
  },
  {
    id:'tormenta-de-flechas',
    name:{es:'Tormenta de Flechas',en:'Arrow Storm'},
    tags:['engage','CC','synergy'],difficulty:'alta',
    winCondition:{es:'Kalista lanza a Rell desde sus espaldas para el engage perfecto: Rell crashea y magnetiza mientras Kalista sigue disparando. Irelia danza con sus cuchillas. Kindred marca el objetivo. Ryze teletransporta al equipo al punto ideal con su ult.',en:'Kalista throws Rell from her back for the perfect engage: Rell crashes and magnetizes while Kalista keeps shooting. Irelia dances with blades. Kindred marks the target. Ryze teleports the team to the ideal point with ult.'},
    team:[{role:'top',champ:'Irelia'},{role:'jgl',champ:'Kindred'},{role:'mid',champ:'Ryze'},{role:'adc',champ:'Kalista'},{role:'sup',champ:'Rell'}],patch:'7.1f'
  },
  {
    id:'la-danza-macabra',
    name:{es:'La Danza Macabra',en:'The Macabre Dance'},
    tags:['dive','assassin','snowball'],difficulty:'alta',
    winCondition:{es:'Aatrox lidera el dive con sustain y CC. Rengar salta de arbustos y ejecuta carries con burst. Akali hace el limpiador invisible. Samira acumula kills de estilo para su Caos Salvaje. Pyke ejecuta con X y da 600 de oro a Samira por cada kill.',en:'Aatrox leads the dive with sustain and CC. Rengar leaps from bushes and executes carries with burst. Akali does invisible cleanup. Samira accumulates style kills for Wild Rush. Pyke executes with X and gives 600 gold to Samira per kill.'},
    team:[{role:'top',champ:'Aatrox'},{role:'jgl',champ:'Rengar'},{role:'mid',champ:'Akali'},{role:'adc',champ:'Samira'},{role:'sup',champ:'Pyke'}],patch:'7.1f'
  },
  {
    id:'bestias-salvajes',
    name:{es:'Bestias Salvajes',en:'Wild Beasts'},
    tags:['dive','early-game','aggression'],difficulty:'alta',
    winCondition:{es:'Gnar transforma en Mega Gnar y lanza enemigos contra la pared con GNAR!. Olaf avanza ignorando CC con su Ragnarok. Fizz evita un hechizo cada 3 segundos con E sobre el palo. Draven spins hachas para daño masivo. Alistar headbutt-pulveriza.',en:'Gnar transforms into Mega Gnar and wall slams enemies with GNAR!. Olaf advances ignoring CC with Ragnarok. Fizz dodges one spell every 3 seconds with E on the stick. Draven spins axes for massive damage. Alistar headbutt-pulverizes.'},
    team:[{role:'top',champ:'Gnar'},{role:'jgl',champ:'Olaf'},{role:'mid',champ:'Fizz'},{role:'adc',champ:'Draven'},{role:'sup',champ:'Alistar'}],patch:'7.1f'
  },
  {
    id:'el-septimo-cielo',
    name:{es:'El Séptimo Cielo',en:'The Seventh Heaven'},
    tags:['scaling','AP','protect'],difficulty:'alta',
    winCondition:{es:'Aurelion Sol escala. Zoe roba hechizos de summoner con sus orbes y hace dormir carries. Lillia hace dormir a TODO el equipo enemigo con su ult Sueños Compartidos. Nilah dash circular y daño. Yuumi es invulnerable dentro de un aliado y cura constantemente.',en:'Aurelion Sol scales. Zoe steals summoner spells with orbs and sleeps carries. Lillia puts the ENTIRE enemy team to sleep with Shared Dreams ult. Nilah circular dash and damage. Yuumi is invulnerable inside an ally and constantly heals.'},
    team:[{role:'top',champ:'Sion'},{role:'jgl',champ:'Lillia'},{role:'mid',champ:'Aurelion Sol'},{role:'adc',champ:'Nilah'},{role:'sup',champ:'Yuumi'}],patch:'7.1f'
  },
  {
    id:'caos-controlado',
    name:{es:'Caos Controlado',en:'Controlled Chaos'},
    tags:['poke','engage','scaling'],difficulty:'media',
    winCondition:{es:'Sett demuele con Show Stopper. Graves explota con perdigones en corto rango. Mel refleja el daño de proyectiles de vuelta a sus dueños. Tristana destruye torres con Q de pasiva. Sona ult Crescendo paraliza a todos en el momento crucial.',en:'Sett demolishes with Show Stopper. Graves explodes with buckshot at short range. Mel reflects projectile damage back to their owners. Tristana destroys towers with Q passive. Sona Crescendo ult paralyzes everyone at the crucial moment.'},
    team:[{role:'top',champ:'Sett'},{role:'jgl',champ:'Graves'},{role:'mid',champ:'Mel'},{role:'adc',champ:'Tristana'},{role:'sup',champ:'Sona'}],patch:'7.1f'
  },
  {
    id:'guardian-del-tiempo',
    name:{es:'Guardián del Tiempo',en:'Time Guardian'},
    tags:['CC','scaling','teamfight'],difficulty:'media',
    winCondition:{es:'Urgot ejecuta carries con su ult Voracidad de Felo-Harth. Xin Zhao hace engage rápido con Tres Tajos y lanza a los enemigos. Veigar jaula y ult one-shot. Vayne true damage penetra cualquier escudo. Zilean revive dos veces a Vayne o Veigar.',en:'Urgot executes carries with his Felo\'Harth\'s Craving ult. Xin Zhao quick engages with Three Talon Strike and throws enemies. Veigar cages and one-shot ult. Vayne true damage penetrates any shield. Zilean revives Vayne or Veigar twice.'},
    team:[{role:'top',champ:'Urgot'},{role:'jgl',champ:'Xin Zhao'},{role:'mid',champ:'Veigar'},{role:'adc',champ:'Vayne'},{role:'sup',champ:'Zilean'}],patch:'7.1f'
  },
  {
    id:'el-monstruo-hambriento',
    name:{es:'El Monstruo Hambriento',en:'The Hungry Monster'},
    tags:['sustain','scaling','split'],difficulty:'media',
    winCondition:{es:'Nasus con 500 stacks hace 800+ de daño por Q. Gragas bota barriles y E desplaza al carry fuera del combate. Vladimir W se hace un charco e inmune. Jinx explota cuando consigue kills. Nami ola frena a los que persiguen a Nasus.',en:'Nasus with 500 stacks deals 800+ Q damage. Gragas throws barrels and E displaces carry out of combat. Vladimir W puddles and becomes immune. Jinx accelerates when she gets kills. Nami wave slows those who chase Nasus.'},
    team:[{role:'top',champ:'Nasus'},{role:'jgl',champ:'Gragas'},{role:'mid',champ:'Vladimir'},{role:'adc',champ:'Jinx'},{role:'sup',champ:'Nami'}],patch:'7.1f'
  },
  {
    id:'fantasmas-del-rift',
    name:{es:'Fantasmas del Rift',en:'Rift Ghosts'},
    tags:['stealth','pick','AP'],difficulty:'alta',
    winCondition:{es:'Maokai siembra semillas venenosas como support. Master Yi entra con Alfa Strike siendo intocable. Zoe pone a dormir carries con su Perla Somnífera. Twitch es invisible y envenena a todos desde la sombra. La combinación confunde al equipo enemigo.',en:'Maokai plants poisonous saplings as support. Master Yi enters with Alpha Strike being untargetable. Zoe puts carries to sleep with Sleepy Trouble Bubble. Twitch is invisible and poisons everyone from the shadows. The combination confuses the enemy team.'},
    team:[{role:'top',champ:'Malphite'},{role:'jgl',champ:'Master Yi'},{role:'mid',champ:'Zoe'},{role:'adc',champ:'Twitch'},{role:'sup',champ:'Maokai'}],patch:'7.1f'
  },
  {
    id:'la-jungla-salvaje',
    name:{es:'La Jungla Salvaje',en:'The Wild Jungle'},
    tags:['early-game','aggression','snowball'],difficulty:'alta',
    winCondition:{es:'Tryndamere spin constante y críticos masivos. Es intocable con ult activa. Rengar salta de arbustos y ejecuta carries. Talon escala paredes con Parkour y roamea entre líneas. Sivir Muro de Hechizos bloquea el CC. Pantheon aterriza desde el cielo.',en:'Tryndamere constant spinning with massive crits. Unkillable with active ult. Rengar leaps from bushes and executes carries. Talon scales walls with Parkour and roams between lanes. Sivir Spell Shield blocks CC. Pantheon lands from the sky.'},
    team:[{role:'top',champ:'Tryndamere'},{role:'jgl',champ:'Rengar'},{role:'mid',champ:'Talon'},{role:'adc',champ:'Sivir'},{role:'sup',champ:'Pantheon'}],patch:'7.1f'
  },
  {
    id:'el-enjambre',
    name:{es:'El Enjambre',en:'The Swarm'},
    tags:['poke','AP','siege'],difficulty:'media',
    winCondition:{es:'Singed envenena y reduce velocidad de los que le persiguen. Olaf avanza sin parar ignorando slow. Brand explota en cadena entre todos los envenenados. Vel\'Koz lanza su investigación de 5 partes desde atrás. Zeri reposiciona a velocidad máxima.',en:'Singed poisons and slows those who chase him. Olaf advances non-stop ignoring slows. Brand chain explodes between all poisoned enemies. Vel\'Koz fires 5-part research from behind. Zeri repositions at maximum speed.'},
    team:[{role:'top',champ:'Singed'},{role:'jgl',champ:'Olaf'},{role:'mid',champ:'Brand'},{role:'adc',champ:'Zeri'},{role:'sup',champ:'Vel\'Koz'}],patch:'7.1f'
  },
  {
    id:'fuego-y-hielo',
    name:{es:'Fuego y Hielo',en:'Fire and Ice'},
    tags:['AP','CC','teamfight'],difficulty:'media',
    winCondition:{es:'Kennen carga electricidad y stun masivo. Shyvana escupe fuego en forma de dragón. Lissandra congela con hielo y se enterra a sí misma. Vayne true damage penetra todo. Sona ult Crescendo paraliza mientras Kennen y Shyvana explotan.',en:'Kennen charges electricity with mass stun. Shyvana breathes fire in dragon form. Lissandra freezes with ice and entombs herself. Vayne true damage penetrates everything. Sona Crescendo ult paralyzes while Kennen and Shyvana explode.'},
    team:[{role:'top',champ:'Kennen'},{role:'jgl',champ:'Shyvana'},{role:'mid',champ:'Lissandra'},{role:'adc',champ:'Vayne'},{role:'sup',champ:'Sona'}],patch:'7.1f'
  },
  {
    id:'rey-de-baron',
    name:{es:'Rey de Barón',en:'Baron King'},
    tags:['split','poke','scaling'],difficulty:'media',
    winCondition:{es:'Urgot controla la línea de Barón con sus cadenas. Graves hace daño explosivo en jungla. Orianna shockwave agrupa en teamfight. Lucian daño rápido de doble disparo. Leona solar ult stun masivo para el teamfight decisivo. Ganar barón y cerrar el juego.',en:'Urgot controls Baron lane with chains. Graves deals explosive damage in jungle. Orianna Shockwave groups in teamfight. Lucian quick double-shot damage. Leona Solar Flare massive stun for decisive teamfight. Win Baron and close the game.'},
    team:[{role:'top',champ:'Urgot'},{role:'jgl',champ:'Graves'},{role:'mid',champ:'Orianna'},{role:'adc',champ:'Lucian'},{role:'sup',champ:'Leona'}],patch:'7.1f'
  },
  {
    id:'la-fortaleza-viviente',
    name:{es:'La Fortaleza Viviente',en:'The Living Fortress'},
    tags:['tank','engage','teamfight'],difficulty:'fácil',
    winCondition:{es:'Dr. Mundo se cura masivamente. Poppy empuja carries con Devastación y W anti-dash. Heimerdinger coloca torres en posiciones clave. Sivir AOE de ola y escudo. Rell tanque y engage con carga magnética. El equipo resiste todo el daño.',en:'Dr. Mundo heals massively. Poppy pushes carries with Devastating Blow and W anti-dash. Heimerdinger places turrets in key positions. Sivir wave AOE and shield. Rell tanks and engages with magnetic charge. The team absorbs all damage.'},
    team:[{role:'top',champ:'Dr. Mundo'},{role:'jgl',champ:'Poppy'},{role:'mid',champ:'Heimerdinger'},{role:'adc',champ:'Sivir'},{role:'sup',champ:'Rell'}],patch:'7.1f'
  },
  {
    id:'alianza-legendaria',
    name:{es:'La Alianza',en:'The Alliance'},
    tags:['synergy','engage','scaling'],difficulty:'media',
    winCondition:{es:'Rakan y Xayah son el mejor bot duo del juego con sinergias únicas: Rakan inicia y Xayah detona. Ahri seduce en mid. Kindred marca al objetivo más peligroso. Sion absorbe el engage enemigo mientras el equipo hace el daño.',en:'Rakan and Xayah are the best bot duo with unique synergies: Rakan initiates and Xayah detonates. Ahri charms in mid. Kindred marks the most dangerous target. Sion absorbs enemy engage while the team deals damage.'},
    team:[{role:'top',champ:'Sion'},{role:'jgl',champ:'Kindred'},{role:'mid',champ:'Ahri'},{role:'adc',champ:'Xayah'},{role:'sup',champ:'Rakan'}],patch:'7.1f'
  },
  {
    id:'el-ultimo-suspiro',
    name:{es:'El Último Suspiro',en:'The Last Breath'},
    tags:['AP','burst','pick'],difficulty:'alta',
    winCondition:{es:'Veigar atrapa en jaula y mata de un golpe con ult Event Horizon + Villainy. Vex empuja con miedo pasivo a los que saltan. Nocturne apaga la visión para el combo. Twitch envenena invisible. Zyra crea plantas que bloquean el avance.',en:'Veigar traps in cage and one-shots with Event Horizon + Villainy ult. Vex fear-repels enemies that jump on her. Nocturne cuts vision for the combo. Twitch poisons while invisible. Zyra creates plants that block advance.'},
    team:[{role:'top',champ:'Malphite'},{role:'jgl',champ:'Nocturne'},{role:'mid',champ:'Veigar'},{role:'adc',champ:'Twitch'},{role:'sup',champ:'Zyra'}],patch:'7.1f'
  },
  {
    id:'las-leyendas',
    name:{es:'Las Leyendas',en:'The Legends'},
    tags:['teamfight','scaling','AOE'],difficulty:'media',
    winCondition:{es:'Aatrox ult revive al morir. Lee Sin patada icónica envía al carry al equipo enemigo. Orianna shockwave masivo. Jhin 4 balas perfectas - la última siempre crítico. Thresh linterna para rescatar y su caja impide la huida. Juego de mecánicas perfectas.',en:'Aatrox ult revives on death. Lee Sin iconic kick sends carry into the enemy team. Orianna massive Shockwave. Jhin 4 perfect bullets - last always crits. Thresh lantern for rescue and his box prevents escape. Perfect mechanics gameplay.'},
    team:[{role:'top',champ:'Aatrox'},{role:'jgl',champ:'Lee Sin'},{role:'mid',champ:'Orianna'},{role:'adc',champ:'Jhin'},{role:'sup',champ:'Thresh'}],patch:'7.1f'
  },
  {
    id:'aurora-boreal',
    name:{es:'Aurora Boreal',en:'Northern Lights'},
    tags:['AP','mobility','burst'],difficulty:'alta',
    winCondition:{es:'Aurora hace daño mágico y tiene excellent movilidad con su E. Kindred marca targets en la jungla. Aurelion Sol escala infinitamente. Vayne true damage complementa el AP. Nami ola y heals mantienen al equipo en pie.',en:'Aurora deals magic damage with excellent E mobility. Kindred marks targets in jungle. Aurelion Sol scales infinitely. Vayne true damage complements AP. Nami wave and heals keep the team standing.'},
    team:[{role:'top',champ:'Aurora'},{role:'jgl',champ:'Kindred'},{role:'mid',champ:'Aurelion Sol'},{role:'adc',champ:'Vayne'},{role:'sup',champ:'Nami'}],patch:'7.1f'
  },
  {
    id:'el-tsunami',
    name:{es:'El Tsunami',en:'The Tsunami'},
    tags:['engage','AOE','teamfight'],difficulty:'media',
    winCondition:{es:'Nami lanza ola de marea que empuja a todos. Poppy golpea contra la pared con Demolición. Sion carga y derrumba la primera línea. Lux rayo al carry aturdido. Ashe flecha de hielo enlentece para los remataed.',en:'Nami launches tidal wave that pushes everyone. Poppy wall-slams with Demolish. Sion charges and demolishes the front line. Lux ray on the stunned carry. Ashe ice arrow slows for the finishers.'},
    team:[{role:'top',champ:'Sion'},{role:'jgl',champ:'Poppy'},{role:'mid',champ:'Lux'},{role:'adc',champ:'Ashe'},{role:'sup',champ:'Nami'}],patch:'7.1f'
  },
  {
    id:'la-caza-eterna',
    name:{es:'La Caza Eterna',en:'The Eternal Hunt'},
    tags:['pick','roam','dive'],difficulty:'alta',
    winCondition:{es:'Warwick persigue con E invisible a quien tenga menos del 50% de vida. Rengar marca presa desde la jungla. Kha\'Zix evoluciona con cada kill aislado. Urgot controla el terreno. Blitzcrank jala al carry al inicio del teamfight.',en:'Warwick chases with invisible E anyone below 50% HP. Rengar marks prey from jungle. Kha\'Zix evolves with each isolated kill. Urgot controls terrain. Blitzcrank pulls carry at teamfight start.'},
    team:[{role:'top',champ:'Urgot'},{role:'jgl',champ:'Warwick'},{role:'mid',champ:'Kha\'Zix'},{role:'adc',champ:'Jinx'},{role:'sup',champ:'Blitzcrank'}],patch:'7.1f'
  },
  {
    id:'camino-del-samurai',
    name:{es:'Camino del Samurai',en:'Path of the Samurai'},
    tags:['dive','carry','scaling'],difficulty:'alta',
    winCondition:{es:'Jax es el mejor 1v1 del juego con 3 items. Master Yi medita siendo intocable y Alfa Strike rota entre múltiples enemigos. Vayne kita con E paso de retroceso. Akali combo de burst invisible. Yuumi es invulnerable dentro de Master Yi y le cura.',en:'Jax is the best 1v1 in the game with 3 items. Master Yi meditates being untargetable and Alpha Strike rotates between multiple enemies. Vayne kites with E backstep. Akali invisible burst combo. Yuumi is invulnerable inside Master Yi and heals him.'},
    team:[{role:'top',champ:'Jax'},{role:'jgl',champ:'Master Yi'},{role:'mid',champ:'Akali'},{role:'adc',champ:'Vayne'},{role:'sup',champ:'Yuumi'}],patch:'7.1f'
  },
  {
    id:'la-telarana',
    name:{es:'La Telaraña',en:'The Spider Web'},
    tags:['CC','pick','control'],difficulty:'media',
    winCondition:{es:'Morgana ata con Cadena Oscura 3 segundos. Ryze ult teletransporta al equipo al flanco. Poppy Devastación empuja carries fuera del teamfight. Vi ult charge impara a un carry. Caitlyn trampa bajo el atado de Morgana para daño doble.',en:'Morgana binds with Dark Binding for 3 seconds. Ryze ult teleports team to the flank. Poppy Heroic Charge pushes carries out of teamfight. Vi ult charge stops a carry. Caitlyn trap under Morgana bind for double damage.'},
    team:[{role:'top',champ:'Poppy'},{role:'jgl',champ:'Vi'},{role:'mid',champ:'Ryze'},{role:'adc',champ:'Caitlyn'},{role:'sup',champ:'Morgana'}],patch:'7.1f'
  },
  {
    id:'aurora-de-invierno',
    name:{es:'Aurora de Invierno',en:'Winter Aurora'},
    tags:['AP','burst','scaling'],difficulty:'alta',
    winCondition:{es:'Aurora domina la línea con movilidad y daño mágico. Lissandra congela y se entomba a sí misma cuando la focusean. Shyvana en forma de dragón de hielo vuela. Tristana destruye torres con Q pasiva. Soraka cura infinitamente manteniendo a Aurora y Tristana vivas.',en:'Aurora dominates lane with mobility and magic damage. Lissandra freezes and entombs herself when focused. Shyvana in ice dragon form flies. Tristana destroys towers with Q passive. Soraka heals infinitely keeping Aurora and Tristana alive.'},
    team:[{role:'top',champ:'Aurora'},{role:'jgl',champ:'Shyvana'},{role:'mid',champ:'Lissandra'},{role:'adc',champ:'Tristana'},{role:'sup',champ:'Soraka'}],patch:'7.1f'
  },
  {
    id:'el-carnaval',
    name:{es:'El Carnaval',en:'The Carnival'},
    tags:['AP','AOE','teamfight'],difficulty:'media',
    winCondition:{es:'Annie invoca Tibbers con stun de AOE. Shyvana transforma a dragón y escupe fuego. Gragas E desplaza al carry enemigo lejos de su equipo. Seraphine ult encadena a todos los enemies con Nota Final. Jinx explota acelerando con cada kill.',en:'Annie summons Tibbers with AOE stun. Shyvana transforms to dragon and breathes fire. Gragas E displaces enemy carry away from their team. Seraphine Encore chains all enemies. Jinx rockets accelerate with every kill.'},
    team:[{role:'top',champ:'Gragas'},{role:'jgl',champ:'Shyvana'},{role:'mid',champ:'Annie'},{role:'adc',champ:'Jinx'},{role:'sup',champ:'Seraphine'}],patch:'7.1f'
  },
  {
    id:'pokéadores-maestros',
    name:{es:'Los Pokéadores Maestros',en:'Master Pokers'},
    tags:['poke','siege','control'],difficulty:'media',
    winCondition:{es:'Jayce poke de largo rango en forma cañón. Nidalee javelin desde jungla hace doble daño a larga distancia. Mel refleja proyectiles. Varus carga flecha de largo alcance con sangrado. Karma escudo E y poke de Q. Ganar el intercambio de daño antes del teamfight.',en:'Jayce long-range poke in cannon form. Nidalee javelin from jungle deals double damage at long range. Mel reflects projectiles. Varus charges long-range arrow with bleed. Karma E shield and Q poke. Win the damage exchange before teamfight.'},
    team:[{role:'top',champ:'Jayce'},{role:'jgl',champ:'Nidalee'},{role:'mid',champ:'Mel'},{role:'adc',champ:'Varus'},{role:'sup',champ:'Karma'}],patch:'7.1f'
  },
  {
    id:'el-nido-de-serpientes',
    name:{es:'El Nido de Serpientes',en:'The Snake Pit'},
    tags:['pick','assassin','roam'],difficulty:'alta',
    winCondition:{es:'Akshan elimina al asesino que mata a un aliado y revive al aliado. Rengar salta y one-shots. Zed combo de sombras sin posible dodge. Samira necesita 6 estilo para Caos Salvaje. Blitzcrank jala al carry vulnerable al inicio.',en:'Akshan eliminates the killer who kills an ally and revives the ally. Rengar leaps and one-shots. Zed shadow combo with no possible dodge. Samira needs 6 style for Wild Rush. Blitzcrank pulls vulnerable carry at start.'},
    team:[{role:'top',champ:'Akshan'},{role:'jgl',champ:'Rengar'},{role:'mid',champ:'Zed'},{role:'adc',champ:'Samira'},{role:'sup',champ:'Blitzcrank'}],patch:'7.1f'
  },
  {
    id:'el-ciclon',
    name:{es:'El Ciclón',en:'The Cyclone'},
    tags:['AOE','engage','CC'],difficulty:'media',
    winCondition:{es:'Gnar transforma en Mega Gnar y pared slam. Poppy E empuja carries fuera del teamfight. Rell magnetiza y encadena a todos. Lissandra congela al que intenta escapar. Jinx explota con rocket sobre todos los CC-eados. El ciclon de control atrapa a todos.',en:'Gnar transforms to Mega Gnar and wall slam. Poppy E pushes carries out of teamfight. Rell magnetizes and chains everyone. Lissandra freezes those trying to escape. Jinx rockets over all CC-ed targets. The control cyclone traps everyone.'},
    team:[{role:'top',champ:'Gnar'},{role:'jgl',champ:'Poppy'},{role:'mid',champ:'Lissandra'},{role:'adc',champ:'Jinx'},{role:'sup',champ:'Rell'}],patch:'7.1f'
  }
];

const all = [...fixedExisting, ...newComps];
console.log('New total:', all.length);
fs.writeFileSync('./data/compositions.json', JSON.stringify(all, null, 2));
console.log('Done');
