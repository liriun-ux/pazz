export interface PizzaSize {
  id: 'individual' | 'mediana' | 'familiar';
  name: string;
  diameter: string;
  serves: string;
  slices: number;
  price: number;
  calories: string;
}

export interface Pizza {
  id: string;
  slug: string;
  name: string;
  italianName: string;
  tagline: string;
  description: string;
  story: string;
  image: string;
  sizes: PizzaSize[];
  ingredients: {
    name: string;
    origin: string;
    dop?: boolean;
    description: string;
  }[];
  doughOptions: {
    id: string;
    name: string;
    description: string;
    extraPrice: number;
  }[];
  customExtras: {
    id: string;
    name: string;
    price: number;
  }[];
  pairingRecommendation: {
    name: string;
    type: 'Refresco Artesanal' | 'Cerveza Italiana' | 'Vino';
    description: string;
  };
  bakingSpec: {
    temperature: string;
    time: string;
    woodType: string;
  };
  allergens: string[];
  rating: number;
  reviewsCount: number;
  badge: string;
  spicyLevel?: number;
  vegetarian?: boolean;
}

export interface Beverage {
  id: string;
  name: string;
  italianSubtitle: string;
  category: 'refrescos' | 'aguas' | 'cervezas' | 'vinos';
  volume: string;
  price: number;
  description: string;
  alcoholFree: boolean;
  origin: string;
  badge?: string;
}

export interface AntipastiOrDessert {
  id: string;
  name: string;
  category: 'entrante' | 'postre';
  price: number;
  description: string;
  origin: string;
  vegetarian?: boolean;
}

