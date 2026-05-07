import React, { useState } from 'react';
import { ChevronDown, MapPin, Target, Briefcase, AlertTriangle } from 'lucide-react';
import AdBanner from '../components/AdBanner';

const schoolsData = [
  {
    id: 'esp',
    name: "ESP (École Supérieure Polytechnique)",
    logo: "https://esp.sn/wp-content/uploads/2019/11/logo-esp.png",
    location: "Dakar — UCAD",
    description: "La plus ancienne et prestigieuse école d'ingénieurs publique du Sénégal, rattachée à l'Université Cheikh Anta Diop. Elle délivre le DUT (Bac+2), le DIT (Bac+4) et le Diplôme d'Ingénieur de Conception — DIC (Bac+5).",
    filieres: ["Génie Informatique", "Génie Électrique", "Génie Mécanique", "Génie Civil", "Génie Chimique et Biologie Appliquée"],
    avantages: ["Réseau d'alumni exceptionnel — la plus ancienne du réseau REPFIS", "Laboratoires très bien équipés", "Situé au cœur de Dakar (Corniche Ouest)", "Trois niveaux de diplômes : DUT, DIT, DIC"],
    inconvenients: ["Très sélectif — concours propre en plus du REPFIS", "Effectifs importants en cycle DUT"],
    debouches: ["Ingénierie Logicielle & CTO", "Systèmes Embarqués", "Industrie Énergétique", "BTP & Génie Civil", "Chimie Industrielle"]
  },
  {
    id: 'ept',
    name: "EPT (École Polytechnique de Thiès)",
    logo: "https://upload.wikimedia.org/wikipedia/commons/1/14/EPT_logo.svg",
    location: "Thiès",
    description: "École d'excellence sous tutelle de l'État, fonctionnant en régime d'internat. Formation en 5 ans : 2 ans de tronc commun + 3 ans de spécialisation. Très reconnue pour sa rigueur et sa cohésion.",
    filieres: ["Génie Civil", "Génie Électromécanique & Aéronautique", "Génie Informatique et Télécommunications", "Génie Industriel"],
    avantages: ["Régime d'internat favorisant la concentration et la discipline", "Forte cohésion (esprit de corps)", "Taux d'insertion professionnelle très élevé", "Formation de 5 ans reconnue au niveau international"],
    inconvenients: ["Discipline et règles de vie strictes", "Éloignement de la capitale"],
    debouches: ["Direction de grands chantiers BTP", "Ingénierie Aéronautique & Maintenance", "Systèmes de Télécommunications", "Génie Industriel & Logistique"]
  },
  {
    id: 'ipsl',
    name: "IPSL (Institut Polytechnique de Saint-Louis)",
    logo: "https://www9.ugb.sn/ipsl/wp-content/uploads/2018/11/logo-ipsl.png",
    location: "Saint-Louis — UGB",
    description: "Institut d'ingénieurs de l'Université Gaston Berger (UGB) de Saint-Louis. Cadre d'études exceptionnel dans la capitale historique du Nord du Sénégal, reconnue pour sa rigueur scientifique.",
    filieres: ["Génie Civil", "Génie Électromécanique", "Génie Informatique et Télécoms"],
    avantages: ["Cadre universitaire d'exception à l'UGB", "Ville de Saint-Louis classée Patrimoine Mondial UNESCO", "Formation alignée sur les standards internationaux"],
    inconvenients: ["Éloignement des hubs industriels de Dakar", "Bassin d'emploi local plus restreint"],
    debouches: ["Télécommunications & Réseaux", "Sécurité Informatique", "Infrastructures Civiles & Hydraulique"]
  },
  {
    id: 'ufr-si',
    name: "UFR Sciences de l'Ingénieur (UIDT)",
    logo: "https://ufrsi.uidt.sn/wp-content/uploads/2021/04/logo-ufr-si-300x300.png",
    location: "Thiès",
    description: "Composante de l'Université Iba Der Thiam (UIDT). Propose des formations d'ingénieurs dans des filières ciblées dont la Géomatique — une spécialité rare et très recherchée au Sénégal.",
    filieres: ["Génie Civil", "Géotechnique", "Géomètre-Topographe", "Géomatique", "QHSE (Qualité, Hygiène, Sécurité, Environnement)"],
    avantages: ["Filière Géomatique rare et très demandée sur le marché", "Formation QHSE en forte croissance", "Soutien institutionnel fort de l'UIDT"],
    inconvenients: ["Infrastructures encore en développement comparées aux écoles historiques", "Réseau d'anciens encore limité"],
    debouches: ["Systèmes d'Information Géographique (SIG)", "Topographie & Cadastre", "Hygiène & Sécurité Industrielle", "Réseaux Électriques"]
  },
  {
    id: 'ensa',
    name: "ENSA (École Nationale Supérieure d'Agriculture)",
    logo: "https://upload.wikimedia.org/wikipedia/fr/b/b2/Logo_ENSA_%28Ecole_Nationale_Sup%C3%A9rieure_d%27Agriculture%29.jpg",
    location: "Thiès — Université de Thiès",
    description: "La référence nationale pour la formation des ingénieurs agronomes. Forme les futurs experts du secteur agricole et alimentaire dans un pays où l'agro-industrie est en plein développement.",
    filieres: ["Production Végétale", "Production Animale", "Économie Rurale et Développement", "Génie Rural et Eaux & Forêts"],
    avantages: ["Monopole sur l'expertise agronomique d'État", "Secteur agricole et agro-alimentaire en forte croissance", "Débouchés assurés dans les ministères, ONG et projets internationaux"],
    inconvenients: ["Spécialisation très ciblée — pivot de carrière difficile", "Moins adapté aux profils orientés haute technologie"],
    debouches: ["Agro-industrie & Transformation Alimentaire", "Directions Ministérielles (Agriculture, Élevage)", "ONG Internationales (FAO, USAID...)", "Gestion de Projets de Développement Rural"]
  },
  {
    id: 'ensmg',
    name: "ENSMG (École Nationale Supérieure des Mines et de la Géologie)",
    logo: "https://ensmg.ucad.sn/sites/default/files/logo_ensmg.png",
    location: "Dakar",
    description: "Anciennement Institut des Sciences de la Terre (IST), l'ENSMG forme l'élite du secteur extractif — en plein essor au Sénégal grâce aux découvertes pétrolières (Sangomar) et gazières (Grand Tortue Ahmeyim).",
    filieres: ["Géologie de l'Ingénieur", "Mines et Carrières", "Hydrogéologie", "Géophysique Appliquée"],
    avantages: ["Secteur pétrolier et gazier en plein boom au Sénégal", "Débouchés directs dans les grandes compagnies (Total Energies, Kosmos Energy...)", "Basé à Dakar — accès aux sièges des entreprises minières"],
    inconvenients: ["Travail souvent en zones reculées ou offshore", "Marché cyclique lié aux cours des matières premières"],
    debouches: ["Industries Pétrolières & Gazières (Oil & Gas)", "Exploitation Minière & Carrières", "Hydraulique & Gestion des Eaux Souterraines", "Environnement & Géophysique Appliquée"]
  },
  {
    id: 'isfar',
    name: "ISFAR (Institut Supérieur de Formation Agricole et Rurale)",
    logo: "https://uadb.edu.sn/sites/default/files/logo_isfar.png",
    location: "Bambey — Université Alioune Diop",
    description: "Institut de l'Université Alioune Diop de Bambey, spécialisé dans le développement rural et la gestion des ressources naturelles. Forme des ingénieurs au service du monde rural sénégalais.",
    filieres: ["Développement Rural & Planification", "Foresterie & Gestion des Ressources Naturelles", "Agriculture & Agroécologie"],
    avantages: ["Forte expertise pratique de terrain", "Immersion rapide dans le milieu rural", "Partenariats avec les agences nationales (Reforestation, Hydraulique)"],
    inconvenients: ["Moins orienté vers la haute technologie industrielle", "Localisation éloignée des grandes villes (Bambey)"],
    debouches: ["ONG Nationales & Internationales", "Eaux et Forêts & Parcs Nationaux", "Projets FAO, PNUD, Banque Mondiale", "Projets Agroécologiques & Transition Verte"]
  },
  {
    id: 'polytech-diamniadio',
    name: "Polytech Diamniadio (UAM)",
    logo: "https://polytech.sn/wp-content/uploads/2023/10/logo_polytech_diamniadio.png",
    location: "Diamniadio — Université Amadou Mahtar Mbow",
    description: "La plus récente école du réseau REPFIS. Rattachée à l'UAM dans la ville intelligente de Diamniadio, elle propose 5 départements tournés vers les technologies d'avenir, incluant l'ingénierie informatique et les systèmes énergétiques.",
    filieres: ["Ingénierie Informatique & Systèmes d'Information", "Énergies Renouvelables & Systèmes Énergétiques", "Génie Civil & Bâtiment Intelligent", "Électronique & Automatique Industrielle"],
    avantages: ["Infrastructures ultramodernes et neuves", "Localisation stratégique dans le hub technologique de Diamniadio", "Accès au Parc des Technologies Numériques (PTN)", "Filières orientées vers les défis du futur (IA, Green Tech...)"],
    inconvenients: ["Manque de recul historique — réseau d'anciens naissant", "Réputation à bâtir comparé aux écoles historiques"],
    debouches: ["Développement Logiciel, Data Science & IA", "Smart Cities & Infrastructures Numériques", "Énergies Renouvelables (Solaire, Éolien, Hydrogène)", "Automatisation & Robotique Industrielle"]
  }
];

