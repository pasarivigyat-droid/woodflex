import { BUSINESS, deliveryAreaNames, listInWords } from './site';

// Construction facts. The FAQ, the About page ("How we build") and the Materials page
// ("What's inside") all read these, so the wording and numbers stay identical everywhere.
export const BUILD_FACTS = {
  wood: 'We build in kiln-dried (KD) solid wood, including Ghana teak, Valsad teak, Burma Border teak, walnut, acacia and white ash. Kiln drying removes moisture before the wood is cut, which reduces warping and cracking later.',
  joinery:
    'We use mortise-and-tenon joinery, and 99% of our joinery is adhesive-based rather than held by nails and screws.',
  foam: 'We use foam from Sleepeeze and Century, chosen to suit the design. Every seat gets at least 2 inches of foam at a minimum of 40 density, with Recron in every seat. A latex layer can be added depending on your budget. We use full-size foam sheets, never offcuts, and a 500–600 GSM Majarpat lining under the upholstery.',
  warranty: 'Our furniture carries a 3-year warranty.',
} as const;

export interface Faq {
  id: string;
  q: string;
  a: string;
}

const deliveredTo = listInWords(deliveryAreaNames.filter((n) => n !== 'Surat'));

export const FAQS: Faq[] = [
  {
    id: 'location-delivery',
    q: 'Where is Woodflex Designs based, and where do you deliver?',
    a: `Our workshop is in Surat, Gujarat. We deliver across India, including ${deliveredTo}.`,
  },
  {
    id: 'experience',
    q: 'How long have you been making furniture?',
    a: `The Woodflex Designs workshop was set up in Surat in ${BUSINESS.foundingYear}. Behind it are 50 years of furniture-making experience.`,
  },
  {
    id: 'furniture',
    q: 'What furniture do you make?',
    a: 'Sofas, dining tables, dining chairs, lounge chairs, centre and side tables, planter stands, and café and retail seating — all made to order in solid wood.',
  },
  { id: 'wood', q: 'What wood do you use?', a: BUILD_FACTS.wood },
  { id: 'joinery', q: 'How are your frames joined?', a: BUILD_FACTS.joinery },
  { id: 'inside', q: 'What goes inside a Woodflex sofa or chair?', a: BUILD_FACTS.foam },
  {
    id: 'finishes',
    q: 'Which woods and finishes can I choose from?',
    a: 'We work in a wide range of solid woods, including Ghana teak, Valsad teak, Burma Border teak, walnut, acacia and white ash. Finishes include dark brown polish, natural light brown polish, matte black and wire-brushed.',
  },
  { id: 'warranty', q: 'Do you offer a warranty?', a: `Yes. ${BUILD_FACTS.warranty}` },
  {
    id: 'sample',
    q: 'Can I see a sample before I order?',
    a: 'Yes. We make a sample for your approval before producing the full order.',
  },
  {
    id: 'architects',
    q: 'Do you work with architects and interior designers?',
    a: 'Yes. We build from DWG files, PDFs and reference images, and share updates at each stage of production so there are no surprises on site.',
  },
  {
    id: 'own-drawing',
    q: 'Can you build furniture from my own drawing or reference photo?',
    a: 'Yes. We are manufacturers, not a design studio. We work from DWG files, PDFs, moodboards, reference photos or even rough sketches with sizes, and turn them into finished furniture.',
  },
  {
    id: 'quantity',
    q: 'Do you make single pieces or only bulk orders?',
    a: 'Both. Whether you need one prototype or 30 pieces for a project, our workshop is set up for it.',
  },
  {
    id: 'quote',
    q: 'How do I get a quote?',
    a: `Send us your drawings, photos or sizes on WhatsApp at ${BUSINESS.phoneDisplay} or through our contact page. We reply with feasibility, rough costing and timelines.`,
  },
];

// The six questions shown on the home page (full list lives on /faq).
const HOME_FAQ_IDS = ['location-delivery', 'experience', 'wood', 'warranty', 'sample', 'quote'];
export const HOME_FAQS = HOME_FAQ_IDS.map((id) => FAQS.find((f) => f.id === id)!);