export const PIZZAS: Pizza[] = [
  {
    id: 'margherita',
    slug: 'margherita',
    name: 'Margherita Verace D.O.P.',
    italianName: 'Pizza Margherita Classica Napoletana',
    tagline: 'El emblema indiscutible de Nápoles desde 1889',
    description: 'Nuestra interpretación más pura y canónica: tomates San Marzano D.O.P. recolectados en las faldas del Vesubio, mozzarella de búfala campana cremosa, hojas frescas de albahaca genovesa y un hilo de aceite de oliva virgen extra de cosecha temprana.',
    story: 'Creada originalmente por el pizzaiolo Raffaele Esposito en honor a la Reina Margarita de Saboya con los colores patrios de la bandera italiana. Horneamos esta joya a 480°C durante solo 70 segundos para preservar la humedad viva del tomate y la elasticidad etérea de nuestra masa fermentada durante 48 horas.',
    image: '/src/assets/images/pizza_margherita_verace_1790992045838.jpg',
    badge: 'La Reina de Nápoles',
    vegetarian: true,
    rating: 4.95,
    reviewsCount: 312,
    sizes: [
      {
        id: 'individual',
        name: 'Individual',
        diameter: '26 cm',
        serves: '1 persona',
        slices: 4,
        price: 11.50,
        calories: '680 kcal'
      },
      {
        id: 'mediana',
        name: 'Mediana',
        diameter: '33 cm',
        serves: '2 personas',
        slices: 6,
        price: 15.90,
        calories: '1.140 kcal'
      },
      {
        id: 'familiar',
        name: 'Familiar',
        diameter: '40 cm',
        serves: '3 a 4 personas',
        slices: 8,
        price: 21.50,
        calories: '1.760 kcal'
      }
    ],
    ingredients: [
      {
        name: 'Pomodoro San Marzano dell\'Agro Sarnese-Nocerino',
        origin: 'Campania D.O.P.',
        dop: true,
        description: 'Triturado a mano, dulzor natural y acidez equilibrada de suelo volcánico.'
      },
      {
        name: 'Mozzarella di Bufala Campana Fresca',
        origin: 'Caserta D.O.P.',
        dop: true,
        description: 'Elaborada cada 48 horas con leche entera de búfala seleccionada.'
      },
      {
        name: 'Basilico Fresco Genovese',
        origin: 'Liguria D.O.P.',
        dop: true,
        description: 'Albahaca de hoja tierna recogida por la mañana, aroma intenso sin notas amargas.'
      },
      {
        name: 'Olio Extra Vergine di Oliva Frantoio',
        origin: 'Toscana',
        description: 'Prensado en frío en las colinas de Florencia, notas a hierba fresca y almendra verde.'
      }
    ],
    doughOptions: [
      {
        id: 'tradizionale',
        name: 'Masa Madre Napolitana 48h',
        description: 'Harina Caputo 00, alta hidratación (72%), digestión ligera y cornicione inflado.',
        extraPrice: 0.00
      },
      {
        id: 'cornicione-ripieno',
        name: 'Borde Relleno de Ricotta & Fior di Latte',
        description: 'Cornicione aireado relleno a mano de ricotta fresca batida con pimienta negra.',
        extraPrice: 2.50
      },
      {
        id: 'integrale',
        name: 'Masa Rústica Multicereal 72h',
        description: 'Cereales ancestrales molidos a la piedra con notas tostadas a avellana.',
        extraPrice: 1.50
      }
    ],
    customExtras: [
      { id: 'extra-mozzarella', name: 'Extra Mozzarella di Bufala (+80g)', price: 2.20 },
      { id: 'albahaca-fresca', name: 'Ramillete adicional Albahaca Genovesa', price: 0.80 },
      { id: 'parmigiano-reggiano', name: 'Virutas de Parmigiano Reggiano 24 meses', price: 1.80 },
      { id: 'aceite-guindilla', name: 'Ampolla de Aceite de Oliva con Peperoncino', price: 0.90 }
    ],
    pairingRecommendation: {
      name: 'San Pellegrino Limonata BIO',
      type: 'Refresco Artesanal',
      description: 'El toque cítrico de limones sicilianos madurados al sol corta perfectamente la untuosidad de la mozzarella de búfala.'
    },
    bakingSpec: {
      temperature: '480°C',
      time: '70-80 segundos',
      woodType: 'Roble y haya natural estacionada'
    },
    allergens: ['Gluten', 'Lácteos']
  },
  {
    id: 'diavola',
    slug: 'diavola',
    name: 'Diavola Rustica Calabrese',
    italianName: 'Pizza alla Diavola con Nduja & Salame',
    tagline: 'Fuego lento, salame artesanal crujiente y miel picante',
    description: 'Para los amantes del carácter intenso: base de pomodoro San Marzano, fior di latte fundente, rodajas doradas de salame piccante de Calabria tostadas al horno, matices ahumados de ‘nduja de Spilinga y un sutil hilo de miel de flores silvestres infusionada con guindilla.',
    story: 'Inspirada en las tradiciones calabras donde el peperoncino es el alma de la despensa. Seleccionamos salame curado de cerdo negro y lo cortamos en lonchas que se arquean formando pequeñas copas crocantes que retienen sus propios aceites aromáticos.',
    image: '/src/assets/images/pizza_diavola_rustica_1790992059786.jpg',
    badge: 'Fuego & Carácter',
    spicyLevel: 3,
    rating: 4.91,
    reviewsCount: 268,
    sizes: [
      {
        id: 'individual',
        name: 'Individual',
        diameter: '26 cm',
        serves: '1 persona',
        slices: 4,
        price: 13.50,
        calories: '790 kcal'
      },
      {
        id: 'mediana',
        name: 'Mediana',
        diameter: '33 cm',
        serves: '2 personas',
        slices: 6,
        price: 18.50,
        calories: '1.290 kcal'
      },
      {
        id: 'familiar',
        name: 'Familiar',
        diameter: '40 cm',
        serves: '3 a 4 personas',
        slices: 8,
        price: 24.50,
        calories: '1.980 kcal'
      }
    ],
    ingredients: [
      {
        name: 'Salame Piccante Stagionato',
        origin: 'Calabria I.G.P.',
        description: 'Curado al aire de montaña con pimentón rojo y semillas de hinojo salvaje.'
      },
      {
        name: '\'Nduja Artigianale di Spilinga',
        origin: 'Vibo Valentia',
        description: 'Embutido untable de cerdo con pimientos picantes secados al sol.'
      },
      {
        name: 'Fior di Latte dell\'Appennino',
        origin: 'Agerola',
        description: 'Queso hilado de leche de vaca de pasto, fundido perfecto sin soltar exceso de suero.'
      },
      {
        name: 'Miele di Zagara al Peperoncino',
        origin: 'Calabria',
        description: 'Miel de azahar con infusión tibia de chiles habaneros y cayena.'
      }
    ],
    doughOptions: [
      {
        id: 'tradizionale',
        name: 'Masa Madre Napolitana 48h',
        description: 'Harina Caputo 00, alta hidratación (72%), digestión ligera y cornicione inflado.',
        extraPrice: 0.00
      },
      {
        id: 'cornicione-ripieno',
        name: 'Borde Relleno de Ricotta & Fior di Latte',
        description: 'Cornicione aireado relleno a mano de ricotta fresca batida con pimienta negra.',
        extraPrice: 2.50
      },
      {
        id: 'integrale',
        name: 'Masa Rústica Multicereal 72h',
        description: 'Cereales ancestrales molidos a la piedra con notas tostadas a avellana.',
        extraPrice: 1.50
      }
    ],
    customExtras: [
      { id: 'extra-nduja', name: 'Toque extra \'Nduja de Spilinga', price: 2.00 },
      { id: 'aceitunas-kalamata', name: 'Aceitunas negras descarozadas al tomillo', price: 1.50 },
      { id: 'cebolla-caramelizada', name: 'Cebolla morada de Tropea confitada', price: 1.40 },
      { id: 'miel-picante', name: 'Gotero adicional de Miel Picante', price: 1.00 }
    ],
    pairingRecommendation: {
      name: 'Chinotto Tradizionale Lurisia',
      type: 'Refresco Artesanal',
      description: 'El refrescante contraste amargo y herbal del chinotto limpia el paladar tras cada bocado picante y ahumado.'
    },
    bakingSpec: {
      temperature: '470°C',
      time: '85 segundos',
      woodType: 'Madera de encina y olivo aromático'
    },
    allergens: ['Gluten', 'Lácteos']
  },
  {
    id: 'quattro-formaggi',
    slug: 'quattro-formaggi',
    name: 'Quattro Formaggi & Tartufo',
    italianName: 'Pizza Bianca ai 4 Formaggi Pregiati con Tartufo Nero',
    tagline: 'Sinfonía blanca de quesos nobles y esencia de trufa umbra',
    description: 'Una experiencia gourmet sin tomate (pizza bianca): base sedosa de crema de fior di latte, gorgonzola dulce de Novara con vetas azuladas cremosas, queso fontina alpino fundido, lascas crujientes de Parmigiano Reggiano madurado 24 meses y una emulsión de trufa negra de Norcia con pimienta negra recién molida.',
    story: 'Los 4 quesos representan las cumbres lecheras del norte de Italia: Lombardía, Piamonte, Valle de Aosta y Emilia-Romaña. Nuestro maestro quesero equilibra la salinidad, la cremosidad y el toque boscoso de la trufa negra para lograr un bocado envolvente e inolvidable.',
    image: '/src/assets/images/pizza_quattro_formaggi_1790992068836.jpg',
    badge: 'Selección Gourmet',
    vegetarian: true,
    rating: 4.97,
    reviewsCount: 194,
    sizes: [
      {
        id: 'individual',
        name: 'Individual',
        diameter: '26 cm',
        serves: '1 persona',
        slices: 4,
        price: 14.50,
        calories: '860 kcal'
      },
      {
        id: 'mediana',
        name: 'Mediana',
        diameter: '33 cm',
        serves: '2 personas',
        slices: 6,
        price: 19.90,
        calories: '1.380 kcal'
      },
      {
        id: 'familiar',
        name: 'Familiar',
        diameter: '40 cm',
        serves: '3 a 4 personas',
        slices: 8,
        price: 25.90,
        calories: '2.100 kcal'
      }
    ],
    ingredients: [
      {
        name: 'Gorgonzola Dolce D.O.P.',
        origin: 'Novara, Piamonte',
        dop: true,
        description: 'Queso azul de pasta blanda, dulzor cremoso con sutiles vetas verdes sin amargor.'
      },
      {
        name: 'Parmigiano Reggiano 24 Mesi',
        origin: 'Parma D.O.P.',
        dop: true,
        description: 'Cristales de tirosina crujientes y notas profundas a mantequilla tostada y frutos secos.'
      },
      {
        name: 'Fontina Valdostana Alpina',
        origin: 'Valle d\'Aosta D.O.P.',
        dop: true,
        description: 'Elaborado con leche cruda de vacas alpinas, untuoso y con bouquet de hierba silvestre.'
      },
      {
        name: 'Crema di Tartufo Nero Pregiato',
        origin: 'Norcia, Umbría',
        description: 'Trufa negra de verano molida con aceite de oliva virgen y sal marina de Cervia.'
      }
    ],
    doughOptions: [
      {
        id: 'tradizionale',
        name: 'Masa Madre Napolitana 48h',
        description: 'Harina Caputo 00, alta hidratación (72%), digestión ligera y cornicione inflado.',
        extraPrice: 0.00
      },
      {
        id: 'cornicione-ripieno',
        name: 'Borde Relleno de Ricotta & Fior di Latte',
        description: 'Cornicione aireado relleno a mano de ricotta fresca batida con pimienta negra.',
        extraPrice: 2.50
      },
      {
        id: 'integrale',
        name: 'Masa Rústica Multicereal 72h',
        description: 'Cereales ancestrales molidos a la piedra con notas tostadas a avellana.',
        extraPrice: 1.50
      }
    ],
    customExtras: [
      { id: 'nueces-tostadas', name: 'Nueces de Sorrento tostadas con miel', price: 1.60 },
      { id: 'extra-trufa', name: 'Láminas de trufa negra fresca', price: 3.50 },
      { id: 'pera-confitada', name: 'Finas láminas de pera pochada al vino blanco', price: 1.50 },
      { id: 'pimienta-tellicherry', name: 'Molido fresco pimienta Tellicherry extra', price: 0.50 }
    ],
    pairingRecommendation: {
      name: 'Aranciata Rossa San Pellegrino BIO',
      type: 'Refresco Artesanal',
      description: 'El brillo refrescante de la naranja sanguina equilibra con maestría la opulencia de los quesos nobles.'
    },
    bakingSpec: {
      temperature: '475°C',
      time: '75 segundos',
      woodType: 'Haya blanca seleccionada'
    },
    allergens: ['Gluten', 'Lácteos', 'Puede contener trazas de frutos secos']
  },
  {
    id: 'prosciutto-funghi',
    slug: 'prosciutto-funghi',
    name: 'Prosciutto & Funghi Selvatici',
    italianName: 'Pizza Tradizionale con Prosciutto di Parma e Funghi Porcini',
    tagline: 'La elegancia del bosque toscano y el jamón de Parma curado',
    description: 'Una armonía irresistible entre tierra y tradición: base de salsa de tomate San Marzano sazonada con orégano silvestre, fior di latte, mezcla de setas porcini boletus salteadas en mantequilla y ajo tierno, coronada al salir del horno con delicadas lonchas de Prosciutto di Parma curado 18 meses y hojas de tomillo fresco.',
    story: 'El secreto reside en colocar el jamón curado en crudo sobre la pizza recién retirada del horno de leña: el calor residual funde suavemente la grasa noble del prosciutto sin deshidratarlo, liberando un perfume inconfundible que se abraza a las setas de montaña.',
    image: '/src/assets/images/pizza_prosciutto_funghi_1790992078248.jpg',
    badge: 'Tradición de Parma',
    rating: 4.93,
    reviewsCount: 228,
    sizes: [
      {
        id: 'individual',
        name: 'Individual',
        diameter: '26 cm',
        serves: '1 persona',
        slices: 4,
        price: 13.90,
        calories: '740 kcal'
      },
      {
        id: 'mediana',
        name: 'Mediana',
        diameter: '33 cm',
        serves: '2 personas',
        slices: 6,
        price: 18.90,
        calories: '1.260 kcal'
      },
      {
        id: 'familiar',
        name: 'Familiar',
        diameter: '40 cm',
        serves: '3 a 4 personas',
        slices: 8,
        price: 24.90,
        calories: '1.920 kcal'
      }
    ],
    ingredients: [
      {
        name: 'Prosciutto di Parma D.O.P. Stagionato 18 Mesi',
        origin: 'Langhirano, Parma',
        dop: true,
        description: 'Curado lentamente con aire de los Apeninos, veteado dulce y fundente en boca.'
      },
      {
        name: 'Funghi Porcini Selvatici (Boletus Edulis)',
        origin: 'Bosques de Toscana',
        description: 'Setas silvestres recolectadas a mano, salteadas a fuego vivo con romero y ajo confitado.'
      },
      {
        name: 'Fior di Latte dell\'Appennino',
        origin: 'Agerola',
        description: 'Queso fresco de vaca elaborado por maestros casari según la tradición artesanal.'
      },
      {
        name: 'Timo Selvatico & Olio al Tartufo',
        origin: 'Umbria',
        description: 'Hojas frescas de tomillo aromático y unas gotas de aceite virgen aromatizado.'
      }
    ],
    doughOptions: [
      {
        id: 'tradizionale',
        name: 'Masa Madre Napolitana 48h',
        description: 'Harina Caputo 00, alta hidratación (72%), digestión ligera y cornicione inflado.',
        extraPrice: 0.00
      },
      {
        id: 'cornicione-ripieno',
        name: 'Borde Relleno de Ricotta & Fior di Latte',
        description: 'Cornicione aireado relleno a mano de ricotta fresca batida con pimienta negra.',
        extraPrice: 2.50
      },
      {
        id: 'integrale',
        name: 'Masa Rústica Multicereal 72h',
        description: 'Cereales ancestrales molidos a la piedra con notas tostadas a avellana.',
        extraPrice: 1.50
      }
    ],
    customExtras: [
      { id: 'extra-prosciutto', name: 'Ración extra Prosciutto di Parma (+50g)', price: 2.80 },
      { id: 'rucola-fresca', name: 'Corona de Rúcula silvestre fresca', price: 1.20 },
      { id: 'setas-extra', name: 'Champiñones portobello laminados salteados', price: 1.60 },
      { id: 'lascas-grana', name: 'Lascas de Grana Padano reserva', price: 1.80 }
    ],
    pairingRecommendation: {
      name: 'Birra Moretti L\'Autentica (o Acqua Panna Toscana)',
      type: 'Cerveza Italiana',
      description: 'Los tonos de malta suave y lúpulo fino complementan la terrosidad de los porcini y el jamón.'
    },
    bakingSpec: {
      temperature: '475°C',
      time: '80 segundos',
      woodType: 'Roble europeo y sarmiento de vid'
    },
    allergens: ['Gluten', 'Lácteos']
  }
];