export default function Schools() {
  const [openId, setOpenId] = useState(schoolsData[0].id);

  return (
    <div className="min-h-screen bg-[#F2F0E9] pt-32 pb-24 px-6 md:px-12 lg:px-24">
      <div className="max-w-5xl mx-auto">
        
        {/* Header */}
        <div className="mb-16">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse"></div>
            <span className="text-xs font-data font-semibold text-[#1A3326] tracking-wider uppercase">Le Réseau REPFIS</span>
          </div>
          <h1 className="font-dramatic text-5xl md:text-7xl text-[#1A3326] mb-6">
            Les 8 Écoles <br/> d'Excellence.
          </h1>
          <p className="text-lg text-[#1A3326]/70 max-w-2xl">
            Un seul concours commun vous ouvre les portes de ces établissements publics prestigieux. Explorez leurs filières, avantages et débouchés pour faire le meilleur choix pour votre avenir.
          </p>
        </div>

        {/* Accordion List */}
        <div className="flex flex-col gap-4">
          {schoolsData.map((school, index) => {
            const isOpen = openId === school.id;

            return (
              <React.Fragment key={school.id}>
                <div 
                  className={`bg-white rounded-[2rem] border transition-all duration-300 overflow-hidden ${
                  isOpen ? 'border-[#D4AF37]/30 shadow-xl shadow-[#D4AF37]/5' : 'border-[#1A3326]/10 hover:border-[#1A3326]/20'
                }`}
              >
                {/* Header (Clickable) */}
                <button 
                  className="w-full text-left px-8 py-6 flex items-center justify-between"
                  onClick={() => setOpenId(isOpen ? null : school.id)}
                >
                  <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
                    <div className="w-16 h-16 shrink-0 bg-white rounded-xl border border-[#1A3326]/5 p-2 flex items-center justify-center overflow-hidden">
                      <img 
                        src={school.logo} 
                        alt={`${school.name} logo`} 
                        className="max-w-full max-h-full object-contain"
                        onError={(e) => { e.target.src = 'https://via.placeholder.com/64?text=Logo'; }}
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <h2 className={`text-2xl font-semibold transition-colors ${isOpen ? 'text-[#D4AF37]' : 'text-[#1A3326]'}`}>
                        {school.name}
                      </h2>
                      <div className="flex items-center gap-1.5 text-xs font-data font-medium text-[#1A3326]/50 bg-[#F2F0E9] px-3 py-1 rounded-full w-fit">
                        <MapPin size={12} /> {school.location}
                      </div>
                    </div>
                  </div>
                  <div className={`p-2 rounded-full bg-[#F2F0E9] text-[#1A3326] transition-transform duration-300 ${isOpen ? 'rotate-180 bg-[#D4AF37] text-white' : ''}`}>
                    <ChevronDown size={20} />
                  </div>
                </button>

                {/* Content (Expandable) */}
                <div 
                  className={`grid transition-[grid-template-rows,opacity] duration-500 ease-in-out ${
                    isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="px-8 pb-8 pt-2">
                      <p className="text-[#1A3326]/70 mb-8">{school.description}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Left Column */}
                    <div className="space-y-6">
                      <div>
                        <div className="flex items-center gap-2 text-[#D4AF37] mb-3">
                          <Target size={18} />
                          <h4 className="font-semibold text-sm uppercase tracking-wide">Filières</h4>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {school.filieres.map(f => (
                            <span key={f} className="text-xs font-data bg-[#1A3326] text-[#F2F0E9] px-3 py-1.5 rounded-lg">
                              {f}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div>
                        <div className="flex items-center gap-2 text-[#D4AF37] mb-3">
                          <Briefcase size={18} />
                          <h4 className="font-semibold text-sm uppercase tracking-wide">Débouchés</h4>
                        </div>
                        <ul className="space-y-2">
                          {school.debouches.map(d => (
                            <li key={d} className="text-sm text-[#1A3326]/80 flex items-center gap-2">
                              <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]/50"></div>
                              {d}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-6">
                      <div className="bg-[#F2F0E9] p-5 rounded-2xl">
                        <h4 className="font-semibold text-sm mb-3 flex items-center gap-2 text-[#1A3326]">
                          <span className="text-green-600">+</span> Avantages
                        </h4>
                        <ul className="space-y-2">
                          {school.avantages.map(a => (
                            <li key={a} className="text-sm text-[#1A3326]/70">{a}</li>
                          ))}
                        </ul>
                      </div>

                      <div className="bg-[#F2F0E9] p-5 rounded-2xl">
                        <h4 className="font-semibold text-sm mb-3 flex items-center gap-2 text-[#1A3326]">
                          <AlertTriangle size={14} className="text-amber-500" /> Inconvénients
                        </h4>
                        <ul className="space-y-2">
                          {school.inconvenients.map(i => (
                            <li key={i} className="text-sm text-[#1A3326]/70">{i}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                    </div>
                  </div>
                </div>
              </div>
              {index === 3 && <AdBanner />}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
}