export const BEVERAGES: Beverage[] = [
  {
    id: 'bev-sanpel-limonata',
    name: 'San Pellegrino Limonata BIO',
    italianSubtitle: 'Limonada artesanal italiana con limones de Sicilia',
    category: 'refrescos',
    volume: '330 ml',
    price: 3.20,
    description: 'Elaborada con 16% de zumo de limones sicilianos madurados al sol y pulpa natural. Chispeante, cítrica y refrescante.',
    alcoholFree: true,
    origin: 'San Pellegrino Terme, Italia',
    badge: 'Especialidad Italiana'
  },
  {
    id: 'bev-sanpel-aranciata-rossa',
    name: 'San Pellegrino Aranciata Rossa',
    italianSubtitle: 'Refresco espumoso de naranjas sanguinas IGP',
    category: 'refrescos',
    volume: '330 ml',
    price: 3.20,
    description: 'Sabor dulce y ligeramente ácido con el color rubí característico de la naranja sanguina siciliana.',
    alcoholFree: true,
    origin: 'Sicilia, Italia',
    badge: 'Favorito Clientes'
  },
  {
    id: 'bev-lurisia-chinotto',
    name: 'Lurisia Chinotto Tradizionale',
    italianSubtitle: 'El icónico refresco cítrico ambarino de Savona',
    category: 'refrescos',
    volume: '275 ml',
    price: 3.60,
    description: 'Infusión de cítricos de Chinotto del Presidio Slow Food de Liguria. Matices especiados, canela y retrogusto amargo placentero.',
    alcoholFree: true,
    origin: 'Liguria, Italia',
    badge: 'Slow Food'
  },
  {
    id: 'bev-coca-cola-glass',
    name: 'Coca-Cola Sabor Original',
    italianSubtitle: 'En botella de vidrio clásica bien fría',
    category: 'refrescos',
    volume: '330 ml',
    price: 2.80,
    description: 'La receta clásica servida con hielo y rodaja de limón italiano.',
    alcoholFree: true,
    origin: 'Embotellado en vidrio'
  },
  {
    id: 'bev-coca-cola-zero',
    name: 'Coca-Cola Zero Azúcar',
    italianSubtitle: 'Sin azúcar, servida en vidrio',
    category: 'refrescos',
    volume: '330 ml',
    price: 2.80,
    description: 'Máximo sabor refrescante con cero calorías y toque de limón fresco.',
    alcoholFree: true,
    origin: 'Embotellado en vidrio'
  },
  {
    id: 'bev-sprite-glass',
    name: 'Sprite Lima-Limón',
    italianSubtitle: 'Refresco transparente en botella de vidrio',
    category: 'refrescos',
    volume: '330 ml',
    price: 2.80,
    description: 'Burbujas intensas con notas naturales de lima fresca y limón.',
    alcoholFree: true,
    origin: 'Embotellado en vidrio'
  },
  {
    id: 'bev-fanta-orange',
    name: 'Fanta Naranja Italiana',
    italianSubtitle: 'Con zumo natural de naranja',
    category: 'refrescos',
    volume: '330 ml',
    price: 2.80,
    description: 'Sabor vibrante a naranja mediterránea con burbuja fina.',
    alcoholFree: true,
    origin: 'Embotellado en vidrio'
  },
  {
    id: 'bev-sanpel-sparkling-water',
    name: 'Acqua Minerale San Pellegrino con Gas',
    italianSubtitle: 'Agua mineral con burbuja efervescente natural',
    category: 'aguas',
    volume: '500 ml',
    price: 2.70,
    description: 'Emerge de manantiales alpinos con una efervescencia fina que limpia el paladar a la perfección.',
    alcoholFree: true,
    origin: 'Val Brembana, Alpes Italianos'
  },
  {
    id: 'bev-acqua-panna',
    name: 'Acqua Panna Naturale',
    italianSubtitle: 'Agua mineral toscana sin gas',
    category: 'aguas',
    volume: '500 ml',
    price: 2.70,
    description: 'Procedente de las colinas de Scarperia en Toscana, reconocida por su suavidad inigualable.',
    alcoholFree: true,
    origin: 'Toscana, Italia'
  },
  {
    id: 'bev-birra-moretti',
    name: 'Birra Moretti L\'Autentica',
    italianSubtitle: 'Cerveza lager tradicional de baja fermentación (4.6%)',
    category: 'cervezas',
    volume: '330 ml',
    price: 3.90,
    description: 'Rubia dorada con espuma fina y notas a corteza de pan y lúpulo aromático.',
    alcoholFree: false,
    origin: 'Udine, Italia'
  },
  {
    id: 'bev-peroni-azzurro',
    name: 'Peroni Nastro Azzurro',
    italianSubtitle: 'Premium lager italiana con maíz Nostrano (5.0%)',
    category: 'cervezas',
    volume: '330 ml',
    price: 4.20,
    description: 'Sabor seco, limpio y refrescante con amargor sutil ideal para pizzas artesanas.',
    alcoholFree: false,
    origin: 'Roma, Italia'
  },
  {
    id: 'bev-chianti-glass',
    name: 'Chianti Superiore DOCG (Copa)',
    italianSubtitle: 'Vino tinto toscano - 85% Sangiovese',
    category: 'vinos',
    volume: '150 ml',
    price: 4.50,
    description: 'Aromas a cereza madura, violeta y toque de roble. Ideal con pizzas con embutido o setas.',
    alcoholFree: false,
    origin: 'Colli Senesi, Toscana'
  }
];

export const ANTIPASTI_DESSERTS: AntipastiOrDessert[] = [
  {
    id: 'anti-burrata',
    name: 'Burrata Pugliese con Pesto Genovese',
    category: 'entrante',
    price: 11.50,
    description: 'Corazón cremoso de stracciatella de 200g, tomates cherry confitados en aceite de oliva y focaccia tibia.',
    origin: 'Andria, Puglia',
    vegetarian: true
  },
  {
    id: 'anti-bruschetta',
    name: 'Tris di Bruschette al Pomodoro & Aglio',
    category: 'entrante',
    price: 7.90,
    description: 'Pan casero de masa madre tostado al horno de leña con dados de tomate San Marzano, ajo frotado y albahaca.',
    origin: 'Tradición Campana',
    vegetarian: true
  },
  {
    id: 'des-tiramisu',
    name: 'Tiramisù Tradizionale della Nonna',
    category: 'postre',
    price: 6.50,
    description: 'Bizcochos Savoiardi empapados en café espresso Illy tostado, crema sedosa de mascarpone y cacao amargo amargo de Módena.',
    origin: 'Treviso, Véneto',
    vegetarian: true
  },
  {
    id: 'des-cannoli',
    name: 'Coppia di Cannoli Siciliani Artigianali',
    category: 'postre',
    price: 5.90,
    description: 'Corteza crujiente rellena al momento de crema de ricotta de oveja batida, chispas de chocolate y granillo de pistacho de Bronte.',
    origin: 'Palermo, Sicilia',
    vegetarian: true
  }
];

export interface CartItem {
  id: string; // unique item uuid/hash
  type: 'pizza' | 'beverage' | 'extra';
  itemId: string;
  name: string;
  sizeId?: 'individual' | 'mediana' | 'familiar';
  sizeName?: string;
  doughName?: string;
  extraIngredients?: string[];
  unitPrice: number;
  quantity: number;
  totalPrice: number;
  notes?: string;
}

export interface ReservationData {
  id: string;
  name: string;
  phone: string;
  email: string;
  date: string;
  time: string;
  guests: number;
  shift: 'almuerzo' | 'cena';
  seatingArea: 'terraza' | 'horno' | 'privada';
  specialNotes?: string;
  status: 'confirmada' | 'pendiente';
  createdAt: string;
}
